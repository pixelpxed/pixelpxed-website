window.addEventListener('load', () => {
    if (localStorage.getItem("setupComplete")) {
        addNotification("<b>Your data seems to be older than the current system.</b><br><a onclick='migrateOldTimetableData()'>Click here to attempt with migration process.</a><br>Timetable might behave unexpectedly if you don't migrate.")
    }

    fillSetup()
});

function fillSetup() {
    if (localStorage.getItem("timetable-setupComplete") != "true") {
        disableScrollbar()
        popupOpen()

        fetch('./assets/components/html/setup.html')
            .then((response) => response.text())
            .then((html) => document.querySelector(".popup-center").innerHTML += html)
            .then(() => {
                setupEventListener()
            })
    }
    if (localStorage.getItem("timetable-setupComplete") == "true") {
        document.getElementById("full-page-overlay").style.display = "none"

        if (localStorage.getItem("timetable-oobeNotificationDisplayed") == "false") {
            addNotification("<b>👋 Hi, and welcome to the world of dynamic timetables!</b><br>Timetable have set the default settings for your device.<br><br>To adjust and turn certain features on or off, please visit the settings page at the top of the navigation bar.")
            localStorage.setItem("timetable-oobeNotificationDisplayed", "true")
        }
    }
}

function setupEventListener() {
    document.querySelector(".setup-class-default").checked = true;
    localStorage.setItem("timetable-classTimetable", document.querySelector(".setup-class-default").value)
    document.querySelectorAll("input[name='setup-class']").forEach((element) => {
        element.addEventListener("change", function (event) {
            if (event.target.value == "custom") {
                document.querySelector(".setup-class-custom-wrapper").style.display = "block"
                localStorage.setItem("timetable-classTimetable", "custom")
            }
            if (event.target.value != "custom") {
                document.querySelector(".setup-class-custom-wrapper").style.display = "none"
                localStorage.setItem("timetable-classTimetable", event.target.value)
            }
        })
    })

    document.querySelector("input[name='gaiindex']").addEventListener("click", () => {
        localStorage.setItem("timetable-gaiTimetable", document.querySelector("input[name='gaiindex']").value)
    })
}

function completeSetup() {
    if (localStorage.getItem("timetable-classTimetable") == "custom") {
        localStorage.setItem("timetable-customClassJSON", document.querySelector(".setup-class-custom-json").value)
    }

    if (!localStorage.getItem("timetable-gaiTimetable")) {
        localStorage.setItem("timetable-gaiTimetable", 0)
    }

    localStorage.setItem('timetable-setupComplete', true);
    localStorage.setItem('timetable-localStorageDataVersion', 2)
    localStorage.setItem("timetable-overrideTimeList", "auto")

    localStorage.setItem('timetable-popupMode', true);
    localStorage.setItem('timetable-subjectCard', true);
    localStorage.setItem('timetable-enableTimeRemaining', true);
    localStorage.setItem('timetable-currentClassHighlight', true);

    localStorage.setItem('timetable-devMode', false);

    localStorage.setItem('timetable-oobeNotificationDisplayed', false);

    location.reload();
}

// ===================================================

function resetTimetable() {
    popupConfirm("Reset Timetable?",
        "Are you sure you want to reset your Timetable? This action can't be undone!",
        "resetTimetableTrue",
        "returnNothing")
}

function migrateOldTimetableData() {
    console.log("Starting Timetable Data Migrate...");

    var listToMigrate = [
        "setupComplete",
        "classTimetable",
        "gaiTimetable",
        "popupMode",
        "enableTimeRemaining",
        "enableTimeRemainingSound",
        "customClassJSON",
        "electiveClass"
    ]

    for (i = 0; i < listToMigrate.length; i++) {
        if (localStorage.getItem(listToMigrate[i])) {
            localStorage.setItem(`timetable-${listToMigrate[i]}`, localStorage.getItem(listToMigrate[i]))
            localStorage.removeItem(listToMigrate[i])
            console.log(`Timetable Data Migrate: Migrated data - ${listToMigrate[i]}`);
        }
    }

    localStorage.setItem('timetable-localStorageDataVersion', 2)
    return location.reload()
}

function resetTimetableTrue() {
    var listToDelete = [
        "timetable-setupComplete",
        "timetable-classTimetable",
        "timetable-gaiTimetable",
        "timetable-popupMode",
        "timetable-enableTimeRemaining",
        "timetable-enableTimeRemainingSound",
        "timetable-overrideTimeList",
        "timetable-customClassJSON",
        "timetable-electiveClass",
        "timetable-currentClassHighlight",
        "timetable-oobeNotificationDisplayed",
        "timetable-devMode"
    ]

    for (i = 0; i < listToDelete.length; i++) {
        localStorage.removeItem(listToDelete[i])
    }

    return location.reload()
}