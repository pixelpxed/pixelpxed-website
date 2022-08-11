window.addEventListener('load', () => {
    console.log("%cWarning!%c\n\nConsole is a very powerful tool.\n\nRunning codes you don't understand can break your Timetable, or worse, steal your personal data.\n\nNever paste and run any code you don't understand.",
                "font-family: sans-serif; font-weight: bold; font-size: 1.5em; color: var(--color-red);",
                "font-family: sans-serif;")

    setNavigationOffset()
});

function setNavigationOffset() {
    document.getElementById("main").style.marginTop = `${document.getElementById("navigation-bar").offsetHeight}px`
    window.addEventListener('resize', setNavigationOffset)
}

// Set default values when Timetable loads.
function setThemeIcon() {
    document.documentElement.classList = localStorage.getItem("theme");
    if (localStorage.getItem("theme") == "dark") {
        return document.getElementById("theme-switch").textContent = "light_mode"
    } if (localStorage.getItem("theme") == "light") {
        return document.getElementById("theme-switch").textContent = "dark_mode"
    }
}

// Function for swapping color themes.
function swapTheme() {
    if (localStorage.getItem("theme") === "dark") {
        localStorage.setItem("theme", "dark")
        document.getElementById("theme-switch").textContent = "light_mode"
        return document.documentElement.className = 'dark';
    } if (localStorage.getItem("theme") === "light") {
        localStorage.setItem("theme", "light")
        document.getElementById("theme-switch").textContent = "dark_mode"
        return document.documentElement.className = 'light';
    } if (localStorage.getItem("theme") === "sync-os") {
        return
    }
}

function addNotification(content, type) {
    if (type != "error") {
        var notificationType = "notification-normal"
    } if (type == "error") {
        var notificationType = "notification-error"
    }

    document.getElementById("notification-center").insertAdjacentHTML("beforeend", `
        <div class="notification-box ${notificationType}">  
            <p class="notification-content">
                ${content}
            </p>
            <a class="notification-close" onclick="this.parentNode.classList.add('notification-box-out'); setTimeout(() => {this.parentNode.remove()}, 200);">
                <span class="material-symbols-outlined">
                    close
                </span>
            </a>
        </div>
    `);
}

var popupid = 0
function popupConfirm(title, content, answerTrue, answerFalse) {
    disableScrollbar()
    document.querySelector(".full-page-overlay").insertAdjacentHTML("beforebegin", `
    <div id="popup-id-${popupid}" class="popup">
        <div class="popup-wrapper">
            <div class="popup-content">
                <span id="popup-confirm-title" class="popup-title">${title}</span>
                <span id="popup-confirm-content">${content}</span>
            </div>
            <div class="popup-buttons-box">
                <div class="popup-buttons-wrapper">
                    <a id="popup-confirm-true" class="popup-button" onclick="popupDone(${popupid}); ${answerTrue}();">Yes</a>
                    <a id="popup-confirm-false" class="popup-button" onclick="popupDone(${popupid}); ${answerFalse}();">No</a>
                </div>
            </div>
        </div>
    </div>
    `)
    popupid = popupid + 1
    document.getElementById("full-page-overlay").style.display = "block"
}

function popupOK(title, content, answer) {
    disableScrollbar()
    document.querySelector(".full-page-overlay").insertAdjacentHTML("beforebegin", `
    <div id="popup-id-${popupid}" class="popup">
        <div class="popup-wrapper">
            <div class="popup-content">
                <span id="popup-confirm-title" class="popup-title">${title}</span>
                <span id="popup-confirm-content">${content}</span>
            </div>
            <div class="popup-buttons-box">
                <div class="popup-buttons-wrapper">
                    <a id="popup-confirm-true" class="popup-button" onclick="popupDone(${popupid}); ${answer}();">OK</a>
                </div>
            </div>
        </div>
    </div>
    `)
    popupid = popupid + 1
    document.querySelector(".full-page-overlay").style.display = "block"
}

function popupDone(id) {
    document.getElementById(`popup-id-${id}`).remove()
    popupid = popupid - 1

    if (popupid === 0) {
        document.querySelector(".full-page-overlay").style.display = "none"
    }

    enableScrollbar()
}

function disableScrollbar() {
    document.querySelector("body").classList.add("body-disable-scrollbar")
}

function enableScrollbar() {
    document.querySelector("body").classList.remove("body-disable-scrollbar")
}

function returnNothing() {
    return
}