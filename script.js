// 🌙 搜索库
const data = [
    { key: "蓓蓓今晚有好梦", img: "images/beibei.jpg" },
    { key: "弗里餐厅", img: "images/canting.jpg" },
    { key: "club酒吧", img: "images/club.jpg" },
    { key: "合德大学", img: "images/daxue.jpg" },
    { key: "福定西", img: "images/fudingxi.jpg" },
    { key: "高析羽", img: "images/gaoxiyu.jpg" },
    { key: "陈宏 信科", img: "images/gongsi.jpg" }
];

// 🔍 搜索函数
function search() {
    const input = document.getElementById("input").value.trim().toLowerCase();
    const resultDiv = document.getElementById("result");
    const tip = document.getElementById("tip");

    resultDiv.innerHTML = "";

    if (input === "") {
        tip.innerText = "请输入关键词";
        return;
    }

    let results = [];

    data.forEach(item => {
        let words = item.key.toLowerCase().split(" ");

        words.forEach(word => {
            if (
                word.includes(input) ||
                input.includes(word) ||
                editDistance(input, word) <= 1
            ) {
                results.push(item.img);
            }
        });
    });

    if (results.length === 0) {
        tip.innerText = "查无此信息，请更换关键词";
    } else {
        tip.innerText = `找到 ${results.length} 个结果`;

        results.forEach(imgPath => {
            const img = document.createElement("img");
            img.src = imgPath;
            resultDiv.appendChild(img);
        });
    }
}

// ✏️ 编辑距离（和你安卓一样）
function editDistance(a, b) {
    const dp = Array(a.length + 1).fill().map(() =>
        Array(b.length + 1).fill(0)
    );

    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            dp[i][j] =
                a[i - 1] === b[j - 1]
                    ? dp[i - 1][j - 1]
                    : Math.min(
                        dp[i - 1][j] + 1,
                        dp[i][j - 1] + 1,
                        dp[i - 1][j - 1] + 1
                    );
        }
    }

    return dp[a.length][b.length];
}