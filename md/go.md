# go

## 快速预览指南

### go包中需要导出的变量和函数都必须大写字母开头

### 函数参数类型可简写,支持多返回值,支持返回值命名

```go
func (x, y int) (int, int) {}

func (x int) (returnValue int) {
    returnValue = x + 3
    return  // 这里return不需要指定返回值
}
```

###

### 简洁赋值 `:=`不能再函数外使用, 变量声明用`var`,如果初始值已经存在,则可省略类型

```go
var a int
var a = 2  // 省略类型

func main() {
    a := 2
}
```

### Go 在不同类型的项之间赋值时需要显式转换。

### 输出一个变量的类型

```go
func main() {
	v := 42 // 修改这里！
	fmt.Printf("v is of type %T\n", v)  //%T
}

```

### go的无限循环

```go
for {
    // ...
}
```

### 数组声明和使用

```go
var a [2]int  // 声明一个两个长度的int数组
a[1] = 1
a[0] = 0

var b [3]int = [3]int{1, 2, 3}
var b = [3]int{1, 2, 3}// 简写
b := [3]int{1, 2, 3}// 简写
```

### 切片

```go
// 从数组创建一个切片
a := [5]int{1,2 ,3,4,5}
// 切片
b := a[1: 3] // [2,3]
b := [:3] // [1,2,3] 省略start
b := [2: 4] // [3, 4] 省略end
b := [:] //[1,2,3,4,5] 省略start&end
```

切片是不存储任何数据的,它就像描述了底层数组的一段.

修改切片,会同步修改底层的数组,(切片像底层数组的引用 - 有点指针的意味了.)

[3]bool{true, true, false}  // 创建数组

[]bool{true, true, false} // 创建一个和上面同样的数组,然后构建一个引用了他的切片

切片拥有 **长度** 和 **容量**。

切片的长度就是它所包含的元素个数。

切片的容量是从它的第一个元素开始数，到其底层数组元素末尾的个数。

切片 `s` 的长度和容量可通过表达式 `len(s)` 和 `cap(s)` 来获取。

切片的零值是 `nil`。

nil 切片的长度和容量为 0 且没有底层数组。

- make创建切片

make([]int, 6, 8)  // 创建一个长度6, 容量8的int类型切片  len(a) = 6, cap(a) = 8

- append向切片赋值

append(a, 10 ,11 ,12)

当 `s` 的底层数组太小，不足以容纳所有给定的值时，它就会分配一个更大的数组。返回的切片会指向这个新分配的数组。

### 映射(map)

https://tour.go-zh.org/methods/1

### 方法与指针重定向

```go
    package main

import "fmt"

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Scale(f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func ScaleFunc(v *Vertex, f float64) {
	v.X = v.X * f
	v.Y = v.Y * f
}

func main() {
	v := Vertex{3, 4}
	v.Scale(2)
	ScaleFunc(&v, 10)

	p := &Vertex{4, 3}
	p.Scale(3)
	ScaleFunc(p, 8)

	fmt.Println(v, p)
}

var v Vertex
ScaleFunc(v, 5)  // 编译错误！
ScaleFunc(&v, 5) // OK

var v Vertex
v.Scale(5)  // OK
p := &v
p.Scale(10) // OK

v.Scale(5) 解释为 (&v).Scale(5)。
```

上面函数和方法在调用时, 对于函数必须传入一个指针, 而对于方法, 可以传指针亦可以传值
即

同样带原则, 在方法接受者为值时, 以指针调用也是ok的, 但是函数却不行.
p.Scale(5) 解释为 (*p).Scale(5)。

选择指针作为接受者的原因

- 方法能够修改其接收者指向的值。

- 这样可以避免在每次调用方法时复制该值。若值的类型为大型结构体时，这样做会更加高效。

### 接口

**接口类型**是由一组方法签名定义的集合
接口类型的变量可以保存任何实现了这些方法的值

```go
package main

import (
	"fmt"
	"math"
)

type Abser interface {
	Abs() float64
}

func main() {
	var a Abser
	f := MyFloat(-math.Sqrt2)
	v := Vertex{3, 4}

	a = f  // a MyFloat 实现了 Abser
	a = &v // a *Vertex 实现了 Abser

    因为是*Vertex 实现了 Abser,而Vertex 没有实现,所以下面一行的赋值会报错.
	// 下面一行，v 是一个 Vertex（而不是 *Vertex）
	// 所以没有实现 Abser。
	a = v

	fmt.Println(a.Abs())
}

type MyFloat float64

func (f MyFloat) Abs() float64 {
	if f < 0 {
		return float64(-f)
	}
	return float64(f)
}

type Vertex struct {
	X, Y float64
}

func (v *Vertex) Abs() float64 {
	return math.Sqrt(v.X*v.X + v.Y*v.Y)
}

```

**接口与隐式实现**

```go
package main

import "fmt"

type I interface {
	M()
}

type T struct {
	S string
}

// 此方法表示类型 T 实现了接口 I，但我们无需显式声明此事。
func (t T) M() {
	fmt.Println(t.S)
}

func main() {
	var i I = T{"hello"}
	i.M()
}
```

#### go中函数, 方法, 接口

方法  静态的
接口  动态的

类型通过实现一个接口的所有方法来实现该接口。既然无需专门显式声明，也就没有“implements”关键字。

**dependencies**

```go
// const leadings = ['>=', '<=', '>', '<', '~', '^']
// 还有只用*, 不用具体版本号的
func getPrefixAndVersion(versionString string) (string, string, error) {
 // 这里正则前缀可以把语义化版本的都加上, 这里是只有部分的
 versionRegex := regexp.MustCompile(`^([~^]?)(\d+\.\d+\.\d+)`)
 // 使用内置方法来 获取匹配的子字符串数组
 matches := versionRegex.FindStringSubmatch(versionString)

 if len(matches) > 1 {
  prefix := matches[1]
  fixedVersion := matches[2]
  fmt.Printf("版本前缀：%s\n", prefix)
  fmt.Printf("固定版本：%s\n", fixedVersion)
  return prefix, fixedVersion, nil
 } else {
  err := fmt.Errorf("无法解析版本号：%s", versionString)
  log.Fatalf("无法解析版本号：%s", versionString)
  return "", "", err
 }
}

```
