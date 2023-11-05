var deleteNode = function(node) {
    var result = new ListNode()

    while(node!=null&&node.next!==null)
    {
        node.val = node.next.val
        if(node.next.next==null)
        {
            break
        }else
        {
        node = node.next
        }
    }
    node.next = result.next
};