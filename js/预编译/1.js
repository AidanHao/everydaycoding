var a = 1
function foo(a){
    a=2
    function a(){}
        var b = a
        console.log(a)

}
foo(3)
// foo()
//     function foo(){
//      console.log(a)  
//      var a =123  
//      }