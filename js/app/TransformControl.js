// 微信小游戏滑动效果实现
import * as THREE from "../libs/three";
import DataBus from "Databus";
import  "../libs/TransformControls";
import Touch from "bind/Touch"
let databus    = new DataBus();

let transformControl;

export default class TransformControl {

  constructor(camera, rendererDomElement,scene) {
    if (transformControl) {
      return transformControl;
    }

    transformControl = this;
    transformControl = new THREE.TransformControls(camera, rendererDomElement);
    scene.add(transformControl);

    Touch.move(function (e) {
      transformControl.attach(e.object);
    });
    return transformControl;
  }




}