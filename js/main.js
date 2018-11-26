import * as THREE from 'libs/three'
import SwipeListener from "app/SwipeListener"
import "libs/OrbitControls"
import "libs/TransformControls"
import Scene from "app/Scene"
import Render from "app/Render"
import Camera from "app/Camera"
import TransformControl from "./app/TransformControl";
import Touch from "./app/bind/Touch"
import Painting from "./app/Painting";
import Animation from "./app/Animation";
import Databus from "./app/Databus";

let ctx = canvas.getContext('webgl');
let t = 0;
let scene;
let renderer;
let camera;
let cube;
let cube2;
let light;
let width;
let height;
let action = new Array();
width = window.innerWidth;
height = window.innerHeight;
// ... 其它变量／常量 ...
let mouse = new THREE.Vector2();
let databus = new Databus();

let MoveX;
let MoveY;
let lastTouchX;
let lastTouchY;
let roateSpeed = 0.1;
let instance;
let onTouchStartClientX;
let onTouchStartClientY;
let isOnTouchStart = false;
let currentSpeed;
let pivotPoint;
let sphereMesh;//围绕某点转
let controls;
let transformControl;

let raycaster;
let intersects;
let bind;
/**
 * 游戏主函数
 */
export default class Main {
    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;
        this.threeStart();
    }

    threeStart() {


        // 场景
        scene = new Scene();
        //渲染器
        renderer = new Render(ctx);
        //相机
        camera = new Camera();

        // 可视化平移变换控件
        transformControl = new TransformControl(camera, renderer.domElement, scene);


        // 使用控件控制方块方向
        controls = new THREE.OrbitControls(camera);
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        controls.dampingFactor = 0.1;
        //是否可以缩放
        controls.enableZoom = true;
        //是否自动旋转
        controls.autoRotate = false;
        //是否开启右键拖拽
        controls.enablePan = true;

        controls.addEventListener('touchstart', function (event) {
            // 让变换控件对象和选中的对象绑定
            console.log(333);
            transformControl.attach(event.object);
        });


        raycaster = new THREE.Raycaster();

        // 画了一个三角形
        Painting.react(scene);

        // 应该是画光线 但是不管用,其实是管用的，只是
        Painting.slight(scene);

        // 画坐标轴
        Painting.axiCoordinates(scene);

        // 平行线条
        Painting.coordinatePlain(scene);
        // 画了一个会动的立方体，传入回动的参数
        // Animation.cube(scene,function () {
        //     databus.cube.rotation.x -= 0.01;
        // });

        let chang = 50;
        let kuan = 50;
        let gao = 50;
        let material = new THREE.MeshBasicMaterial({color: 0x111111, wireframe: true});

        Animation.cube9(scene, chang, kuan, gao, material);


        // 画第二个立方体cube2 6面不同的颜色材质
        // var matArray = [];
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
        // matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
        // var faceMaterial = new THREE.MeshFaceMaterial(matArray);
        // Animation.initCube(scene,100,100,100,50,50,50,faceMaterial,function () {});

        //画一个球
        // Animation.sphere(scene);


        //判断左右上下滑动
        new SwipeListener(function (e) {
            console.log(e)
        });

        Touch.move(function (e) {
            lastTouchY = e.touches[0].clientY;
            console.log(lastTouchX);
            lastTouchX = e.touches[0].clientX;
        });


        Touch.end(function (e) {
            console.log('end');
            controls.enabled = true;
        });

        Touch.start(function (e) {
            //@todo 教学：https://segmentfault.com/a/1190000010490845 https://github.com/mrdoob/three.js/blob/master/examples/webgl_interactive_cubes.html
            mouse.x = ( e.touches[0].clientX / window.innerWidth ) * 2 - 1;
            mouse.y = -( e.touches[0].clientY / window.innerHeight ) * 2 + 1;
            // console.log(mouse.x,mouse.y);//世界坐标系：窗口范围按此单位恰好是(-1,-1)到(1,1)，
            // 射线的原理获得点击到的物体
            raycaster.setFromCamera(mouse, camera);//
            intersects = raycaster.intersectObjects(scene.children);
            if (intersects.length > 0) {
                // controls.enabled = false;
                //   intersects[ 0 ].object.position.x += 100;
            }
            isOnTouchStart = true;
            lastTouchX = onTouchStartClientX = e.changedTouches[0].clientX;
            lastTouchY = onTouchStartClientY = e.changedTouches[0].clientY;
        });
        this.loop();
    }


    // 实现游戏帧循环
    loop() {
        this.render();
        this.update();
        window.requestAnimationFrame(this.loop.bind(this), canvas)
    }


    render() {
        renderer.clear();
        controls.update();
        // 渲染应该使用渲染器，结合相机和场景来得到结果画面。
        renderer.render(scene, camera);
    }

    update() {
        Animation.renderAction();
    }
}