#![allow(dead_code)]

use std::fmt;
use std::fmt::{Debug, Display};
use std::convert::TryInto;
use std::ops::{Add, Mul,Deref, Sub};
use std::collections::HashMap;



fn main() {

    println!("Hello, world!");
    println!("{}", add(1, 2));

    // trait_l();

    // 关联类型
    // trait_lll();

    // hashMap

    hash_map_l();

}

// hash_map
fn hash_map_l() {
    // 创建

    // 首先从标准库中用use std::collections::HashMap; 引用
    let mut map1 = HashMap::new();

    map1.insert("红宝石", 1);
    map1.insert("蓝宝石", 2);
    map1.insert("破石头", 18);

    // 如果预先知道数量可以指定容量进行创建
    // HashMap::with_capacity(capacity)

    let teams_list = vec![
        ("中国队".to_string(), 100),
        ("美国队".to_string(), 10),
        ("日本队".to_string(), 50),
    ];

    // 通过迭代器创建
    // Vec转为迭代器  inti_iter()会发生所有权的转移, iter不会
    // 这里hashmap期望的是键值对的所有权,所以如果使用iter,需要使用clone
    // let team_map: HashMap<_, _> = teams_list.iter().clone().collect();    
    /*
     * collect 方法在内部实际上支持生成多种类型的目标集合，因此我们需要通过类型标注 HashMap<_,_> 来告诉编译器：请帮我们收集为 HashMap 集合类型，具体的 KV 类型，麻烦编译器您老人家帮我们推导。
     */
    let team_map: HashMap<_, _> = teams_list.into_iter().collect();    
    println!("{:?}", team_map);



    // 所有权转移

    /*
        - 若类型实现了Copy特征, 该类型会被复制进HashMap,因此无所谓所有权
        - 弱类型没实现Copy, 所有权会被转移给HashMap中

        如果要使用引用类型放入HashMap, 须确保引用的生命周期至少跟HashMap一样
     */

    let name = String::from("Sunface");
    let age = 18;
    let mut handsome_boy = HashMap::new();
    handsome_boy.insert(&name, age);
    // 下面打印name会报错, 因为name是String类型, 会受到所有权的限制, 他的所有权被移交给了Hashmap,
    // std::mem::drop(name);
    // println!("因为过于无耻，{:?}已经被从帅气男孩名单中除名", handsome_boy);
    println!("还有，他的真实年龄远远不止{}岁", age);


    // == 查询hashmap
    let mut map2 = HashMap::new();
    map2.insert(String::from("Blue"), 10);
    map2.insert(String::from("Yellow"), 50);

    let team_name = String::from("Blue");
    let score = map2.get(&team_name);

    // 直接获取
    let score_1 = map2.get(&team_name).copied().unwrap_or(0);

    println!("name: {team_name}, {}", score_1);

    match score {
        Some(v) => println!("source: {}", v),
        None => println!("未知的值...")
    }

    if let Some(v) =  score {
        println!("source: {v}")
    } else {
        println!("未知的值...")
    }


    // == 更新HashMap中的值

    let mut m2 = HashMap::new();
    m2.insert("Blue", 10);

    // 覆盖已有的值
    let old = m2.insert("Blue", 20);
    assert_eq!(old, Some(10));

    // 查询新插入的值
    let new = m2.get("Blue");
    assert_eq!(new, Some(&20));

    // 查询Yellow对应的值, 不存在就进行插入
    let v =  m2.entry("Yellow").or_insert(5);
    assert_eq!(*v, 5); // 不存在，插入5


    // 统计单词出现的次数

    let text = "hello world wonderful world";
    let mut mn = HashMap::new();

    for word in text.split_whitespace() {
        let count = mn.entry(word).or_insert(0);
        *count += 1;
    }

    println!("{:?}", mn);

}


