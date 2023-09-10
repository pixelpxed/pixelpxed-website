function setView(mode) {
    if (mode == "read") {
        if (document.querySelector(".main-content").classList.contains("read-view")) {
            // document.exitFullscreen()

            elementTitle.setAttribute("contenteditable", "true")
            elementContent.setAttribute("contenteditable", "true")

            document.title = elementTitle.innerHTML
            document.querySelector(".links-navigation-bar").style.opacity = "1"
            document.querySelector(".links-navigation-bar").style.pointerEvents = "all"
            return document.querySelector(".main-content").classList.remove("read-view")
        } 
        elementTitle.setAttribute("contenteditable", "false")
        elementContent.setAttribute("contenteditable", "false")

        document.title = `[Read] ${elementTitle.innerHTML}`
        document.querySelector(".links-navigation-bar").style.opacity = "0"
        document.querySelector(".links-navigation-bar").style.pointerEvents = "none"
        return document.querySelector(".main-content").classList.add("read-view")
    }

    // if (mode == "read-fullscreen") {
    //     if (document.querySelector(".main-content").classList.contains("read-fullscreen-view")) {
    //         document.querySelector(".main-content").classList.remove("read-fullscreen-view")
    //         document.querySelector(".read-fullscreen-button").innerHTML = "fullscreen"
    //         return document.exitFullscreen()
    //     } 
    //     document.querySelector(".main-content").classList.add("read-fullscreen-view")
    //     document.querySelector(".read-fullscreen-button").innerHTML = "fullscreen_exit"
    //     return document.querySelector(".main-content").requestFullscreen()
    // }
}