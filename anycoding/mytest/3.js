let arr = ['1.2','1.34','1.4','3.3.3.3.3.3','6.2']
arr.sort((a,b)=>{
const aArr = a.split('.').map((nums)=>{parseInt(nums)})
const bArr = b.split('.').map((nums)=>{parseInt(nums)})
let length = Math.max(aArr.length, bArr.length)
for(let i = 0;i<length;i++)
{
    aNum = aArr[i] || 0
    bNum = bArr[i] || 0
    if(aNum > bNum){
        return -1
    }
    if(aNum < bNum){
        return 1
    }
}
return 0
})
console.log(arr);