function ExitComponent() {
  const list = [
    {id:1,name:'react'},
    {id:2,name:'vue'},

  ]
  const onDel = function(id){
    console.log(id);
  }
  
  return (
    <div>
      <p>这是一个额外的组件</p>
      <ul>
        {list.map((item)=>{
          return <li key={item.id}>
            <span>{item.name}</span>
            <button onClick={()=>{return onDel(item.id)}}>删除</button>
          </li>
        })}
      </ul>
    </div>
  );
}

export default ExitComponent;