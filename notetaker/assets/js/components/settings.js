function applyFontSettings() {
    var fontstyle = localStorage.getItem("notetaker-font")

    document.querySelector(".main-edit-title").classList = `main-edit-title main-edit-${fontstyle}`
    document.querySelector(".main-edit-content").classList = `main-edit-content main-edit-${fontstyle}`
    
    if (fontstyle === "custom") {
        return setCustomFont()
    }
}

function applySettings() {
    // Theme
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os");
    } document.querySelector("html").setAttribute("theme", localStorage.getItem("theme"));

    if (localStorage.getItem("notetaker-monospace")) {
        localStorage.removeItem("notetaker-monospace")
    }

    // Monospace Font
    if (!localStorage.getItem("notetaker-font")) {
        localStorage.setItem("notetaker-font", "sansserif")
    } applyFontSettings()

    // Word Count
    if (localStorage.getItem("notetaker-wordcount") != "true") {
        document.querySelector(".word-count").style.display = "none"
    }

    // Monospace Font
    if (localStorage.getItem("notetaker-noContentMargins") == "true") {
        document.querySelector(".editor-wrapper").classList = "editor-wrapper editor-wrapper-fullwidth"
    }
}

function openSettings() {
    toggleFetchPopup('#settings-wrapper', 'settings')
    
    function waitForSettingsFetchDone() {
        if (document.querySelector('#settings-wrapper')) {
            return settings()
        } if (!document.querySelector('#settings-wrapper')) {
            setTimeout(() => {
                waitForSettingsFetchDone()
            }, 1);
        }
    }

    waitForSettingsFetchDone()
}

function saveCustomFont() {
    localStorage.setItem("notetaker-customFont", document.querySelector(".textfield-customfont").value)
    setCustomFont()
    applyFontSettings()
}

function setCustomFont() {
    var customfont = localStorage.getItem("notetaker-customFont", customfont)
    
    document.querySelector(".main-edit-title").style.fontFamily = `"${customfont}", "Outfit", "Sarabun", sans-serif`
    document.querySelector(".main-edit-content").style.fontFamily = `"${customfont}", "Outfit", "Sarabun", sans-serif`
}

// Settings
function settings() {
    // Theme
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        if (element.value == localStorage.getItem("theme")) {
            element.setAttribute("checked", "checked")
        }

        element.addEventListener("change", function (event) {
            document.querySelector("html").setAttribute("theme", event.target.value);
            localStorage.setItem("theme", event.target.value)
        })
    })

    // Font
    document.querySelectorAll("input[name='settings-font']").forEach((element) => {
        if (element.value == localStorage.getItem("notetaker-font")) {
            element.setAttribute("checked", "checked")
        }
    })

    document.querySelectorAll("input[name='settings-font']").forEach((element) => {
        element.addEventListener("change", function (event) {
            localStorage.setItem("notetaker-font", event.target.value)
            applyFontSettings()
        })
    })

    if (localStorage.getItem("notetaker-font") === "custom" || (localStorage.getItem("notetaker-customFont") !== null)) {
        document.querySelector(".textfield-customfont").value = localStorage.getItem("notetaker-customFont")
        applyFontSettings()
    }
    
    // Word Count
    if (localStorage.getItem("notetaker-noContentMargins") == "true") {
        document.querySelector(".settings-nocontentmargins").setAttribute("checked", "checked")
    }

    document.querySelectorAll(".settings-nocontentmargins").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "settings-nocontentmargins") {
                if (event.target.checked) {
                    localStorage.setItem("notetaker-noContentMargins", true)
                    
                    document.querySelector(".editor-wrapper").classList = "editor-wrapper editor-wrapper-fullwidth"
                }
                if (!event.target.checked) {
                    localStorage.setItem("notetaker-noContentMargins", false)

                    document.querySelector(".editor-wrapper").classList = "editor-wrapper"
                }
            }
        })
    })
    
    // Word Count
    if (localStorage.getItem("notetaker-wordcount") == "true") {
        document.querySelector(".settings-wordcount").setAttribute("checked", "checked")
    }

    document.querySelectorAll(".settings-wordcount").forEach((element) => {
        element.addEventListener("click", function (event) {
            if (event.target.name === "settings-wordcount") {
                if (event.target.checked) {
                    localStorage.setItem("notetaker-wordcount", true)
                    
                    document.querySelector(".word-count").style.display = "inline-flex"
                }
                if (!event.target.checked) {
                    localStorage.setItem("notetaker-wordcount", false)

                    document.querySelector(".word-count").style.display = "none"
                }
            }
        })
    })
}

function resetNotetakerSettings() {
    return popupConfirm("Reset Notetaker?", "Are you sure you want to reset Notetaker, your notes data will also be deleted. This action can't be undone!", "resetNotetaker", "returnNothing")
}

function resetNotetaker() {
    var listToDelete = [
        "notetaker-font",
        "notetaker-customFont",
        "notetaker-firstRun",
        "notetaker-notesData",
        "notetaker-wordcount",
        "notetaker-noContentMargins"
    ]

    for (i = 0; i < listToDelete.length; i++) {
        localStorage.removeItem(listToDelete[i])
    }

    return location.href = `?noteid=0`
}

function reloadNotetaker() {
    location.reload()
}