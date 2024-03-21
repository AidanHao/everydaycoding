import * as React from 'react';

interface Props{
    userName: string;
    // 要声明一下泛型
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void
}

const NameEditComponet: React.FC<Props> = (props)=>{
    return (
        <>
            <div>
                <label>Update name:</label>
                <input value={props.userName} onChange={props.onChange} />
            </div>
        </>
    )
}


export default NameEditComponet