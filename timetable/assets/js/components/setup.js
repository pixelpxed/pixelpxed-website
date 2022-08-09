window.addEventListener('load', () => {
    fillSetup()
});

var classSetup = undefined
function fillSetup() {
    if (localStorage.getItem("setupComplete") != "true") {
        disableScrollbar()

        document.querySelector(".popup-center").innerHTML = `
        <!-- Setup Elements -->
        <div id="setup-wrapper" class="contentbox-wrapper" style="display: block;">
            <div class="popup-content">
                <!-- Setup Title -->
                <p>
                    <span class="popup-title">Let's setup your Timetable.</span>
                    <span>
                        This setup screen will only pop up on your first visit, 
                        sometimes when you clear your browser cache/cookies, 
                        or when you decided to reset your Timetable in settings. 
                    </span>
                </p>

                <div style="margin-top: 1em;">
                    <div>
                        <p class="settings-option-label">
                            <span class="material-symbols-outlined">
                                school
                            </span>
                            <span>
                                Class<br>
                                <span class="popup-description">
                                    Select your class to fill into the table.
                                </span>
                            </span>
                        </p>
                        <div style="margin: 0.5em 0;" onload="checkForCustomJSON()">
                            <label class="settings-option-label">
                                <input name="setup-class" type="radio" value="305">
                                <span class="material-symbols-outlined">
                                    notes
                                </span>
                                <span>
                                    305<br>
                                    <span class="popup-description">
                                        Updated by your Timetable provider.
                                    </span>
                                </span>
                            </label>
                            <label class="settings-option-label">
                                <input name="setup-class" type="radio" value="306">
                                <span class="material-symbols-outlined">
                                    notes
                                </span>
                                <span>
                                    306<br>
                                    <span class="popup-description">
                                        Updated by your Timetable provider.
                                    </span>
                                </span>
                            </label>
                            <label class="settings-option-label">
                                <input name="setup-class" type="radio" value="custom">
                                <span class="material-symbols-outlined">
                                    edit_note
                                </span>
                                <span>
                                    Custom Class
                                    <a target="_blank" href="./templates/custom.json">(Format)</a>
                                    <br>
                                    <span class="popup-description">
                                        Create your personal class.
                                    </span>
                                </span>
                            </label>
                        </div>

                        <div class="setup-class-custom-wrapper" style="display: none; overflow: hidden; transition: 0.2s ease-in-out; margin: 0 0 0.5em 2em;">
                            <div>
                                <p class="settings-option-label">
                                    <span class="material-symbols-outlined">
                                        edit_note
                                    </span>
                                    <span>
                                        Custom Class Information<br>
                                        <span class="popup-description">
                                            Fill in your custom timetable class names.
                                        </span>
                                    </span>
                                </p>
                                <textarea type="text" class="setup-class-custom-json custom-json" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"></textarea>
                            </div>
                        </div>
                    </div>

                    <div>
                        <p class="settings-option-label">
                            <span class="material-symbols-outlined">
                                login
                            </span>
                            <span>
                                Google Account Index 
                                <a onclick="document.querySelector('.setup-img').classList.toggle('setup-img-block')">
                                    (Help)
                                </a><br>
                                <span class="popup-description">
                                    Google account to sign into.
                                </span>
                            </span>
                        </p>
                        <input type="number" name="gaiindex" class="setup-gaiindex" min="0" value="0">
                    </div>
                    <img 
                        src="./assets/img/googleindexno.png"
                        class="setup-img"
                        alt="Step 1: Go to Google Classroom, then log into your preferred account to use for your Timetable.
                            Step 2: Observe the URL, you should see the Google account index like this: 'https://classroom.google.com/u/{Index Number}/h'"
                    >
                </div>
            </div>
            <div class="popup-buttons-box">
                <div class="popup-buttons-wrapper">
                    <a class="popup-button" onclick="localStorage.setItem('setupComplete', true); location.reload();">Complete Setup</a>
                </div>
            </div>
        </div>
        `
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

        document.querySelector("input[name='gaiindex']").addEventListener("click", () => {
            localStorage.setItem("gaiTimetable", document.querySelector("input[name='gaiindex']").value)
        })
    } if (localStorage.getItem("setupComplete") == "true") {
        document.getElementById("full-page-overlay").style.display = "none"
    }
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