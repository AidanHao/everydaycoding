let num = 1234566334565445
function to(num){
    num = num.toString()
    let result = ''
    let jud = 0
    for(let i = num.length-1;i>=0;i--){
        jud++
        result =num[i] + result
        if(jud == 3&&i!=0){
            result = ','+result
            jud = 0
        }
    }
    return result
}
console.log(to(num));