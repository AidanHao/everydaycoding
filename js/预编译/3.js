function foo(a,b){
    console.log(a)
    c=0
    var c;
    a=3
    b= 2
    console.log(b)
    function b(){
    }
    function d(){}
    console.log(b)
}
foo(1)
// AO:{
//     a:undefined 1 3
//     b:undefined function b(){} 2
//     c:undefined 0
//     d:function d(){}
// }
// c:undefined 0;
// a:undefined 1 3;
// b: function 2;
// d:function