/**
 * Created by wslsh on 2016/5/8.
 */
function range(num) {
    var list = [];
    for (var i = 0; i < num; i++) {
        list[i] = i;
    }
    return list
}

// 轮播图对象
function ImgLoop(imgList) {
    // 图片列表
    this.imgList = imgList;
    // 图片数量
    this.num = imgList.length;
    // 生成圆点
    this.button = function () {
        var frag = document.createDocumentFragment();
        for (var n in range(this.num)) {
            var button = document.createElement("a");
            button.title = n;
            frag.appendChild(button);
        }
        return frag
    };
    // 自动循环
    this.autoRun = function () {
        //todo
    };
    // 左侧移入
    this.runLeft = function () {
        //todo
    };
    // 右侧移入
    this.runRight = function () {
        //todo
    }
}

var imgList = [
    "static/images/banner0.png",
    "static/images/banner1.png",
    "static/images/banner2.png",
    "static/images/banner3.png"
];

var loop = new ImgLoop(imgList);
console.log(loop.button());
var buttonBox = document.getElementById(".banner_box_button");
console.log(buttonBox);