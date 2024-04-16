let str = 'bbeeae'
let obj = {}
let max = 0
for(let i = 0;i<str.length;i++){
    if(!obj[str[i]]){
        obj[str[i]] = 1
    }
    if(str[i]=='a'&&(obj['e']||obj['c'])){
        str = str.slice(i,1) 
        obj[str[i]] =null
        i--
    }else
    if(str[i]=='c'&&obj['e']){
        str = str.slice(i,1) 
        obj[str[i]] =null
        i--

    }else
    if(str[i]=='b'&&(obj['d']||obj['f']))
    {
        str = str.slice(i,1) 
        obj[str[i]] =null
        i--

    }else if(str[i]=='d'&&obj['f'])
    {
        str = str.slice(i,1) 
        obj[str[i]] =null
        i--

    }else
    {
        max = Math.max(max,i+1)
        console.log(max)
    }
}
max = Math.max(str.length,max)
console.log(max)
