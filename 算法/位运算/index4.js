// const num = 5 // 0000000000000000000000000000101
// const res = ~num
// console.log(res);

// let n = -6 //6:110


// 没有敲全
// 00000110
// 11111001 + 1
// 11111010 -6 二进制的补码 在补码当中最高位表示符号位 0为正数 1为负数  其余位表示的是数据的绝对值
// 1111010 这就是 -6d 的二进制位

function reverseBit(str){
    const n = parseInt(str,2)
    return ~n
}

const binaryStr = '00001101'
const reverseStr = reverseBit(binaryStr)
console.log(reverseStr);
