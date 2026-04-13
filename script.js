// =========================
// 🔐 状态
// =========================
let unlocked = false;

// =========================
// 🌐 云端密码
// =========================
async function getPassword() {
    const res = await fetch("config.json?t=" + Date.now());
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
window.onload = () => showStep1();

// =========================
// STEP1
// =========================
function showStep1() {
    document.getElementById("app").innerHTML = `
        <div class="popup">
            <div class="box">
                <h2>快说谢谢眼泪</h2>
                <button onclick="showStep2()">谢谢</button>
            </div>
        </div>
    `;
}

// =========================
// STEP2
// =========================
function showStep2() {
    document.getElementById("app").innerHTML = `
        <div class="popup">
            <div class="box">
                <h3>请输入密码</h3>
                <input id="pwd" type="password">
                <div class="btns">
                    <button onclick="checkPassword()">确定</button>
                    <button onclick="showStep1()">返回</button>
                </div>
                <p id="tip"></p>
            </div>
        </div>
    `;
}

// =========================
// 验证
// =========================
async function checkPassword() {
    const input = document.getElementById("pwd").value;
    const real = await getPassword();

    if (input === real) {
        unlocked = true;
        showApp();
    } else {
        document.getElementById("tip").innerText = "密码错误";
    }
}

// =========================
// 主界面
// =========================
function showApp() {
    document.getElementById("app").innerHTML = `
        <h2>🌙 月刀搜索</h2>
        <input id="input" placeholder="输入关键词">
        <button onclick="search()">搜索</button>
        <p id="tip"></p>
        <div id="result"></div>

        <div id="overlay" onclick="closeImage()">
            <img id="bigImg">
        </div>
    `;

    document.getElementById("input").addEventListener("keydown", e => {
        if (e.key === "Enter") search();
    });
}

// =========================
// 搜索
// =========================
function search() {
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

    res = [...new Set(res)];

    if (res.length === 0) {
        tip.innerText = "查无此信息";
    } else {
        tip.innerText = `找到 ${res.length} 个结果`;

        res.forEach(src => {
            const img = document.createElement("img");
            img.src = src + "?t=" + Date.now(); // 🚀 图片防缓存
            img.onclick = () => showImage(src);
            result.appendChild(img);
        });
    }
}

// =========================
// 图片放大
// =========================
function showImage(src) {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";
    document.getElementById("bigImg").src = src;
}

function closeImage() {
    document.getElementById("overlay").style.display = "none";
}