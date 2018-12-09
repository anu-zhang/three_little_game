import * as THREE from "../libs/three";
import Databus from "./Databus";
import Animation from "./Animation";

let databus = new Databus();
let instance;
let action = new Array();

let chang = databus.cubeChangKuanGao;
let kuan = databus.cubeChangKuanGao;
let gao = databus.cubeChangKuanGao;
// 魔方百科：https://en.wikipedia.org/wiki/Rubik%27s_Cube
// F（前）：当前面向求解器的一侧
// B（背面）：正面对面
// U（向上）：正面上方或顶部的一侧
// D（向下）：与立方体相对的一侧，位于立方体下方
// L（左）：正面左侧的一侧
// R（右）：正面右侧的一侧
// ƒ（前两层）：面向求解器的一侧和相应的中间层
// b（后两层）：与正面相对的一侧和相应的中间层
// u（上两层）：顶层和相应的中间层
// d（向下两层）：底层和相应的中间层
// l（左两层）：前面左侧和相应的中间层
// r（右两层）：正面右侧和相应的中间层
// x（旋转）：旋转R上的整个立方体
// y（旋转）：在U上旋转整个立方体
// z（旋转）：在F上旋转整个立方体
// 27个方块
// 配置六面颜色

let color_F = 0x0000FF;//前面蓝
let color_B = 0x00FF00;//后面绿
let color_R = 0xFF0000;//右面红
let color_L = 0xFF7F00;//左面橙色
let color_U = 0xFFFF00;//上面黄色
let color_D = 0xFFFFFF;//下面白
let matArray = [];

//x 200 y 200 z200
let Y = 0;
let X = 120;
let Z = 240;

//x * y0 z*
// let Y = 0;
// let X = 90;
// let X = 270;
export default class MagicCube {

    constructor() {

        if (instance) {
            return instance;
        }

        instance = this;


        return instance;
    }

    static init() {
        matArray.push(new THREE.MeshBasicMaterial({color: color_R}));//right
        matArray.push(new THREE.MeshBasicMaterial({color: color_L}));//left
        matArray.push(new THREE.MeshBasicMaterial({color: color_U}));//up
        matArray.push(new THREE.MeshBasicMaterial({color: color_D}));//down
        matArray.push(new THREE.MeshBasicMaterial({color: color_F}));//前
        matArray.push(new THREE.MeshBasicMaterial({color: color_B}));//后

        var faceMaterial = new THREE.MeshFaceMaterial(matArray);

        Animation.cube9(databus.scene, chang, kuan, gao, faceMaterial);

        // console.log(MagicCube.getRowIDsByWhosIDAndDirection());
        // MagicCube.actionRow();
    }

