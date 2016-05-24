/**
 * Created by wslsh on 2016/5/19.
 */
if (!localStorage.userOnLine) {
    alert("请先登录");
    window.stop();
    window.history.back()
}


window.onload = function () {
    // 登陆注册
    headerShow();

    // todo 载入章节


    // 评论分页
    SetPage_0( comment_content, 5, 620, button_box);
    comment_submit.onclick = function () {
        // 评论
        userComment();
        // 分页
        SetPage_0( comment_content, 5, 620, button_box);
    };
};


// 用户评论 todo 评论应写入课程对象中并储存至本地存储 否则刷新将重置评论
function userComment() {
    var comment = comment_box.value;
    var userOnLine = JSON.parse(localStorage.userOnLine);

    // 是否已登陆
    if (!localStorage.userOnLine) {
        alert("请先登录");
        return null;
    }

    // 品论内容是否不为空
    if (comment == "") {
        alert("请输入评论内容");
        return null;
    }

    // 创建评论 DOM 对象
    var comment_div = document.createElement("div");
    var comment_head = document.createElement("img");
    comment_head.src = userOnLine.head;
    comment_div.appendChild(comment_head);
    // todo 发布时间未实现
    comment_div.innerHTML += "<h2>" + userOnLine.username + "</h2><h3>于 <span>2天</span> 前</h3><div></div>";
    comment_div.innerHTML += "<h3>#2</h3><p>" + comment + "</p><span><a></a>[250]<a></a>[88]</span>";

    // 插入文档
    comment_content.insertBefore(comment_div, comment_content.getElementsByTagName("div")[0]);

    // 创建分页按钮
}


// 分页

function switchPageByIndex_0(index, height, content) {
    var top = -(index - 1) * height + "px";
    console.log(content);
    var contents = content.children;
    for (var i in range(contents.length)) {
        contents[i].style.position = "relative";
        contents[i].style.top = top;
    }
}

function switchPage_0(evt, buttonBox, content, height) {
    //todo
    if (evt.target.tagName == "A") {
        var buttons = buttonBox.getElementsByTagName("a");

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

                switchPageByIndex_0(Number(index_0) - 1,height,content);
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

                switchPageByIndex_0(Number(index_0) + 1,height,content);
                buttons[index_0 + 1].style.fontWeight = "900";
            } else {
                buttons[buttons.length - 2].style.fontWeight = "900";
            }

            // 点击 数字页码
        } else {
            var index = Number(evt.target.innerText);
            switchPageByIndex_0(index,height,content);
            evt.target.style.fontWeight = "900";
        }
    }
}

function SetPage_0(content, num, height, buttonBox) {


    var courses = content.children;

    if (buttonBox) {
        buttonBox.innerHTML = "";
    }

    if (courses.length > num) {

        // 计算页数
        var page = (courses.length % num) == 0 ? (courses.length / 6) : parseInt(courses.length / 6 + 1);
        console.log(page);
        // 创建 翻页按钮
        var page_box = document.createDocumentFragment();
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
        button_box.appendChild(page_box);
    }

    // todo 给按钮绑定事件
    try {

        // 有可能课程数量未满一页 不创建翻页按钮 导致事件绑定失败
        buttonBox.onclick = function () {
            switchPage_0(event, buttonBox, content, height);
        };
    } catch (e) {
    }
}
