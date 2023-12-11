#![allow(dead_code)]

use std::fmt;
use std::fmt::{Debug, Display};
use std::convert::TryInto;
use std::ops::Add;



fn main() {

    println!("Hello, world!");
    println!("{}", add(1, 2));

    trait_l();
}


// trait
fn trait_l() {
    // 特征有点像其他语言的接口, 定义一组方法, 但是不具体实现
    // 继承了这个特征(结构)的,需要实现所定义的方法

    pub trait Summary {
        fn summarize(&self) -> String {
            format!("默认实现...")
        }
    }

    pub struct Post {
        pub title: String, // 标题
        pub author: String, // 作者
        pub content: String, // 内容
    }

    impl Summary for Post {
        fn summarize(&self) -> String {
            format!("文章{}, 作者是{}", self.title, self.author)
        }
    }

    pub struct  Weibo {
        pub username: String,
        pub content:String,
    }
    impl Weibo {
         fn new(name: String, content: String) -> Self{
            Weibo { username:name, content }
        }
        fn get_user(&self) -> &str {
            self.username.as_str()
            // &self.username
        }
    }
    // Weibo类型实现 Summary特征
    impl Summary for Weibo {
        fn summarize(&self) -> String {
            format!("{}发表了微博{}", self.username, self.content)
        }
    }

    let post = Post{title: "Rust语言简介".to_string(),author: "Sunface".to_string(), content: "Rust棒极了!".to_string()};
    let web = Weibo::new("siry".to_string(), String::from("content"));
    let name1 = web.get_user();
    println!("name: {}  content: {}", name1, web.content);

    println!("{}", web.summarize());
    println!("{}", post.summarize());


    // 也可以在trait上进行默认实现, 如果结构体为实现trait, 则会使用默认的
    // pub trait Summary {
    //     fn summarize(&self) -> String {
    //         String::from("(Read more...)")
    //     }
    // }


    // 使用特征作为函数参数
    // 特征仅用来实现方法,有些大材小用
    pub fn notify(item: &impl Summary) {
        println!("Breaking news! {}", item.summarize())
    }

    // trait bound

    // impl Trait是一种语法糖,完整写法如下
    // pub fn notify<T: Summary>(item: &T) {
    //     println!("Breaking news! {}", item.summarize());
    // }
    // 形如 T: Summary 被称为特征约束

    notify(&web);

    // 有时有需要完整写法 来进行约束
    // pub fn notify(item1: &impl Summary, item2: &impl Summary) {}
    // 如果函数两个参数是不同的类型，那么上面的方法很好，只要这两个类型都实现了 Summary 特征即可。但是如果我们想要强制函数的两个参数是同一类型呢？
    // 上面的post和web都可以用, 但是下面的如果传入的事post和web就会报错.. 约束了参数为同一类型,且实现了Summary
    // pub fn notify<T: Summary>(item: &T, item2: &T) {}

    // 多重约束
    // 除了单个约束条件, 还可一实现多个约束条件, 例如让参数实现Summary之外,还可以让参数实现Display特征让他可以格式化输出
    // pub fn notify(item: &(impl Summary + Display)) {}
    // or pub fn notify<T: Summary + Display>(item: &T) {}

    // 到哪个特征约束变多时,可以使用where约束
    /* fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {}
        where T:Display + Clone,
              U: Clone + Debug
        {}
    */

    // trait特征作为函数返回值

    // fn returns_summarizable() -> impl Summary {
    //     Weibo {
    //         username: String::from("sunface"),
    //         content: String::from("m1 max"),
    //     }
    // }  这种有个限制, 就是只能返回一种类型, 如果放在条件里返回Post和WeiBo就会报错

    // latest
    fn largest<T: PartialOrd + Copy>(list: &[T]) -> T {
        let mut largest = list[0];

        for &item in list.iter() {
            if item > largest {
                largest = item
            }
        }

        largest
    }
    let number_list = vec![34, 50, 25, 100, 65];

    let result = largest(&number_list);
    println!("The largest number is {}", result);

    let char_list = vec!['y', 'm', 'a', 'q'];

    let result = largest(&char_list);
    println!("The largest char is {}", result);


    // 通过derive派生特征

    // 形如#[derive(Debug)]的代码出现很多次了,
    // 这是一种特征派生语法
    // 被 derive 标记的对象会自动实现对应的默认特征代码，继承相应的功能。

    // Debug 特征，它有一套自动实现的默认代码，当你给一个结构体标记后，就可以使用 println!("{:?}", s) 的形式打印该结构体的对象。
    // Copy 特征，它也有一套自动实现的默认代码，当标记到一个类型上时，可以让这个类型自动实现 Copy 特征，进而可以调用 copy 方法，进行自我复制。


    // 调用特征上的方法,需要把特征引入到当前作用域
    let a: i32 = 10;
    let b: u16 = 100;
  
    let b_ = b.try_into()
              .unwrap();
  
    if a < b_ {
      println!("Ten is less than one hundred.");
    }



    //  为自定义类型实现 + 操作
    #[derive(Debug)]
    struct  Point<T: Add<T, Output  = T>> {
        x: T ,
        y: T
    }

    impl<T: Add<T, Output = T>> Add for Point<T> {
        type Output = Point<T>;
        fn add(self, p: Point<T>) -> Point<T> {
            Point { x: self.x + p.x, y: self.y+ p.y }
        }
    }

    fn add<T: Add<T, Output = T>>(a:T, b: T) -> T {
        a + b
    }

    let p1 = Point{x: 1.1f32, y: 1.1f32};
    let p2 = Point{x: 2.1f32, y: 2.1f32};
    println!("{:?}", add(p1, p2));

    let p3 = Point{x: 1i32, y: 1i32};
    let p4 = Point{x: 2i32, y: 2i32};
    println!("{:?}", add(p3, p4));



    // 自定义类型输出
    #[derive(Debug)]
    struct Point2{
        x: i32,
        y: i32
    }
    let p2 = Point{x: 3, y: 3};
    println!("{:?}", p2);


    #[derive(Debug, PartialEq)]
    enum FileState {
        Open,
        Closed,
    }

    #[derive(Debug)]
    struct File {
        name: String,
        data: Vec<u8>,
        state: FileState,
    }

    impl Display for FileState {
        fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
            match *self {
                FileState::Open => write!(f, "OPEN"),
                FileState::Closed => write!(f, "CLOSED",)
            }
        }
    }

    impl Display for File {
        fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
            write!(f, "<{} {}>", self.name, self.state)
        }
    }

    impl File {
        fn new(name: &str) -> File {
            File {
                name: String::from(name),
                data: Vec::new(),
                state
                : FileState::Closed,
            }
        }
    }
    let f6 = File::new("f6.txt");
    println!("{:#?}", f6);
    println!("{}", f6)

}

// 函数命名使用蛇形命名法, 小写加上下划线
fn add(i: i32, j: i32) -> i32 {
    // 函数返回值
    // 函数体内的最后一条表达式的值就是返回值
    // 挥着使用return 显示的指定返回值
    i + j
}

// 函数隐式的返回 () 单元类型
fn report<T: Debug>(item: T) {
    println!("{:?}", item);
}
// 显示的返回单元类型()
fn clear(text: &mut String) -> () {
    *text = String::from("");
}

// 永不返回的发散函数

fn dead_end() -> ! {
    panic!(".......")
}