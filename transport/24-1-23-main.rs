
use std::rc::Rc;
use std::rc::Weak;
use std::cell::RefCell;
use std::vec;
fn main() {
    println!("Hello, world!");
    // test_1();
    test_2();


    exercise_2();

}

// 自引用结构体

fn exercise_2() {
    /*
        自引用结构体"是指包含指向自身的引用或指针的结构体。这在其他编程语言中可能很容易实现，但在Rust中由于所有权和借用系统的限制，自引用变得更加复杂。

        自引用最麻烦的就是创建引用的同时，值的所有权会被转移
     */

    // unsafe实现
    // 既然借用规则妨碍了,那就一脚踢开

    #[derive(Debug)]
    struct SelfRef {
        value: String,
        pointer_to_value: *mut String,
    }

    impl SelfRef {
        fn new(txt: &str) -> Self {
            SelfRef {
                value: String::from(txt),
                pointer_to_value: std::ptr::null_mut(),
            }
        }

        fn init(&mut self)  {
            let self_ref: *mut String = &mut self.value;
            self.pointer_to_value = self_ref;
        }

        fn value(&self) -> &str {
            &self.value
        }

        fn pointer_to_value(&self) -> &String {
            assert!(!self.pointer_to_value.is_null(),
            "Test::b called without Test::init being called first");
            unsafe {&*(self.pointer_to_value)}
        }
    }

    let mut t = SelfRef::new("hello");
    t.init();
    // 打印值和指针地址
    println!("{}, {:p}", t.value(), t.pointer_to_value());
    // 修改值
    t.value.push_str(", world");
    unsafe {
        (&mut *t.pointer_to_value).push_str("!");
    }
    println!("{}, {:p}", t.value(), t.pointer_to_value());

    // 我们在 pointer_to_value 中直接存储裸指针，而不是 Rust 的引用，因此不再受到 Rust 借用规则和生命周期的限制，而且实现起来非常清晰、简洁。但是缺点就是，通过指针获取值时需要使用 unsafe 代码。


    // 除了使用unsafe, 还可以使用pin...
}

// 具体例子

fn exercise_1() {
    // 主人
    struct Owner {
        name: String,
        gadgets: RefCell<Vec<Weak<Gadget>>>
    }

    struct  Gadget {
        id: i32,
        owner: Rc<Owner>
    }

    //创建一个owner
    let gadget_owner: Rc<Owner>  = Rc::new(
        Owner{
            name: "gadget man".to_string(),
            gadgets: RefCell::new(Vec::new()),
        }
    );

    // 创建工具,同时指定主人
    let gadget1 = Rc::new(
        Gadget {
            id: 1,
            owner: gadget_owner.clone()
        }
    );

    let gadget2 = Rc::new(
        Gadget {
            id: 2,
            owner: gadget_owner.clone()
        }
    );

    // 为主人更新所拥有的工具
    // 因为之前使用了Rc, 现在必须要使用weak,不然就会循环应用
    gadget_owner.gadgets.borrow_mut().push(Rc::downgrade(&gadget1));
    gadget_owner.gadgets.borrow_mut().push(Rc::downgrade(&gadget2));

    // 遍历geadget_owner的gadgets字段

    for gadget_opt in gadget_owner.gadgets.borrow().iter() {
        let gadget = gadget_opt.upgrade().unwrap();
        println!("Gadget {} owned by {}", gadget.id, gadget.owner.name);
    }

    // 函数的最后，gadget_owner，gadget1 和 gadget2 都被销毁。
    // 具体是，因为这几个结构体之间没有了强引用（`Rc<T>`），所以，当他们销毁的时候。
    // 首先 gadget2 和 gadget1 被销毁。
    // 然后因为 gadget_owner 的引用数量为 0，所以这个对象可以被销毁了。
    // 循环引用问题也就避免了


}
