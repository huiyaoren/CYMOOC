/**
 * Created by wslsh on 2016/5/16.
 */

var _direct = [
    "前端开发",
    "后端开发",
    "移动开发",
    "图像处理",
    "数据处理"
];

var name_1 = [
    "HTML/CSS", "JavaScript", "CSS3", "HTML5", "jQuery", "AngularJS", "Node.js", "Bootstrap", "Webapp",
    "前端工具", "Php", "JAVA", "Linux", "Python", "C语言", "C++", "Go", "C#", "Android", "iOS", "Unity3D", "Coco2d-x", "Premiere",
    "MongoDB", "云计算", "Oracle", "大数据", "SQL Server", "PhotoShop", "Maya"
];

var name_2 = [
    "基础", "强化", "深入"
];


var _direct_1 = [
    "HTML/CSS", "JavaScript", "CSS3", "HTML5", "jQuery", "AngularJS", "Node.js", "Bootstrap", "前端工具"
];
var _direct_2 = [
    "Webapp", "Php", "JAVA", "Python", "C语言", "C++", "Go", "C#"
];
var _direct_3 = [
    "Android", "iOS"
];
var _direct_4 = [
    "Unity3D", "Coco2d-x", "Premiere", "PhotoShop", "Maya"
];
var _direct_5 = [
    "MongoDB", "云计算", "Oracle", "大数据", "SQL Server"
];


var direct_0 = [
    _direct_1,
    _direct_2,
    _direct_3,
    _direct_4,
    _direct_5
];


var _class = [];
var _user = [];


// 创建用户对象
function createUserData() {

    _user[0] = new UserData("admin", "admin", "admin@sina.com");
    _user[1] = new UserData("admin", "admin", "admin@sina.com");

    localStorage.userData = JSON.stringify(_user);
}


function range(num) {
    var list = [];
    for (var i = 0; i < num; i++) {
        list[i] = i;
    }
    return list
}

// 课程 类
function Course(_name, _direct, _class, _hard, _grade, _follow, _img, _price) {
    this.name = _name;
    this.direct = _direct;
    this.class = _class;
    this.hard = _hard;
    this.grade = _grade;
    this.follow = _follow;
    //this.img = _img;
    this.img = "images/course_01.jpg";
}

// 用户 类
function UserData(_username, _password, _email, _head) {
    this.username = _username;
    this.password = _password;
    this.email = _email;
    this.head = "static/images/study/head_01.png";
    this.unpaied = [];
    this.paied = [];
    this.money = 999999;
    this.studytime = 999999;
    this.toString = function () {
        return this.username
    }
}


// 生成课程对象
function createCourseData() {
    var index = 0;
    for (var i in range(direct_0.length)) {
        for (var j in range(direct_0[i].length)) {
            for (var k in range(3)) {
                if (k == 0) {
                    _class[index] = new Course(direct_0[i][j] + name_2[k], _direct[i], direct_0[i][j], "初级", 9.0, 256)
                } else if (k == 1) {
                    _class[index] = new Course(direct_0[i][j] + name_2[k], _direct[i], direct_0[i][j], "中级", 8.0, 156)
                } else {
                    _class[index] = new Course(direct_0[i][j] + name_2[k], _direct[i], direct_0[i][j], "高级", 8.2, 448)
                }
                index += 1;
            }
        }
    }
}

// 事件集合
function headerShow() {

    createUserData();
    showUserData();
    header_box_out.onclick = userOut;

    header_box_sign.onclick = showSign;
    header_box_login.onclick = showLogin;
    _cover.onclick = function () {
        HideLogin();
        HideSign();
    };
    login_submit.onclick = userLogin;
}


// 显示注册页面
function showSign() {
    var box = document.getElementById("header_sign");
    var mask = document.getElementById("_cover");
    mask.style.display = "block";
    box.style.display = "block";
}


// 隐藏注册页面
function HideSign() {
    var box = document.getElementById("header_sign");
    var mask = document.getElementById("_cover");
    mask.style.display = "none";
    box.style.display = "none";
}


// 显示登陆页面
function showLogin() {
    var box = document.getElementById("header_login");
    var mask = document.getElementById("_cover");
    mask.style.display = "block";
    box.style.display = "block"
}


// 隐藏登陆页面
function HideLogin() {
    var box = document.getElementById("header_login");
    var mask = document.getElementById("_cover");
    mask.style.display = "none";
    box.style.display = "none"
}


// todo 用户登录
function userLogin() {
    var username = login_username.value;
    var password = login_password.value;
    var usernameCorrect = false;
    var passwordCorrect = false;

    var userData = JSON.parse(localStorage.userData);

    // 账号不为空
    if (username == "") {
        login_username_label.innerHTML = "<span>请输入账号</span>";
        login_username_label.getElementsByTagName("span")[0].style.display = "inline";
        return null
    }

    // 密码不为空
    if (password == "") {
        login_password_label.innerHTML = "<span>请输入密码</span>";
        login_password_label.getElementsByTagName("span")[0].style.display = "inline";
        return null
    }


    // 账号存在
    for (var i in range(userData.length)) {

        if (userData[i].username == username) {
            usernameCorrect = true;
            var user_0 = userData[i];
        }
    }
    if (usernameCorrect == false) {
        login_username_label.innerHTML = "<span>账号不存在</span>";
        login_username_label.getElementsByTagName("span")[0].style.display = "inline";
        return null
    }

    // 密码正确
    if (password == user_0.password) {
        passwordCorrect = true;
    } else {
        login_password_label.innerHTML = "<span>密码错误</span>";
        login_password_label.getElementsByTagName("span")[0].style.display = "inline";
        return null
    }

    // 载入用户信息
    if (passwordCorrect == true && usernameCorrect == true) {
        localStorage.userOnLine = JSON.stringify(user_0);
        alert("登陆成功");
        showUserData();

    }
}


// 显示用户信息
function showUserData() {

    if (!localStorage.userOnLine) {
        return null
    }
    var userOnLine = JSON.parse(localStorage.userOnLine);

    HideLogin();
    header_box_login.style.display = "none";
    header_box_sign.style.display = "none";

    header_box_user.style.display = "inline-block";
    header_box_out.style.display = "inline-block";

    header_box_user.innerText = userOnLine.username;
}


// 用户注销
function userOut() {

    // 移除 页面用户信息
    header_box_login.style.display = "inline-block";
    header_box_sign.style.display = "inline-block";

    header_box_user.style.display = "none";
    header_box_out.style.display = "none";
    header_box_user.innerText = "";


    // 移除 本地存储用户信息
    localStorage.removeItem("userOnLine");
}


