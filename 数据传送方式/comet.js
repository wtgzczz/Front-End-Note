var getXmlHttpRequest = function(){
	if(window.XMLHttpRequest){
		return new XMLHttpRequest();
	}else if(window.ActiveXObject){
		return new ActiveXObject("Microsoft.XMLHTTP");
	}
};
var xhr = getXmlHttpRequest();
xhr.onreadystatechange = function(){
	/*3表示收到部分响应数据*/
	if(xhr.readyState === 3 && xhr.status == 200){
		console.log(xhr.responseTest);
	}
};
xhr.open("get","data.php",true);
xhr.send(null);
