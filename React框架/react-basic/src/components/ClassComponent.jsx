import React from "react";
class ClassComponent extends React.Component{
    constructor(){
        super()
        this.list = [
            {id:1,name:'react'},
            {id:2,name:'vue'},
          ]
    }
    onDel(id){
        console.log(id);
    }

    render(){
        return(
            <div>
                <h1>这是一个外部类组件</h1>
                <ul>
                    {
                        this.list.map((item)=>{
                            return <li key={item.id}>{item.name}
                            <button onClick={()=>{return this.onDel(item.id)}}>x</button>
                            </li>
                        
                        })
                    }
                </ul>
            </div>
        )
    }
}
export default ClassComponent;