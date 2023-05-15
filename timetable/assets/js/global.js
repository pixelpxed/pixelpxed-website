window.addEventListener('load', () => {
    console.log("%cWarning!%c\n\nConsole is a very powerful tool.\n\nRunning codes you don't understand can break your Timetable, or worse, steal your personal data.\n\nNever paste and run any code you don't understand.",
        "font-family: sans-serif; font-weight: bold; font-size: 1.5em; color: var(--color-red);",
        "font-family: sans-serif;")
});

function addNotification(content, type) {
    if (type != "error") {
        var notificationType = "notification-normal"
    }
    if (type == "error") {
        var notificationType = "notification-error"
    }

    document.getElementById("notification-center").insertAdjacentHTML("beforeend", `
        <div class="notification-box ${notificationType}">  
            <div class="notification-content">
                ${content}
            </div>
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
    document.querySelector(".popup-center").insertAdjacentHTML("beforeend", `
    <div id="popup-id-${popupid}" class="popup">
        <div class="popup-wrapper">
            <div class="popup-content">
                <span class="popup-title">${title}</span>
                <span>${content}</span>
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
    popupOpen()
}

function popupOK(title, content, answer) {
    document.querySelector(".popup-center").insertAdjacentHTML("beforeend", `
    <div id="popup-id-${popupid}" class="popup">
        <div class="popup-wrapper">
            <div class="popup-content">
                <span class="popup-title">${title}</span>
                <span>${content}</span>
            </div>
            <div class="popup-buttons-box">
                <div class="popup-buttons-wrapper">
                    <a id="popup-confirm-true" class="popup-button" onclick="popupDone(${popupid}); ${answer}();">OK</a>
                </div>
            </div>
        </div>
    </div>
    `)
    popupOpen()
}

function popupOpen() {
    disableScrollbar()
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