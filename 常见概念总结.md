### 数据类型及判断
六大数据类型：number string object Boolean null undefined

* **最常见**的判断方法： typeof

		var str = "hahaha";
		console.log(typeof str);//string
		var arr = [1,2,3];
		console.log(typeof arr);//object
typeof一般只能返回如下几个结果：**number，boolean，string，function，object，undefined**，对于Array和null这种特殊对象，使用typeof只能返回object，这就是typeof的局限性
* 判断已知对象类型方法： instanceof

		var arr = [1,2,3];
		console.log(arr instanceof Array);//true
		var date = new Date();
		console.log(date instanceof Date);//true
		var fun = function(){};
		console.log(fun instancesof Function);//true
在多重继承关系中，instanceof运算符同样适用。
* 根据对象的constructor来判断
	
		var arr = [1,2,3];
		console.log(arr.constructor === Array);//true
* **通用**但繁琐的方法：prototype

		var arr = [1,2,3];
		console.log(Object.prototype.toString.call(arr) === '[object Array]');//true
		var date = new Date();
		console.log(Object.prototype.toString.call(date) === '[object Date]');//true



### 原型和继承

#### 实例化obj对象有三步
	function Person(name){
		this.name = name;
		function abc(){}
	}
	var p = new Person(alkali);
1. 创建obj对象：var p = {};
2. p.\__proto__ = Person.prototype;
3. Person.call(p);


### 基于闭包实现唯一生成id

		var foo = (function(){
			var id = 0;
			return {
				getId: function(){
					return id++;
				}				
			}
		})();
		
		
		var getId = (function()	{
			var id = 0;
			return function(){
				return id++;
			}
		})();

### 跨域、jsonp具体实现代码
#### jsonp的原理
通过script标签引入一个js文件，这个文件加载成功后会执行在url参数里指定的函数，并且会把获得的json数据作为函数的参数传入

		var script = document.createElement("script");
		script.src = url；
		body.appendChild(script);


### dom事件和自定义事件系统
#### 事件流
* 事件冒泡： 从实际目标一直向上冒泡到document对象
* 事件捕获： 从document对象向下传递到实际目标
* dom事件流： 事件捕获阶段 --> 处于事件阶段 --> 事件冒泡阶段

#### 事件处理程序
* html事件处理程序（嵌入html）缺点：没有做到结构与行为分离
* DOM0级事件处理程序（如onclick）缺点：只能绑定一次处理程序，及旧绑定的会被新绑定的代替
* DOM2级事件处理程序（addEventListener）缺点：不支持ie8，只能通过removeListener来取消绑定
* IE事件处理程序（attachEvent）缺点：只支持ie和opera，只能通过detachEvent来取消绑定
* **跨浏览器事件处理程序**（及兼容。如addEvent和removeEvent）

		var addEvent = function(ele, type, handler){
			if(ele.addEventListener){
				ele.addEventListener(type, handler, false);
			}esle if(ele.attachEvent){
				ele.attachEvent('on' + type, handler);
			}else{
				ele['on' + type] = handler;
			}
		}
		
		var removeEvent = function(ele, type, handler){
			if(ele.removeEventListener){
				ele.removeEventListener(type, handler);
			}else if(ele.detachEvent){
				ele.detachEvent('on' + type, handler);
			}else{
				ele['on' + type] = null;
			}
		}

#### 自定义事件系统

		var demo = document.getElementById("demo");
		var tap = document.createEvent('HTMLEvents');
		var body = document.getElementsByTagName("body")[0];
		var event = "tap 事件";
		tap.initEvent("tap", true, true);//事件名称，是否可以冒泡，是否阻止事件的默认操作
		body.addEventListener("touchstart", function(e){
            e.preventDefault();
            event = "touchstart";
            demo.dispatchEvent(tap);
        }, false);
        body.addEventListener("touchmove", function(e){
            e.preventDefault();
            event = "touchmove";
            demo.dispatchEvent(tap);
        }, false);
        body.addEventListener("touchend", function(){
            event = "touchend";
            demo.dispatchEvent(tap);
        }, false);
        demo.addEventListener("tap", function(){
            demo.innerHTML = event;
        }, false);
### 前端路由
根据location.hash来做不同的操作，比如用户点了一个选项卡，从个人信息到了我的关注，页面没有跳转，但是局部更新了内容区域，如果知识单纯更新了内容区域，用户刷新页面后又回到了个人信息

### css常用布局属性
* float
* position

### 盒模型
1. w3c标准盒模型(box-sizing: content-box)
2. ie盒模型(box-sizing: border-box)

content: 内容 

border: 边框

margin: 外边距

padding: 内边距

### position
1. static。默认值。
2. absolute。绝对定位，相对于`static`以外的第一个祖先元素进行定位，如果没有就相对于浏览器窗口进行定位。
3. relative。相对定位，相对于自身所应在文档流中存在的位置进行定位。
4. fixed。绝对定位，相对于浏览器窗口进行定位。
5. inherit。从父元素继承position的值。

### display
1.block
2.inline-block
3.inline
4.table
5.table-cell
6.flex
7.inherit
 
### sticky效果
fixed和relative的综合
### flex布局
弹性布局，使用了`display: flex`之后，`float`,`clear`, `vertical-align`属性会失效。Ie9及以下不支持该属性

### 面向对象概念
面向对象的语言有一个标志，即拥有类的概念，抽象实例对象的公共属性与方法，基于类可以创建任意多个实例对象，一般具有封装、继承、多态的特性！

### html语义化

内联元素里不能嵌入块级元素，p里面不能嵌入div,因为不符合w3c标准