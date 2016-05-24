/**
 * Created by wslsh on 2016/5/19.
 */
if (!localStorage.classOnCheck) {
    window.stop();
    window.history.back()
}


window.onload = function () {
    // 登陆注册
    headerShow();
    loadCourseData();

    createCourseBlock2(_class.slice(0, 5), container_recommend_box)
};

function loadCourseData() {
    var classOnCheck = JSON.parse(localStorage.classOnCheck);
    var userOnLine = JSON.parse(localStorage.userOnLine);// todo 当用户未登录时 无法获取该项导致报错

    //console.log(classOnCheck);
    console.log(userOnLine);
    //console.log(_user[0]);

    // 载入用户与课程信息
    container_nav.innerHTML = "<h2>" + classOnCheck.direct + " > " + classOnCheck.class + " > " + classOnCheck.hard + " > " + classOnCheck.name + "<h2>";
    container_title_user.getElementsByTagName("img")[0].src = userOnLine.head;
    container_title_user.getElementsByTagName("a")[0].innerText = userOnLine.username;

    page_title.innerText = classOnCheck.name;
    page_hard.innerText = "难度：" + classOnCheck.hard;
    // todo 课程对象的 总时间 与 学习人数 属性


    // 开始学习 or 加入订单
    pay_or_learn.innerText = "加入订单";
    for (var i in range(JSON.parse(userOnLine.paied).length)) {
        if (JSON.parse(userOnLine.paied)[i].name == classOnCheck.name) {
            pay_or_learn.innerText = "开始学习";

            // 开始学习
            pay_or_learn.onclick = function () {
                window.location = "video.html";
            };
            break;
        }
    }

    if (pay_or_learn.innerText == "加入订单") {

        // 加入订单
        pay_or_learn.onclick = function () {
            var unpaid = JSON.parse(userOnLine.unpaied);

            // 判断订单是否重复
            for (var i in range(unpaid.length)) {
                if (unpaid[i].name == classOnCheck.name) {
                    localStorage.userWannaPay = "true";
                    alert("已加入订单");
                    window.location = "study.html";
                    return null;
                }
            }

            // 存入本地存储
            unpaid.push(classOnCheck);
            userOnLine.unpaied = JSON.stringify(unpaid);
            localStorage.userOnLine = JSON.stringify(userOnLine);
            localStorage.userWannaPay = "true";
            window.location = "study.html";
        }
    }
}
