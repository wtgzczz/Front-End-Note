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

/*二叉树*/

//广度优先遍历（非递归）
var levelOrderTraversal = function(node) {
	if(!node) {
		throw new Error('Empty Tree')
	}
	var que = []  //队列
	que.push(node)
	while(que.length !== 0) {
		node = que.shift()
		console.log(node.value)
		if(node.left) que.push(node.left)
		if(node.right) que.push(node.right)
	}
}

//深度优先遍历（递归）
//先序
var preOrder = function (node) {
	if (node) {
		console.log(node.value);
		preOrder(node.left);
		preOrder(node.right);
	}
}
//中序
var inOrder = function (node) {
	if (node) {
		inOrder(node.left);
		console.log(node.value);
		inOrder(node.right);
	}
//后序
	var postOrder = function (node) {
		if (node) {
			postOrder(node.left);
			postOrder(node.right);
			console.log(node.value);
		}
	}
//深度优先遍历（非递归）
var preOrderUnRecur = function(node) {
	if(!node) {
		throw new Error('Empty Tree')
	}
	var stack = []  //栈
	stack.push(node)
	while(stack.length !== 0) {
		node = stack.pop()
		console.log(node.value)
		if(node.right) stack.push(node.right)
		if(node.left) stack.push(node.left)
	}
}

/*排序算法 快速排序*/
/*
把一个数组以数组中的某个值为标记。比这个值小的放到数组的左边，比这个值得大的放到数组的右边。
然后再递归 对左边和右边的数组进行同样的操作。
*/
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
/*
排序数组：var a = [9,8,7,6,5,4,3,2,1,0];
排序过程：
[8, 7, 6, 5, 4, 3, 2, 1, 0,  9]
[7, 6, 5, 4, 3, 2, 1, 0,  8, 9]
[6, 5, 4, 3, 2, 1, 0,  7, 8, 9]
[5, 4, 3, 2, 1, 0,  6, 7, 8, 9]
[4, 3, 2, 1, 0,  5, 6, 7, 8, 9]
[3, 2, 1, 0,  4, 5, 6, 7, 8, 9]
[2, 1, 0,  3, 4, 5, 6, 7, 8, 9]
[1, 0,  2, 3, 4, 5, 6, 7, 8, 9]
[0,  1, 2, 3, 4, 5, 6, 7, 8, 9]
*/

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
/*
左边为有序数组，右边为无序数组
排序过程：
[0,    8, 7, 6, 5, 4, 3, 2, 1, 9]
[0, 1,    7, 6, 5, 4, 3, 2, 8, 9]
[0, 1, 2,    6, 5, 4, 3, 7, 8, 9]
[0, 1, 2, 3,    5, 4, 6, 7, 8, 9]
[0, 1, 2, 3, 4,    5, 6, 7, 8, 9]
[0, 1, 2, 3, 4, 5,    6, 7, 8, 9]
[0, 1, 2, 3, 4, 5, 6,    7, 8, 9]
[0, 1, 2, 3, 4, 5, 6, 7,    8, 9]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
*/


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
/*
左边为有序数组，右边为无序数组。每一轮排序都将无序数组的第一位与有序数组中的值对比，插入到有序数组中合适的位置。
排序过程：
[8, 9,    7, 6, 5, 4, 3, 2, 1, 0]
[7, 8, 9,    6, 5, 4, 3, 2, 1, 0]
[6, 7, 8, 9,    5, 4, 3, 2, 1, 0]
[5, 6, 7, 8, 9,    4, 3, 2, 1, 0]
[4, 5, 6, 7, 8, 9,    3, 2, 1, 0]
[3, 4, 5, 6, 7, 8, 9,    2, 1, 0]
[2, 3, 4, 5, 6, 7, 8, 9,    1, 0]
[1, 2, 3, 4, 5, 6, 7, 8, 9,    0]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
*/

/*归并排序
把一系列排好序的子序列合并成一个大的完整有序序列。
从最小的单位开始合并。然后再逐步合并合并好的有序数组。最终实现归并排序。 
*/
function mergeSort(arr){  
    var len= arr.length,arrleft=[],arrright =[],gap=1,maxgap=len-1,gapArr=[],glen,n=0;  
    while(gap<maxgap){  
        gap = Math.pow(2,n);  
        if(gap<=maxgap){  
            gapArr.push(gap);  
        }  
        n++;  
    }  
    glen = gapArr.length;  
    for (var i = 0; i < glen; i++) {  
        gap = gapArr[i];  
        for (var j = 0; j < len; j=j+gap*2) {  
            arrleft = arr.slice(j, j+gap);  
            arrright = arr.slice(j+gap,j+gap*2);  
            console.log("left:"+arrleft,"right:"+arrright);  
            arr = arr.slice(0,j).concat(subSort(arrleft,arrright),arr.slice(j+gap*2));  
        }  
    }  
    return arr;  
}  
function subSort(arr1,arr2){  
  
    var len1 = arr1.length,len2 = arr2.length,i=0,j=0,arr3=[],bArr1 = arr1.slice(),bArr2 = arr2.slice();  
  
    while(bArr1.length!=0 || bArr2.length!=0){  
        if(bArr1.length == 0){  
            arr3 = arr3.concat(bArr2);  
            bArr2.length = 0;  
        }else if(bArr2.length == 0){  
            arr3 = arr3.concat(bArr1);  
            bArr1.length = 0;  
        }else{  
            if(bArr1[0]<=bArr2[0]){  
                arr3.push(bArr1[0]);  
                bArr1.shift();  
            }else{  
                arr3.push(bArr2[0]);  
                bArr2.shift();  
            }  
        }  
    }  
    return arr3;  
}  

/*
排序[4,2,6,3,1,9,5,7,8,0]

第一轮先依次合并相邻元素：4,2;  6,3; 1,9; 5,7; 8,0

合并完成之后变成： [2,4,3,6,1,9,5,7,0,8]

第二轮以2个元素为一个单位进行合并：[2,4],[3,6];    [1,9],[5,7];    [0,8],[];

合并完成之后变成：[2,3,4,6,1,5,7,9,0,8]

第三轮以4个元素为一个单位进行合并：[2,3,4,6],[1,5,7,9];  [0,8],[]

合并完成之后变成： [1,2,3,4,5,6,7,9,0,8];

第四轮以8个元素为一个单位进行合并： [1,2,3,4,5,6,7,9],[0,8];

合并完成。 [0,1,2,3,4,5,6,7,8,9];
*/

/*希尔排序
*/
function shellsort(arr){  
    var i,k,j,len=arr.length,gap = Math.ceil(len/2),temp;  
    while(gap>0){  
        for (var k = 0; k < gap; k++) {  
            var tagArr = [];  
            tagArr.push(arr[k])  
            for (i = k+gap; i < len; i=i+gap) {                
                temp = arr[i];  
                tagArr.push(temp);  
                for (j=i-gap; j >-1; j=j-gap) {  
                    if(arr[j]>temp){  
                        arr[j+gap] = arr[j];  
                    }else{  
                        break;  
                    }  
                }  
                arr[j+gap] = temp;  
            }  
            console.log(tagArr,"gap:"+gap);//输出当前进行插入排序的数组。  
            console.log(arr);//输出此轮排序后的数组。  
        }  
        gap = parseInt(gap/2);  
    }  
    return arr;  
}

/*
过程输出：
[4, 9] "gap:5"  
[4, 2, 6, 3, 1, 9, 5, 7, 8, 0]  
[2, 5] "gap:5"  
[4, 2, 6, 3, 1, 9, 5, 7, 8, 0]  
[6, 7] "gap:5"  
[4, 2, 6, 3, 1, 9, 5, 7, 8, 0]  
[3, 8] "gap:5"  
[4, 2, 6, 3, 1, 9, 5, 7, 8, 0]  
[1, 0] "gap:5"  
[4, 2, 6, 3, 0, 9, 5, 7, 8, 1]  
[4, 6, 0, 5, 8] "gap:2"  
[0, 2, 4, 3, 5, 9, 6, 7, 8, 1]  
[2, 3, 9, 7, 1] "gap:2"  
[0, 1, 4, 2, 5, 3, 6, 7, 8, 9]  
[0, 1, 4, 2, 5, 3, 6, 7, 8, 9] "gap:1"  
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]  

由输出可以看到。第一轮间隔为5。
间隔为5：
[4, 2, 6, 3, 1, 9, 5, 7, 8, 0]  
 4              9  
    2              5  
       6              7  
          3              8  
             1              0  
             
排序后为：[4, 2, 6, 3, 0, 9, 5, 7, 8, 1]

间隔为2：
[4, 2, 6, 3, 0, 9, 5, 7, 8, 1]  
 4     6     0     5     8  
    2     3     9     7     1  
    
排序后：
[0, 1, 4, 2, 5, 3, 6, 7, 8, 9]  

间隔为1：
排序后：
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
*/
