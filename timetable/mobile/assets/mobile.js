var curtheme = 'dark'
var language_var = 'primary'

var var_day = var_day_primary 
var var_month = var_month_primary

window.onload = function() {
    console.log("%cWarning\n\n%cBy using this console you can get attacked by what it's called 'Self-XSS,' Do not paste and run any codes that you don't understand.\n",
                "text-align: center; font-size: 1.5em; color: red; font-weight: bold;", "text-align: center;")

    document.getElementById("version").innerHTML = versionnumber
    document.getElementById("year").innerHTML = copyrightyear

    if (japanesechinese == true) {
        document.getElementById("navbar-right").style.display = "block"
    } if (secondarylanguage == true) {
        document.getElementById("changelanguagebtn").style.display = "inline-block"
    }
    
    var choosesubjid = null

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        curtheme = 'light';
    } 

    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(stateCheck);
            document.getElementById("loadingscreen").style.animation = "fadeout 0.3s"
            setTimeout(() => {
                document.getElementById("loadingscreen").remove()
            }, 300)
        }
    }, 1);
}

setInterval(() => {
    var today = new Date();
    var day = var_day[today.getDay()];
    var date = today.getDate();
    var month = var_month[today.getMonth()];
    var year = today.getFullYear();

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    document.getElementById("clock").innerHTML = `${h > 9 ? h : "0" + h}:${m >= 10 ? m : "0" + m}:${s >= 10 ? s : "0" + s}`
    document.getElementById("day").innerHTML = `${day}, ${date > 9 ? date : "0" + date} ${month} ${year}`;
}, 1);

function themeswitch() {
    if (curtheme == 'dark') {
        curtheme = 'light';
        popup(`CNE-03`, `The theme has been changed.`, `white`)
        return document.documentElement.className = 'light';
    } if (curtheme == 'light') {
        curtheme = 'dark';
        popup(`CNE-03`, `The theme has been changed.`, `white`)
        return document.documentElement.className = 'dark';
    }
}

function japanese() {
    document.getElementById(choosesubjid).textContent = "Japanese"
    document.getElementById("jp").style.opacity = "1"
    document.getElementById("ch").style.opacity = "0.5"
    popup(`CNE-01`, `The classes has been swapped.`, `white`)
} function chinese() {
    document.getElementById(choosesubjid).textContent = "Chinese"
    document.getElementById("jp").style.opacity = "0.5"
    document.getElementById("ch").style.opacity = "1"
    popup(`CNE-01`, `The classes has been swapped.`, `white`)
}

function language_swapper() {
    if (language_var == 'primary') {
        language_var = 'secondary';
        popup(`CNE-02`, `The language has been changed.`, `white`)
        return language_secondary()
    } if (language_var == 'secondary') {
        language_var = 'primary';
        popup(`CNE-02`, `The language has been changed.`, `white`)
        return language_primary()
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