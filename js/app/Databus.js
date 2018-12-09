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
    }
    get cubeChangKuanGao()
    {
        return instance._cubeChangKuanGao;
    }
    get cubeDistance()
    {
        return instance._cubeDistance;
    }
    get cubeIDPositionMap()
    {
        return instance._cubeIDPositionMap;
    }

    get cubeArray()
    {
        return instance._cubeArray;
    }
    get pivotPointArray()
    {
        return instance._pivotPointArray;

    }
    get sphereMesh()
    {
        return instance._sphereMesh;

    }
    set sphereMesh(c)
    {
        instance._sphereMesh = c;

    }
    get pivotPoint()
    {
        return instance._pivotPoint;

    }
    set pivotPoint(c)
    {
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