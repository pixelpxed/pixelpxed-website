window.addEventListener('load', () => {
    console.log("%cWarning!%c\n\nConsole is a very powerful tool.\n\nRunning codes you don't understand can break your Timetable, or worse, steal your personal data.\n\nNever paste and run any code you don't understand.",
                "font-family: sans-serif; font-weight: bold; font-size: 1.5em; color: var(--color-red);",
                "font-family: sans-serif;")

    setNavigationOffset()
    setThemeIcon()
});

function setNavigationOffset() {
    document.getElementById("main").style.marginTop = `${document.getElementById("navigation-bar").offsetHeight}px`
    window.addEventListener('resize', setNavigationOffset)
}

// Set default values when Timetable loads.
function setThemeIcon() {
    if (localStorage.getItem("theme") == "dark") {
        document.documentElement.classList = "dark";
        return document.getElementById("theme-switch").textContent = "light_mode"
    } if (localStorage.getItem("theme") == "light") {
        document.documentElement.classList = "light";
        return document.getElementById("theme-switch").textContent = "dark_mode"
    } else {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
            document.documentElement.className = 'light';
        } if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.className = 'dark';
        }
    }
}

// Function for swapping color themes.
function swapTheme() {
    if (document.documentElement.classList != 'dark') {
        localStorage.setItem("theme", "dark")
        document.getElementById("theme-switch").textContent = "light_mode"
        return document.documentElement.className = 'dark';
    } if (document.documentElement.classList == 'dark') {
        localStorage.setItem("theme", "light")
        document.getElementById("theme-switch").textContent = "dark_mode"
        return document.documentElement.className = 'light';
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
            <a class="notification-close" onclick="this.parentNode.remove()">
                <span class="material-symbols-outlined">
                    close
                </span>
            </a>
        </div>
    `);
}

function popupConfirm(title, content, answerTrue, answerFalse) {
    disableScrollbar()

    document.getElementById("popup-confirm-title").innerHTML = title
    document.getElementById("popup-confirm-content").innerHTML = content

    document.getElementById("full-page-overlay").style.display = "block"
    document.getElementById("popup-type-confirm").style.display = "block"

    document.getElementById("popup-confirm-true").addEventListener("click", () => {
        popupConfirmDone()
        enableScrollbar()
        answerTrue()
    })
    document.getElementById("popup-confirm-false").addEventListener("click", () => {
        popupConfirmDone()
        enableScrollbar()
        answerFalse()
    })
    
    
}

function popupConfirmDone() {
    document.getElementById("full-page-overlay").style.display = "none"
    document.getElementById("popup-type-confirm").style.display = "none"
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