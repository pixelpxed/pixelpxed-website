window.addEventListener('load', () => {
    fillSetup()
});

function fillSetup() {
    if (localStorage.getItem("setupComplete") != "true") {
        disableScrollbar()

        fetch('./assets/components/html/setup.html')
            .then((response) => response.text())
            .then((html) => document.querySelector(".popup-center").innerHTML += html)
            .then(() => {
                setupEventListener()
            })
        
    } if (localStorage.getItem("setupComplete") == "true") {
        document.getElementById("full-page-overlay").style.display = "none"
    }
}

function setupEventListener() {
    document.querySelector(".setup-class-default").checked = true;
        localStorage.setItem("classTimetable", document.querySelector(".setup-class-default").value)
        document.querySelectorAll("input[name='setup-class']").forEach((element) => {  
            element.addEventListener("change", function(event) {
                if (event.target.value == "custom") {
                    document.querySelector(".setup-class-custom-wrapper").style.display = "block"
                } if (event.target.value != "custom") {
                    document.querySelector(".setup-class-custom-wrapper").style.display = "none"
                    localStorage.setItem("classTimetable", event.target.value)
                }
            })
        })

        document.querySelector("input[name='setup-popupmode']").addEventListener("click", function(event) {
            if (event.target.checked) {
                localStorage.setItem("popupMode", true)
            } if (!event.target.checked) {
                localStorage.setItem("popupMode", false)
            }
        })

        document.querySelector("input[name='gaiindex']").addEventListener("click", () => {
            localStorage.setItem("gaiTimetable", document.querySelector("input[name='gaiindex']").value)
        })
}

function resetTimetable() {
    popupConfirm("Reset Timetable?", 
                 "Are you sure you want to reset your Timetable? This action can't be undone!", 
                 "resetTimetableTrue", 
                 "returnNothing")
}

function resetTimetableTrue() {
    localStorage.clear()
    return location.reload()
}