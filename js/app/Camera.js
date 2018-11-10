// 微信小游戏滑动效果实现
import * as THREE from "../libs/three";
import DataBus from "Databus";
let databus    = new DataBus();
let camera;

export default class Camera {

  constructor(ctx) {
    if (camera) {
      return camera;
    }

    camera = this;

    // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.z = 5;
    // Fov – 相机的视锥体的垂直视野角
    // Aspect – 相机视锥体的长宽比
    // Near – 相机视锥体的近平面
    // Far – 相机视锥体的远平面

    camera = new THREE.PerspectiveCamera(75, databus.width / databus.height, 0.1, 10000);
    //相机的位置
    // camera.position.x = 0.5;
    // camera.position.y = 1;
    // camera.position.z = 4;
    camera.position.set(50, 100, 400);
    // 相机以哪个方向为上方
    camera.up.x = 0;//红
    camera.up.y = 1;//绿
    camera.up.z = 0;//蓝
    camera.lookAt(new THREE.Vector3(0, 0, 0));


    // console.log('=============='+camera.up.x);
    // console.log('=============='+camera.up.y);
    // console.log('=============='+camera.up.z);
    // camera.up.x = 0;
    // camera.up.y = 0;
    // camera.up.z = 1;
    // console.log('=============='+camera.up.x);
    // console.log('=============='+camera.up.y);
    // console.log('=============='+camera.up.z);
    return camera;
  }




}