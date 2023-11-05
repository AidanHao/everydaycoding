/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
    var num = []
    var ref = head
    while(ref!=null)
    {
        num.push(ref.val)
        ref = ref.next
    }
    for(var i =num.length-1;i>=0;i--)
    {
        if(num[i]!=head.val)
        {
            return false
        }
        head = head.next
    }
    return true
};