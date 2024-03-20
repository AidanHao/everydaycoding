- diff 算法
    操作真实dom开销太大，采用了一种新旧虚拟dom比较的算法，只对有变化的部分进行更新
    - VUE / REACT 等现代mvvm开发框架都是基于虚拟dom（VDOM）的 可以减少真实dom 的操作
    - 组件渲染返回虚拟dom VDOM 通过 DOM 显示
    - 当响应式数据更新后，会生成新的VDOM
    - 比较新旧两棵虚拟DOM树，并找到差异的算法，叫diff算法
    会在内存中生成一颗虚拟dom树，当响应式数据发送变更的时候，又会生成一颗新的虚拟dom树，然后比较两颗虚拟dom树，找出差异，然后更新真实dom 这就是diff算法

- 为什么需要diff算法
    出发点，时间复杂度，性能不好 1000*1000*1000 = 10亿
    - 时间复杂度 O(n^3)
        - 每一个节点跟另一模树的所有节点都比较 O(n) 用key表示是否是一个节点 key是唯一的 严格比对
            v-if/v-show v-for
                todolist翻页

        - 相同key 的节点 所有的属性又要比对 O(n)

        - 比对完所有节点 O(n)


- diff算法 （不是一种算法）
    VUE2 时代的
    - 简单diff算法
        只做同层的对比，type变了就不再对比子节点，跨层需要比较的场景比较少
        （刘强东/奶茶妹） 不用一味的为了复用节点，跨层
        ABCDE  EABCD 
        diff 算法除了考虑本身的时间复杂度之外，还要考虑一个因素：dom操作的次数
    - 双端diff
        子元素顺序发生变化
        O（n） 虚拟dom有一个el属性，虚拟dom会和真实dom有一个映射

    VUE3的新diff
    - 递增子序列的diff 算法

    旧ABCD    新DABC
    j = 3       i = 0 lastIndex = 3
    BCDA        i = 1 lastIndex = 3
    j = 0       i = 2 lastIndex = 3
    CDAB        
    简单diff算法：减少的了dom的生成操作，转而去做移动操作
    
