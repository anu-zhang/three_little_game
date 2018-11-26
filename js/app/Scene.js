// 微信小游戏滑动效果实现
import * as THREE from "../libs/three";

let instance;

export default class Scene {

    constructor() {

        if (instance) {
            return instance;
        }

        instance = this;

        instance = new THREE.Scene();
        instance.background = new THREE.Color(0xcccccc);

        return instance;
    }


}