/**
 * Created by wslsh on 2016/5/16.
 */

window.onload = function () {
    createClassTag(direct_0);
    container_nav_box_class.onclick = function () {
        setTagStyle(event.target);//todo
    };
    container_nav_box_hard.onclick = function () {
        setTagStyle(event.target);//todo
    };
    container_nav_box_direct.onclick = function () {
        changeClassTag(event)
    };
    createCourseData();
    console.log(_class);
};

// 生成标签
function createClassTag(list) {
    var box = document.getElementById("container_nav_box_class").getElementsByTagName("ul")[0];
    var frag = document.createDocumentFragment();

    box.innerHTML = "";

    // "全部" 标签
    var tag_0=document.createElement("li");
    tag_0.innerHTML = "<a>全部</a>";
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
        console.log(direct_0[index - 1]);
        if (index == 0) {
            createClassTag(direct_0);
        } else {
            var tag_0=document.createElement("li");
            tag_0.innerHTML = "<a>全部</a>";
            frag.appendChild(tag_0);
            for (var i in range(direct_0[index - 1].length)) {
                var tag = document.createElement("li");
                tag.innerHTML = "<a>" + direct_0[index - 1][i] + "</a>";
                frag.appendChild(tag);
                //console.log(tag)
                box2.appendChild(frag);
            }
        }

        //todo 生成课程列表
        for (var i in range(_class.length)){
            var block = document.createElement("div");
            var _div = document.createElement("div");
            var _p = document.createElement("p");
            var _img = document.createElement("img");
            var _span_1 = document.createElement("span");
            var _span_2 = document.createElement("span");

            block.className="_course";
            _p.innerText= _class[i].name;
            _div.appendChild(_p);
            _img.src="static/images/course_line_03.jpg";
            _span_1.innerText = "评分："+_class[i].grade.toFixed(1);
            _span_2.innerText = _class[i].follow+"人关注";

            block.appendChild(_div);
            block.appendChild(_img);
            block.appendChild(_span_1);
            block.appendChild(_span_2);

            container_show.appendChild(block);
            // todo
        }
    }
}