/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
    var rel = head
    if(head!=null&&head.val==val&&head.next==null)
    {
        return null
    }
    while(rel!=null&&rel.next!=null)
    {
        
        if(head.val == val)
        {
            if(head.next == null)
            {
                return null
            }
            head = head.next
        }else
        if(rel.next.val == val)
        {
            rel.next = rel.next.next
        }else
        {
            rel = rel.next
        }
    }
    return head
};