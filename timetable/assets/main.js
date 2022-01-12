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

document.querySelectorAll("a.class").forEach(h => {
    document.addEventListener('contextmenu', event => event.preventDefault()); // Prevent menu from showing up

    h.addEventListener("click", () => {
        console.log(`[GoogleMeet] Opened ${h.innerHTML} class Google Meet`);
        var o = h.getAttribute("meet");
        if (null !== o) return window.open(o);
            alert(`Either "${h.innerHTML}" doesn't have Google Meet link,\nor you haven't set this class up properly yet.\n\nPlease try again later. 🙏`)
            console.error(`[GoogleMeet] Failed to open ${h.innerHTML} Google Meet. Reason: No link to open`)
    }), 
    h.addEventListener("auxclick", () => {
        console.log(`[GoogleClassroom] Opened ${h.innerHTML} class Google Classroom`);
        var o = h.getAttribute("classroom");
        if (null !== o) return window.open(o);
            alert(`Either "${h.innerHTML}" doesn't have Google Classroom link,\nor you haven't set this class up properly yet.\n\nPlease try again later. 🙏`)
            console.error(`[GoogleMeet] Failed to open ${h.innerHTML} Google Classroom. Reason: No link to open`)
    })
})

document.querySelectorAll("a.lunch, a.blankclass").forEach(h => {
    document.addEventListener('contextmenu', event => event.preventDefault()); // Prevent menu from showing up

    h.addEventListener("click", () => {
        console.log("[Trigger-Alert] Triggered alert box by left click.")   
        if (confirm("There's no class here for you to attend... 😶\n\nWatch YouTube?")) {
            window.open("https://www.youtube.com/", "_blank")
            console.log("[Trigger-Choice] Choosed to open YouTube in new tab.")
        } else {
            console.log("[Trigger-Choice] Choosed not to open YouTube.")
        }
    }), h.addEventListener("auxclick", () => {
        console.log("[Lunch-Alert] Triggered alert box by other buttons.")
        if (confirm("There's no class here for you to attend... 😶\n\nWatch YouTube?")) {
            window.open("https://www.youtube.com/", "_blank")
            console.log("[Lunch-Choice] Choosed to open YouTube in new tab.")
        } else {
            console.log("[Lunch-Choice] Choosed not to open YouTube.")
        }
    })
})

document.getElementById("searchbar").addEventListener("keyup", function(event) {
    if (event.key === "enter") {
        event.preventDefault();
        document.getElementById("searchsubmit").click();
    }
});

function addsci() {
    console.log("Have you ever wondered why this class sucks? Well I don't know but this class sounds like 'Additional Pain' for me.")
}

function tutor() {
    console.log("More like a whole 100 minutes of pure torture, good luck. Have fun in that class I guess?")
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