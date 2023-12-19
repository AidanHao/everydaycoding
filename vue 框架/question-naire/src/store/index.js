import { createStore } from 'vuex'
import axios from 'axios'
//仓库里面没有生命周期

export default createStore({
  state() {//全局数据源,全局的data  官方建议改成函数，而不是对象   安装是4.0
    return {
      questionList: [],
      itemNum: 1,//默认是第一题 
      answerId: []//存放选中的答案ID,仓库的数据源仓库负责修改它
    }

  },
  getters: {// computed 计算属性 和computed一样 有一个默认的state
    rightAnswer(state){
      let arr = []
      for(let key of state.questionList){
        for(let answer of key.topic_answer)
        {
          if(answer.is_standard_answer)
          {
            arr.push(answer.topic_answer_id)
          }
        }
      }
      return arr
    }
  },
  mutations: {//methods 方法 同步的方式修改数据源 用来定义方法，用于修改仓库的数据，以同步的方式去执行，写在里面的方法一定有一个state参数，代表数据源
    getQuestionList(state, list) {
      state.questionList = list
    },

    //其实类似I/O方法
    recordAnswer(state, id) {
      state.answerId.push(id)
    },
    nextItem(state) {
      //变成下一题
      state.itemNum+=1
    },
  },
  actions: { //async methods 放异步方法 mutations里面的方法能被actions访问到
    recordAnswerAction({commit,state},id) {
      commit('recordAnswer',id)//提交一首,触发
      if(state.itemNum<state.questionList.length)
      {
        commit('nextItem')
      }
     
    },
   
    getQuestionListAction({ commit }) {//context 代表整个store、 写成{commit}不写context 这叫解构 在下面直接用commit
      axios.get('https://www.fastmock.site/mock/3a33c631bcba043a378b4ceafbf994b8/question/fri')
        .then(function (response) {
          console.log(response);
          console.log(response.data[0].topic_name);
          console.log(response.data[0].topic_answer[0].answer_name);

          //触发mutations里面的getQuestionList   要先提交使用context.commit  第一个为调用的方法名，第二个为传的参数
          // context.commit("getQuestionList",response.data)
          commit("getQuestionList", response.data)

        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {

        })
    }
  },
  modules: {//模块化
  }
})
