/**
 * Created by wslsh on 2016/5/19.
 */
// 判断是否登陆
if (!localStorage.userOnLine) {
    alert("请先登录");
    window.stop();
    window.history.back()
}


window.onload = function () {
    // 登陆注册
    headerShow();
    // 载入用户信息
    loadUserData();

    // 载入推荐课程
    createCourseBlock2(_class.slice(0, 4), recommend_box);
    for (var i in range(recommend_box.children.length)) {
        recommend_box.children[i].style.margin = "5px"
    }

    // 载入订单信息
    loadPayOrder();

    // 载入老子的课程
    loadLearningCourse();

    // 标签样式
    tag_paid.className = "_tag_choose";
    tag_unpaid.className = "_tag";


    // 切换页面
    user_class.onclick = function () {
        container_right2.style.display = "inline-block";
        container_right1.style.display = "none";
    };
    user_pay.onclick = function () {
        container_right1.style.display = "inline-block";
        container_right2.style.display = "none";
    };


    // todo 点击改变 tag 样式
    tag_paid.onclick = function () {
        tag_paid.className = "_tag_choose";
        tag_unpaid.className = "_tag";
        container_right1_pay_box2.style.display = "none";
        container_right1_pay_box.style.display = "inline-block"
    };
    // todo 点击改变 tag 样式
    tag_unpaid.onclick = function () {
        tag_unpaid.className = "_tag_choose";
        tag_paid.className = "_tag";
        container_right1_pay_box2.style.display = "inline-block";
        container_right1_pay_box.style.display = "none"
    };

    // 结算
    pay_button.onclick = function () {
        // 结算
        takeMyMoney();
    };



    // 由学习中心“加入订单”进入
    if (localStorage.userWannaPay == "true") {
        user_pay.onclick();
        tag_unpaid.onclick();
        localStorage.userWannaPay = "false";
    }
};

// 载入用户数据
function loadUserData() {
    var userOnLine = JSON.parse(localStorage.userOnLine);
    user_head.src = userOnLine.head;
    user_data.innerHTML = "<h2>" + userOnLine.username + "</h2><p>注册日期：2222/22/22</p><p>经验：2222</p><p>排行：22</p>";
    user_money.innerText = userOnLine.money;
}

// 载入订单信息
function loadPayOrder() {
    var unpaids = JSON.parse(JSON.parse(localStorage.userOnLine).unpaied);
    var paids = JSON.parse(JSON.parse(localStorage.userOnLine).paied);
    console.log(unpaids);
    console.log(paids);
    console.log(JSON.parse(localStorage.userOnLine));

    // 清空已购买列表
    pay_box_1.innerHTML = "";

    // 创建已购买列表
    for (var i in range(paids.length)) {
        var div = document.createElement("div");
        var img = document.createElement("img");
        img.src = paids[i].img;
        div.appendChild(img);
        div.innerHTML += "<a><p>" + paids[i].name + "</p></a><p>$" + paids[i].price + "</p><p>$" + paids[i].price + "</p>"
        pay_box_1.appendChild(div);
    }

    // 清空待支付列表
    pay_box_2.innerHTML = "";

    // 创建待支付列表
    var total = 0;
    for (var i in range(unpaids.length)) {
        var _div = document.createElement("div");
        var _img = document.createElement("img");
        _img.src = unpaids[i].img;
        _div.appendChild(img);
        _div.innerHTML += "<a><p>" + unpaids[i].name + "</p></a><p>$" + unpaids[i].price + "</p><p>$" + unpaids[i].price + "</p>"
        pay_box_2.appendChild(_div);
        total += unpaids[i].price;
    }

    // 计算总价
    pay_total.innerHTML = "总计（不含运费）：=$" + total;
}


// 结算 todo 英语水平堪忧 本函数内变量名将 paids 和 paied 混用
function takeMyMoney() {
    var userOnLine = JSON.parse(localStorage.userOnLine);
    var unpaids = JSON.parse(userOnLine.unpaied);
    var paids = JSON.parse(userOnLine.paied);

    // 待支付课程对象 向 已支付 移动
    paids = paids.concat(unpaids);
    unpaids = [];

    // todo 以下两行是世纪大坑
    userOnLine.paied = JSON.stringify(paids);
    userOnLine.unpaied = JSON.stringify(unpaids);

    localStorage.userOnLine = JSON.stringify(userOnLine);
    console.log(JSON.parse(localStorage.userOnLine));

    // 重新载入订单数据
    loadPayOrder();

    // todo 将 userOnline 写入 userData 中以免再次登陆时订单数据丢失

    // 重载在学信息
    loadLearningCourse()
}

// 载入 在学 数据
function loadLearningCourse() {

    var userOnLine = JSON.parse(localStorage.userOnLine);

    createCourseBlock2(JSON.parse(userOnLine.paied), learning_box);

}
