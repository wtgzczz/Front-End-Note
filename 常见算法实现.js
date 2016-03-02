/*算法总结*/
/*--------------------------------------------------------------------------------------------------------------------------------------*/

/*数组*/
var arr = [1,2,3,4,5,6,7,8,9,10];
arr.shift();
arr.splice(0,1,'sss',111);   //splice要改变原来数组
arr.slice(0,7);    //slice不改变原来数组

/*数组  自定义排序*/
var friends =[
	{name:'tong',age:30},
	{name:'mt',age:20},
	{name:'ss',age:25}
];
function compareAge(a,b){
	return a.age-b.age;
}
friends.sort(compareAge);

arr.indexOf(9);
arr.lastIndexOf(9);

arr.toString();
arr.join();

/*栈*/
function Stack(){
	var items = [];
	this.push = function(ele){
		items.push(ele);
	};
	this.pop = function(){
		return items.pop();
	};
	this.peek = function(){
		return items[items.length-1];
	};
	this.isEmpty = function(){
		return items.length === 0;
	};
	this.size = function(){
		return items.length;
	};
	this.clear = function(){
		items = [];
	};
	this.print = function(){
		console.log(items.toString());
	}
}
var stack = new Stack();
stack.isEmpty();

/*队列*/
function Queue(){
	var items = [];
	this.enqueue = function(ele){
		items.push(ele);
	};
	this.dequeue = function(){
		return items.shift();
	};
	this.front = function(){
		return items[0];
	};
	this.isEmpty = function(){
		return items.length === 0;
	};
	this.clear = function(){
        items = [];
    };
    this.size = function(){
        return items.length;
    }
    this.print = function(){
        console.log(items.toString());
    };
}
var queue = new Queue();
queue.enqueue("John");
queue.enqueue("Jack");
queue.enqueue("Camila");
queue.print();
console.log(queue.size()); //输出3
console.log(queue.isEmpty()); //输出false
queue.dequeue();
queue.dequeue();
queue.print();

/*优先级队列*/
function PriorityQueue(){
	var items = [];
	function Element(ele,priority){
		this.ele = ele;
		this.priority = priority;
	};
	this.isEmpty = function(){
		return items.length === 0;
	};
	this.print = function(){
        console.log(items);
    };
	this.enqueue = function(ele,priority){
		var ele = new Element(ele,priority);
		if(this.isEmpty()){
			items.push(ele);
		}else{
			var added = false;
			for(var i=0;i<items.length;i++){
				if(ele.priority<items[i].priority){
					items.splice(i,0,ele);
					added = true;
					break;
				}
			}
			if(!added){
				items.push(ele);
			}
		}
	}
}
var priorityQueue = new PriorityQueue();
priorityQueue.enqueue('ton',2);
priorityQueue.enqueue('xx',4);
priorityQueue.enqueue('tt',1);
priorityQueue.print();

/*链表*/
function linkedList(){
	var Node = function(ele){
		this.ele = ele;
		this.next = null;
	}
	var length = 0,
		head = null;
		
		this.append = function(ele){
			var node = new Node(ele);
			var current;
			if(head == null){
				head = node;
			}else{
				current = head;
				while(current.next){
					current = current.next;
				}
				current.next = node;
			}
			length++;
			
		}
		this.removeAt = function(position){
			if(position >-1 && position <length){
				var current = head,
					previous,
					index = 0;
					if(position === 0){
						head = current.next;
					}else{
						while(index++ < position){
							previous = current;
							current = current.next;
						}
						
					}
			}else{
				return null;
			}
		}
}
var list = new linkedList();
list.append(15);
list.append(10);

/*集合*/
function Set(){
	var items = {};
	this.has = function(value){
		return items.hasOwnProperty(value);
	};
	this.add = function(value){
		if(!this.has(value)){
			items[value]=value;
			return true;
		}
		return false;
	};
	this.remove = function(value){
		if(this.has(value)){
			delete items[value];
			return true;
		}
		return false;
	};
	this.clear = function(){
		items = {};
	};
	this.size = function(){
		var count = 0;
		for(var prop in items){
			if(items.hasOwnProperty(prop)){
				count++;
			}
		}
		return count;
	};
	this.keys = function(){
		var keys =[];
		for(key in items){
			if(items.hasOwnProperty(key)){
				keys.push(key);
			}
		}
		return keys;
	};
	this.union = function(otherSet){
		var unionSet = new Set();
		
		var values = this.values();
		for(var i =0;i<values.length;i++){
			unionSet.add(values[i]);
		}
		values = otherSet.values();
		for(var i =0;i<values.length;i++){
			unionSet.add(values[i]);
		}
		return unionSet;
	}
}
var set = new Set();
set.add(1);
set.add(2);
set.add(1);
console.log(set.values()); //输出["1"]
console.log(set.has(1)); //输出true
console.log(set.size()); //输出1

set.add(2);
console.log(set.values()); //输出["1", "2"]
console.log(set.has(2)); //true
console.log(set.size()); //2

set.remove(1);
console.log(set.values()); //输出["2"]

set.remove(2);
console.log(set.values()); //输出[]

/*排序算法 快速排序*/
function quickSort(arr){
	/*跳出递归的条件*/
	if(arr.length<=1){
		return arr;
	}
	var num = Math.floor(arr.length/2);
	var numValue = arr.splice(num,1);//取中间值
	var left = [];
	var right = [];
	                                 
	for(var i = 0;i<arr.length;i++){
		if(arr[i]<numValue){
			left.push(arr[i]);      //挨个挨个取左边数组
		}else{
			right.push(arr[i]);     //挨个挨个取右边数组
		}
	}
	var leftArr = quickSort(left);
	var rightArr = quickSort(right);
	var midNum = [numValue];
	return leftArr.concat(midNum,rightArr);   //函数返回值是个数组
};
/*冒泡排序*/
function bubblSort(arr){
	var swap = function(index1,index2){     //通过位置下标交换值
		var mid = arr[index1];
		arr[index1] = arr[index2];
		arr[index2] = mid;
	}
	for(var i = 0,len = arr.length;i < len;i++){  
		for(var j = 0;j < len-1-i;j++){      
			if(arr[j]>arr[j+1]){       //把大的数放到数组尾
				swap(j,j+1);
			}
		}
	}
	return arr;   //返回数组
}
/*选择排序 范围从整个数组逐次缩小，将第一个数假设为最小，依次和后面比对，将最小的数和此数交换*/
function selectionSort(arr){
	var swap = function(index1,index2){     //通过位置下标交换值
		var mid = arr[index1];
		arr[index1] = arr[index2];
		arr[index2] = mid;
	};
	var length = arr.length,
		indexmin;
		for(var i=0;i<length-1;i++){
			indexmin = i;
			for(var j = i;j<length;j++){
				if(arr[indexmin]>arr[j]){
					indexmin = j;
				}
			}
			if(i !== indexmin){
				swap(i,indexmin);
			}
		}
}
/*插入排序 把前面的数看作已排好的数，将后面的数挨个与比对，将最小的插入到最前面*/
function insertionSort(arr){
	var length = arr.length,
		j,temp;
		for(var i =1;i<length;i++){
			j = i;
			temp = arr[i];
			while(j>0 && arr[j-1] > temp){
				arr[j] = arr[j-1];
				j--;
			}
			arr[j] = temp;
		}    
}
