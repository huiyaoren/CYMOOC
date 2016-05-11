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
function ImgLoop(imgList, buttonBox, imgBox, leftArr, rightArr, time) {
    this.imgList = imgList; // 图片列表
    this.num = imgList.length; // 图片数量
    this.buttonBox = buttonBox; // 圆点位置
    this.imgBox = imgBox;
    this.time = time; // 图片位置

    // 生成圆点
    this.button = function () {
        var frag = document.createDocumentFragment();
        for (var n in range(this.num)) {
            var button = document.createElement("a");
            button.rel = n; // 未找到更合适属性存放数据 data-*?
            if (n == 0) {
                button.style.background = "none";
            }
            frag.appendChild(button);
        }
        return frag
    };
    this.createButton = function () {
        buttonBox.appendChild(this.button())
    };

    // 自动循环
    this.autoRun = function () {

        var buttons = buttonBox.getElementsByTagName("a");

        for (var n in range(this.num)) {
            if (buttons[n].style.background == "none") {
                var imgIndex = Number(n);
            }
        }
        setInterval(function () {
            if (imgIndex > 3) {
                imgIndex = 0;
            }
            console.log(imgIndex);

            imgBox.src = imgList[imgIndex];
            for (var i in range(this.num)) {
                // todo 覆盖圆点样式
            }
            // todo 重新设置圆点样式
            imgIndex += 1;
        }, this.time)
    };

    // 左侧移入
    this.runLeft = function () {
        leftArr.onclick = function () {
            //todo 左侧点击事件
        }
    };

    // 右侧移入
    this.runRight = function () {
        rightArr.onclick = function () {
            // todo 右侧点击事件
        }
    }
}

var imgList = [
    "static/images/banner0.png",
    "static/images/banner1.png",
    "static/images/banner2.png",
    "static/images/banner3.png"
];
window.onload = function () {
    var buttonBox = document.getElementById("banner_box_button");
    var imgBox = document.getElementById("banner_box_img");
    var leftArr = document.getElementById("banner_box_left");
    var rightArr = document.getElementById("banner_box_right");
    var loop = new ImgLoop(imgList, buttonBox, imgBox, leftArr, rightArr, 2000);
    loop.createButton();
    loop.autoRun();
    //buttonBox.appendChild(loop.button())
};

