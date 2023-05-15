window.onload = function () {
    console.log("%cWarning!%c\n\nConsole is a very powerful tool.\n\nRunning codes you don't understand can steal your personal data.\n\nNever paste and run any code you don't understand.",
        "font-family: sans-serif; font-weight: bold; font-size: 1.5em; color: var(--color-red);",
        "font-family: sans-serif;")

    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os")
    }

    fetch("/assets/json/common.json")
        .then((res) => res.json())
        .then((json) => {
            document.querySelector(".year").innerHTML = json.copyrightyear
        })
}