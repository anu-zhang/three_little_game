// 微信小游戏滑动效果实现
import * as THREE from "../libs/three";
import Databus from "./Databus";

let databus = new Databus();
let instance;
let action = new Array();

export default class Animation {

    constructor() {

        if (instance) {
            return instance;
        }

        instance = this;


        return instance;
    }

    static setThingPostion(who, x, y, z) {
        who.position.x = x;
        who.position.y = y;
        who.position.z = z;
    }

    static initCube(scene, chang, kuan, gao, width, height, depth, Material, rotaAction = function () {

    }) {
        // 六色纹理
        // var matArray = [];
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0x00ff00}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0x0000FF}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0x800080}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFF0000}));
        //
        // var faceMaterial = new THREE.MeshFaceMaterial(matArray);

        //基本单色纹理
        // var material = new THREE.MeshBasicMaterial({color: 0xffccff});


        // 将方块放入场景
        var geometry = new THREE.CubeGeometry(chang, kuan, gao, 5, 5, 5);
        databus.cube = new THREE.Mesh(geometry, Material);
        scene.add(databus.cube);
        this.setThingPostion(databus.cube, width, height, depth);

        Animation.pushAction(rotaAction);
    }

    //画一个球

    static sphere(scene) {
        var sphereMesh = new THREE.Mesh(
            new THREE.SphereGeometry(100, 100, 100),
            new THREE.MeshLambertMaterial({color: 0xffFF00})/*设置球体的材质*/
        ); //材质设定
        sphereMesh.position.set(0, 0, 0);
        var pivotPoint = new THREE.Object3D();
        sphereMesh.add(pivotPoint);
        scene.add(sphereMesh);
        sphereMesh.name = 'cubesphere';

        this.pushAction(function () {
            scene.getObjectByName('cubesphere').rotation.x += 0.1;
            scene.getObjectByName('cubesphere').rotation.y += 0.1;
            scene.getObjectByName('cubesphere').rotation.z += 0.1;
        });
    }

    static cube9(scene, chang, kuan, gao, material) {
        Animation.initCube(scene, chang, kuan, gao, 0, 0, -60, material);
        Animation.initCube(scene, chang, kuan, gao, 0, 0, 0, material);
        Animation.initCube(scene, chang, kuan, gao, 0, 0, 60, material);

        Animation.initCube(scene, chang, kuan, gao, 60, 0, -60, material);
        Animation.initCube(scene, chang, kuan, gao, 60, 0, 0, material);
        Animation.initCube(scene, chang, kuan, gao, 60, 0, 60, material);

        Animation.initCube(scene, chang, kuan, gao, -60, 0, -60, material);
        Animation.initCube(scene, chang, kuan, gao, -60, 0, 0, material);
        Animation.initCube(scene, chang, kuan, gao, -60, 0, 60, material);

        Animation.initCube(scene, chang, kuan, gao, 60, 60, -60, material);
        Animation.initCube(scene, chang, kuan, gao, 60, 60, 0, material);
        Animation.initCube(scene, chang, kuan, gao, 60, 60, 60, material);

        Animation.initCube(scene, chang, kuan, gao, 0, 60, -60, material);
        Animation.initCube(scene, chang, kuan, gao, 0, 60, 0, material);
        Animation.initCube(scene, chang, kuan, gao, 0, 60, 60, material);

        Animation.initCube(scene, chang, kuan, gao, -60, 60, -60, material);
        Animation.initCube(scene, chang, kuan, gao, -60, 60, 0, material);
        Animation.initCube(scene, chang, kuan, gao, -60, 60, 60, material);

        Animation.initCube(scene, chang, kuan, gao, 0, -60, -60, material);
        Animation.initCube(scene, chang, kuan, gao, 0, -60, 0, material);
        Animation.initCube(scene, chang, kuan, gao, 0, -60, 60, material);

        Animation.initCube(scene, chang, kuan, gao, -60, -60, -60, material);
        Animation.initCube(scene, chang, kuan, gao, -60, -60, 0, material);
        Animation.initCube(scene, chang, kuan, gao, -60, -60, 60, material);

        Animation.initCube(scene, chang, kuan, gao, 60, -60, -60, material);
        Animation.initCube(scene, chang, kuan, gao, 60, -60, 0, material);
        Animation.initCube(scene, chang, kuan, gao, 60, -60, 60, material);
    }

    //画一个会动的方块
    static cube(scene, rotaAction = function () {
    }) {
        // 六色纹理
        var matArray = [];
        matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
        matArray.push(new THREE.MeshBasicMaterial({color: 0x00ff00}));
        matArray.push(new THREE.MeshBasicMaterial({color: 0x0000FF}));
        matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFFFF}));
        matArray.push(new THREE.MeshBasicMaterial({color: 0x800080}));
        matArray.push(new THREE.MeshBasicMaterial({color: 0xFF0000}));

        var faceMaterial = new THREE.MeshFaceMaterial(matArray);

        //基本单色纹理
        // var material = new THREE.MeshBasicMaterial({color: 0xffccff});


        var material = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            wireframe: true
        });

        // 将方块放入场景
        var geometry = new THREE.CubeGeometry(50, 50, 50, 3, 3, 3);
        databus.cube = new THREE.Mesh(geometry, material);
        scene.add(databus.cube);
        this.pushAction(rotaAction);
    }

    static pushAction(fun) {
        action.push(fun);
    }

    static renderAction() {
        for (let i = 0, len = action.length; i < len; i++) {
            action[i]();
        }
    }
}