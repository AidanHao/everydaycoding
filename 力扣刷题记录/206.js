/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    var num = []
    while(head!=null){
        num.push(head.val)
        head = head.next
    }
    var result = new ListNode()
    var he = result
    for(var i = num.length-1;i>=0;i--)
    {
        result.next = new ListNode()
        result = result.next
        result.val = num[i]
    }
    return he.next
};