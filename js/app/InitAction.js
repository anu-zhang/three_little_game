// 微信小游戏滑动效果实现
import * as THREE from "../libs/three";
import DataBus from "Databus";
let databus    = new DataBus();
let instance;

export default class InitAction {

  constructor(ctx) {
    if (instance) {
      return instance;
    }

    instance = this;


    return instance;
  }



}