    static actionRow(verticalRow, rotateDirection) {
        databus.rotate = true;
        switch (rotateDirection) {
            case 'x':
                if (verticalRow === 'z') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {
                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z -= 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z <= -Math.PI / 2) {
                                    databus.rotate = false;
                                }

                            }
                        }

                    });
                } else if (verticalRow === 'y') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {
                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y += 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y >= Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }
                    });
                }

                break;
            case '-x':
                if (verticalRow === 'z') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {

                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z += 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z >= Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }
                    });
                } else if (verticalRow === 'y') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {
                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y -= 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y <= -Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }

                    });
                }
                break;
            case 'y':
                if (verticalRow === 'x') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {
                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x -= 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x <= -Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }

                    });
                } else if (verticalRow === 'z') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {
                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z += 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z >= Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }

                    });
                }
                break;
            case '-y':
                if (verticalRow === 'x') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {

                            for (var i in databus.rotateCubeID) {

                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x += 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x >= Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }
                    });
                } else if (verticalRow === 'z') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {

                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z -= 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.z <= -Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }
                    });
                }
                break;
            case 'z':
                if (verticalRow === 'x') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {
                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x += 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x >= Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }

                    });
                } else if (verticalRow === 'y') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {

                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y -= 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y <= -Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }
                    });
                }
                break;


            case '-z':
                if (verticalRow === 'x') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {

                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x -= 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.x <= -Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }
                    });
                } else if (verticalRow === 'y') {
                    Animation.pushAction(function () {
                        if (databus.rotate) {

                            for (var i in databus.rotateCubeID) {
                                databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y += 0.02;
                                console.log(databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y);
                                if (databus.pivotPointArray[(databus.rotateCubeID[i])].rotation.y >= Math.PI / 2) {
                                    databus.rotate = false;
                                }
                            }
                        }
                    });
                }
                break;
        }


    }


    static getRotateCubeIDByCubeName(rotateCubeName) {
        var rotateCubeArr = new Array();
        for (let i in rotateCubeName) {
            console.log(rotateCubeName[i]);
            rotateCubeArr.push(databus.cubeIDPositionMap[rotateCubeName[i]]);
        }
        return rotateCubeArr;
    }

    static getRelativeRowByVerticalRowAndTouchCubePosition(verticalRow, touchPosition) {
        var p = 'M';
        switch (verticalRow) {
            case 'x':
                if (touchPosition.x >= (85 - 50)) {
                    p = 'R';
                }
                if (touchPosition.x <= (-85 + 50)) {
                    p = 'L';
                }
                break;
            case 'y':
                if (touchPosition.y >= (85 - 50)) {
                    p = 'U';
                }
                if (touchPosition.y <= (-85 + 50)) {
                    p = 'D';
                }
                break;
            case 'z':
                if (touchPosition.z >= (85 - 50)) {
                    p = 'F';
                }
                if (touchPosition.z <= (-85 + 50)) {
                    p = 'B';
                }
                break;
        }
        return p;

    }


    static getRotateRowByVerticalRowAndRelativeRow(verticalRow, relativeRow) {
        switch (verticalRow) {
            case 'x':
                return MagicCube.cubeRowVerticalXName(relativeRow);
                break;
            case 'y':
                return MagicCube.cubeRowVerticalYName(relativeRow);
                break;
            case 'z':
                return MagicCube.cubeRowVerticalZName(relativeRow);
                break;
        }
    }

    static getVerticalRowByMaybeAndRotaDirect(rotationTwoRows, rotateDirection) {
        // console.log(rotateDirection);
        // console.log(rotateDirection.slice(-1));
        // console.log(rotationTwoRows);
        // // ["Vertical_z", "Vertical_y"] "y"
        // console.log(rotationTwoRows[0].indexOf(rotateDirection.slice(-1)));
        var verticalRow = '';
        if (rotationTwoRows[0].indexOf(rotateDirection.slice(-1)) === -1) {
            verticalRow = rotationTwoRows[0].slice(-1);
        } else {
            verticalRow = rotationTwoRows[1].slice(-1);
        }
        return verticalRow;
        // rotationTwoRows[0].indexOf(rotateDirection.substring(-1));

    }

    static getRotateDirectionByTouchFaceAndTowPosition(touchFace, touchPosition, currentPosition) {
        var x = currentPosition.x - touchPosition.x;
        var y = currentPosition.y - touchPosition.y;
        var z = currentPosition.z - touchPosition.z;
        var rotation = '';
        switch (touchFace) {
            case 'L':
                if (Math.abs(z) > Math.abs(y)) {
                    rotation = 'z';
                    if (z < 0) {
                        rotation = '-z';
                    }
                } else {
                    rotation = 'y';
                    if (y < 0) {
                        rotation = '-y';
                    }
                }
                break;
            case 'R':
                if (Math.abs(z) > Math.abs(y)) {
                    rotation = 'z';
                    if (z < 0) {
                        rotation = '-z';
                    }
                } else {
                    rotation = 'y';
                    if (y < 0) {
                        rotation = '-y';
                    }
                }
                break;
            case 'U':
                if (Math.abs(z) > Math.abs(x)) {
                    rotation = 'z';
                    if (z < 0) {
                        rotation = '-z';
                    }
                } else {
                    rotation = 'x';
                    if (x < 0) {
                        rotation = '-x';
                    }
                }
                break;
            case 'D':
                if (Math.abs(z) > Math.abs(x)) {
                    rotation = 'z';
                    if (z < 0) {
                        rotation = '-z';
                    }
                } else {
                    rotation = 'x';
                    if (x < 0) {
                        rotation = '-x';
                    }
                }
                break;
            case 'F':
                if (Math.abs(y) > Math.abs(x)) {
                    rotation = 'y';
                    if (y < 0) {
                        rotation = '-y';
                    }
                } else {
                    rotation = 'x';
                    if (x < 0) {
                        rotation = '-x';
                    }
                }
                break;
            case 'B':
                if (Math.abs(y) > Math.abs(x)) {
                    rotation = 'y';
                    if (y < 0) {
                        rotation = '-y';
                    }
                } else {
                    rotation = 'x';
                    if (x < 0) {
                        rotation = '-x';
                    }
                }
                break;
        }
        return rotation;
    }

    static getTouchFaceByCube(touchPosition) {
        var touchFace = '';

        switch (Math.round(touchPosition.x)) {
            case 85:
                touchFace = 'R';
                break;
            case -85:
                touchFace = 'L';
                break;
        }

        switch (Math.round(touchPosition.y)) {
            case 85:
                touchFace = 'U';
                break;
            case -85:
                touchFace = 'D';
                break;
        }

        switch (Math.round(touchPosition.z)) {
            case 85:
                touchFace = 'F';
                break;
            case -85:
                touchFace = 'B';
                break;
        }
        return touchFace;
    }

    static getRotationTwoRowsByTouchFace(face) {
        switch (face) {
            case 'L':
                return ['Vertical_z', 'Vertical_y'];
                break;
            case 'R':
                return ['Vertical_z', 'Vertical_y'];
                break;
            case 'U':
                return ['Vertical_x', 'Vertical_z'];
                break;
            case 'D':
                return ['Vertical_x', 'Vertical_z'];
                break;
            case 'F':
                return ['Vertical_x', 'Vertical_y'];
                break;
            case 'B':
                return ['Vertical_x', 'Vertical_y'];
                break;
        }
    }

    static cubeVerticalRowPosition() {
        var posi = {
            'x': ['L', 'M', 'R'],
            'y': ['U', 'M', 'D'],
            'z': ['F', 'M', 'B']
        };
        return posi;
    }

    // 垂直于X
    static cubeRowVerticalXName(posi) {
        switch (posi) {
            case 'L':
                return ['L_4', 'L_5', 'L_6', 'L_1', 'L_2', 'L_3', 'L_7', 'L_8', 'L_9'];
                break;
            case 'M':
                return ['M', 'U_2', 'U_8', 'U_5', 'D_2', 'D_5', 'D_8', 'F_5', 'B_5'];
                break;
            case 'R':
                return ['R_6', 'R_5', 'R_4', 'R_3', 'R_2', 'R_1', 'R_9', 'R_8', 'R_7'];
                break;
            default:
                return 'params L or M or R;';
                break;
        }
    }

    static cubeRowVerticalYName(posi) {
        switch (posi) {
            case 'U':
                return ['U_3', 'U_6', 'U_9', 'U_2', 'U_5', 'U_8', 'U_1', 'U_4', 'U_7'];
                break;
            case 'M':
                return ['M', 'F_4', 'F_5', 'F_6', 'B_4', 'B_5', 'B_6', 'L_5', 'R_5'];
                break;
            case 'D':
                return ['D_8', 'D_5', 'D_2', 'D_7', 'D_4', 'D_1', 'D_9', 'D_6', 'D_3'];
                break;
            default:
                return 'params U or M or R;';
                break;
        }
    }

    static cubeRowVerticalZName(posi) {
        switch (posi) {
            case 'F':
                return ['F_5', 'F_6', 'F_4', 'F_3', 'F_2', 'F_1', 'F_8', 'F_7', 'F_9'];
                break;
            case 'M':
                return ['M', 'U_4', 'U_5', 'U_6', 'D_4', 'D_5', 'D_6', 'L_5', 'R_5'];
                break;
            case 'B':
                return ['B_5', 'B_4', 'B_6', 'B_1', 'B_2', 'B_3', 'B_8', 'B_9', 'B_7'];
                break;
            default:
                return 'params F or M or B;';
                break;
        }
    }
}
// D_8
// D_5
// D_2
// D_7
// D_4
// D_1
// D_9
// D_6
// D_3
//
// R_6
// R_5
// R_4
// R_3
// R_2
// R_1
// R_9
// R_8
// R_7
//
// U_3
// U_6
// U_9
// U_2
// U_5
// U_8
// U_1
// U_4
// U_7
//
// L_4
// L_5
// L_6
// L_1
// L_2
// L_3
// L_7
// L_8
// L_9
//
// B_5
// B_4
// B_6
// B_1
// B_2
// B_3
// B_8
// B_9
// B_7
//
// F_5
// F_6
// F_4
// F_3
// F_2
// F_1
// F_8
// F_7
// F_9