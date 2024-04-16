//  数组 O(n) 增删元素
//  链表 O(1)

// 链表存在一个弊端，访问起来很麻烦，需要遍历


// 读取值
// 数组 O(1)
// 链表 O(n)

function ListNode(val){
    this.val = val;
    this.next = null
}

// const index = 10

// let node = new ListNode()

// for(let i = 0;i<index;i++){
//     node = node.next
//     node.next
// }

let list1 = new ListNode(1)
list1.next = new ListNode(2)
list1.next.next = new ListNode(4)
list1.next.next.next = new ListNode(4)


let list2 = new ListNode(1)
list2.next = new ListNode(3)
list2.next.next = new ListNode(4)

function link(list1,list2){
    let v1 = list1
    let v2 = list2
    if(v1==null){
        return v2
    }else if(v2 ==null)
    {
        return v1
    }else if(v1.val>=v2.val)
    {
        v2.next = link(v1,v2.next)
        return v2
    }else if(v1.val<v2.val){
        v1.next = link(v1.next,v2)
        return v1
    }
}
// console.log(JSON.stringify(link(list1,list2)));

function delsame(list1){
    let head = list1
    let v1 = list1
    while(v1!=null&&v1.next!=null)
    {
        if(v1.val == v1.next.val){
            v1.next = v1.next.next
        }else{
            v1 = v1.next
        }
    }
    return head
}
console.log(JSON.stringify(list1));

console.log(JSON.stringify(delsame(list1)));