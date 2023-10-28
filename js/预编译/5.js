// GO{
//     global:undefined,100
//     fn:function
// }

global = 100
function fn(){
    console.log(global)//undefined
    global = 200
    console.log(global)//200
    var global =300
}
// AO:{
//     global:undefined 200 300
// }
fn()
var global