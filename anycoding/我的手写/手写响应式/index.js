let effct = null;
 function reactive(obj) {
    let effcts = {};
    return new Proxy(obj, {
        get(target, key){
            console.log('依赖收集');
            if(effct){
                if(!effcts[key]){
                    effcts[key] = [];
                }
                effcts[key].push(effct);
            }
            effcts.key?.push(effct)
            return target[key];
        },
        set(target, key, val){
            target[key] = val;
            if(effcts[key].length){
                effcts[key].forEach(fn => fn())
            }

            return true;
        }
    })
};

function useEffect(fn) {
    effct = fn;
    fn()
    effct = null;
}