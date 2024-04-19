<template>
  <div class="bigfile-all">

    <div class="bigfile-upload">
      <el-upload class="upload-demo" :auto-upload="false" :on-change="checkUpload" :limit=1>
        <template #trigger>
          <el-button type="primary" >选择文件</el-button>
        </template>

        <el-button class="ml-3" type="success" @click="submitUpload">
          提交文件
        </el-button>

        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </div>

  </div>
</template>

<script setup>
// 引入封装好的axios
import axios from '../api'
import { ref } from 'vue'

const uploadFile = ref(null)
const uploadChunkList = ref([])

// 提交切片
const submitUpload = () => {
  if(!uploadFile.value)return
  const chunkLisk = creatChunk(uploadFile.value)
  // 切片要打上标记，方便后端合并切片
  uploadChunkList.value = chunkLisk.map(({file},index)=>{
    return {
      file,
      size:file.size,
      percent:0,
      chunkName:`${uploadFile.value.name}-${index}`,
      fileName:uploadFile.value.name,
      index
    }
  })
  // console.log(uploadChunkList.value);
  uploadChunks()

  // console.log(uploadChunks());
}

// 封装一个转为流的函数，并且上传
const uploadChunks = ()=>{
  const formateList = uploadChunkList.value.map(({file,fileName,index,chunkName})=>{
    // 将对象转为二进制数据流进行传输
    const formData = new FormData()//创建表单格式的数据流
    // 将切片转换为表单的数据流
    formData.append('file',file)
    formData.append('fileName',fileName)
    formData.append('chunkName',chunkName)
    return {formData,index}
  })
  // console.log(formateList);
  // 对每一个切片发送请求
  const requestList = formateList.map(({formData , index})=>{
    return requestUpload({
      url:'/upload',
      data:formData,
      onUploadProgress:createProgress(uploadChunkList.value[index])//进度函数
    })
  })

  // 合并切片请求
  Promise.all(requestList).then(mergeChunk())
}
// 合并切片
const mergeChunk = ()=>{
  // 再传一次切片名和切片大小可以防止传输过程中不被篡改，这是为了安全性
  requestUpload({
    url:'merge',
    data:JSON.stringify({
      fileName:uploadFile.value.name,
      size:10 * 1024 * 1024
    })
  })
}

//进度函数
const createProgress = (item)=>{
  return (e)=>{
    // 为什么函数需要return，因为axios的onUploadProgress就是一个函数体
    // 并且函数体参数e就是进度
    item.percent = parseInt(String(e.loaded / e.total) * 100)//axios提供的
  }
}

//创建一个切片函数 
const creatChunk = (file,size = 10*1024*1024) => {
  const chunLisk = []
  let cur = 0
  while(cur < file.size)
  {
    chunLisk.push({file:file.slice(cur , cur + size)})
    cur+=size
  }
  return chunLisk
}

// 拿到文件
const checkUpload = (e)=>{
  // console.log(e);
  if(!e.raw)return
  uploadFile.value = e.raw
}

// 封装一个请求函数          // {url,method = 'post',data,headers = {},onUploadProgress = (e)=>e}

const requestUpload = async ({url,method='post',data,headers={},onUploadProgress = (e)=>e})=>{
  // console.log(data);
  if(url=='/upload'){
    headers = {
      'Content-Type': 'multipart/form-data'
    }
  }
  return new Promise((resolve,reject)=>{
    // axios支持在请求中传入一个回调onUploadProgress，用来监听进度
    const res = axios[method](url,data,{headers,onUploadProgress})
    res.then((res)=>{
      resolve(res)
      // console.log(res);
    })
    .catch((err)=>{
      reject(err)
    })
  })
}
</script>

<style lang="less" scoped></style>