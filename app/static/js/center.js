/**
 * Created by wslsh on 2016/5/16.
 */

window.onload = function () {
    // 登陆注册
    headerShow();
    // 创建标签
    createClassTag(direct_0);
    // 初始化显示课程
    createCourseData();
    createCourseBlock(_class);
    createCourseBlock2(_class.slice(0, 5), container_recommend_box);
    // 设置分页
    SetPage();
    switchPageByIndex(1);

    // 方向标签点击
    container_nav_box_direct.onclick = function () {
        changeClassTag(event);
        setTagStyle(container_nav_box_hard.getElementsByTagName("a")[0]);
        selectDirectBlock(event);
        SetPage();
        //container_show_button.onclick = function () {     //container_show_button 由 SetPage() 创建
        //    switchPage(event);
        //};

    };


    // 分类标签点击
    container_nav_box_class.onclick = function () {
        setTagStyle(event.target);
        setTagStyle(container_nav_box_hard.getElementsByTagName("a")[0]);
        selectClassBlock(event);
        SetPage();


    };

    // 难度标签点击
    container_nav_box_hard.onclick = function () {
        setTagStyle(event.target);
        selectHardBlock(event);
        SetPage();


    };


    // 翻页按钮点击
    container_show_button.onclick = function () {     //container_show_button 由 SetPage() 创建
        switchPage(event);
    };
    //console.log(_class);
};


// 生成分类标签
function createClassTag(list) {
    var box = document.getElementById("container_nav_box_class").getElementsByTagName("ul")[0];
    var frag = document.createDocumentFragment();

    box.innerHTML = "";

    // "全部" 标签
    var tag_0 = document.createElement("li");
    tag_0.innerHTML = "<a style='background: black;color: white'>全部</a>";

    frag.appendChild(tag_0);

    // 其余标签
    for (var i in range(list.length)) {
        for (var j in range(list[i].length)) {
            var tag = document.createElement("li");
            tag.innerHTML = "<a>" + list[i][j] + "</a>";
            frag.appendChild(tag);
            //console.log(tag)
        }
    }
    box.appendChild(frag);
}


// 设置标签样式
function setTagStyle(a) {
    if (a.tagName == "A") {

        //console.log(a.parentNode.parentNode.getElementsByTagName("a"));
        var tags = a.parentNode.parentNode.getElementsByTagName("a");
        for (var i in range(tags.length)) {
            tags[i].style.color = "black";
            tags[i].style.background = "white";
        }
        a.style.color = "white";
        a.style.background = "black";
    }

}


// 点击方向标签 筛选
function changeClassTag(evt) {
    //console.log(evt.target.tagName);

    //var box1 = document.getElementById("container_nav_box_direct").getElementsByTagName("ul")[0];
    var box2 = document.getElementById("container_nav_box_class").getElementsByTagName("ul")[0];

    // 判断事件目标为标签点击
    if (evt.target.tagName == "A") {
        var tags = container_nav_box_direct.getElementsByTagName("a");
        var frag = document.createDocumentFragment();

        // 设置标签样式
        setTagStyle(evt.target);

        // 找到被选中标签
        for (var i in range(tags.length)) {
            if (tags[i].style.color == "white") {
                var index = i;
                //console.log(i);
                break;
            }
        }

        // 移除所有分类标签
        box2.innerHTML = "";

        // 重新生成新标签
        //console.log(direct_0[index - 1]);
        if (index == 0) {
            createClassTag(direct_0);
        } else {
            var tag_0 = document.createElement("li");
            tag_0.innerHTML = "<a style='background: black;color: white'>全部</a>";
            frag.appendChild(tag_0);
            for (var i in range(direct_0[index - 1].length)) {
                var tag = document.createElement("li");
                tag.innerHTML = "<a>" + direct_0[index - 1][i] + "</a>";
                frag.appendChild(tag);
                //console.log(tag)
                box2.appendChild(frag);
            }
        }
    }
}


// 传入对象数组 创建课程内容
function createCourseBlock(list) {
    //todo 生成课程列表
    container_show_content.innerHTML = "";

    //console.log(_class);

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

        container_show_content.appendChild(block);
        // todo 分页
    }

}


