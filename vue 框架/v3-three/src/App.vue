<script setup>
import * as THREE from 'three'
import {ref , onMounted} from 'vue'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControlS'
// canvas 3D html5的绘图标签 数据可视化 游戏
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {DRACOLoader} from 'three/examples/jsm/loaders/DRAColoader'


const containerRef = ref(null); //挂载canvas

// 相机 透视相机
const camera = new THREE.PerspectiveCamera(
  40,//视窗角度
  window.innerWidth/window.innerHeight,//横着呐 宽高比
  0.1,//最近拍摄位置
  1000//最远拍摄位置
)
let controls = null;

// 相机位置
// 第一个参数x轴 水平方向 第二个参数y轴 第三个参数z轴 摄像头放置的位置，
// 酷家乐 3D家居 
camera.position.set(0,2,6)// 摆好 一个单位就相当于这个容器的一半
// 场景
// 
const scene = new THREE.Scene()

// 渲染器 canvas 幕布 不停地去输出
// OpenGL 3D 建模 显卡计算 GPU  canvas 3D GPU计算 css>transform
// WebGL 可以使用GPU计算的，浏览器渲染器
const renderer = new THREE.WebGLRenderer({
  antialias:true
})
renderer.setSize(window.innerWidth * 0.8,window.innerHeight * 0.8)

const render = ()=>{
  renderer.render(scene,camera)
  // 根据屏幕的帧率刷新
  requestAnimationFrame(render)// 以刷帧率作为频率 性能优化
}

onMounted(()=>{
  //
  containerRef.value.appendChild(renderer.domElement)
  //
  renderer.setClearColor('#000')
  scene.background = new THREE.Color("#fff")
  scene.environment = new THREE.Color("#fff")
  render();

  // 控制视频的旋转
  controls = new OrbitControls(camera,renderer.domElement)
  controls.update()

  // 坐标辅助线
  const gridHelper = new THREE.GridHelper(10,10)
  gridHelper.material.opacity = 0.2
  gridHelper.material.transparent = true
  scene.add(gridHelper)

  // 加载汽车模型
  const loader = new GLTFLoader()//3DMax gltf 格式
  const dracoLoader = new DRACOLoader();//解码器
  dracoLoader.setDecoderPath('../public/roadSter/draco/gltf/')
  loader.setDRACOLoader(dracoLoader)
  loader.load('../public/roadSter/model/bmw01.glb',gltf=>{
    const bmw = gltf.scene
    scene.add(bmw)
    bmw.traverse(child=>{
      if(child.siMesh&& child.name.includes("轮毂")){
        child.material = wheelsMaterial;
        wheels.push(child)
      }
    }

    )
  })

  // 添加灯光
  const light1 = new THREE.DirectionalLight(0xffffff,1)
  light1.position.set(0,0,10);
  scene.add(light1)
  const light2 = new THREE.DirectionalLight(0xffffff, 1);
  light2.position.set(0, 0, -10);
  scene.add(light2);
  const light3 = new THREE.DirectionalLight(0xffffff, 1);
  light3.position.set(10, 0, 0);
  scene.add(light3);
  const light4 = new THREE.DirectionalLight(0xffffff, 1);
  light4.position.set(-10, 0, 0);
  scene.add(light4);
  const light5 = new THREE.DirectionalLight(0xffffff, 1);
  light5.position.set(0, 10, 0);
  scene.add(light5);
  const light6 = new THREE.DirectionalLight(0xffffff, 1);
  light6.position.set(5, 10, 0);
  scene.add(light6);
  const light7 = new THREE.DirectionalLight(0xffffff, 1);
  light7.position.set(0, 10, 5);
  scene.add(light7);
  const light8 = new THREE.DirectionalLight(0xffffff, 1);
  light8.position.set(0, 10, -5);
  scene.add(light8);
  const light9 = new THREE.DirectionalLight(0xffffff, 1);
  light9.position.set(-5, 10, 0);
  scene.add(light9);

  
})

let wheels = []

const wheelsMaterial = new THREE.MeshPhysicalMaterial({
  color:0x424449,
  metalness:1,
  roughness:0.5
})
</script>

<template>
  <div>
    <div class="header"></div>
    <div class="home">
      <div class="content-box">
        <div class="container" ref="containerRef">

        </div>
      </div>
      <div class="content">
        <div>选择车身颜色</div>
        <div class="select">
          <div class="select-item">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
