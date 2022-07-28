window.addEventListener('load', () => {
    checkSetup()
});

function checkSetup() {
    if (localStorage.getItem("setupComplete") != "true") {
        disableScrollbar()

        document.getElementById("setup-wrapper").innerHTML = `
        <!-- Setup Elements -->
        <div class="popup-content">
            <!-- Setup Title -->
            <p>
                <span class="popup-title">Let's setup your Timetable.</span>
                <span>
                    This setup screen will only pop up on your first visit, 
                    when you clear your browser cache/cookies, 
                    or when you decided to reset your Timetable data.
                </span>
            </p>
            <!-- Class -->
            <div class="contentbox-option-wrapper">
                <p class="contentbox-option-title">
                    Select Your Class
                    <abbr title="Provide you with your class timetable.">
                        <span class="material-symbols-outlined">
                            help
                        </span>
                    </abbr>
                </p>
                <select id="setup-option-class">
                    <option value="305">305</option>
                    <option value="306">306</option>
                    <option value="custom">Custom Class</option>
                </select>
            </div>

            <!-- Custom JSON Class -->
            <div id="setup-custom-json-wrapper" class="contentbox-option-wrapper setup-custom-json-wrapper">
                <p class="contentbox-option-title">
                    Custom Class Names <a href="./templates/customclass.json" target="_blank">(Format)</a>
                    <abbr title="To fill in your timetable classes.">
                        <span class="material-symbols-outlined">
                            help
                        </span>
                    </abbr>
                </p>
                <textarea id="setup-custom-json-value-classes" type="text" class="setup-custom-json" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"></textarea>
                
                <p class="contentbox-option-title">
                    Custom Class Links <a href="./templates/customlinks.json" target="_blank">(Format)</a>
                    <abbr title="To fill in your timetable links.">
                        <span class="material-symbols-outlined">
                            help
                        </span>
                    </abbr>
                </p>
                <textarea id="setup-custom-json-value-links" type="text" class="setup-custom-json" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"></textarea>
                
                <p id="setup-error" class="setup-error"></p>
            </div>

            <!-- Google Account Index -->
            <div class="contentbox-option-wrapper">
                <p class="contentbox-option-title">
                    Google Account Index
                    <abbr title="Google account to sign into when opening classes and joining video calls.">
                        <span class="material-symbols-outlined">
                            help
                        </span>
                    </abbr>
                </p>
                <input id="setup-option-index" type="number" value="0" min="0">
            </div>
            <img 
                src="./assets/img/googleindexno.png"
                class="setup-img"
                alt="Step 1: Go to Google Classroom, then log into your preferred account to use for your Timetable.
                     Step 2: Observe the URL, you should see the Google account index like this: 'https://classroom.google.com/u/{Index Number}/h'"
            >
        </div>
        <div class="popup-buttons-box">
            <div class="popup-buttons-wrapper">
                <a class="popup-button" onclick="setupTimetable()">Complete Setup</a>
            </div>
        </div>
        `

        document.getElementById("setup-wrapper").style.display = "block"



        checkForCustomJSON()
    } if (localStorage.getItem("setupComplete") == "true") {
        document.getElementById("setup-wrapper").remove()
        document.getElementById("full-page-overlay").style.display = "none"
    }
}

// If #setup-option-class value is 'custom', display #setup-custom-json-wrapper.
function checkForCustomJSON() {
    document.getElementById("setup-option-class").addEventListener("click", () => {
        if (document.getElementById("setup-option-class").value == "custom") {
            return document.getElementById("setup-custom-json-wrapper").style.display = "block"
        } if (document.getElementById("setup-option-class").value != "custom") {
            return document.getElementById("setup-custom-json-wrapper").style.display = "none"
        }
    })
}

function setupTimetable() {
    localStorage.clear()

    var classSetup = document.getElementById("setup-option-class").value

    localStorage.setItem("classTimetable", classSetup)
    localStorage.setItem("gaiTimetable", document.getElementById("setup-option-index").value)

    if (classSetup == "custom") {
        var jsonClassSetup = document.getElementById("setup-custom-json-value-classes").value
        var jsonLinksSetup = document.getElementById("setup-custom-json-value-links").value

        if (jsonClassSetup == "" || jsonLinksSetup === "") {
            return document.getElementById("setup-error").textContent = "All fields can't be empty."
        } 
        
        localStorage.setItem("customClassJSON", jsonClassSetup)
        localStorage.setItem("customLinksJSON", jsonLinksSetup)
    }

    localStorage.setItem("setupComplete", "true")

    location.href = "./"
}

function resetTimetable() {
    popupConfirm("Reset Timetable?", "Are you sure you want to reset your Timetable? This action can't be undone!", "resetTimetableTrue", "returnNothing")
}

function resetTimetableTrue() {
    localStorage.clear()
    return location.href = "./"
}