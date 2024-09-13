class MyPromise{
    static all(promises){
        return new MyPromise((resolve, reject) => {
            let count = 0;
            let result = [];
            for(let i = 0;i < promises.length; i++){
                promises[i].then((value) => {
                    count ++
                    result.push(value);
                    if(count === promises.length){
                        resolve(result)
                    }
                }).catch((err) => {
                    reject(err);
                })
            }
        })
    }
}