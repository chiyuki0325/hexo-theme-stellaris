const musicListUpdateEvent = new Event('musicListUpdate');
let playlist = [];
const loadMusic = () => {
    const setCookie = (name, value) => {
        const d = new Date;
        d.setTime(d.getTime() + 2592000000);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toUTCString() + ';SameSite=Lax';
    }
    const getCookie = (name) => {
        const v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    }
    const api = 'https://file.yidaozhan.top/api/public/path';
    const downloadURLRoot = 'https://file.yidaozhan.top/d/';
    const paths = [
        '/OneDrive/音乐/歌单/通配符',
        '/OneDrive/音乐/歌单/赛博通配符'
    ]
    playlist = [];
    for (const path of paths) {
        const playlistName = path.split('/').pop();
        if (getCookie(encodeURIComponent(playlistName))) {
            playlist = playlist.concat(
                JSON.parse(window.localStorage.getItem(playlistName))
            );
            continue;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', api, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(
            JSON.stringify({
                path: path,
            })
        );
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const response = JSON.parse(xhr.responseText);
                if (response.code == 200) {
                    let thisPlaylist = [];
                    for (const file of response.data.files) {
                        const fileName = file.name;
                        let songName, artistName;
                        try {
                            songName = fileName.split(' - ')[1].split('.')[0];
                            artistName = fileName.split(' - ')[0];
                        } catch (e) {
                            songName = fileName.split('.')[0];
                            artistName = '未知';
                        }
                        thisPlaylist.push({
                            name: songName,
                            artist: artistName,
                            file: downloadURLRoot + path + '/' + fileName,
                        });
                    }
                    window.localStorage.setItem(
                        playlistName,
                        JSON.stringify(thisPlaylist)
                    );
                    console.log(`Playlist loaded: ${playlistName}`);
                    playlist = playlist.concat(thisPlaylist);
                    dispatchEvent(musicListUpdateEvent);
                    setCookie(encodeURIComponent(playlistName), 'true');
                }
            }
        };
    }
    console.log(`Playlist loaded: ${playlist.length} songs`);
    dispatchEvent(musicListUpdateEvent);
};
const pickRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * playlist.length);
    return playlist[randomIndex];
}
loadMusic();