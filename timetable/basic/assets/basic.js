window.onload = function() {
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

    document.getElementById("opensidebar-btn").style.display = "none";

    var classfilled = 0;
    var classtext = ""; // Default Value
    while (classfilled != 55) {
        document.getElementById(classfilled).innerHTML = classes_primary[classfilled];
        classtext = classes_primary[classfilled];

        if (classes_primary[classfilled] == "DClass") {
            document.getElementById(`subject${classfilled}`).style.display = "none"
        }

        document.getElementById(`video${classfilled}`).href = subj[classtext].videocall
        document.getElementById(`video${classfilled}`).innerHTML = subj[classtext].videocall
        if (subj[classtext].videocall == "") {
            document.getElementById(`video${classfilled}`).href = "javascript:void(0)"
            document.getElementById(`video${classfilled}`).style.textDecoration = "none"
            document.getElementById(`video${classfilled}`).style.cursor = "default"
            document.getElementById(`video${classfilled}`).innerHTML = "<b style='color: gray;'>Link Unavailible</b>"
        }

        document.getElementById(`class${classfilled}`).href = subj[classtext].classroom
        document.getElementById(`class${classfilled}`).innerHTML = subj[classtext].classroom
        if (subj[classtext].classroom == "") {
            document.getElementById(`class${classfilled}`).href = "javascript:void(0)"
            document.getElementById(`class${classfilled}`).style.textDecoration = "none"
            document.getElementById(`class${classfilled}`).style.cursor = "default"
            document.getElementById(`class${classfilled}`).innerHTML = "<b style='color: gray;'>Link Unavailible</b>"
        }

        classfilled = classfilled + 1
    }
}

function openSidebar() {
    document.getElementById("opensidebar-btn").style.display = "none";
    document.getElementById("sidebar").style.marginLeft = "0";
    if (screen.width > 850) {
        document.getElementById("main").style.marginLeft = "25em";
        return
    };
    document.getElementById("main").style.marginLeft = "0";
}

function closeSidebar() {
    document.getElementById("opensidebar-btn").style.display = "block";
    document.getElementById("sidebar").style.marginLeft = "-100vw";
    document.getElementById("main").style.marginLeft = "0";
}