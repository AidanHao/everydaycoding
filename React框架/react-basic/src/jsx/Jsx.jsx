// 根组件
import './Jsx.css'
const songs = [
  {id:1,name:'庐州月'},
  {id:2,name:'我走后'},
  {id:3,name:'粉红法拉利'},
]

const flag = true
const styleObj = {
  color:'blue'
}

const showGreen = true

function App(){//jsx语法
  return (
    //这样叫幽灵节点
    <>
      <div className="app">
      <h2>Hello React</h2>
      <ul>
        {
          songs.map((item)=>{//不能用forEach没有，需要返回值
            return <li key={item.id}>{item.name}</li>
          })
        }
      </ul>
      <h3>
        {//在jsx语法中不能写if
          flag ? 'react 真不错':'vue针不错'
        }
      </h3>
      {flag && <a href="#">哈哈哈哈</a>}

      <h2 style={{color:'red'}}>红色字体</h2>

      <h2 style={styleObj}>蓝色字体</h2>

      <h2 className={showGreen ? 'green': ''}>绿色字体</h2>
    </div>
    <div className="box"></div>
    </>
  )
}
export default App