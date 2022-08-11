window.addEventListener('load', () => {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "sync-os")
    } document.querySelector("html").classList = localStorage.getItem("theme")
})

function openSettings() {
    disableScrollbar()
    document.querySelector(".popup-center").innerHTML += `
    <div id="settings-wrapper" class="contentbox-wrapper" style="display: block;">
        <div class="popup-content">
            <p class="popup-title">Settings</p>

            <div class="settings-section-wrapper">
                <p class="settings-section-title settings-option-label">
                    <span class="material-symbols-outlined">
                        style
                    </span>
                    <span>
                        <b>
                            Themes
                        </b><br>
                        <span class="popup-description">
                            Themes will be applied across updated pixelpxed pages.
                        </span>
                    </span>
                </p>
                <div style="margin-left: 2em;">
                    <label class="settings-option-label">
                        <input name="settings-theme" type="radio" value="sync-os">
                        <span class="material-symbols-outlined">
                            auto_mode
                        </span>
                        <span>
                            Automatic<br>
                            <span class="popup-description">
                                Use your device system theme to adjust the theme.
                            </span>
                        </span>
                    </label>
                    <label class="settings-option-label">
                        <input name="settings-theme" type="radio" value="dark">
                        <span class="material-symbols-outlined">
                            dark_mode
                        </span>
                        <span>
                            Dark<br>
                            <span class="popup-description">
                                Best for night owls and might reduce eye strain.
                            </span>
                        </span>
                    </label>
                    <label class="settings-option-label">
                        <input name="settings-theme" type="radio" value="light">
                        <span class="material-symbols-outlined">
                            light_mode
                        </span>
                        <span>
                            Light<br>
                            <span class="popup-description">
                                More visible content, but might cause eye strain.
                            </span>
                        </span>
                    </label>
                </div>
            </div>

            <div class="settings-section-wrapper">
                <p class="settings-section-title settings-option-label">
                    <span class="material-symbols-outlined">
                        info
                    </span>
                    <span>
                        <b>
                            Timetable Info (Reload Required)
                        </b><br>
                        <span class="popup-description">
                            Data linked to your classes and video calls.
                        </span>
                    </span>
                </p>
                
                <div style="margin-left: 2em;">
                    <div>
                        <p class="settings-option-label">
                            <span class="material-symbols-outlined">
                                login
                            </span>
                            <span>
                                Google Account Index<br>
                                <span class="popup-description">
                                    Google account to sign into.
                                </span>
                            </span>
                        </p>
                        <input type="number" name="gaiindex" id="setings-gaiindex" min="0" value="0">
                        <a style="margin-bottom: 0.5em;" onclick="location.reload()" class="popup-button popup-button-full">Reload</a>
                    </div>

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
                    <div style="margin: 0.5em 0;">
                        <label class="settings-option-label">
                            <input name="settings-class" type="radio" value="305">
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
                            <input name="settings-class" type="radio" value="306">
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
                            <input name="settings-class" type="radio" value="custom">
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

                    <div class="settings-class-custom-wrapper" style="display: none; overflow: hidden; transition: 0.2s ease-in-out; margin: 0 0 0.5em 2em;">
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
                            <textarea type="text" class="settings-class-custom-json custom-json" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false"></textarea>
                        </div>
                        <a class="popup-button popup-button-full" onclick="saveCustomTimetable()">Save Change</a>
                    </div>
                </div>
            </div>

            <div class="settings-section-wrapper">
                <p class="settings-section-title settings-option-label">
                    <span class="material-symbols-outlined">
                        checklist
                    </span>
                    <span>
                        <b>
                            Optional Features
                        </b><br>
                        <span class="popup-description">
                            Features not nescessary for Timetable.
                        </span>
                    </span>
                </p>
                <div style="margin-left: 2em;">
                    <label class="settings-option-label">
                        <input class="settings-popupmode" type="checkbox" name="popupmode" value="enable-popupmode">
                        <span class="material-symbols-outlined">
                            open_in_new
                        </span>
                        <span>
                            Class Pop-up Mode (Reload Required)<br>
                            <span class="popup-description">
                                (Mobile Friendly) Show links window when click on a class.
                            </span>
                        </span>
                    </label>
                    <label class="settings-option-label">
                        <input class="settings-timeremaining" type="checkbox" name="timeremaining" value="enable-timeremaining">
                        <span class="material-symbols-outlined">
                            schedule
                        </span>
                        <span>
                            Time remaining<br>
                            <span class="popup-description">
                                Enable time remaining feature.
                            </span>
                        </span>
                    </label>
                    <label class="settings-option-label">
                        <input class="settings-timeremaining" type="checkbox" name="timeremaining-sound" value="enable-timeremaining-sound">
                        <span class="material-symbols-outlined">
                            volume_up
                        </span>
                        <span>
                            Period end sound<br>
                            <span class="popup-description">
                                When the period ends, play virtual school bell sound.
                            </span>
                        </span>
                    </label>
                </div>
            </div>
            
            <div class="settings-section-wrapper">
                <p class="settings-section-title settings-option-label">
                    <span class="material-symbols-outlined">
                        warning
                    </span>
                    <span>
                        <b>
                            Danger Zone
                        </b><br>
                        <span class="popup-description">
                            Sensitive settings, such as your Timetable data.
                        </span>
                    </span>
                </p>
                <div style="margin-left: 2em;">
                    <a class="popup-button popup-button-danger popup-button-full" onclick="resetTimetable()">Reset Timetable</a>
                </div>
            </div>
        </div>
        <div class="popup-buttons-box">
            <div class="popup-buttons-wrapper">
                <a class="popup-button" onclick="closeSettings()">Done</a>
            </div>
        </div>
    </div>
    `
    setDefaultSettingsValue()
    setListenersSettingsChange()
    document.getElementById("full-page-overlay").style.display = "block"
}

