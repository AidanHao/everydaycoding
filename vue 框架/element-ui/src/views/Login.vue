<template>
        <!-- options api 一种编写方式 -->
        
    <div class="login">
        <div class="login-wrap">
            <div><span class="ttt">杀马特俱乐部</span></div>
            <div class="item">
                <span class="">账户：</span>
                <!-- v-model 会将里面的变量与数据源里面的值同步绑定,双向绑定 通常只用在input框身上 -->
                <input type="text" v-model="account">
            </div>
            <div class="item">
                <span class="">密码：</span>
                <input type="text" v-model="password">
            </div>
            <div class="item">
                <button @click="login">登录</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
    data(){
        return {
            account:'admin',
            password:'123',
        }
    },
     methods:{
        login()
        {
            //获取用户宿儒的账户密码 再发请请求传给后端
            console.log(this.account,this.password);
            if(this.account==''||this.password == '')
            {
                alert('账户或密码不能为空！')
                return
            }
            // js跳路由，编程式路由跳转
            // this 就是vue 为什么vue有router 因为在main.js vue use了router 所以vue可以访问到路由
            // console.log(this.$router);
            // 用js控制路由的跳转

            // 带参数的办法,在index.js里面加/:变量名
            // this.$router.push(`/home/${this.account}`)

            // 传参第二种写法
            // this.$router.push({path:'/home',query:{user:this.account}})

            // 传参第三种
            // this.$router.push({name:'home',params:{user:this.account}})

            //传参第四种
            this.$router.push({name:'home',hash:`#${this.account}`})


            
        }
     }   
    }
</script>
<!-- scoped 样式私有化 -->
<style lang="less" scoped>
.login{
    height: 100vh;
    width: 100vw;
    display: flex;
    // 主轴居中 x轴
    justify-content: center;
    // 纵轴居中 y轴
    align-items: center;
    background: #aaa;
    // 嵌套大大减少了词汇量的压力
    .login-wrap{
        position: relative;
        width: 400px;
        height: 300px;
        background: #02f0e8;
        border-radius: 10px;
        // 盒子阴影
        box-shadow:0 0 100px greenyellow;
        padding: 20px;
        // 默认是标准模式，会撑开整个容器
        // 使用ie模式，缩小自己的内边距
        // box-sizing: border-box;
        font-size: 30px;
        animation: box-shadow 5s linear infinite;
        @keyframes box-shadow {
            0%{
                box-shadow:0 0 100px greenyellow;
            }
            25%
            {
                box-shadow:0 0 100px rgb(47, 255, 78);
            }
            50%{
                box-shadow:0 0 100px rgb(89, 47, 255);
            }
            75%{
                box-shadow:0 0 100px rgb(255, 47, 248);
            }
            100%{
                box-shadow:0 0 100px greenyellow;
            }
            
        }
        .item{
            // 弹性容器子容器会默认继承到父容器全部的高度
            display: flex;
            margin-top: 20px;
            input{
                flex: 1;
                padding: 0 10px;
                border: none;
            }
            button{
                
                font-size: 30px;
                flex: 1;
                border-radius: 100px;
                border: none;
                color:black;
                background: rgb(255, 247, 0);
                padding: 5px,0;
                cursor: pointer;
            }
        }
        .ttt{
                color: #f00202;
                animation: change-color 3s linear infinite;
                font-family: STLiti;
                display: block;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%);
               
            }
            @keyframes change-color{
                0%{
                    color: #f00202;

                }
                25%{
                    color: #0202f0;
                }
                50%{
                    color: #f08401;
                }
                75%{
                    color: #f001f0;
                }
                100%{
                    color: #f00202;
                }
            }
        
    }
}
</style>