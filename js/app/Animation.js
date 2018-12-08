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

    static initCube(scene, chang, kuan, gao, width, height, depth, Material, name = '', rotaAction = function () {
    }) {
        // 将方块放入场景
        var geometry = new THREE.CubeGeometry(chang, kuan, gao, 5, 5, 5);
        var cube = new THREE.Mesh(geometry, Material);
        cube.name = name;
        this.setThingPostion(cube, width, height, depth);

        var pivotPoint = new THREE.Object3D();
        pivotPoint.name = name;

        pivotPoint.add(cube);
        scene.add(cube);

        scene.add(pivotPoint);

        databus.cubeArray.push(cube);
        databus.pivotPointArray.push(pivotPoint);
        databus.cubeIDPositionMap.push(name);
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
        Animation.initCube(scene, chang, kuan, gao, 0, 0, -60, material, 'MAG,B_5');
        Animation.initCube(scene, chang, kuan, gao, 0, 0, 0, material, 'MAG,M');
        Animation.initCube(scene, chang, kuan, gao, 0, 0, 60, material, 'MAG,F_5');
        // //
        Animation.initCube(scene, chang, kuan, gao, 60, 0, -60, material, 'MAG,B_4,R_6');
        Animation.initCube(scene, chang, kuan, gao, 60, 0, 0, material, 'MAG,R_5');
        Animation.initCube(scene, chang, kuan, gao, 60, 0, 60, material, 'MAG,F_6,R_4');
        //
        Animation.initCube(scene, chang, kuan, gao, -60, 0, -60, material, 'MAG,B_6,L_4');
        Animation.initCube(scene, chang, kuan, gao, -60, 0, 0, material, 'MAG,L_5');
        Animation.initCube(scene, chang, kuan, gao, -60, 0, 60, material, 'MAG,L_6,F_4');
        //
        Animation.initCube(scene, chang, kuan, gao, 60, 60, -60, material, 'MAG,B_1,U_3,R_3');
        Animation.initCube(scene, chang, kuan, gao, 60, 60, 0, material, 'MAG,U_6,R_2');
        Animation.initCube(scene, chang, kuan, gao, 60, 60, 60, material, 'MAG,U_9,F_3,R_1');
        //
        Animation.initCube(scene, chang, kuan, gao, 0, 60, -60, material, 'MAG,U_2,B_2');
        Animation.initCube(scene, chang, kuan, gao, 0, 60, 0, material, 'MAG,U_5');
        Animation.initCube(scene, chang, kuan, gao, 0, 60, 60, material, 'MAG,U_8,F_2');
        //
        Animation.initCube(scene, chang, kuan, gao, -60, 60, -60, material, 'MAG,U_1,B_3,L_1');
        Animation.initCube(scene, chang, kuan, gao, -60, 60, 0, material, 'MAG,U_4,L_2');
        Animation.initCube(scene, chang, kuan, gao, -60, 60, 60, material, 'MAG,F_1,U_7,L_3');
        //
        Animation.initCube(scene, chang, kuan, gao, 0, -60, -60, material, 'MAG,D_8,B_8');
        Animation.initCube(scene, chang, kuan, gao, 0, -60, 0, material, 'MAG,D_5');
        Animation.initCube(scene, chang, kuan, gao, 0, -60, 60, material, 'MAG,F_8,D_2');
        //
        Animation.initCube(scene, chang, kuan, gao, -60, -60, -60, material,'MAG,D_7,L_7,B_9');
        Animation.initCube(scene, chang, kuan, gao, -60, -60, 0, material,'MAG,D_4,L_8');
        Animation.initCube(scene, chang, kuan, gao, -60, -60, 60, material,'MAG,F_7,D_1,L_9');
        //
        Animation.initCube(scene, chang, kuan, gao, 60, -60, -60, material,'MAG,R_9,D_9,B_7');
        Animation.initCube(scene, chang, kuan, gao, 60, -60, 0, material,'MAG,R_8,D_6');
        Animation.initCube(scene, chang, kuan, gao, 60, -60, 60, material,'MAG,F_9,R_7,D_3');
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

    // 公转的例子
    static revolutionExample(scene) {
//画一个球
        // Animation.sphere(scene);
        var material_gz = new THREE.MeshBasicMaterial({color: 0xffff00});

        // 将方块放入场景
        var geometry = new THREE.CubeGeometry(50, 50, 50, 3, 3, 3);


        var cube3 = new THREE.Mesh(geometry, material_gz);
        cube3.position.set(100, 0, 0);

        // 这个一个转轴
        databus.pivotPoint = new THREE.Object3D();

        databus.pivotPoint.add(cube3);
        scene.add(databus.pivotPoint);

        Animation.pushAction(function () {
            // databus.pivotPoint.rotation.y += 0.1;
            // databus.pivotPoint.rotation.z += 0.1;
            // databus.pivotPoint.rotation.x += 0.1;

        });
    }
}