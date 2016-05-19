/**
 * Created by wslsh on 2016/5/8.
 */

window.onload = function () {
    // 载入 登陆注册模块
    headerShow();

    // 轮播图对象
    var loop = new ImgLoop(
        banner_imgList,
        banner_box_button,
        banner_box_img,
        banner_box_left,
        banner_box_right,
        1000);
    loop.run();

    // 走马灯
    workLoop();
    // 学霸墙
    imgMask();
    // 创建课程对象
    createCourseData();
    // 创建推荐课程
    createCourseBlock2(_class.slice(0, 5), what_box_course);
};


var banner_imgList = [
    "static/images/banner0.png",
    "static/images/banner1.png",
    "static/images/banner2.png",
    "static/images/banner3.png"
];


// 轮播图对象
function ImgLoop(imgList, buttonBox, imgBox, leftArr, rightArr, time) {
    this.imgList = imgList; // 图片列表
    this.num = imgList.length; // 图片数量
    this.buttonBox = buttonBox; // 圆点位置
    this.imgBox = imgBox;
    this.time = time; // 图片位置
    var buttons = buttonBox.getElementsByTagName("a");


    // 生成圆点
    this.button = function () {
        var frag = document.createDocumentFragment();
        for (var n in range(this.num)) {
            var button = document.createElement("a");
            button.rel = n;//todo

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
    function setButton(index) {
        for (var i in range(imgList.length)) {
            // 覆盖圆点样式
            buttons[i].style.background = "#747474";
        }
        // 重新设置圆点样式
        buttons[index].style.background = "none";
    }

    // 自动循环index
    this.autoRun = function () {


        for (var n in range(imgList.length)) {
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
            setButton(imgIndex);
            //for (var i in range(imgList.length)) {
            //    // 覆盖圆点样式
            //    buttons[i].style.background = "#747474";
            //}
            //// 重新设置圆点样式
            //buttons[imgIndex].style.background = "none";

            imgIndex += 1;
        }, time);
        //console.log(autoRunLoop);
        //return autoRunLoop
    };

    //  左侧移入
    this.runLeft = function () {
        //alert("left");

        for (var i in range(imgList.length)) {

            if (buttons[i].style.background == "none") {
                var index = i;
                buttons[i].style.background = "#747474";
            }
        }
        index = Number(index) - 1;

        if (index < 0) {
            index = 3
        }
        buttons[index].style.background = "none";

        console.log(index);
        imgBox.src = imgList[Number(index)];
    };

    // 右侧移入
    this.runRight = function () {
        clearInterval(autoRunLoop);//todo 拆分到onmouseover与onmouseout事件中

        for (var i in range(imgList.length)) {
            //console.log(i);
            if (buttons[i].style.background == "none") {
                var index = i;
                console.log(index);


                buttons[i].style.background = "#747474";
            }
        }
        index = Number(index) + 1;

        if (index > 3) {
            index = 0
        }

        console.log(index);
        buttons[Number(index)].style.background = "none";

        imgBox.src = imgList[index];
        //this.autoRun() //todo 再次调用autoRun()
    };


    // 选择圆点切换图片
    this.selectImg = function (event) {
        //console.log(autoRunLoop);
        console.log(event.target.rel);
        clearInterval(autoRunLoop);

        imgBox.src = imgList[Number(event.target.rel)];
        setButton(Number(event.target.rel));


    };
    // 运行
    this.run = function () {

        this.createButton();
        this.autoRun();

        leftArr.onclick = this.runLeft;
        rightArr.onclick = this.runRight;
        leftArr.onmouseover = function () {
            clearInterval(autoRunLoop);
        };
        leftArr.onmouseout = this.autoRun;
        rightArr.onmouseover = function () {
            clearInterval(autoRunLoop);
        };
        rightArr.onmouseout = this.autoRun;
        //buttonBox.onclick = this.selectImg;
        for (var i in range(buttons.length)) {
            buttons[i].onmouseover = this.selectImg;
            buttons[i].onmouseout = this.autoRun;
        }
        imgBox.onmouseover = function () {
            clearInterval(autoRunLoop);
        };
        imgBox.onmouseout = this.autoRun;

        //buttonBox.onmouseout = this.autoRun();
        //imgBox.removeEventListener("load", this.autoRun, true);
    }
}


// 教师介绍 手风琴
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


//  学员作品展示
function workLoop() {
    var loopBoxes = document.getElementById("why_box_work");
    var loopBox = loopBoxes.children[0];

    // 复制元素
    var _loopBox = loopBox.cloneNode(true);
    _loopBox.style.top = "-310px";
    loopBoxes.appendChild(_loopBox);
    //console.log(_loopBox);

    //for (var i in range(loops.length)) {
    //    var _node=loops[i].cloneNode(true);
    //    _node.style.top = "-310px";
    //    _node.style.right = "-10000px";
    //    loopBox.appendChild(_node);
    //}

    // 初始位置
    var left = 0;
    var _left = 950;


    setInterval(function () {
        if (loopBox.offsetLeft < -950) {
            left = 950
        }
        if (_loopBox.offsetLeft < -950) {
            _left = 950
        }
        _left -= 1;
        left -= 1;

        loopBox.style.left = left + "px";
        _loopBox.style.left = _left + "px";
        //console.log(loopBox.offsetLeft);

        //    for (var i in range(loops.length)) {
        //        console.log(loops[i].offsetLeft);
        //        loops[i].style.left = _left + "px";
        //    }
    }, 50)
}


// 学员照片遮罩
function imgMask() {
    var imgBox = document.getElementById("can_content_box");
    var imgs = imgBox.getElementsByTagName("img");
    var frag = document.createDocumentFragment();

    for (var i in range(imgs.length)) {
        var mask = document.createElement("div");
        mask.style.width = imgs[i].width + "px";
        mask.style.height = imgs[i].height + "px";
        mask.style.top = imgs[i].offsetTop + "px";
        mask.style.left = imgs[i].offsetLeft + "px";
        mask.className = "_mask";

        frag.appendChild(mask);
    }
    imgBox.appendChild(frag);
}


function createCourseBlock2(list, box) {
    //生成课程列表

    box.innerHTML = "";

    console.log(_class);

    for (var i in range(list.length)) {

        var block = document.createElement("div");
        var _div = document.createElement("div");
        var _p = document.createElement("p");
        var _img = document.createElement("img");
        var _span_1 = document.createElement("span");
        var _span_2 = document.createElement("span");

        block.className = "_course";
        _p.innerText = list[i].name;
        _div.appendChild(_p);
        _img.src = "static/images/course_line_03.jpg";
        _span_1.innerText = "评分：" + list[i].grade.toFixed(1);
        _span_2.innerText = list[i].follow + "人关注";

        block.appendChild(_div);
        block.appendChild(_img);
        block.appendChild(_span_1);
        block.appendChild(_span_2);

        //绑定点击事件 在本地存储写入课程对象 并跳转页面
        block.onclick = function () {
            classLink(event);
        };

        box.appendChild(block);
    }
}