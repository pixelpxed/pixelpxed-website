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

document.querySelectorAll("a.class, a.lunch, a.blankclass").forEach(h => {
    document.addEventListener('contextmenu', event => event.preventDefault()); // Prevent menu from showing up

    h.addEventListener("click" , () => {
        if (h.textContent == "Lunch" || " ") {
            watchYouTube()
            return
        }

        console.log(`[GoogleMeet] Opened ${h.innerHTML} class Google Meet`);
        var o = h.getAttribute("meet");
        if (null !== o) return window.open(o);
            alert(`Either "${h.innerHTML}" doesn't have Google Meet link,\nor you haven't set this class up properly yet.\n\nPlease try again later. 🙏`)
            console.error(`[GoogleMeet] Failed to open ${h.innerHTML} Google Meet. Reason: No link to open`)
        return
    }), 
    h.addEventListener("auxclick", () => {
        if (h.textContent == "Lunch") {
            watchYouTube()
            return
        }

        console.log(`[GoogleClassroom] Opened ${h.innerHTML} class Google Classroom`);
        var o = h.getAttribute("classroom");
        if (null !== o) return window.open(o);
            alert(`Either "${h.innerHTML}" doesn't have Google Classroom link,\nor you haven't set this class up properly yet.\n\nPlease try again later. 🙏`)
            console.error(`[GoogleMeet] Failed to open ${h.innerHTML} Google Classroom. Reason: No link to open`)
        return
    })
})

function watchYouTube() {
    console.log("[Trigger-Alert] Triggered alert box by left click.")   
    if (confirm("There's no class here for you to attend... 😶\n\nWatch YouTube?")) {
        window.open("https://www.youtube.com/", "_blank")
        console.log("[Trigger-Choice] Choosed to open YouTube in new tab.")
    } else {
        console.log("[Trigger-Choice] Choosed not to open YouTube.")
    }
    return
}

document.getElementById("searchbar").addEventListener("keyup", function(event) {
    if (event.key === "enter") {
        event.preventDefault();
        document.getElementById("searchsubmit").click();
    }
});

function displaypain() {
    document.getElementById("painimg").style.display = "block"
}

function closepain() {
    document.getElementById("painimg").style.display = "none"
}

function howtolightmode() {
    alert("Turning on dark mode helps reducing eye strain,\nhere's how you can turn on light mode. 😉\n\nWindows:\nSettings > Personalization > Colors > Choose your color > Dark\n\nMacOS:\nApple Menu > System Preferences > General > Appearance > Dark")
}

function closeUseDark() {
    document.getElementById("usedark").style.transform = 'translateY(-4em)';
}

function clearSearch() {
    var searchvalue = document.getElementById("searchbar").value
    window.open(`https://www.google.com/search?q=${searchvalue}`).focus
    document.getElementById("searchbar").value = ''
}

function openSidebar() {
    document.getElementById("sidebar").style.marginLeft = "0"
}

function closeSidebar() {
    document.getElementById("sidebar").style.marginLeft = "-16em"
}