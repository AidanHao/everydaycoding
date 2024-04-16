/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} x
 * @return {ListNode}
 */
var partition = function(head, x) {
    var num1 = []
    var num2 = []
    var def = head
    while(def!=null)
    {
        if(def.val<x)
        {
            num1.push(def.val)
        }
        else{
            num2.push(def.val)
        }
        def = def.next
    }
    var result = new ListNode()
    var he = result
    for(var i =0;i<num1.length;i++)
    {
        result.next = new ListNode()
        result = result.next
        result.val = num1[i]
    }
    for(var i =0;i<num2.length;i++)
    {
        result.next = new ListNode()
        result = result.next
        result.val = num2[i]
    }
    return he.next

};