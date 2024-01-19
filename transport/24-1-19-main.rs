
use std::cell::RefCell;
use std::rc::Rc;

/*

  当我们希望在堆上分配一个对象供程序的多个部分使用且无法确定哪个部分最后一个结束时，就可以使用 Rc 成为数据值的所有者，


  在 Rust 中，所有权机制保证了一个数据只会有一个所有者，但如果你想要在图数据结构、多线程等场景中共享数据，这种机制会成为极大的阻碍。好在 Rust 为我们提供了智能指针 Rc 和 Arc，使用它们就能实现多个所有者共享一个数据的功能。

  Rc 和 Arc 的区别在于，后者是原子化实现的引用计数，因此是线程安全的，可以用于多线程中共享数据。

  这两者都是只读的，如果想要实现内部数据可修改，必须配合内部可变性 RefCell 或者互斥锁 Mutex 来一起使用。



  Cell 和 RefCell: 可以在拥有不可变引用的同时修改目标数据，

  Cell于RefCell功能上没有差别, 区别在于Cell<T>适用于T实现了Copy的情况
  &str实现了Copy特征,String没有实现Copy特征

  use std::cell::Cell;
  fn main() {
    let c = Cell::new("asdf");
    let one = c.get();// get获取值
    c.set("qwer"); // set设置值
    let two = c.get();
    println!("{}, {}", one, two);
  }
  这里取到值保存在one变量中, 还能同时修改,这个违背了rust的借用规则, 但是由于Cell存在,我们做到了



  所有权, 借用规则和只能指针做一个比较

  rust规则

    一个数据只有一个所有者
    要么多个不可变借用, 要么一个可变借用
    违背规则导致编译失败

  只能指针带来的额外规则
    Rc/Arc让一个数据可以有多个所有者
    RefCell实现编译期可变, 不可变引用共存
    违背规则导致运行时pacic

  RefCell 实际上并没有解决可变引用和引用可以共存的问题，只是将报错从编译期推迟到运行时，从编译器错误变成了 panic 异常：

  与 Cell 用于可 Copy 的值不同，RefCell 用于引用
  RefCell 只是将借用规则从编译期推迟到程序运行期，并不能帮你绕过这个规则
  RefCell 适用于编译期误报或者一个引用被在多处代码使用、修改以至于难于管理借用关系时
  使用 RefCell 时，违背借用规则会导致运行期的 panic


  Cell 只适用于 Copy 类型，用于提供值，而 RefCell 用于提供引用
  Cell 不会 panic，而 RefCell 会
*/

// Rc + RefCell组合使用
fn main() {
  let s = Rc::new(RefCell::new("我很善变,而且拥有多个主人".to_string()));

  let s1 = s.clone();
  let s2 = s.clone();
  s2.borrow_mut().push_str(", ob yeah!");

  println!("{:?} \n {:?} \n {:?}", s, s1, s2);
}
