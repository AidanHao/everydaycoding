// 1,234,567.891,234,5  国外标准货币表达方式
function formatNumberWithCommas(number) {
    if (typeof num !== 'number') {
        return
    }
    // 类型转换
    number += ""
    // 切割为整数部分和小数部分
    let [interger, decimal] = number.split(".")

    // 封装内置函数 负责加入千分位 复用，整数部分和小数部分都要千分位
    const doSplit = (num, isInterger = true) => {
        if (num === '') {
            return ''
        }
        if (isInterger) num = num.split('').reverse()
        let str = []
        for (let i = 0; i < num.length; i++) {
            if (i !== 0 && i % 3 == 0) {
                str.push(',')
            }
            str.push(num[i])
        }
        if(isInterger) return str.reverse().join('')
        return str.join('')
    }
    interger = doSplit(interger)
    decimal = doSplit(decimal, false)
    return interger + (decimal ===''?'':'.'+decimal)


}