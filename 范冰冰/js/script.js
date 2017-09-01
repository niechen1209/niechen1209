// JavaScript Document

/*获取class名的方法*/
function getClass(oParent,name){
	/*
	   第一个参数代表从哪个父级下获取节点;
	   第二个参数代表class名
	*/
	var oAl=oParent.getElementsByTagName('*');
	var result=[]; //因为return一次只能返回一个值，所以我们要建一个数组，最后返回整个数组
	for(var i=0;i<oAl.length;i++){
		if(oAl[i].className===name){
			 result.push(oAl[i]);
		}
	}
	return result;
};

/*css函数*/
function css(obj,name,value){ //arguments
	if(arguments.length===2){
		return obj.style[name];
	}else{
		return obj.style[name]=value;
	}
}

/*获取非行间样式方法*/
function getStyle(obj,value){
	if(obj.currentStyle){
		return obj.currentStyle[value];
	}else{
		return getComputedStyle(obj,'false')[value];
	}
}

/*事件绑定方法*/
function addEvent(obj,_event,fn){
       if(obj,attachEvent){
          return obj.attachEvent('on'+_event,fn)
       }else{
          return obj.addEventListener(_event,fn,false)           
       }
}
/*ajax_get封装*/
function ajax_get(url,fnSucc,fnFaild){
	//1.创建ajax对象
	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}
	//2.连接到服务器
	oAjax.open('GET',url,true);
	//3.发送请求
	oAjax.send();
	//4.接收返回
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){ //接收完成
			if(oAjax.status==200){  // 接收成功
				fnSucc(oAjax.responseText);
			}else{
				if(fnFaild){
					fnFaild(oAjax.status);
				}
			}
		}
	};
}


/*ajax_post封装*/
function ajaxPost(url,data, fnSucc, fnFaild)
{
	//1.创建ajax对象
	var oAjax=null;

	if(window.XMLHttpRequest)
	{
		oAjax=new XMLHttpRequest();
	}
	else
	{
		oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}

	//2.连接服务器
	//open(方法, url, 是否异步)
	oAjax.open('post', url, true);
	//get的数据参数在url里面


	//3.发送请求

	/*post方式的数据参数是单独提交的*/
	oAjax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
	/*请求头信息*/
	/*一般来说，向服务器发送POST请求由于解析机制的原因，需要进行特别的处理。因为POST请求和Web表单提交是不同的，需要使用XHR来模仿表单提交。
	 oAjax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');*/
	oAjax.send(data);


	//4.接收返回
	//OnReadyStateChange
	oAjax.onreadystatechange=function ()
	{
		if(oAjax.readyState==4)/*数据响应完成*/
		{
			if(oAjax.status==200)/*响应完成以后，返回了咱们想要的结果*/
			{
				//alert('成功：'+oAjax.responseText);
				fnSucc(oAjax.responseText);
			}
			else/*没有返回了咱们想要的结果*/
			{
				if(fnFaild)
				{
					fnFaild(oAjax.status);
				}
			}
		}
	};
}



           /*完整版封装 */
               
        function ajax(method,url,data,success){
            /*try{
                var oAjax=new XMLHttpRequest()
                /!*XML:语法格式（html）。。
                HTTP:无状态网络通信协议
                Request：为网络通讯提供异步支持
                url：访问网络的方式*!/
            }catch(){

            }*/
            if(window.XMLHttpRequest){
                var oAjax=new XMLHttpRequest()
            }else{
                var oAjax=new ActiveXObject('Microsoft.XMLTTP');
            };
            /*连接到服务器*/
            if(method=='get'){
                url+='?'+data+'&t='+new Date().getTime();
            }
            oAjax.open(method,url,true);
//                get:www.baidu.com?a=b&b=12;
//            post:send('a=b&b=12')
            /*发送请求*/
            if(method=='get'){
            	oAjax.send();
            }else{
                /*设置请求头信息(只能设置)*/
               oAjax.setRequestHeader('Content-type',
                'application/x-www-form-urlencoded');
                oAjax.send(data);
            }
            /*接收返回*/
          oAjax.onreadystatechange=function(){
                if(oAjax.readyState==4){
                    if(oAjax.status==200){
                        success&success(oAjax.responseText);
                    }else{
                        alert('错误Err'+oAjax.status);
                    }
                }
            }
        }
