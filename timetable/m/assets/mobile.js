var curtheme = 'dark'
var language_var = 'primary'

var var_day = var_day_primary 
var var_month = var_month_primary

window.onload = function() {
    onstartsetup()

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

function onstartsetup() {
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

    var classFilled = 0;
    var timeFilled = 0;
    var rowFilled = 0;
    var bookmarkNumber = 0;
    var elementFilled = 0;

    while (timeFilled != 2) {
        document.querySelectorAll("time" + timeFilled).innerHTML = time[timeFilled];
        timeFilled = timeFilled + 1;
    }

    while (classFilled != 11) {
        document.getElementById(classFilled).innerHTML = classes_primary[classFilled];

        if (document.getElementById(classFilled).innerHTML == "Chinese") {
            choosesubjid = classFilled
        }

        if (document.getElementById(classFilled).innerHTML == "Lunch") {
            document.getElementById(classFilled).classList.remove("joinable");
        } if (document.getElementById(classFilled).innerHTML == "Break") {
            document.getElementById(classFilled).classList.remove("joinable");
        } if (document.getElementById(classFilled).innerHTML == "") {
            document.getElementById(classFilled).classList.remove("joinable");
        } if (document.getElementById(classFilled).innerHTML == "DClass") {
            document.getElementById(classFilled).style.display = "none";
            document.getElementById(classFilled - 1).classList.add("dclass");
        }

        var className = classes_primary[classFilled]
        document.getElementById("vdo" + classFilled).href = subj[className].videocall
        document.getElementById("cls" + classFilled).href = subj[className].classroom
        classFilled = classFilled + 1;
    }

    while (rowFilled != 2) {
        row = "row" + rowFilled;
        while (bookmarkNumber != 4) {
            content = "content" + bookmarkNumber;
            bookmarkName = "bookmark" + bookmarkNumber + "-" + rowFilled;
            document.getElementById(bookmarkName).innerHTML = `${bookmarks[row][content].name}<br><a style="color: var(--linkblue);" href="${bookmarks[row][content].url}" target="_blank">Go ›</a>`;
            bookmarkNumber = bookmarkNumber + 1;
        } bookmarkNumber = 0;
        document.getElementById(row).innerHTML = `${bookmarks[row].rowname}`;
        rowFilled = rowFilled + 1;
    }
}

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