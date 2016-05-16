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
    "前端工具", "Php", "JAVA", "Linux", "Python", "C语言", "C++", "C++", "Go", "C#", "Android", "iOS", "Unity3D", "Coco2d-x", "Premiere",
    "MongoDB", "云计算", "Oracle", "大数据", "SQL Server", "PhotoShop", "Maya"
];

var name_2 = [
    "基础", "强化", "深入"
];


var _direct_1 = [
    "HTML/CSS", "JavaScript", "CSS3", "HTML5", "jQuery", "AngularJS", "Node.js", "Bootstrap", "前端工具"
];
var _direct_2 = [
    "Webapp", "Php", "JAVA", "Python", "C语言", "C++", "C++", "Go", "C#"
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

function range(num) {
    var list = [];
    for (var i = 0; i < num; i++) {
        list[i] = i;
    }
    return list
}


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

function UserData(_username, _password, _email) {
    this.username = _username;
    this.password = _password;
    this.email = _email;
    this.money = 999999;
    this.studytime = 999999;
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