// 选择 方向 创建课程内容
function selectDirectBlock(evt) {
    if (evt.target.tagName == "A") {
        if (evt.target.innerText == "全部") {
            createCourseBlock(_class);

        } else {
            var direct = evt.target.innerText;
            var _class_0 = [];
            for (var i in range(_class.length)) {
                if (_class[i].direct == direct) {
                    _class_0.push(_class[i]);
                }
            }
            createCourseBlock(_class_0);
        }


    }
}


// 选择 分类 创建课程内容
function selectClassBlock(evt) {
    if (evt.target.tagName == "A") {

        // 点击 全部 分类标签
        if (evt.target.innerText == "全部") {
            var a = container_nav_box_direct.getElementsByTagName("a");

            // 找到被选中的 方向标签
            for (var i in range(a.length)) {
                if (a[i].style.background == "black") {
                    var direct = a[i].innerText;
                    break;
                }
            }

            if (direct == "全部") {
                createCourseBlock(_class);

            } else {
                // 找到与 方向标签符合的 课程
                var _class_1 = [];
                for (var i in range(_class.length)) {
                    if (_class[i].direct == direct) {
                        _class_1.push(_class[i]);
                    }
                }

                // 插入 课程
                createCourseBlock(_class_1);
            }


        } else {
            // 点击 非 全部 分类标签

            // 找到 this.class 与 分类标签 相符的 课程
            var cls = evt.target.innerText;
            var _class_0 = [];
            for (var i in range(_class.length)) {
                if (_class[i].class == cls) {
                    _class_0.push(_class[i]);
                }
            }
            // 插入 课程
            createCourseBlock(_class_0);
        }


    }

}


// 选择 难度 创建课程内容
function selectHardBlock(evt) {
    if (evt.target.tagName == "A") {

        var a = container_nav_box_class.getElementsByTagName("a");
        var a_1 = container_nav_box_direct.getElementsByTagName("a");
        var hard = evt.target.innerText;

        // 找到 被选中的 方向标签
        for (var i in range(a_1.length)) {
            if (a_1[i].style.background == "black") {
                var direct = a_1[i].innerText;
                break;
            }
        }

        // 找到 被选中的 分类标签
        for (var i in range(a.length)) {
            if (a[i].style.background == "black") {
                var cls = a[i].innerText;
                //console.log(cls);


                break;
            }
        }

        var _class_1 = [];
        for (var i in range(_class.length)) {
            if (_class[i].class == cls) {

                _class_1.push(_class[i]);
            }
        }


        if (evt.target.innerText == "全部") {

            if (cls == "全部") {
                if (direct == "全部") {
                    createCourseBlock(_class);
                } else {
                    // 全部 分类 非全部方向时
                    var _class_2 = [];
                    for (var i in range(_class.length)) {
                        if (_class[i].direct == direct) {
                            _class_2.push(_class[i]);
                        }
                    }
                    console.log(_class_2);
                    createCourseBlock(_class_2);
                }

            } else {
                createCourseBlock(_class_1);
            }

        } else {

            if (cls == "全部") {
                //todo 分类标签为全部时

                if (direct == "全部") {
                    // 方向标签为全部时
                    var _class_3 = [];
                    for (var i in range(_class.length)) {
                        if (_class[i].hard == hard) {
                            _class_3.push(_class[i]);
                        }
                    }
                    createCourseBlock(_class_3);
                } else {
                    //todo 方向标签为非全部时
                    var _class_4 = [];
                    for (var i in range(_class.length)) {
                        if (_class[i].direct == direct) {
                            _class_4.push(_class[i]);
                        }
                    }
                    //console.log(_class_4[0].name);
                    var _class_5 = [];
                    for (var j in range(_class_4.length)) {
                        console.log(_class_5);

                        if (_class_4[j].hard == hard) {

                            _class_5.push(_class_4[j]);
                        }
                    }
                    console.log(_class_5[0].name);

                    createCourseBlock(_class_5);

                }
            } else {
                //分类标签为非全部时
                var _class_0 = [];
                for (var i in range(_class_1.length)) {
                    if (_class_1[i].hard == hard) {
                        _class_0.push(_class_1[i]);
                    }
                }
                createCourseBlock(_class_0);
            }
        }
    }


}


