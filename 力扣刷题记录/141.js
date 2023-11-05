var hasCycle = function(head) {
    var def = head
    while(def!=null&&def.next!=null)
    {
        if(def.value == undefined)
        {
        def.value = new ListNode()
        def.value = 1
        }else{
            return true
        }
        def = def.next
    }return false
};