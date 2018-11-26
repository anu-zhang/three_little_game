let touchInstance;

/**
 * Touch 触摸事件
 * https://developers.weixin.qq.com/minigame/dev/api/system/touch-event/wx.offTouchCancel.html
 *
 * 示例如下：
 * Touch.start(function (e) {
 *    console.log(e);
 * });
 * Touch.start().off();
 *
 */


export default class Touch {

    constructor(str) {
        this.lastAction = str;
        if (touchInstance) {
            return touchInstance;
        }
        touchInstance = this;

        return touchInstance;
    }

    static start(fun = '') {
        switch (fun) {
            case '':
                return new Touch('start');
                break;
            default:
                wx.onTouchStart(function (e) {
                    fun(e);//执行这个函数，在执行这个的时候，会把e传过去
                });
                break;
        }
    }

    static move(fun = '') {
        switch (fun) {
            case '':
                return new Touch('move');
                break;
            default:
                wx.onTouchMove(function (e) {
                    fun(e);//执行这个函数，在执行这个的时候，会把e传过去
                });
                break;

        }
    }

    static end(fun = '') {
        switch (fun) {
            case '':
                return new Touch('end');
                break;
            default:
                wx.onTouchEnd(function (e) {
                    fun(e);//执行这个函数，在执行这个的时候，会把e传过去
                });
                break;

        }
    }

    static cancel(fun = '') {
        switch (fun) {
            case '':
                return new Touch('cancel');
                break;
            default:
                wx.onTouchCancel(function (e) {
                    fun(e);//执行这个函数，在执行这个的时候，会把e传过去
                });
                break;

        }
    }

    off() {
        switch (this.lastAction) {
            case 'start':
                wx.offTouchStart();
                break;
            case 'move':
                wx.offTouchMove();
                break;
            case 'end':
                wx.offTouchEnd();
                break;
            case 'cancel':
                wx.offTouchCancel();
                break;
        }
    }
}