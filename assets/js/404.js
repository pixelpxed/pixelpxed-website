window.onload = function () {
    console.log("%cWarning!%c\n\nConsole is a very powerful tool.\n\nRunning codes you don't understand can steal your personal data.\n\nNever paste and run any code you don't understand.",
        "font-family: sans-serif; font-weight: bold; font-size: 1.5em; color: var(--color-red);",
        "font-family: sans-serif;")

    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os")
    }

    setNavigationOffset()
}

function setNavigationOffset() {
    document.querySelector(".main").style.marginTop = `${document.querySelector(".navigation-bar").offsetHeight}px`
    window.addEventListener('resize', setNavigationOffset)
}