Vue.createApp({
    template: "#my-app",
    data() {
      return {
        // loBt:false,
        books: [
          {
            id: 1,
            name: '《算法导论》',
            date: '2006-9',
            price: 85.00,
            count: 1
          },
          {
            id: 2,
            name: '《UNIX编程艺术》',
            date: '2006-2',
            price: 59.00,
            count: 1
          },
          {
            id: 3,
            name: '《编程珠玑》',
            date: '2008-10',
            price: 39.00,
            count: 1
          },
          {
            id: 4,
            name: '《代码大全》',
            date: '2006-3',
            price: 128.00,
            count: 1
          },
        ]
      }
    },
    computed: {
        // loBut(index){
        //     if(this.books[index].count!=1)
        //     {
        //         this.loBt=false
        //     return this.loBt
       
        //     }else{
        //         this.loBt=true
        //         return this.loBt
        //     }
        // },
        allprice(){
            let result = 0
            for(let key in this.books)
            {
                result += this.books[key].price*this.books[key].count
            }
            return result
        }
    },
    methods: {  
      add(index){
        
        
        this.books[index].count++
        
      },
      lower(index)
      {
        if(this.books[index].count!=1)
        {
        this.books[index].count--
        }
      },
      del(index){
        this.books.splice(index,1)
      }
    }
  }).mount("#app");