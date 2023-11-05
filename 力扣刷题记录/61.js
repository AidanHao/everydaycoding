/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
    var num1 = []
    var num2 = []
    var judge = 0
    var ref = head
    var leng = 0
    while(ref!=null)
    {
        leng++
        ref = ref.next
    }
    ref = head
    k = k%leng
    if(k==0)
    {
        return head
    }
    while(ref!=null)
    {
        if(leng-judge!=k)
        {
            num2.push(ref.val)
            ref = ref.next
            judge++
        }
        else{
            break
        }
    }
    while(ref!=null)
    {
        num1.push(ref.val)
        ref = ref.next
    }
    var num = []
    for(var i = 0;i<num1.length;i++)
    {
        num.push(num1[i])
    }
    for(var i = 0;i<num2.length;i++)
    {
        num.push(num2[i])
    }
    var result = new ListNode()
    var he = result
    for(var i = 0 ;i<num.length;i++)
    {
        result.next = new ListNode()
        result = result.next
        result.val = num[i]
    }
    return he.next
};