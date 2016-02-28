/**
 * Created by wtgzczz on 2016/2/28.
 */
/*技巧*/
    /*for循环*/
var arr = [1,2,1];
for(var i = arr.length;i--;){
    console.log(i);
}
    /*回调*/
var arr = [{},{},{},{}];
var arr2 = [];
function hide(ele){
    ele['name']= 'tong';
}
function findNodes(callback){
    for(var i = 0;i<arr.length;i++){
        if(callback){
            callback(arr[i]);
        }
        arr2.push(arr[i]);
    }
    console.log(arr);
    console.log(arr2);
}
findNodes(hide);

    /*私有静态成员 在构造函数内返回一个闭包函数*/
var Gadget = (function() {
    var count = 0, //这是私有静态成员
        newGadget = function(name) {
            count++;
            this.name = name;
        };
    newGadget.prototype.getCount = function() {
        return count;
    }; //通过这个特权方法访问count
    return newGadget;
}());
var gadget = new Gadget();
gadget.getCount();//1

function Gadget(name) {
    this.name = name;
    this._addCount();
}
Gadget.prototype = (function(){
    var count = 0;
    return {
        getCount: function() {
            return count;
        },
        _addCount: function() {
            count ++;
        }
    };
}());
var gadget = new Gadget();
gadget._addCount();
gadget.getCount(); //2

/*
 对一批异步任务使用一个计数器
 上一条提到“在前一个异步操作完成后才进行下一个”，固然确保了正确的顺序，
 但却放弃了并发操作的优势（例如，一次下载总是在前一次下载结束后开始，而不能多个下载同时进行）。
 为了确保一批异步操作的结果能按顺序全部呈现（注意：一批异步操作的完成的顺序无法控制，但是可以控
 制它们得到的结果的顺序。例如，同时发起5个下载，无法控制这五个下载谁先谁后结束，但我们可以把下载
 结果按顺序排列），需要以下两个技巧： 1. 任务放在一个数组里组成任务数组（以“进行5个并行下载”为
 例：把URL放在数组里组成任务数组），调用.forEach开始下载任务，结果保存在result数组内。可以根
 据.forEach方法传给函数的index参数，实现按顺序保存异步任务的结果。 2. 设置一个计数器变量，每
 个异步任务完成后计数器变量减一，计数器为0代表所有任务完成（每次异步任务都要检查这个变量）
*/

/*单例模式 构造出来的对象始终是同一个.
总结：想个办法把唯一一个实例（根据第一次调用构造函数时的参数创建的实例）保存起来（作为静态成员保
存或保存在闭包里）。之后无论调用几次，都返回它。*/
    /*将单例保存在静态属性中*/
function Universe(name){
    if (typeof Universe._instance === 'object') {
        return Universe._instance;
    }
    this.name = name;
    Universe._instance = this;
}

var Universe = (function(){
    var instance;
    function single(){
        if(instance){
            return instance;
        }else{
            this.name = name;
            instance = this;
        }
    }
    return single;
}());
Universe.prototype.xxx ='xxxx'  //设置公有属性或方法

    /*将单例的保存管理和构建对象的逻辑分开*/
function singleProxy(fn){
    var alreadyOnce;
    return function(name){
        return alreadyOnce || (alreadyOnce = new fn(name));
    }
}
/*工厂模式*/
/*总结：本例中子构造函数作为构造函数的静态方法保存，你也可以寻求别的实现
（例如：将工厂抽象成一个类，在工厂实例上调用.create()方法来构造对象。
该方法根据参数来调用其它构造函数）。调用构造函数时，根据传入的参数调用
指定的子构造函数。其中，子构造函数继承自构造函数。

使用场合：需要使用同一接口构造不同类型的对象。这些不同类对象之间的差异较
小，可以通过继承来进行代码复用。普遍性的功能放在父类构造函数中，特殊的功能放在子类构造函数中。*/
function CarMaker(){};
CarMaker.prototype.drive = function(){
    return 'I have'+ this.doors + 'doors';
};
CarMaker.factory = function(type){
    var newcar;
    if(typeof CarMaker[type] !=='function'){
        throw Error('不存在这个工厂函数.');
    }
    if(typeof CarMaker[type].prototype.driver !== 'function'){
        CarMaker[type].prototype = new CarMaker();
    }
    newcar = new CarMaker[type]();
    return newcar;
};
CarMaker.smallCar = function(){
    this.doors = 4;
};
CarMaker.bigCar = function(){
    this.doors = 8;
};
var suv = carMaker.factory('bigCar');
suv.drive(); //8
