/*






*/

function getClass(classname,obj){ 
    var obj=obj||document;//如果范围是定义的就用定义的值，如果没有写定义的就是默认的document
  	if(obj.getElementsByClassName){
      //如果识别getElementsByClassName(返回的带有clss类名这个条件)
  		//
  		  /*console.log("支持");*///控制台输出支持
  		  return obj.getElementsByClassName(classname);
        //返回固定范围.getElementByClassName(输入的指定类名(上面的那个第一个形参))
  	}else{
  		var arr=[];//创建一个空数组
      /*console.log("不支持")*/
  		var alls=obj.getElementsByTagName("*");//定义一个变量=固定范围.getElementsByTagName（“*代表所有的标签”）
  		for(var i=0;i<alls.length;i++){//遍历这个变量下的所有找到的标签
  			if(check(alls[i].className,classname)){
          //利用这个函数判断(标签下的类名，输入要找到的类名)
  				arr.push(alls[i]);//利用push将符合条件的类名放在那个定义的空数组下
  			}
  		}
  		return arr;//返回这个定义的数组
  	}
  }


   function check(newclass,oldclass){//建立一个选择的函数
      var flag=false;
      //建立一个开关
      var name=newclass.split(" ");//利用split将第一个形参的字符串转化成数组
       for(var i=0;i<name.length;i++){//遍历这个数组
        if(name[i]==oldclass){//判断这个数组是否和你要的数组相等
            flag=true;//把开关标记为true
        }
       }
       return flag;//返回这个flag
   }




   //兼容获取文本

   function getText(obj,val){
    //"" || underfind
    if(val==undefined){
        if(typeof obj.textContent=="string"){  
        /* console.log("ie9-11.c,f");*/
          return obj.textContent;
        
        }else{
         /* console.log("ie6-8.c");*/
          return obj.innerText;
      }
   }else{
         if(typeof obj.textContent=="string"){
         
           obj.textContent=val;
         
        }else{ 
         
          obj.innerText=val;
       }


      }
   }
  


   //行内样式和外部样式通用的获取方法

   function getStyle(obj,attr){
       if(!obj.currentStyle){
          /*console.log("ie9-11");*/
          return getComputedStyle(obj,null)[attr];
       }else{ 
          /*console.log("ie6-11");*/
          return  obj.currentStyle[attr];
       }

   }


    //简化获取代码
    function $(selector,obj){
        if(typeof selector=="string"){
          var obj=obj||document;
          if(selector.charAt(0)=="."){
            return getClass(selector.substring(1),obj);
          }else if(selector.charAt(0)=="#"){
            return document.getElementById(selector.substring(1));
          }else if(/^[a-z][a-z1-6]{0,9}$/g.test(selector)){
            return obj.getElementsByTagName(selector);
          }else if(/^<[a-z][a-z1-6]{0,9}>$/.test(selector)){
          return document.createElement(selector.slice(1,-1));
           }               
        }else if(typeof selector=="function"){
          window.onload=function(){
             selector();
          }
        }


    }


    //获取所有子节点
    function getChild(parent,tt){
         var childs=parent.childNodes;
         var arr=[];
         var tt=tt||false;
         if(tt==true){

             for(var i=0;i<childs.length;i++){
             if(childs[i].nodeType==1||(childs[i].nodeType==3&&childs[i].nodeValue.replace(/^\s+|\s+$/g,"")!="")){
                arr.push(childs[i]);
               }
             }
 

         }else if(tt==false){
              for(var i=0;i<childs.length;i++){
               if(childs[i].nodeType==1){
                arr.push(childs[i]);
               }
              }
         }
         return arr;
    }
   

   //获取第一个子节点和最后一个子节点

   function getFirst(obj,aa){
     return getChild(obj,aa)[0];
   }


   function getLast(obj,aa){
    var allChild=getChild(obj,aa);
    return allChild[allChild.length-1];
   }

//获取任意一个子节点

  function getNum(obj,num){
    return getNum=getChild(obj)[num];
  } 

//获取下一个子节点

 
 function  getNext(objs){

    var next=objs.nextSibling;
    if(next==null){
      return false;
    }
    while(next.nodeType==8||(next.nodeType==3&&next.nodeValue.replace(/^\s+|\s+$/g,"")=="")){
       next=next.nextSibling;
       if(next==null){
         return false; 
       }
    }
    return next;
 }

 //获取上一个子节点

   function getPre(objs){
    var pre=objs.previousSibling;
    if(pre==null){
      return false;
    }
    while(pre.nodeType==8||(pre.nodeType==3&&pre.nodeValue.replace(/^\s+|\s+$/g,"")=="")){
       pre=pre.previousSibling;
       if(pre==null){
         return false; 
       }
    }
    return pre;
 }

 //插入到之前、
/*  
  obj1：要插入的对象
  obj2：之前的对象

*/

function insertBefore(obj1,obj2){
   var parentNode=obj2.parentNode;
   parentNode.insertBefore(obj1,obj2);
}

//插入到之后

/*
 obj1:要插入的对象
 obj2:之后的对象


*/

function insertAfter(obj1,obj2){
    var next=obj2.nextSibling;
    insertBefore(obj1,next);
 

}