// 课程分页
function SetPage() {


    var courses = container_show_content.getElementsByClassName("_course");
    if (document.getElementById("container_show_button")) {
        container_show.removeChild(container_show_button);
    }

    if (courses.length > 15) {

        // 计算页数
        var page = (courses.length % 15) == 0 ? (courses.length / 15) : parseInt(courses.length / 15 + 1);

        // 创建 翻页按钮
        var page_box = document.createElement("div");
        var button_before = document.createElement("a");
        var button_after = document.createElement("a");
        page_box.className = "_button_page";
        page_box.id = "container_show_button";

        // 上一页
        button_before.innerText = "上一页";
        page_box.appendChild(button_before);

        // 数字页码
        for (var i in range(page)) {
            var button = document.createElement("a");
            if (i == 0) {
                button.style.fontWeight = "900";
            }
            button.innerText = Number(i) + 1;
            //console.log(button);
            page_box.appendChild(button);
        }

        // 下一页
        button_after.innerText = "下一页";
        page_box.appendChild(button_after);
        //console.log(page_box);

        // 插入文档
        container_show.appendChild(page_box);
    }

    // 给按钮绑定事件
    try {// todo 将 try 内容封装函数
        // 有可能课程数量未满一页 不创建翻页按钮 导致事件绑定失败
        container_show_button.onclick = function () {     //container_show_button 由 SetPage() 创建
            switchPage(event);
        };
    } catch (e) {
    }

}


// 通过 页数 切换页面
function switchPageByIndex(index) {
    var courses = container_show_content.getElementsByClassName("_course");

    var top = -(index - 1) * 510 + "px";

    for (var i in range(courses.length)) {
        courses[i].style.position = "relative";
        courses[i].style.top = top;
    }
}


// 切换页面
function switchPage(evt) {
    if (evt.target.tagName == "A") {
        var buttons = container_show_button.getElementsByTagName("a");

        // 找到标记 并清空
        for (var i in range(buttons.length)) {
            if (buttons[i].style.fontWeight == "900") {
                var index_0 = i;

            }
            buttons[i].style.fontWeight = "500";
        }


        // 点击 上一页
        if (evt.target.innerText == "上一页") {
            if (index_0 > 1) {
                //console.log(index_0);

                switchPageByIndex(index_0 - 1);
                buttons[index_0 - 1].style.fontWeight = "900";
            } else {
                buttons[1].style.fontWeight = "900";
            }

            // 点击 下一页
        } else if (evt.target.innerText == "下一页") {
            //todo
            if (index_0 < buttons.length - 2) {
                index_0 = Number(index_0);
                console.log(index_0 + 1);

                switchPageByIndex(Number(index_0) + 1);
                buttons[index_0 + 1].style.fontWeight = "900";
            } else {
                buttons[buttons.length - 2].style.fontWeight = "900";
            }

            // 点击 数字页码
        } else {
            var index = Number(evt.target.innerText);
            switchPageByIndex(index);
            evt.target.style.fontWeight = "900";
        }
    }
}


// 推荐课程
function createCourseBlock2(list, box) {
    //生成课程列表

    box.innerHTML = "";

    //console.log(_class);

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


// 点击课程 跳转页面
function classLink(evt) {

    if (evt.target.tagName == "P") {

        // 找到 课程对象
        var name = evt.target.innerText;
        for (var i in range(_class.length)) {
            if (_class[i].name == name) {
                var classOnCheck = _class[i];
                break;
            }
        }

        // 清空本地储存 写入课程对象
        localStorage.removeItem("classOnCheck");
        localStorage.classOnCheck = JSON.stringify(classOnCheck);
        //console.log(localStorage.classOnCheck);

        // 跳转页面
        window.open("./class.html")
    }
}
