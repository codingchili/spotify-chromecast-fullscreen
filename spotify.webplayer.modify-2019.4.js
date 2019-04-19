// grab the root view of the player.
function getCurrentTrack() {
    let view = document.getElementsByClassName('NowPlayingView')[0];
    let key = Object.keys(view).filter(e => e.includes('__reactInternalInstance'));

    // get the state props, for the track data.
    return view[key].return.stateNode.props.track;
}

function getPlayer() {
    return document.getElementsByClassName('Root__now-playing-bar')[0];
}
function movePlayerBarToTop() {
    // move the player from the bottom to the top.
    getPlayer().style.setProperty("height", "100%");
}

function getAlbumArt() {
    return document.getElementById('chromecast-album-art');
}

// add the big albumart in the center of the screen.
function openAlbumArt() {
    var art = document.createElement('img');
    art.id = 'chromecast-album-art';
    art.src = getCurrentTrack().album.images[0].url;
    art.onclick = uninstall;
    art.style.cssText = `width: 640px;
        z-index: 999;
        cursor: pointer;
        height: 640px;
        left: 0px;
        right: 0px;
        top: 0px;
        position: absolute;
        margin: auto;
        bottom: 0px;`;

    document.body.appendChild(art);
}

function uninstall() {
    // show the scroll again.
    document.body.style.removeProperty("overflow-y");

    // move the player to the bottom again.
    getPlayer().style.removeProperty("height");

    // remove the album art image.
    document.body.removeChild(getAlbumArt());
}

function install() {
    // for some reason the page becomes super long, hack it away.
    document.body.style.setProperty("overflow-y", "hidden");

    movePlayerBarToTop();
    openAlbumArt();

    let lastTrack = getCurrentTrack();

    // make sure to update the track image every 1s if changed.
    let timer = setInterval(() => {
        let currentTrack = getCurrentTrack();
        if (lastTrack.id !== currentTrack.id) {
            let image = getAlbumArt();
            if (image) {
                console.log(`updating image src to ${currentTrack.album.images[0].url}`);
                image.src = currentTrack.album.images[0].url;
                console.log(currentTrack);
            } else {
                // the album art image has been removed, stop this timer.
                window.clearInterval(timer);
            }
            lastTrack = currentTrack;
        }
    }, 1000);
}

document.getElementsByClassName('navBar-header')[0].onclick = install;
