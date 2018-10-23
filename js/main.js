import * as THREE from 'libs/three.js'
import SwipeListener from "app/SwipeListener.js"

let ctx = canvas.getContext('webgl');
let t=0;
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
/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    if (instance) {
      return instance;
    }
    instance = this;
    this.start();
  }


  initScene() {
    scene = new THREE.Scene();
  }


  initCamera() {
    // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // camera.position.z = 5;
    // Fov – 相机的视锥体的垂直视野角
    // Aspect – 相机视锥体的长宽比
    // Near – 相机视锥体的近平面
    // Far – 相机视锥体的远平面

    camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 10000);
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
  }

  initRender() {

    renderer = new THREE.WebGLRenderer(ctx);
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor(0x221F24, 1.0);
    // renderer = new THREE.WebGLRenderer(ctx);
    // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // renderer.setSize(window.innerWidth, window.innerHeight);
    // document.body.appendChild(renderer.domElement);
  }

  initLight() {
    light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
    light.position.set(100, 100, 200);
    scene.add(light);
  }

  // 画一个三角形
  initReact() {
    var geometry = new THREE.Geometry();//创建一个几何体
    var material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors});//创建一个线条材质，其中vertexColors表示线条的颜色根据顶点的颜色来计算
    /*
     定义一种线条的材质，使用THREE.LineBasicMaterial类型来定义，它接受一个集合作为参数，其原型如下：
     LineBasicMaterial( parameters )
     Parameters是一个定义材质外观的对象，它包含多个属性来定义材质，这些属性是：
     Color：线条的颜色，用16进制来表示，默认的颜色是白色。
     Linewidth：线条的宽度，默认时候1个单位宽度。
     Linecap：线条两端的外观，默认是圆角端点，当线条较粗的时候才看得出效果，如果线条很细，那么你几乎看不出效果了。
     Linejoin：两个线条的连接点处的外观，默认是“round”，表示圆角。
     VertexColors：定义线条材质是否使用顶点颜色，这是一个boolean值。意思是，线条各部分的颜色会根据顶点的颜色来进行插值。（如果关于插值不是很明白，可以QQ问我，QQ在前言中你一定能够找到，嘿嘿，虽然没有明确写出）。
     Fog：定义材质的颜色是否受全局雾效的影响。
     我们这里使用了顶点颜色vertexColors: THREE.VertexColors，就是线条的颜色会根据顶点来计算。
     var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors } );
     */
    var color1 = new THREE.Color(0x444444);//顶点1的颜色
    var color2 = new THREE.Color(0xFF0000);//顶点2的颜色
    var color3 = new THREE.Color(0xFFFF00);//顶点3的颜色

    //中点点坐标为：(0,0,0)如果从中心点往左，则是从0到-500,从中心点往右则是从0到500
    //如果从中心点往上，则是从0到500,从中心点往下则是从0到-500
    //-500表示近视角，负值越大观察到的也就越广，1000表示远视角，正值越大看的越远
    // 线的材质可以由2点的颜色决定
    var x = new THREE.Vector3(200, 0, 0);//定义顶点的位置
    var y = new THREE.Vector3(-200, 0, 0);//定义顶点的位置
    var z = new THREE.Vector3(0, 0, 200);//定义顶点的位置
    geometry.vertices.push(x); //vertices是用来存放几何体中的点的集合
    geometry.vertices.push(y);
    geometry.colors.push(color1, color2);//color是用来存放颜色的,有两个点说明这两个颜色对应两个点
    //geometry中colors表示顶点的颜色，必须材质中vertexColors等于THREE.VertexColors 时，颜色才有效，如果vertexColors等于THREE.NoColors时，颜色就没有效果了。那么就会去取材质中color的值
    var line = new THREE.Line(geometry, material, THREE.LineSegments);
    //第一个参数是几何体geometry，里面包含了2个顶点和顶点的颜色。第二个参数是线条的材质，或者是线条的属性，表示线条以哪种方式取色。第三个参数是一组点的连接方式，我们会在后面详细讲解。
    scene.add(line);//将线条添加到场景中

    var geometry1 = new THREE.Geometry();//创建一个几何体
    geometry1.vertices.push(x); //vertices是用来存放几何体中的点的集合
    geometry1.vertices.push(z);
    geometry1.colors.push(color1, color3);//color是用来存放颜色的,有两个点说明这两个颜色对应两个点
    var line1 = new THREE.Line(geometry1, material, THREE.LineSegments);
    scene.add(line1);//将线条添加到场景中

    var geometry2 = new THREE.Geometry();//创建一个几何体
    geometry2.vertices.push(y); //vertices是用来存放几何体中的点的集合
    geometry2.vertices.push(z);
    geometry2.colors.push(color2, color3);//color是用来存放颜色的,有两个点说明这两个颜色对应两个点
    var line2 = new THREE.Line(geometry2, material, THREE.LineSegments);
    scene.add(line2);//将线条添加到场景中
  }

  initLine() {
    // 定义一个几何体geometry
    var geometry = new THREE.Geometry();

    var color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0xFF0000);
    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3(0, 0, 0);
    var p2 = new THREE.Vector3(200, 0, 0);
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push(color1, color2);

    var p1 = new THREE.Vector3(0, 0, 0);
    var p2 = new THREE.Vector3(0, 300, 0);
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    var color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0x00FF00);
    geometry.colors.push(color1, color2);
    // '#00FF00'

    var p1 = new THREE.Vector3(0, 0, 0);
    var p2 = new THREE.Vector3(0, 0, 400);
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    var color1 = new THREE.Color(0x444444), color2 = new THREE.Color(0x0000FF);
    geometry.colors.push(color1, color2);
    // 定义一种线条的材质
    var material = new THREE.LineBasicMaterial({vertexColors: THREE.VertexColors});
    var line = new THREE.Line(geometry, material, THREE.LineSegments);
    scene.add(line);
  }

  initCube(rotaAction) {
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
    var geometry = new THREE.CubeGeometry(50, 50, 50,3,3,3);
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    this.pushAction(rotaAction);
  }
  initCube2(chang,kuan,gao,Material,rotaAction) {
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
    var geometry = new THREE.CubeGeometry(chang, kuan, gao);
    cube2 = new THREE.Mesh(geometry, Material);
    scene.add(cube2);

    this.pushAction(rotaAction);
  }
  initCoordinatePlain() {
    var geometry = new THREE.Geometry();
    // B begin
    geometry.vertices.push(new THREE.Vector3(-111, 0, 0));
    geometry.vertices.push(new THREE.Vector3(111, 0, 0));
    // B end
    for (var i = 0; i <= 20; i++) {

      var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xF9F9F9, opacity: 1}));
      line.position.z = (i * 44);
      scene.add(line);

      var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xF9F9F9, opacity: 1}));
      line.position.x = (i * 44);
      line.rotation.y = 90 * Math.PI / 180;
      scene.add(line);

    }
  }

  threeStart() {
    //场景
    this.initScene();
    //相机
    this.initCamera();
    //渲染器
    this.initRender();
    // 画了一个三角形
    this.initReact();
    // 应该是画光线 但是不管用
    this.initLight();
    // 画了xyz轴
    this.initLine();
    // 平行线条
    this.initCoordinatePlain();

    // 画了一个会动的立方体，传入回动的参数
    this.initCube(function () {
      // cube.rotation.x -= 0.01;
    });

    // 画第二个立方体cube2
    var matArray = [];
    matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
    matArray.push(new THREE.MeshBasicMaterial({color: 0xFFFF00}));
    var faceMaterial = new THREE.MeshFaceMaterial(matArray);
    // this.initCube2(100,100,100,faceMaterial,function () {
    // });

    sphereMesh = new THREE.Mesh(
        new THREE.SphereGeometry(10,10,10),
      new THREE.MeshLambertMaterial({color:0xff00FF})/*设置球体的材质*/
    ); //材质设定
    sphereMesh.position.set(0,0,0);
    pivotPoint = new THREE.Object3D();
    pivotPoint.add(cube);
    sphereMesh.add(pivotPoint);
    scene.add(sphereMesh);
    sphereMesh.name = 'cubesphere';

    this.pushAction(function () {
      // scene.getObjectByName('cubesphere').rotation.x += 0.1;
      // scene.getObjectByName('cubesphere').rotation.y += 0.1;
      scene.getObjectByName('cubesphere').rotation.z += 0.1;
    });
    //判断左右上下滑动
    new SwipeListener(function (e) {
      // console.log(e)
    });

    this.setThingPostion(cube,100,100,100);
    wx.onTouchMove(function (e) {

      //设置相机角度
      instance.setCameraX(e.touches[0].clientX);
      instance.setCameraY(e.touches[0].clientY);

      //设置物体自传
      instance.setSpeedY(e.touches[0].clientY,cube);
      lastTouchY = e.touches[0].clientY;

      //设置物体自传
      instance.setSpeedX(e.touches[0].clientX,cube);
      lastTouchX = e.touches[0].clientX;

    });
    wx.onTouchStart(function (e) {
      isOnTouchStart = true;
      lastTouchX = onTouchStartClientX = e.changedTouches[0].clientX;
      lastTouchY = onTouchStartClientY = e.changedTouches[0].clientY;
    });
    this.loop();
  }

  //设置相机的位置
  setCameraX(clientX){
    camera.position.x = ( lastTouchX-clientX)/30 + camera.position.x;
  }

  setCameraY(clientY){
    camera.position.y = ( clientY - lastTouchY)/30 + camera.position.y;
    // console.log(camera.position.y);

  }
  setCameraY(clientZ){
    camera.position.z = ( clientZ - lastTouchZ)/30 + camera.position.z;
    console.log(camera.position.z);

  }
  setThingPostion(who,x,y,z){
    who.position.x = x;
    who.position.y = y;
    who.position.z = z;
  }
  setSpeedX(clientX,cube) {

    cube.rotation.y = (2 * Math.PI / width) * (clientX - lastTouchX) + cube.rotation.y;

    if (cube.rotation.y > 2 * Math.PI) {
      cube.rotation.y = 0;
    }
    if (cube.rotation.y < 0) {
      cube.rotation.y = 2 * Math.PI;
    }


  }

  setSpeedY(clientY,cube) {
    cube.rotation.x = (2 * Math.PI / height) * (clientY - lastTouchY) + cube.rotation.x;

    if (cube.rotation.x > 2 * Math.PI) {
      cube.rotation.x = 0;
    }
    if (cube.rotation.x < 0) {
      cube.rotation.x = 2 * Math.PI;
    }
  }


  pushAction(fun) {
    action.push(fun);
    // console.log(action);
  }

  renderAction() {
    for (let i = 0, len = action.length; i < len; i++) {
      action[i]();
    }
  }

  start() {
    this.threeStart();
    // 初始化
    //1. 场景
    // scene = new THREE.Scene();
    //
    // //2. 相机
    // camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //
    // //3. 渲染器
    // renderer = new THREE.WebGLRenderer(ctx);
    // // 有了这三样东西，我们才能够使用相机将场景渲染到网页上去。
    //
    // // 设置渲染器的大小为窗口的内宽度，也就是内容区的宽度
    // renderer.setSize(window.innerWidth, window.innerHeight);
    //
    // // 渲染器renderer的domElement元素，表示渲染器中的画布
    // document.body.appendChild(renderer.domElement);
    // // 将方块放入场景
    // var geometry = new THREE.CubeGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    // camera.position.z = 5;
    //
    // // 画一个点
    // var a = new THREE.Vector3(4,8,9);
    //
    // var point2 = new THREE.Vector3();
    //
    // point2.set(4,8,9);
    //... 其它代码块 ...

    // 开始循环
    // this.loop()
  }

  // UPDATE 更新
  update() {
    // ... 数据更新代码块 ...
  }

  // RENDER 渲染
  render() {

    renderer.clear();


    renderer.render(scene, camera);
    // t++;
    // camera.position.x = 400*Math.cos(t/10);
    // camera.position.y = 400*Math.sin(t/20);
    // camera.position.z = 50*Math.cos(t/10);
    // // 渲染应该使用渲染器，结合相机和场景来得到结果画面。
    // renderer.render(scene, camera);
    // ... 渲染代码块 ...
  }

  // 实现游戏帧循环
  loop() {
    // console.log('=============');
    this.update();
    this.render();
    this.renderAction();
    window.requestAnimationFrame(this.loop.bind(this), canvas)
  }
}