fn trait_lll() {
    // ===  关联类型: 是在特征定义的语句块中,声明一个自定义类型,这样就可以在特征的方法签名中使用该类型:
    // 迭代器的特征Iterator, 里面声明了一个item的关联类型,用于替代遍历的值的类型
    // pub trait Iterator {
    //     type Item;
    //     fn next(&mut self) -> Option<Self::Item>;
    // }

    struct Counter{x: u32}
    //  Self 用来指代当前调用者的具体类型，那么 Self::Item 就用来指代该类型实现中定义的 Item 类型：
    // 变量c是Counter的实例, 对于next方法而言. Self 是调用者c的具体类型,也就是Counter
    // 而Self::Item是Counter中定义的Item类型
    impl Iterator for Counter {
        type Item = u32;
        fn next(&mut self) -> Option<Self::Item> {
            //
            Some(self.x)
        }
    }
    // 这里为啥不用泛型呢?  简单点就是为了代码的可读性
    // 用泛型,你需要在所有的地方都写上Iterator<Item>, 而是用关联类型,只需要写Iterator,然后子啊具体的
    // 用了泛型之后只需要在实现特征的块中声明一下就行
    // pub trait Iterator<Item> {
    //     fn next(&mut self) -> Option<Item>
    // }

    let mut c = Counter{x: 2};
    c.next();



    // ==== 默认泛型类型参数
    // 指定默认类型
    // 这是标准库 std::ops::Add的Add定义
    // 有一个泛型参数RHS, 给了一个默认值
    // trait Add<RHS=Self> {
    //     type Output;
    //     fn add(self, rhs: RHS) -> Self::Output
    // }
    #[derive(Debug, PartialEq)]
    struct Point{
        x: i32,
        y: i32,
    }
    impl Add for Point {
        type Output = Point;

        fn add(self, other: Point) -> Point {
            Point{
                x: self.x + other.x,
                y: self.y + other.y
            }
        }
    }
    // 这里在为Point实现特征Add时就没传入泛型参数,所以取了默认值
    // 此时Self就是Point, 也就是说我们这里是进行两个相同类型的+

    // 如果使用泛型参数, 三种写法
    // #[derive(Debug, PartialEq)]
    // struct Point<T> {
    //     x: T,
    //     y: T,
    // }
    //1. impl<T: Sub<Output = T>> Sub for Point<T> {
    //2.  impl<T: Sub<Output = T>> Sub<Self> for Point {
    //  impl<T: Sub<Output = T>> Sub<Point<T>> for Point {
    //     type Output = Self;
    
    //     fn sub(self, other: Self) -> Self::Output {
    //         Point {
    //             x: self.x - other.x,
    //             y: self.y - other.y,
    //         }
    //     }
    // }

    // 元组结构体, 通过 .0来取值
    #[derive(Debug, PartialEq)]
    struct  Millimeters(u32);
    #[derive(Debug, PartialEq)]
    struct Meters(u32);

    impl Add<Meters> for Millimeters {
        type Output = Millimeters;

        fn add(self, other: Meters) -> Millimeters {
            Millimeters(self.0 + (other.0 * 1000))
        }
    }
    assert_eq!(Millimeters(1) + Meters(1),
        Millimeters(1001));
    // 因为我们没在Meters上实现特征Add<Millimeters>, 所以不能那个加

    // 以下是实现
    impl Add<Millimeters> for Meters {
        type Output = Meters;

        fn add(self, other: Millimeters) -> Meters {
            Meters(self.0 + (other.0 * 1000))
        }
    }
    assert_eq!(Meters(1) + Millimeters(1),
    Meters(1001));


    // ===  调用同名方法

    // 不同的特征拥有同名的方法是很正常的

    trait Pilot {
        fn fly(&self);
    }
    
    trait Wizard {
        fn fly(&self);
    }
    
    struct Human;
    
    impl Pilot for Human {
        fn fly(&self) {
            println!("This is your captain speaking.");
        }
    }
    
    impl Wizard for Human {
        fn fly(&self) {
            println!("Up!");
        }
    }
    
    impl Human {
        fn fly(&self) {
            println!("*waving arms furiously*");
        }
    }

    // 1. 调用类型上的方法
    let person = Human;
    person.fly();

    // 2. 调用特征上的方法
    Pilot::fly(&person);
    Wizard::fly(&person);

    //因为 fly 方法的参数是 self，当显式调用时，编译器就可以根据调用的类型( self 的类型)决定具体调用哪个方法。


    // 那如果没有&self参数呢, 比如关联函数 new(构造函数)
    trait Animal {
        fn baby_name() -> String;
    }

    struct Dog;

    impl Dog {
        fn baby_name() -> String {
            String::from("Spot")
        }
    }

    impl Animal for Dog {
        fn baby_name() -> String {
            String::from("puppy")
        }
    }

    println!("A baby dog is called a {}", Dog::baby_name());

    // 完全限定语法
    println!("A baby dog is called a {}", <Dog as Animal>::baby_name());


    // === 特征定义中的特征约束
    // 有时需要让特征A能使用特征B的功能,这种情况下不仅仅腰围类型实现A,还需要实现B才行
    // ..有点像多继承啊

    trait OutlinePrint: Display {
        fn outline_print(&self) {
            let output = self.to_string();
            let len = output.len();
            println!("{}", "*".repeat(len + 4));
            println!("*{}*", " ".repeat(len + 2));
            println!("* {} *", output);
            println!("*{}*", " ".repeat(len + 2));
            println!("{}", "*".repeat(len + 4));
        }
    }

    // 这里就是你想要实现OutlinePrint特征,你就需要先实现Display特征
    impl OutlinePrint for Point {}
    // 就需要来实现特征Display
    impl Display for Point {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            write!(f, "({}, {})", self.x, self.y)
        }
    }



    // == 在外部类型上实现外部特征
    // supertrait
    // 孤儿规则中, 特征或者类型必须有一个是本地的, 才能在此类型上定义特征
    // 使用newtype模式就可以绕过改规则

    // 动态数组类型Vec<T> 定义在标准库中
    // 特征Display也定义在标准库中, 如果没有newtype, Vec<T>无法实现Display

    struct Wrapper(Vec<String>);

    impl Display for Wrapper {
        fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
            // 使用deref特征之前
            // write!(f, "[{}]", self.0.join(", "))
            // 之后
            write!(f, "[{}]", self.join(", "))

        }
    }

    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {}", w);

    // 注意这里拿到数组值使用了 self.0  这样有点啰嗦
    // rust提供了特征 Deref来自动做一层类型转换
    // 会把Wrapper变成Vec<String>来使用,就可以像直接使用数组那样来使用

    impl Deref for Wrapper {
        type Target = Vec<String>;
        fn deref(&self) -> &Self::Target {
            &self.0
        }
    }
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

    // 当特征约束变多时,可以使用where约束
    /* fn some_function<T: Display + Clone, U: Clone + Debug>(t: &T, u: &U) -> i32 {}
        
     使用where 约束
     fn some_function<T, U>(t: &T, u: &U) -> i32
        where T: Display + Clone,
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

    // 乘法
    // Mul<T, Output = T>  两种写法都差不多 [TODO]
    fn mul<T: Mul<Output = T>>(a:T, b: T) -> T {
        a * b
    }

    println!("mul: {}", mul(2,3));

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
