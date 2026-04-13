
// =========================
// 🔐 状态控制（关键！）
// =========================
let unlocked = false;
let step = 0; // 0=第一弹窗 1=密码框 2=已进入

// =========================
// 🌐 云端密码
// =========================
async function getPassword() {
    const res = await fetch("config.json");
    const data = await res.json();
    return data.password;
}

// =========================
// 🌙 数据库
// =========================
const data = [
    { key: "蓓蓓今晚有好梦", img: "images/beibei.jpg" },
    { key: "弗里餐厅", img: "images/canting.jpg" },
    { key: "club酒吧", img: "images/club.jpg" },
    { key: "合德大学", img: "images/daxue.jpg" },
    { key: "福定西", img: "images/fudingxi.jpg" },
    { key: "高析羽", img: "images/gaoxiyu.jpg" },
    { key: "陈宏 信科", img: "images/gongsi.jpg" },
    { key: "小鱼患仔小公主", img: "images/gongzhu.jpg" },
    { key: "孤儿院", img: "images/gueryuan.jpg" },
    { key: "何听雨", img: "images/hetingyuxinliyishen.jpg" },
    { key: "器质性心脏病", img: "images/jiashizheng.jpg" },
    { key: "李克", img: "images/like.jpg" },
    { key: "李克", img: "images/likeshiwusou.jpg" },
    { key: "雀仔麻将馆", img: "images/majiangguan.jpg" },
    { key: "聂云溪", img: "images/nieyunxi.jpg" },
    { key: "罗思 ross", img: "images/ross.jpg" },
    { key: "无名神探", img: "images/shentan.jpg" },
    { key: "硝酸酯类", img: "images/xiaosuanzhi.jpg" },
    { key: "淮阴市实验中学", img: "images/zhongxue.jpg" },

    { key: "高为民", img: "images/gaoweimin.jpg" },
    { key: "好一家便利店", img: "images/bianlidian.jpg" },
    { key: "好一家便利店", img: "images/bianlidain.jpg" },
    { key: "何国威", img: "images/heguowei.jpg" },
    { key: "何曦曦", img: "images/hexixi.jpg" },
    { key: "淮阴市地图 立交桥", img: "images/ditu.jpg" },
    { key: "淮阴市地图 立交桥", img: "images/ditu2.jpg" },
    { key: "淮阴市公交", img: "images/gongjiaozhan.jpg" },
    { key: "蚂蚁 蚂蚁穴", img: "images/mayi.jpg" },
    { key: "秦静怡", img: "images/qinjingyi.jpg" },
    { key: "时闻杂志期刊", img: "images/zazhi.jpg" },
    { key: "张清伊", img: "images/zhangqingyi.jpg" }
];

// =========================
// 🚀 启动
// =========================
window.onload = function () {
    showStep1();
};

// =========================
// 🔥 STEP 1：谢谢眼泪弹窗
// =========================
function showStep1() {

    step = 0;

    document.body.innerHTML = `
        <div class="popup">
            <div class="box">
                <h2>快说谢谢眼泪</h2>
                <button onclick="goStep2()">谢谢</button>
            </div>
        </div>
    `;
}

// =========================
// 🔥 STEP 2：密码输入
// =========================
function goStep2() {

    step = 1;

    document.body.innerHTML = `
        <div class="popup">
            <div class="box">
                <h3>请输入访问密码（🎂）</h3>

                <input id="passwordInput" type="password" placeholder="密码">

                <div class="btns">
                    <button onclick="checkPassword()">确定</button>
                    <button onclick="backToStep1()">取消</button>
                </div>

                <p id="tip"></p>
            </div>
        </div>
    `;
}

// =========================
// 🔄 返回第一步
// =========================
function backToStep1() {
    showStep1();
}

// =========================
// 🔐 验证密码
// =========================
async function checkPassword() {

    const input = document.getElementById("passwordInput").value;
    const tip = document.getElementById("tip");

    const real = await getPassword();

    if (input === real) {
        unlocked = true;
        step = 2;
        showApp();
    } else {
        tip.innerText = "密码错误";
    }
}

// =========================
// 🚀 STEP 3：进入搜索界面
// =========================
function showApp() {

    document.body.innerHTML = `
        <h2>🌙 月刀搜索</h2>

        <input id="input" placeholder="请输入关键词">
        <button onclick="search()">搜索</button>

        <p id="tip"></p>
        <div id="result"></div>

        <div id="overlay" onclick="closeImage()">
            <img id="bigImg">
        </div>
    `;

    // 回车搜索
    document.getElementById("input").addEventListener("keydown", e => {
        if (e.key === "Enter") search();
    });
}

// =========================
// 🔍 搜索
// =========================
function search() {

    if (!unlocked) return;

    const input = document.getElementById("input").value.toLowerCase();
    const result = document.getElementById("result");
    const tip = document.getElementById("tip");

    result.innerHTML = "";

    let res = [];

    data.forEach(item => {
        if (item.key.toLowerCase().includes(input)) {
            res.push(item.img);
        }
    });

    if (res.length === 0) {
        tip.innerText = "查无此信息";
    } else {
        tip.innerText = `找到 ${res.length} 个结果`;

        res.forEach(src => {
            const img = document.createElement("img");
            img.src = src;
            img.onclick = () => showImage(src);
            result.appendChild(img);
        });
    }
}

// =========================
// 🖼 放大图片
// =========================
function showImage(src) {

    let overlay = document.getElementById("overlay");

    overlay.style.display = "flex";
    document.getElementById("bigImg").src = src;
}

function closeImage() {
    document.getElementById("overlay").style.display = "none";
}
