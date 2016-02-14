/*原型*/  //实例首先访问自身的属性集合，包括的构造函数的属性集合，再访问构造函数的原型对象的集合
function A(){
	this.a = "a";
}
A.prototype.b = function(){
	
}
var a1 = new A();
alert(a1.a);
alert(a1.b);
a1.c = 2;
alert(a1.c);


/*原型链继承*/  //手绘了一个图，解释很清楚
function A(){
	this.colors = ['red','blue','green'];  //缺点：引用类型都被所有子实例共享;创建子实例时不能向父类构造函数传参
}
A.prototype.c='d';
function B(){
	
}
B.prototype = new A();

var b1 = new B();
b1.colors.push('black');
console.log(b1.colors);

var b2 = new B();
console.log(b2.colors);
console.log(b2.c);

/*借用构造函数继承*/
function A(name){
	this.colors = ['red','blue','green'];
	this.name = name;
}
function B(){
	A.call(this,name);   //优点：子类型构造函数可向超类型构造函数传递参数
}                        //缺点：所有的方法都要在构造函数中定义
var b1 = new B();
b1.colors.push('black');
alert(b1.colors);

var b2 = new B();
alert(b2.colors);

var b3 = new B('tong');   
alert(b3.name);

/*组合继承*/
function A(name){
	this.name = name;
	this.colors = ['red','blue','green'];
}
A.prototype.sayName = function(){
	alert(this.name);
}
function B(name,age){
	A.call(this,name);
	this.age = age;
}
B.prototype = new A();
B.prototype.constructor = B;
B.prototype.sayAge = function(){
	alert(this.age);
}

var b1 = new B('tong',20);
b1.colors.push('black');
alert(b1.colors);
b1.sayName();
b1.sayAge();

var b2 = new B('ton',21);
alert(b2.colors);
b2.sayName();
b2.sayAge();

/*原型式继承*/
function object(o){   //对象浅继承，引用类型会共享      与 Object.create()相同
	function F(){};
	F.prototype = o;
	return new F();
}
var obj = {
	name:'tong',
	arr:['red','blue']
};

var obj2 = object(obj);
obj2.arr.push('black');
obj2.arr;             //输出['red,'blue','black']
var obj3 = object(obj);
obj3.arr;			  //输出['red,'blue','black']

/*寄生式继承*/        
function createSubObj(o){
	var clone = object(o);
	clone.say = function(){    //增强的原型式继承
		alert('hi');
	}
	return clone;
}

var obj = {
	name:'tong',
	arr:['red','blue']
};
var obj2 = createSubObj(obj);
obj2.say();

/*寄生组合式继承*/
function A(name){
	this.name = name;
	this.colors = ['red','blue','green'];
}
A.prototype.sayName = function(){
	alert(this.name);
}
function B(name,age){
	A.call(this,name);
	this.age = age;
}
B.prototype = Object.create(A.prototype);
B.prototype.sayAge = function(){
	alert(this.age);
}
var b1 = new B('tong',20);
b1.sayName();
b1.sayAge();
b1.colors;


/*链式调用*/
function A(){};
A.prototype.x = function(index){
    return this;                //返回实例
}
var a = new A();
a.x(1).x(2).x(3);
