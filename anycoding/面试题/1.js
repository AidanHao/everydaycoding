var person = {
    "name": "小明",
    "info": {
        "age": "18",
        "address": {
            "country": "中国",
            "province": "广东",
        }
    }
}

//   输出：
//   name = 小明
//   info.age = 18
//   info.address.country = 中国
//   info.address.province = 广东

function findkey(person,father=''){
    for(let key in person){
        if(person.hasOwnProperty(key)){
            let nowPath = ''
            if(father == ''){
                 nowPath = key
            }else{
                nowPath = father+'.'+ key
            }
            
            if(typeof person[key] === 'object' && person[key]!==null){
                findkey(person[key],father=nowPath);
            }else{
                console.log(`${nowPath} = ${person[key]}`);
            }
        }
    }
}
findkey(person)