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
    //user_head
    //user_data
    //user_money
};
function loadUserData() {
    var userOnLine = JSON.parse(localStorage.userOnLine);
    console.log(userOnLine.head);
    user_head.src = userOnLine.head;
    user_data.innerHTML = "<h2>" + userOnLine.username + "</h2><p>注册日期：2222/22/22</p><p>经验：2222</p><p>排行：22</p>";
    user_money.innerText = userOnLine.money;
}