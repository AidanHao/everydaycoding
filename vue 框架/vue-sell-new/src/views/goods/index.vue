<template>
  <div class="goods">
    <div class="goods-content">
      <div class="menu-wrapper" ref="menuWrapper">
        <ul>
          <li 
            class="menu-item" 
            :class="{'current' : currentIndex === index}"
            v-for="(item, index) in goods" 
            :key="index"
            @click="selectMenu(index)"
          >
            <span class="text">
              <SupportIcon size="3" :type="item.type" v-if="item.type >= 0"/>
              {{item.name}}
            </span>
          </li>
        </ul>
      </div>  
      <!-- ref给Dom结构打一个标记 -->
      <div class="foods-wrapper" ref="foodsWrapper">
        <ul>
          <!-- 一个菜系 -->
          <li class="food-list" v-for="(item,index) in goods" :key="index" ref="foodList">
              <h1 class="title">{{ item.name }}</h1>
              <!-- 一道道菜 -->
              <ul>
                <li class="food-item"  v-for="(item2 ,index2) in item.foods" :key="index2" >
                  <div class="pic">
                    <img :src="item2.image" alt="">
                  </div>
                  <div class="content">

                    <h2 class="name">{{ item2.name }}</h2>

                    <p class="desc">{{ item2.description }}</p>

                    <div class="extra">
                      <span class="count">月售{{ item2.sellcout }}份</span>
                      <span>好评率{{item2.rating}}%</span>
                    </div>

                    <div class="price">
                      <span class="now">￥{{ item2.price  }}</span>
                      <span class="old" v-if=" item2.oldPrice ">￥{{ item2.oldPrice }}</span>
                    </div>
                    <!-- + -->
                  </div>
                </li>
              </ul>

          </li>
        </ul>
      </div>
    </div>
    
    <div class="cart-wrapper">购物车</div>
  </div>
</template>

<script>
import { getGoods } from '@/api'
import SupportIcon from '@/components/support-icon/Support-icon.vue'
import BScroll from '@better-scroll/core'

export default {
  components: {
    SupportIcon
  },
  data() {
    return {
      goods: [],
      // currentIndex: 0,
      foodsScroll:{},//用来代表被BScroll修饰的Dom结构
      scrollY:0,
      foodList:[],//用来装所有的菜系dom结构
      listHeight:[]//所有菜系Dom的高度
    }
  },
  created() {
    // 获取商品数据
    getGoods().then(res => {
      console.log(res);
      this.goods = res
      
      this.$nextTick(() => { // $nextTick里面的回调会在页面加载完毕之后才执行 $是vue自带的方法
        this.betterScroll()
        this._calculateHeight()//Dom加载完毕读取
      })
    })
  },
  computed:{
    currentIndex(){
      //随着右侧滚动this.scrollY返回不同的下标
      for(let i = 0; i < this.listHeight.length; i++){
        const h1 = this.listHeight[i]
        const h2 = this.listHeight[i + 1]
        if(!h2||(this.scrollY>=h1&&this.scrollY<h2)){
          return i
        }
      }
      return 0
    }
  },
  methods: {
    betterScroll() {
      // 获取到menu-wrapper的dom结构
      // $官方自带的
      new BScroll(this.$refs.menuWrapper, {
        click: true,
        
      })
      // 被BScroll修饰之后的dom结构
      this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
        // 默认把所有点击事件干掉了 click:true 强行添加一个点击事件 
        click:true,
        scrollY:true,
        probeType:3
      })

      this.foodList= this.$refs.foodList

      // 给右侧监听上了滚动事件
      this.foodsScroll.on('scroll',pos => {
        console.log(Math.round(Math.abs(pos.y)));
        this.scrollY=Math.round(Math.abs(pos.y))
        
      }) 

    },
    _calculateHeight(){
      //计算高度
      let height= 0
      this.listHeight.push(height)
      this.foodList.forEach(li => {
        // 原生js获取一个li的高读，ofset会把高度也算道内
        height+= li.clientHeight
        this.listHeight.push(height)
      })
      console.log(this.listHeight);
    },
    selectMenu(i) {
      // console.log(i);
      this.currentIndex = i
      this.foodsScroll.scrollToElement(this.$refs.foodList[i],500)


    },

  }
}
</script>

<style lang="less" scoped>
@import '@/common/style/variable.less';
.goods{
  position: absolute;
  width: 100%;
  bottom: 46px;
  top: 177px;
  overflow: hidden;
  &-content{
    display: flex;
    height: 100%;
    .menu-wrapper{
      flex: 0 0 80px;
      background: @color-background-ssss;
      .menu-item{
        padding: 0 14px;
        font-size: @fontsize-small;
        height: 54px;
        display: flex;
        justify-content: center;
        align-items: center;
        &.current{
          background: #fff;
          font-weight: 700;
        }
      }
    }
    .foods-wrapper{
      flex: 1;
      .title{
        height: 26px;
        line-height: 26px;
        font-size: @fontsize-small;
        color: rgb(147, 153, 159);
        background: @color-background-ssss;
        padding-left: 14px;
        border-left:2px solid #d9dde1;
      }
      .food-item{
        display: flex;
        padding:18px ;
        .pic{
          flex: 0 0 57px;
          margin-right: 10px;
          img{
            width: 100%;
          }
        }
        .content{
          flex: 1;
          .name{
            font-size: @fontsize-medium;
            color: rgb(7, 17, 27);
            margin: 2px 0 8px 0;
          }
          .desc, .extra{
            font-size: @fontsize-small-s;
            color: rgb(147, 153, 159);
            margin-bottom: 8px;
            line-height: 10px;
            .count{
              margin-right: 12px;
            }
          }
          .price{
            // 最大七百
            font-weight: 700;
            line-height: 10px;
            .now{
              color:@color-red ;
              font-size: @fontsize-medium;
              margin-right: 8px;
            }
            .old{
              font-size:@fontsize-small-s ;
              color: rgb(147, 153, 159);
              // 拦腰下划线
              text-decoration: line-through;
            }
          }
        }

      }
    }
  }

  .cart-wrapper{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 48px;
    background: #aaa;
  }
}
</style>