var curtheme = 'dark'

window.onload = function() {
    document.getElementById("version").innerHTML = versionnumber
    document.getElementById("year").innerHTML = copyrightyear

    if (japanesechinese == true) {
        document.getElementById("navbar-right").style.display = "block"
    }

    var choosesubjid = null

    onstartsetup()
    joiningsystem()

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        curtheme = 'light';
    } 
}

setInterval(() => {
    var today = new Date();
    var day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][today.getDay()];
    var date = today.getDate();
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][today.getMonth()];
    var year = today.getFullYear();

    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    document.getElementById("clock").innerHTML = `${h > 9 ? h : "0" + h}:${m >= 10 ? m : "0" + m}:${s >= 10 ? s : "0" + s}`
    document.getElementById("day").innerHTML = `${day}, ${date > 9 ? date : "0" + date} ${month} ${year}`;
}, 1);

function onstartsetup() {
    var classFilled = 0;
    var timeFilled = 0;
    var rowFilled = 0;
    var bookmarkNumber = 0;

    while (timeFilled != 11) {
        document.getElementById("time" + timeFilled).innerHTML = time[timeFilled];
        timeFilled = timeFilled + 1;
    }

    while (classFilled != 50) {
        document.getElementById(classFilled).innerHTML = classes[classFilled];

        if (document.getElementById(classFilled).innerHTML == "Chinese") {
            choosesubjid = classFilled
        }

        if (document.getElementById(classFilled).innerHTML == "Lunch" || "") {
            document.getElementById(classFilled).classList.add("subjectgrid-darker");
            document.getElementById(classFilled).classList.remove("joinable");
        } if (document.getElementById(classFilled).innerHTML == "") {
            document.getElementById(classFilled).classList.add("subjectgrid-darker");
            document.getElementById(classFilled).classList.remove("joinable");
        } if (document.getElementById(classFilled).innerHTML == "DClass") {
            document.getElementById(classFilled).remove();
            document.getElementById(classFilled - 1).classList.add("dclass");
        }

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

function joiningsystem() {
    document.addEventListener('contextmenu', event => event.preventDefault());

    document.querySelectorAll("a.joinable").forEach(c => {
        var subjecttext = c.innerHTML;
        c.addEventListener("click", () => {
            var o = subj[subjecttext].videocall;

            if (subjecttext == "Japanese") {
                popup(`JAP-01`, `Your teacher should send you a link, please check there!`, `white`)
                return
            }
            
            if (o !== "") {
                console.log(`[SUC-01] Open "${c.innerHTML}" subject video call.`)
                return window.open(o);
            } if (o == "" || o == null) {
                popup(`NON-02`, `"${c.innerHTML}" subject doesn't have a classroom link.`); 
                return
            }
        }), 
        c.addEventListener("auxclick", () => {
            var o = subj[subjecttext].classroom;
    
            if (o !== "") {
                console.log(`[SUC-02] Open "${c.innerHTML}" subject classroom.`)
                return window.open(o);
            } if (o == "" || o == null) {
                popup(`NON-02`, `"${c.innerHTML}" subject doesn't have a classroom link.`);
                return
            }
        })
    })

    document.querySelectorAll("a.subjectgrid-darker").forEach(c => {
        c.addEventListener("click", () => {
            popup(`BLK-01`, `There's no class here, so there's no video call for you to attend!`, `white`);
        }), 
        c.addEventListener("auxclick", () => {
            popup(`BLK-02`, `There's no class here, so there's no classroom for you to check!`, `white`);
        })
    })
}

function clearSearch() {
    var searchvalue = document.getElementById("searchbar").value
    window.open(`https://www.google.com/search?q=${searchvalue}`).focus
    document.getElementById("searchbar").value = ''
}

function popup(code, msg, status) {
    document.querySelector(".popup").className = "popup";
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

            document.getElementById("code").innerHTML = code;
            document.getElementById("msg").innerHTML = msg;
            document.querySelector(".popup").className = "popup popup-ani";
        });
    });
}

function clearSearch() {
    var searchvalue = document.getElementById("searchbar").value
    window.open(`https://www.google.com/search?q=${searchvalue}`).focus
    document.getElementById("searchbar").value = ''
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