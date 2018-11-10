// 微信小游戏滑动效果实现
import * as THREE from "../libs/three";
import DataBus from "Databus";
let databus    = new DataBus();
let instance;

export default class render {

  constructor(ctx) {
    if (instance) {
      return instance;
    }

    instance = this;
    instance = new THREE.WebGLRenderer(ctx);
    instance.setSize(databus.width, databus.height);
    // document.body.appendChild(renderer.domElement);
    // renderer.setClearColor(0x221F24, 1.0);
    // renderer = new THREE.WebGLRenderer(ctx);
    // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);

    return instance;
  }




}