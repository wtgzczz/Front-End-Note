/*一、直接调用*/
var x = 1; 
function a(){
  console.log(this.x); 	//window
};
a();

/*二、作为对象的方法调用*/
var a = {  
   name:'tong',
   b:function(){
       console.log(this.name);
     }
};
a.b();

function c(){
 console.log(this);
}
a.c =c;
a.c();

/*三、构造函数调用*/
function A(){
  this.name = 'tong'
  this.b = function(){}
}

var a = new A();
a.b();
a.name; 

/*四、call apply调用*/
var obj = {
  name:'tong'
};
function a(){
  console.log(this.name);   
};
a.call(obj);

 /*五、作为闭包this指向window*/
var obj = {
	name:'tong',
	b:function(){
		(function c(){
			console.log(this);
		})();
	}
}
obj.b();
