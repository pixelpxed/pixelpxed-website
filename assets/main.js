var curtheme = 'dark'

window.onload = function() {
    console.log("%cWarning\n\n%cBy using this console you can get attacked by what it's called 'Self-XSS.' Never paste and run any codes that you don't understand.\n",
                "text-align: center; font-size: 1.5em; color: red; font-weight: bold;", "text-align: center;")

    document.getElementById("year").innerHTML = "2022"

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        curtheme = 'light';
    } 
}


function popup(code, msg, status) {
    document.querySelector(".popup").className = "popup";
    document.querySelector(".timebar-player").className = "timebar-player"
    window.requestAnimationFrame(function() {
        window.requestAnimationFrame(function() {
            code = code ?? "UKN-00"
            msg = msg ?? "An unknown error occured."

            // Popup box color
            if (status == "white") {
                document.getElementById("popup").style.background = "var(--textcolor)";

                document.getElementById("codewrap").style.color = "var(--alt-textcolor)";
                document.getElementById("code").style.color = "var(--alt-textcolor)";
                document.getElementById("msg").style.color = "var(--alt-textcolor)";
            } if (!status || status != "white") {
                document.getElementById("popup").style.background = "var(--red)";

                document.getElementById("codewrap").style.color = "var(--textcolor)";
                document.getElementById("code").style.color = "var(--textcolor)";
                document.getElementById("msg").style.color = "var(--textcolor)";

                console.error(`[${code}] ${msg}`)
            }

            document.getElementById('popup').style.display = 'block'
            document.getElementById("code").innerHTML = code;
            document.getElementById("msg").innerHTML = msg;
            document.querySelector(".popup").className = "popup popup-ani";
            document.querySelector(".timebar-player").className = "timebar-player timebar-player-ani"
        });
    });
}

function themeswitch() {
    if (curtheme == 'dark') {
        curtheme = 'light';
        document.documentElement.className = 'light';
        return
    } if (curtheme == 'light') {
        curtheme = 'dark';
        document.documentElement.className = 'dark';
        return
    }
}