// 微信小游戏滑动效果实现
let instance;
export default class Databus {

    constructor() {
        if (instance) {
            return instance;
        }
        instance = this;
        instance._width = window.innerWidth;
        instance._height = window.innerHeight;

        instance._cube = '';
        instance._cube2 = '';

        instance._sphereMesh = '';
        instance._pivotPoint = '';

        instance._cubeArray = new Array();
        instance._pivotPointArray = new Array();

        instance._cubeIDPositionMap = new Object();
        instance._cubeDistance = 60;
        instance._cubeChangKuanGao = 50;
        instance._rotate = false;
        instance._actionRow = new Array();
        instance._runningAction = '';
        instance._speed = 0.2;
        instance._isRunning = false;
    }

    get isRunning() {
        return instance._isRunning;
    }

    set isRunning(c) {
        instance._isRunning = c;
    }

    get speed() {
        return instance._speed;
    }

    set speed(c) {
        instance._speed = c;
    }

    get runningAction() {
        return instance._runningAction;
    }

    set runningAction(c) {
        instance._runningAction = c;
    }

    get actionRow() {
        return instance._actionRow;
    }

    get rotate() {
        return instance._rotate;
    }

    set rotate(v) {
        instance._rotate = v;
    }

    get cubeChangKuanGao() {
        return instance._cubeChangKuanGao;
    }

    get cubeDistance() {
        return instance._cubeDistance;
    }

    get cubeIDPositionMap() {
        return instance._cubeIDPositionMap;
    }

    get cubeArray() {
        return instance._cubeArray;
    }

    get pivotPointArray() {
        return instance._pivotPointArray;

    }

    get sphereMesh() {
        return instance._sphereMesh;

    }

    set sphereMesh(c) {
        instance._sphereMesh = c;

    }

    get pivotPoint() {
        return instance._pivotPoint;

    }

    set pivotPoint(c) {
        instance._pivotPoint = c;

    }

    get cube2() {
        return instance._cube2;
    }

    set cube2(c) {
        instance._cube2 = c;
    }

    get cube() {
        return instance._cube;
    }

    set cube(c) {
        instance._cube = c;
    }

    get width() {
        return instance._width;
    }

    get height() {
        return instance._height;
    }

    set width(w) {
        instance._width = w;
    }

    set height(h) {
        instance._height = h;
    }


}