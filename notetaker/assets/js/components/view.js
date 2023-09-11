function setView(mode) {
    if (mode == "read") {
        if (document.querySelector(".main-content").classList.contains("read-view")) {
            if (document.fullscreenElement) {
                document.exitFullscreen()
            }

            elementTitle.setAttribute("contenteditable", "true")
            elementContent.setAttribute("contenteditable", "true")

            document.querySelector(".links-navigation-bar").style.opacity = "1"
            document.querySelector(".links-navigation-bar").style.pointerEvents = "all"
            return document.querySelector(".main-content").classList.remove("read-view")
        } 
        elementTitle.setAttribute("contenteditable", "false")
        elementContent.setAttribute("contenteditable", "false")

        document.querySelector(".links-navigation-bar").style.opacity = "0"
        document.querySelector(".links-navigation-bar").style.pointerEvents = "none"
        return document.querySelector(".main-content").classList.add("read-view")
    }

    if (mode == "read-fullscreen") {
        if (document.querySelector(".main-content").classList.contains("read-fullscreen-view")) {
            document.querySelector(".main-content").classList.remove("read-fullscreen-view")
            document.querySelector(".read-fullscreen-button").innerHTML = "fullscreen"
            return toggleFullScreen(document.querySelector(".main-content"))
        } 
        document.querySelector(".main-content").classList.add("read-fullscreen-view")
        document.querySelector(".read-fullscreen-button").innerHTML = "fullscreen_exit"
        return toggleFullScreen(document.querySelector(".main-content"))
    }
}

function toggleFullScreen(element) {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}