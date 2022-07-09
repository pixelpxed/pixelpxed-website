window.onload = function() {
    // Block non-setup users and non-305.
    if (localStorage.getItem("setupComplete") != "true") {
        return location.href = "../"
    } if (localStorage.getItem("classTimetable") != "305") {
        return location.href = "../?m-not305"
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

    setDefaultValues()

    document.getElementById("opensidebar-btn").style.left = "-100%";

    var classtext = ""; // Default Value
    for (let classfilled = 0; classfilled <= 54; classfilled++) {
        document.getElementById(classfilled).innerHTML = classes_305[classfilled];
        classtext = classes_305[classfilled];

        if (classes_305[classfilled] == "DClass") {
            document.getElementById(`subject${classfilled}`).style.display = "none"
        } if (classes_305[classfilled] == "") {
            document.getElementById(`subject${classfilled}`).style.display = "none"
        }

        if (classtext != "" && classtext != "Lunch" && classtext != "DClass") {
            var video = `https://meet.google.com/${subj_305[classtext].videocall}?authuser=${localStorage.getItem("gaiTimetable")}`

            document.getElementById(`video${classfilled}`).href = video
            document.getElementById(`video${classfilled}`).innerHTML = video
            
            if (subj_305[classtext].videocall == "") {
                document.getElementById(`video${classfilled}`).style.textDecoration = "none"
                document.getElementById(`video${classfilled}`).style.cursor = "default"
                document.getElementById(`video${classfilled}`).innerHTML = "Link Unavailible"
                document.getElementById(`video${classfilled}`).href = "#"
            }

            var classroom = `https://classroom.google.com/u/${localStorage.getItem("gaiTimetable")}/c/${subj_305[classtext].classroom}`

            document.getElementById(`class${classfilled}`).href = classroom
            document.getElementById(`class${classfilled}`).innerHTML = classroom
            if (subj_305[classtext].classroom == "") {
                document.getElementById(`class${classfilled}`).style.textDecoration = "none"
                document.getElementById(`class${classfilled}`).style.cursor = "default"
                document.getElementById(`class${classfilled}`).innerHTML = "Link Unavailible"
                document.getElementById(`class${classfilled}`).href = "#"
            }
        }
    }
}

function setDefaultValues() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList = 'dark';
    }

    if (localStorage.getItem("theme") == "dark") {
        document.documentElement.classList = "dark";
    } if (localStorage.getItem("theme") == "light") {
        document.documentElement.classList = "light";
    }
}

function theme() {
    if (document.documentElement.classList != 'dark') {
        localStorage.setItem("theme", "dark")
        return document.documentElement.className = 'dark';
    } if (document.documentElement.classList == 'dark') {
        localStorage.setItem("theme", "light")
        return document.documentElement.className = 'light';
    }
}

function openSidebar() {
    document.getElementById("opensidebar-btn").style.left = "-100%";
    document.getElementById("sidebar").style.marginLeft = "0";
    if (screen.width > 850) {
        document.getElementById("main").style.marginLeft = "25em";
        return
    };
    document.getElementById("main").style.marginLeft = "0";
}

function closeSidebar() {
    document.getElementById("opensidebar-btn").style.left = "1em";
    document.getElementById("sidebar").style.marginLeft = "-100%";
    document.getElementById("main").style.marginLeft = "0";
}
