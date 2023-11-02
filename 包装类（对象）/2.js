let obj = {
    name:'丁总',
    age:18,

}
// obj.girlFriend = '翠花'
let girl = '小红'
obj[girl] = '小红'
obj['girl'] = 'girl'
delete obj.girl
console.log(obj)