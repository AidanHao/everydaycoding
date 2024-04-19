function convertMillisToDate(millis) {
    const date = new Date(millis);
  
    // 月份需要加1，因为JavaScript中月份是从0开始计数的
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
  
    return `${year}-${month}-${day}`;
  }
  
  // 辅助函数，用于补足零位
  function padZero(value) {
    return value < 10 ? `0${value}` : String(value);
  }

  export default convertMillisToDate