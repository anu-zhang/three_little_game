// 微信小游戏滑动效果实现
export default class SwipeListener {
  constructor(callback) {
    let t = this;
    /*获取起始坐标和id*/
    wx.onTouchStart(function (e) {
      t.x0 = e.changedTouches[0].clientX
      t.y0 = e.changedTouches[0].clientY
      t.startId = e.changedTouches[0].identifier
    })
    /*获取结束坐标和id*/
    wx.onTouchEnd(function (e) {
      t.xt = e.changedTouches[0].clientX
      t.yt = e.changedTouches[0].clientY
      t.endId = e.changedTouches[0].identifier
      /*判断并回调*/
      t._call(callback)
    })
  }
  _call(callback){
    /* 判断是否为同一次触摸，若不是则直接忽略*/
    if(this.endId === this.startId){
      let w = this.xt-this.x0
      let h = this.yt-this.y0
      let k = h/w
      /*不使用1判断斜率，而留有余量，防止误触*/
      if(k>2||k<-2){
        /*滑动20px以上激活，防止误触*/
        if(h<-20) callback('up') /*向上*/
        if(h>20) callback('down') /*向下*/
      }
      if(k<0.5&&k>-0.5) {
        if(w<-20) callback('left') /*向左*/
        if(w>20) callback('right') /*向右*/
      }
    }
  }
}