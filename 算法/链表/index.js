// let arr = [1, 2, 3, 4]; //数组是线性存储的，数组是序列化的数据结构,有序列表线性结构
// // 链表也是，数据存储是离散型的
// // 在链表里面每一个节点的都包含两个部分
// let res = {
//     value: 1,//数据域
//     next: { //指针域
//         value: 2,
//         next: {
//             value: 3,
//             next: {
//                 value: 4,
//                 next: null, 
//             },
//         },
//     },
// };

function ListNode(val){
    this.val = val;
    this.next = null
}

const node1 = new ListNode(1)
node1.next = new ListNode(2)
const node3 = new ListNode(3)
node3.next = node1.next
node1.next = node3
console.log(node1);
