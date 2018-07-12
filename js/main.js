import * as THREE from 'libs/three.js'

let ctx = canvas.getContext('webgl');

let scene;
let renderer;
let camera;
let cube;
let light;
let width;
let height;
let action = new Array();
width = window.innerWidth;
height = window.innerHeight;
// ... 其它变量／常量 ...

/**
 * 游戏主函数
 */
export default class Main {
  constructor() {
    this.start()
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
    camera.position.set(50,100,400);
    // 相机以哪个方向为上方
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.lookAt(new THREE.Vector3(0,0,0));
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

  initLine() {
    // 定义一个几何体geometry
    var geometry = new THREE.Geometry();
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0xFF0000 );

    // 线的材质可以由2点的颜色决定
    var p1 = new THREE.Vector3( 0, 0, 0 );
    var p2 = new THREE.Vector3(  200, 0, 0 );
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    geometry.colors.push( color1, color2 );

    var p1 = new THREE.Vector3( 0, 0, 0 );
    var p2 = new THREE.Vector3(  0, 300, 0 );
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0x00FF00 );
    geometry.colors.push( color1, color2 );
    // '#00FF00'
    //
    var p1 = new THREE.Vector3( 0, 0, 0 );
    var p2 = new THREE.Vector3( 0, 0, 400);
    geometry.vertices.push(p1);
    geometry.vertices.push(p2);
    var color1 = new THREE.Color( 0x444444 ), color2 = new THREE.Color( 0x0000FF );
    geometry.colors.push( color1, color2 );
// 定义一种线条的材质
    var material = new THREE.LineBasicMaterial( { vertexColors: THREE.VertexColors} );
    var line = new THREE.Line( geometry, material, THREE.LineSegments );
    scene.add(line);
  }

  initCube(rotaAction){
    // 将方块放入场景
    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    this.pushAction(rotaAction);
  }
  initCoordinatePlain(){
    var geometry = new THREE.Geometry();
    // B begin
    geometry.vertices.push( new THREE.Vector3( -111, 0, 0 ) );
    geometry.vertices.push( new THREE.Vector3( 111, 0, 0 ) );
    // B end
    for ( var i = 0; i <= 20; i ++ ) {

      var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xF9F9F9, opacity: 1 } ) );
      line.position.z = ( i * 44 );
      scene.add( line );

      var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xF9F9F9, opacity: 1 } ) );
      line.position.x = ( i * 44 );
      line.rotation.y = 90 * Math.PI / 180;
      scene.add( line );

    }
  }
  threeStart(){
    this.initScene();
    this.initCamera();
    this.initRender();

    // this.initLight();
    this.initLine();

    this.initCoordinatePlain();
    // this.initCube(function(){
    //       cube.rotation.x += 0.1;
    //       cube.rotation.y += 0.1;
    // });

    this.loop();
  }




  pushAction(fun){
    action.push(fun);
    // console.log(action);
  }
  renderAction(){
    for (let i=0,len=action.length;i<len;i++){
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