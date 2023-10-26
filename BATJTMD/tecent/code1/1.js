// console.log('hello,world!!!')
/**
 * @func 返回固定格式的电话号码 (123)456-7890 功能
 * @params array[1,2,3,4,5,6,7,8,9,0] 参数
 * @return (123)456-7890
 * @author JSsolder-路修远i
 */
//函数定义
// function phoneNumber(numbers){
//     return "(" + numbers[0] + numbers[1] + numbers[2]
//       + ")" + " " + numbers[3] + numbers[4] + numbers[5] 
//       + "-" + numbers[6] + numbers[7] + numbers[8] + numbers[9] + ""
// }
//es6
//箭头函数
//如果下面函数表达式只有一条代码可以去掉{}
// phoneNumber=(numbers)=>{
//         return "(" + numbers[0] + numbers[1] + numbers[2]
//      + ")" + " " + numbers[3] + numbers[4] + numbers[5] 
//      + "-" + numbers[6] + numbers[7] + numbers[8] + numbers[9] + ""
//     }

phoneNumber = (numbers) => `(${numbers[0]}${numbers[1]}${numbers[2]}) ${numbers[3]}${numbers[4]}${numbers[5]}-${numbers[6]}${numbers[7]}${numbers[8]}${numbers[9]}`
console.log(phoneNumber([1,2,3,4,5,6,7,8,9,0]));
    //对象 函数也是对象 js除了基本数据类型其余全是对象，日期等等等
    //变量的类型由值来决定
    // const phoneNumbers 
    // let phoneNumber;//弱类型 undefined类型未定义 null 值为空
    //函数定义----------------------------------------------------------------------------
    // function phoneNumber(numbers)
    //函数表达式----------------------------------------------------------------------
    //简版的函数 箭头函数 两种方式 es5老版本 es6简版 少写一个function，因此现在基本用es6版本
    // phoneNumber=(numbers)=>{如果下面函数表达式只有一条代码可以去掉{}
    //     return "(" + numbers[0] + numbers[1] + numbers[2]
    //  + ")" + " " + numbers[3] + numbers[4] + numbers[5] 
    //  + "-" + numbers[6] + numbers[7] + numbers[8] + numbers[9] + ""
    // }
    //字符串模板不适合换行
    // phoneNumber = (numbers) => `(${numbers[0]}${numbers[1]}${numbers[2]}) ${numbers[3]}${numbers[4]}${numbers[5]}-${numbers[6]}${numbers[7]}${numbers[8]}${numbers[9]}`
    
    //     phoneNumber=(numbers)=>{//如果下面函数表达式只有一条代码可以去掉{},使用字符串拼接，可以换行，保证可读性
//         return "(" + numbers[0] + numbers[1] + numbers[2]
//      + ")" + " " + numbers[3] + numbers[4] + numbers[5] 
//      + "-" + numbers[6] + numbers[7] + numbers[8] + numbers[9] + ""
//     }
   

// console.log(phoneNumber([1,2,3,4,5,6,7,8,9,0]));
















 // var str =''
    // for(var i = 0;i<13;i++){
    //     if(i==0)
    //     {
    //         str +='('
    //     }else
    //     if(i==4)
    //     {
    //         str +=')'
    //     }else
    //     if(i>=1&&i<=3)
    //     {
    //         str +=i
    //     }else if(i==8)
    // {
    //     str +='-'
    // }
    //     else{
    //     str+=Math.ceil(Math.random()*10); 
    //     }
    // }
    //     console.log(str)

    // return str