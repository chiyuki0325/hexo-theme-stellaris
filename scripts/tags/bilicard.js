/* bilicard.js v1 | https://github.com/YidaozhanYa/hexo-theme-stellaris
 * https://github.com/MaxChang3/hexo-bilibili-card
 * {% bilicard v_id %}
 */

'use strict';

const fetch = require('node-fetch')

const imageProxy = "https://images.weserv.nl/?url="
const cardTemplate = ({ v_id, v_cover, v_time, v_title, v_playview, v_danmaku, v_type, v_upname }) =>
    `<link rel="stylesheet" href="/css/bilicard.css">
    <div class="bvideo"><a href="//www.bilibili.com/video/${v_id}" target="_blank">
        <div class="bvideo-box">
            <div class="bvideo-cover">
                <div class="cover-default"></div>
                <div class="bvideo-cover-layer" style="background-image:url(${imageProxy}${v_cover}@320w_200h_1c_!web-space-index-myvideo.webp)">
                    <i class="icon-video"></i>
                </div>
                <span class="duration">${v_time}</span>
            </div>
            <div class="bvideo-info">
                <p class="title">${v_title}</p>
                <p class="card-status">
                    <span class="play-num">
                        <i class="fa fa-youtube-play"></i>
                        <span>${v_playview}</span></span>
                    <span>
                        <i class="fa fa-list-alt"></i>
                        <span>${v_danmaku}</span></span></p>
                <div class="partition">
                    <label class="card-label">${v_type}</label>
                    <label class="up-label"></label>
                    <label class="up-name">${v_upname}</label>
                </div>
                <div class="actions hide"></div>
            </div>
        </div>
    </a></div>`

const convertNum = (num) => (num >= 1E4) ? (num / 1E4).toFixed(1) + "万" : (num)

const toHHMMSS = (second) => [
        Math.floor(second / 3600),
        Math.floor(second / 60) % 60,
        second % 60
    ].map(n => n.toString().padStart(2, 0)).join(':')

const getVideoMessage = async (id) => {
    const type = id.slice(0, 2).toLowerCase()
    const vtype = { 'av': 'aid', 'bv': 'bvid' }[type]
    const url = `https://api.bilibili.com/x/web-interface/view?${vtype}=${type == 'bv' ? id : id.slice(2)}`
    const data = (await (await fetch(url)).json())['data'];
    return data ? {
        v_id: id,
        v_title: data['title'],
        v_time: toHHMMSS(data['duration']),
        v_playview: convertNum(data['stat']['view']),
        v_danmaku: convertNum(data['stat']['danmaku']),
        v_type: "视频",
        v_upname: data['owner']['name'],
        v_cover: data['pic']
    }:{
        v_id: id,
        v_title: "出错了！",
    }
}

hexo.extend.tag.register("bilicard", async (args) => {
    return await cardTemplate(await getVideoMessage(args[0]));
}, { async: true });
