/**
 * Created by wslsh on 2016/5/8.
 */

var banner_imgList = [
    "static/images/banner0.png",
    "static/images/banner1.png",
    "static/images/banner2.png",
    "static/images/banner3.png"
];
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
            if (n == 0) {
                button.style.background = "none";
            }
            frag.appendChild(button);
        }
        return frag
    };

    // 插入圆点
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
        autoRunLoop = setInterval(function () {
            if (imgIndex > 3) {
                imgIndex = 0;
            }
            //console.log(imgIndex);

            imgBox.src = imgList[imgIndex];
            for (var i in range(imgList.length)) {
                // 覆盖圆点样式
                buttons[i].style.background = "#747474";
            }
            // 重新设置圆点样式
            buttons[imgIndex].style.background = "none";

            imgIndex += 1;
        }, this.time);
        //console.log(autoRunLoop);
        //return autoRunLoop
    };

    // todo 左侧移入
    this.runLeft = function () {
        alert(111)
    };

    // todo 右侧移入
    this.runRight = function () {

    };


    //todo 选择圆点切换图片
    this.selectImg = function () {
        console.log(autoRunLoop);

        console.log(111); // todo 载入就运行?
    };
    // todo 运行
    this.run = function () {
        buttonBox.onload = this.createButton();
        imgBox.onload = this.autoRun();
        //leftArr.onclick = this.runLeft();
        //rightArr.onclick = this.runRight();
        buttonBox.onclick = this.selectImg;
        //buttonBox.onmouseout = this.autoRun();
        //imgBox.removeEventListener("load", this.autoRun, true);

    }
}

// 教师介绍
function playAccordion(evt) {
    //console.log(evt.target);

    var accordionBox = document.getElementById("why_box_teacher");
    var accordions = accordionBox.children;

    if (evt.target.style.width == "50px") {
        for (var i in range(accordions.length)) {
            //console.log(accordions[i]);

            accordions[i].style.width = "50px";
            accordions[i].style.backgroundPosition = "center center";
        }
        evt.target.style.width = "auto";
        evt.target.style.backgroundPosition = "left";

    }
    return null
}

// todo 学员作品展示
function workLoop() {
    var loopBox = document.getElementById("why_box_work");
    var loops = loopBox.children;
    console.log(loops);
    for(var i in range(loops.length)){
        loopBox.appendChild(loops[i].cloneNode(true));

    }


    var _left = 0;


    setInterval(function () {
        _left -= 10;


        for (var i in range(loops.length)) {
            //console.log(loops[i].offsetLeft);
            loops[i].style.left = _left+"px";
        }

    }, 100)


}
window.onload = function () {
    var buttonBox = document.getElementById("banner_box_button");
    var imgBox = document.getElementById("banner_box_img");
    var leftArr = document.getElementById("banner_box_left");
    var rightArr = document.getElementById("banner_box_right");
    var loop = new ImgLoop(banner_imgList, buttonBox, imgBox, leftArr, rightArr, 1000);
    loop.run();
    //buttonBox.appendChild(loop.button())
};

