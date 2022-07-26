window.addEventListener("load", () => {
    if (localStorage.getItem("theme")) {
        document.getElementById("theme-select").value = localStorage.getItem("theme")
    } if (!localStorage.getItem("theme")) {
        document.getElementById("theme-select").value = "sync-os"
    }
    
    if (localStorage.getItem("enable-timeremaining") == "true") {
        document.getElementById("enable-timeremaining").checked = true
    } if (!localStorage.getItem("enable-timeremaining")) {
        document.getElementById("enable-timeremaining").checked = false
    }
})

function settingsIgnore() {
    document.getElementById("settings-wrapper").style.display = "none"
}

function settingsDone() {
    document.getElementById("settings-wrapper").style.display = "none"

    if (document.getElementById("enable-timeremaining").checked == true) {
        localStorage.setItem("enableTimeRemaining", true)
        if (document.getElementById("enable-timeremaining-sound").checked == true) {
            localStorage.setItem("enableTimeRemainingSound", true)
        } if (document.getElementById("enable-timeremaining-sound").checked == false) {
            localStorage.setItem("enableTimeRemainingSound", false)
        }
    } if (document.getElementById("enable-timeremaining").checked == false) {
        localStorage.setItem("enableTimeRemaining", false)
        localStorage.setItem("enableTimeRemainingSound", false)
    }

    if (localStorage.getItem('theme') != document.getElementById("theme-select").value) {
        localStorage.setItem('theme', document.getElementById("theme-select").value)
        location.reload()
    }
}