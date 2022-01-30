// -- Config Timetable Informations -- //

var versionnumber = "2.0.0a"
var copyrightyear = "2022"

// Time to be displayed in Timetable
const time = ["08:00 - 08:40", "08:40 - 09:20", "09:20 - 10:00", "10:20 - 11:00", "11:00 - 11:40", "12:00 - 12:40", "12:40 - 13:20", "13:40 - 14:20", "14:20 - 15:00", "15:20 - 16:00", "16:00 - 16:40"]

// Class to be displayed in Timetable, each line represents each day.
// Automatic operations (All of the below is case-sensitive):
// "Lunch"  - Will set the grid as a lunch grid automaticly
// "DClass" - Will remove the grid, and make the grid before stretch out into double grid.
// ""       - Will set the grid as a blankclass grid automaticly

const classes = ["Social", "Core English", "Core Science", "DClass", "Lunch", "Core Maths", "Thai", "R+W", "Tutor", "DClass",
                "Thai", "P.E.", "History", "Lunch", "Add Maths", "Art", "Mech. Work", "Core English", "Tutor", "DClass",
                "Health", "Core Science", "Flim Making", "DClass", "Lunch", "R+W", "Add Maths", "Chinese", "DClass", "",
                "Core Maths", "Buddhism", "Guidance", "Thai", "Lunch", "Music", "", "", "", "", 
                "Career", "Core Maths", "R+W", "Lunch", "Social", "Core English", "Additional Science", "DClass", "", ""]

// Subject's Google Meet and Google Classroom links.
// "[Subject]": {
//     "videocall": "[Video Call Link]",
//     "classroom": "[Classroom Link]"    
// }, <- Do not add the ',' if it's the last element.

const subj = {
    "Homeroom": {
        "videocall": "https://meet.google.com/cug-fqam-xoy?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQ3OTY2NzAwNjQz"
    },
    "Tutor": {
        "videocall": "",
        "classroom": ""
    },
    "Social": {
        "videocall": "",
        "classroom": ""
    },
    "Health": {
        "videocall": "",
        "classroom": ""
    },
    "Core Science": {
        "videocall": "",
        "classroom": ""
    },
    "Additional Science": {
        "videocall": "",
        "classroom": ""
    },
    "Core Maths": {
        "videocall": "",
        "classroom": ""
    },
    "Add Maths": {
        "videocall": "",
        "classroom": ""
    },
    "Thai": {
        "videocall": "",
        "classroom": ""
    },
    "Core English": {
        "videocall": "",
        "classroom": ""
    },
    "R+W": {
        "videocall": "",
        "classroom": ""
    },
    "Chinese": {
        "videocall": "",
        "classroom": ""
    },
    "Art": {
        "videocall": "",
        "classroom": ""
    },
    "History": {
        "videocall": "",
        "classroom": ""
    },
    "Mech. Work": {
        "videocall": "",
        "classroom": ""
    },
    "Flim Making": {
        "videocall": "",
        "classroom": ""
    },
    "Buddhism": {
        "videocall": "",
        "classroom": ""
    },
    "Guidance": {
        "videocall": "",
        "classroom": ""
    },
    "Music": {
        "videocall": "",
        "classroom": ""
    },
    "Career": {
        "videocall": "",
        "classroom": ""
    }
}

// -- End of Configerable Informations -- //

window.onload = function() {
    document.getElementById("version").innerHTML = versionnumber
    document.getElementById("year").innerHTML = copyrightyear

    fillclass()
    joiningsystem()
    popup(`Welcome!`, `This the new Timetable Alpha. Check in later for updates!`, `white`)
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
}, 1000);

function fillclass() {
    var classFilled = 0;
    var timefilled = 0;

    while (timefilled != 11) {
        document.getElementById("time" + timefilled).innerHTML = time[timefilled];
        timefilled = timefilled + 1;
    }

    while (classFilled != 50) {
        document.getElementById(classFilled).innerHTML = classes[classFilled];

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
    } classFilled = 0;
}

function joiningsystem() {
    document.addEventListener('contextmenu', event => event.preventDefault()); // Prevent menu from showing up

    document.querySelectorAll("a.joinable").forEach(c => {
        c.addEventListener("click", () => {
            var o = c.getAttribute("meet");
            if (null !== o) return window.open(o);
                popup(`NON-01`, `"${c.innerHTML}" subject doesn't have a Google Meet link.`);
        }), 
        c.addEventListener("auxclick", () => {
            console.log(`[GoogleClassroom] Opened ${c.innerHTML} class Google Classroom`);
            var o = c.getAttribute("classroom");
            if (null !== o) return window.open(o);
                popup(`NON-02`, `"${c.innerHTML}" subject doesn't have a Google Classroom link.`);
        })
    })
}

function popup(code, msg, status) {
    document.querySelector(".errorbox").className = "errorbox";
    window.requestAnimationFrame(function(time) {
        window.requestAnimationFrame(function(time) {
            // If undefined error message
            if (!code) {
                code = "UKN-00";
            } if (!msg) {
                msg = "An unknown error occured.";
            }

            // Popup box color
            if (status == "white") {
                document.getElementById("errorbox").style.background = "var(--textcolor)";

                document.getElementById("codewrap").style.color = "var(--alt-textcolor)";
                document.getElementById("code").style.color = "var(--alt-textcolor)";
                document.getElementById("msg").style.color = "var(--alt-textcolor)";
            } if (!status || status != "white") {
                document.getElementById("errorbox").style.background = "var(--red)";

                document.getElementById("codewrap").style.color = "var(--textcolor)";
                document.getElementById("code").style.color = "var(--textcolor)";
                document.getElementById("msg").style.color = "var(--textcolor)";
            }

            document.getElementById("code").textContent = code;
            document.getElementById("msg").textContent = msg;
            document.querySelector(".errorbox").className = "errorbox errorbox-ani";
        });
    });
}