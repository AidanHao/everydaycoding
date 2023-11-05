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
var deleteDuplicates = function(head) {
    var res = head
    var num = {}
    var def = []
    var index = 0
    var h = null
   
    while(res!=null)
    {
        if(num[res.val]==undefined)
        {
            num[res.val]=1
            def[index]=res.val
            index++
        }else
        {
            num[res.val]++
        }
        res = res.next
    }
    var result = new ListNode()
    var he =result
    for(var i =0;i<def.length;i++)
    {
        if(num[def[i]]==1)
        {
           result.next = new ListNode()
           result = result.next
            result.val = def[i] 
           
           
            
   
        }
    }
    return he.next
   };