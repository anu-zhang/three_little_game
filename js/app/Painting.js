// 微信小游戏滑动效果实现
import * as THREE from "../libs/three";
import Databus from "../app/Databus";

let instance;
let databus = new Databus();

export default class Painting {

    constructor() {

        if (instance) {
            return instance;
        }

        instance = this;

        return instance;
    }


    static setSpeedY(clientY, cube, lastTouchY) {
        cube.rotation.x = (2 * Math.PI / databus.height) * (clientY - lastTouchY) + cube.rotation.x;

        if (cube.rotation.x > 2 * Math.PI) {
            cube.rotation.x = 0;
        }
        if (cube.rotation.x < 0) {
            cube.rotation.x = 2 * Math.PI;
        }
    }

    static setSpeedX(clientX, cube, lastTouchX) {

        cube.rotation.y = (2 * Math.PI / databus.width) * (clientX - lastTouchX) + cube.rotation.y;

        if (cube.rotation.y > 2 * Math.PI) {
            cube.rotation.y = 0;
        }
        if (cube.rotation.y < 0) {
            cube.rotation.y = 2 * Math.PI;
        }


    }

    static setThingPostion(who, x, y, z) {
        who.position.x = x;
        who.position.y = y;
        who.position.z = z;
    }

    static coordinatePlain(scene) {
        var geometry = new THREE.Geometry();
        // B begin
        geometry.vertices.push(new THREE.Vector3(-1000, 0, 0));
        geometry.vertices.push(new THREE.Vector3(1000, 0, 0));
        // B end
        for (var i = -20; i <= 20; i++) {

            var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xF9F9F9, opacity: 1}));
            line.position.z = (i * 30);
            scene.add(line);

            var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({color: 0xF9F9F9, opacity: 1}));
            line.position.x = (i * 30);
            line.rotation.y = 90 * Math.PI / 180;
            scene.add(line);

        }
    }

    // 画坐标轴

    static axiCoordinates(scene) {
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

    //随机画一些cute在空中
    static initCubee(scene) {
        var geometry = new THREE.BoxBufferGeometry(20, 20, 20);
        for (var i = 0; i < 20; i++) {
            var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({color: Math.random() * 0xffffff}));
            object.position.x = Math.random() * 800 - 400;
            object.position.y = Math.random() * 800 - 400;
            object.position.z = Math.random() * 800 - 400;
            // object.rotation.x = Math.random() * 2 * Math.PI;
            // object.rotation.y = Math.random() * 2 * Math.PI;
            // object.rotation.z = Math.random() * 2 * Math.PI;
            object.scale.x = Math.random() + 0.5;
            object.scale.y = Math.random() + 0.5;
            object.scale.z = Math.random() + 0.5;
            scene.add(object);
        }
    }

    static slight(scene) {
        var light = new THREE.DirectionalLight(0xFF0000, 1.0, 0);
        light.position.set(100, 100, 200);
        scene.add(light);
    }

    // 画了一个三角形
    static react(scene) {
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

}