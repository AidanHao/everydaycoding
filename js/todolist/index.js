// 监听用户敲击Enter键
var input =document.getElementById('list-input')
var ul = document.getElementById('list')
var oldlength=0;
// onkeyup监听事件
// input.onkeyup=function(e){
//     // 三个等号表示同一种数据类型且相等
//     // 将input中的值添加到li中
//     if(e.keyCode === 13){
//     // 生成li结构
//     var todoList = `
//         <li>
//         <input type="checkbox" >
//         <span> ${input.value} </span>
//         </li>
        
//     ` 
//     // 将li添加到ul中
//     ul.insertAdjacentHTML('afterbegin',todoList)
//     }
    
    
// }
var todoItem = []
input.onkeyup=function(e){
    if(e.keyCode===13){
        if(input.value!=''){
            todoItem.push(input.value)
            makeList()
            input.value=''
        }
    }
}
function makeList(){
    //循环数组todoItem生成多份li结构,添加到ul中
    //for循环
    //todoItem.length
    //生成li
    for(i=oldlength;i<todoItem.length;i++){
        oldlength = todoItem.length
        console.log(todoItem[i].value)
        todoli=`
        <li>
                <input type="checkbox" id="checkbox" onclick="checkboxOnclick(this)">
                 <span> ${todoItem[i]} </span>
        </li>
        `
        ul.insertAdjacentHTML('afterbegin',todoli)
    }
}

 function checkboxOnclick(checkbox){
    if(checkbox.checked==true){
       checkbox.parentNode.style.color="grey"
       checkbox.parentNode.style.textDecoration="line-through"
    }else{
        checkbox.parentNode.style.color="black"
       checkbox.parentNode.style.textDecoration="none"
    }


}





