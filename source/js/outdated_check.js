const judgeOutdated = () => {
    const postMetaTimes = document.getElementById("post-meta").getElementsByTagName("time");
    const postDate = new Date(postMetaTimes[postMetaTimes.length - 1].dateTime);
    const nowDate = new Date();
    //判断这两个日期是否相差三个月以上
    if (nowDate.getFullYear() - postDate.getFullYear() > 0) {
        return true;
    } else return nowDate.getMonth() - postDate.getMonth() > 2;
};


InstantClick.on('change', () => {
    const outdatedEl = document.getElementById("outdated");
    if (outdatedEl !== null) {
        if (judgeOutdated()) {
            outdatedEl.innerText = "，文章内容可能已经过时"
        }
    }
});