function closeSettings() {
    enableScrollbar()
    document.getElementById('settings-wrapper').remove()
    document.getElementById("full-page-overlay").style.display = "none"
}

function setDefaultSettingsValue() {
    // Theme
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        if (element.value == localStorage.getItem("theme")) {
            element.setAttribute("checked", "checked")
        }
    })

    // Google User Index
    document.querySelector("input[name='gaiindex']").value = localStorage.getItem("gaiTimetable")

    // Class
    document.querySelectorAll("input[name='settings-class']").forEach((element) => {
        if (element.value == localStorage.getItem("classTimetable")) {
            element.setAttribute("checked", "checked")

            if (localStorage.getItem("classTimetable") == "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "block"
            }
        }
    }); document.querySelector(".settings-class-custom-json").value = localStorage.getItem("customClassJSON")
    
        // Pop-up Mode
        if (localStorage.getItem("popupMode") == "true") {
            document.querySelector("input[name='popupmode']").setAttribute("checked", "checked")
        }
    // Time Remaining
    if (localStorage.getItem("enableTimeRemaining") == "true") {
        document.querySelector("input[name='timeremaining']").setAttribute("checked", "checked")
    } if (localStorage.getItem("enableTimeRemainingSound") == "true") {
        document.querySelector("input[name='timeremaining-sound']").setAttribute("checked", "checked")
    }
}

function setListenersSettingsChange() {
    // Theme
    document.querySelectorAll("input[name='settings-theme']").forEach((element) => {
        element.addEventListener("change", function(event) {
            document.documentElement.className = event.target.value
            localStorage.setItem("theme", event.target.value)
        })
    })

    // Google User Index
    document.querySelector("input[name='gaiindex']").addEventListener("click", () => {
        localStorage.setItem("gaiTimetable", document.querySelector("input[name='gaiindex']").value)
    })

    // Class
    document.querySelectorAll("input[name='settings-class']").forEach((element) => {
        element.addEventListener("change", function(event) {
            if (event.target.value == "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "block"
            } if (event.target.value != "custom") {
                document.querySelector(".settings-class-custom-wrapper").style.display = "none"
                localStorage.setItem("classTimetable", event.target.value)
                location.reload()
            }
        })
    })

    // Time Remaining
    document.querySelectorAll(".settings-timeremaining").forEach((element) => {
        element.addEventListener("click", function(event) {
            if (event.target.name === "timeremaining") {
                if (event.target.checked) {
                    localStorage.setItem("enableTimeRemaining", true)
                    timeleft()
                } if (!event.target.checked) {
                    localStorage.setItem("enableTimeRemaining", false)
                    clearInterval(timeleftinterval)
                    document.querySelector(".timeleft-final").remove()
                }
            } if (event.target.name === "timeremaining-sound") {
                if (event.target.checked) {
                    localStorage.setItem("enableTimeRemainingSound", true)
                } if (!event.target.checked) {
                    localStorage.setItem("enableTimeRemainingSound", false)
                }
            }
        })
    })

    // Pop-up Mode
    document.querySelectorAll(".settings-popupmode").forEach((element) => {
        element.addEventListener("click", function(event) {
            if (event.target.name === "popupmode") {
                if (event.target.checked) {
                    localStorage.setItem("popupMode", true)
                    location.reload()
                } if (!event.target.checked) {
                    localStorage.setItem("popupMode", false)
                    location.reload()
                }
            }
        })
    })
}

function saveCustomTimetable() {
    localStorage.setItem("customClassJSON", document.querySelector(".settings-class-custom-json").value)
    localStorage.setItem("classTimetable", "custom")
    return reloadSettings()
}