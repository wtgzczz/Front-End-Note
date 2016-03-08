## ES6 ##
ES6，或者叫ES2015、ECMAScript5，是JavaScript的下一代标准，提供了更多的功能供使用。虽然是今年才通过的标准，但是它的应用已经开始很久了，直接在开发环境使用部分ES6特性编写代码，再使用babel转成ES5的特性兼容到IE8+。

## 资料： ##
ECMAScript6 -阮一峰
[http://es6.ruanyifeng.com/#docs/intro](http://es6.ruanyifeng.com/#docs/intro)


babel- ES6转译器
[https://github.com/babel/babel](https://github.com/babel/babel "https://github.com/babel/babel")

## 在实习中的应用例子： ##
下面是我在实习中应用到的特性和例子，关于这些特性的具体内容请参考资料。其他这里没有讲到的只是我实习过程中没有运用到。

1.### let ###
let是可以基本取代var的定义变量方法，在实际使用上也是会换用let来定义。比较大的好处是它只在其所在的代码块内有效，例如在for里面定义后外面不能访问：
```
for( let i = 0 ; i < len ; i++ ){}
i;  //ReferenceError: i is not defined.
```

2.### 变量的解构赋值 ###
主要用到对象的解构赋值：

```
let obj = {
    foo : 1,
    bar : 2
}
let {foo , bar} = obj;

foo; //1
bar; //2
```

要注意的是`let {foo , bar} = obj;`中foo和bar是跟obj中属性的键名对应的，所以不能用其他变量名。

3.### 字符串扩展 ###
主要使用到模板字符串的功能。例如在以往的写法中：

```
var a = '123';
var say = 'My name is' + a;
```
如果这种字符串串接的情况在一个语句里面出现更多的话会很容易混乱，而且不利于分行阅读。采用模板字符串的写法：

```
let a = '123';
let say = `My name is ${a}`;
```

模板字符串用 \` 来取代单引号。
在 `${}` 的标志内填写JS代码会被转义成字符串。注意不要和JQ `$()` 搞混就可以。

```
let jud = true;
let a = '123';
let say = `My name is ${jud ? a : '2333'}`;
``` 

### 函数的扩展 ###
这个用的比较多。首先是
4.#### 函数参数的默认值： ####

```
function foo(x='123', y='124'){
    x;
    y;
}
foo(); // '123' '124'
```

如果在调用foo的时候没有传入某一个参数，就采用默认值。这个可以节省很多判断的语句。

其次是
#### rest参数： ####

```
function push(array, ...items) {
    items.forEach(function(item) {
      array.push(item);
      console.log(item); // 1 2 3
    });
}

var a = [];
push(a, 1, 2, 3)

```

在参数中 `...` 代表把剩下传入的参数都按顺序存入名为 `items` 数组里面。我一般会在剩下的参数不在当前函数使用的情况下用到：

```
function push(name, ...items){

    doSth(items);
}

```

5.#### 箭头函数 ####

```
var a = (num1,num2)=>{                 var a = () =>{}
    return num1+num2;
}
//或者
var a = (num1,num2) => num1+num2;

```
等价于

```
var a = funcion(num1,num2){
    return num1+num2;
}
```

一般会在两种情况用到箭头函数：
1. 匿名函数

```
setTimeout(()=>$(direction).nanoScroller(options), 0);
```

可以使匿名函数更清晰。

2. 需要用到上一个作用域this的情况

```
var funcs = {
    isSent:false,
    async:function(){
        var that = this;
        $.post('./', {a;'a'}, function(){
            that.isSent = true;
        })
    }
}

```
需要用到这种 `var that = this` 的情况，都可以使用箭头函数：

```
let funcs = {
    isSent:false,
    async(){
        $.post('./', {a;'a'}, ()=>{
            this.isSent = true;
        })
    }
}

```

这是因为箭头函数**不绑定当前作用域的this**，导致**内部的this就是外层代码块的this**。

### 对象的扩展 ###

#### 属性的简洁表示法 ####

```
let foo = '123',
    bar = '233';

return {
    foo,
    bar,
    what:'up'
    doSth:function(){}
}
//相当于
{
    foo:foo,
    bar:bar,
    what:'up',
    doSth(){}
}
```

也是为了使代码更清晰。

6.#### 属性名表达式 ####
这个真是超级方便好用

```
let name = 'foo'
let obj = {
   [name]:'ok'
}
obj.foo; // 'ok';
```

#### Object.assign() ####

等同于$.extend()

```
let target = { a: 1 };
let source1 = { b: 2 };
let source2 = { c: 3 };

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

### Generator Promise ###

这个是比较大的内容，可以另外找资料看，也可以看看深入浅出书上的介绍。

### 阮一峰资料上的编程风格部分 ###

[http://es6.ruanyifeng.com/#docs/style](http://es6.ruanyifeng.com/#docs/style)

可以看一看，不用完全按照。

## 开始使用ES6 ##

现代浏览器的新版本已经开始逐步支持ES6了。如果要在生产环境中使用的话就用babel转译，例如 `let` 会转换成 `var`。使用ES6主要是对开发编写代码带来便利。






