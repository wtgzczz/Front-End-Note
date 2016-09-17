var source;
function init(argument){
	source = new EventSource('http://localhost/sse/data.php');
	source.onopen = function(){
		console.log("链接已经建立",this.readyState);
	}
	source.onmessage = function(event){
		console.log("从服务器实时获取数据",event.data);
	}
	source.onerror = function(){}
}
init();
