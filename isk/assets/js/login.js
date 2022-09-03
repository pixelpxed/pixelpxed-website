window.onload = function () {
    console.log("%cWarning\n\n%cBy using this console you can get attacked by what it's called 'Self-XSS,' Do not paste and run any codes that you don't understand.\n",
        "text-align: center; font-size: 1.5em; color: red; font-weight: bold;", "text-align: center;")
    document.getElementById("username").focus();
    convinientEnter();
};

// Runs when user clicks the sign in button.
function signIn() {
    // Collecting information for variables.
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if either field(s) empty, if it's empty shows the error and return the function.
    if (username == "" || password == "") {
        signInError("ไม่สามารถเว้นทั้งสองช่องว่างได้", "Both fields cannot be empty.");
        return
    }

    // Checking usernames if it's correct or not.
    for (i = 0; i < accountsData.length; i++) {
        if (username == accountsData[i].username && password == accountsData[i].password) {
            setCookie(`token`, `${accountsData[i].token}`, 1)
            if (accountsData[i].type == "student") {
                return window.location.href = "./home.html";
            }
            if (accountsData[i].type == "teacher") {
                alert("Teachers website in development. Please come back later.")
                return window.location.href = "./login.html";
            }
            return signInError("ไม่สามารถหาได้ว่าบัญชีเป็นบัญชีประเภทใด", "Couldn't idenify your account type.");
        }
    }
    signInError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง", "Your username or password is incorrect.");
}

function convinientEnter() {
    document.getElementById("username").addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            document.getElementById("password").focus();
        }
    });
    document.getElementById("password").addEventListener("keyup", function (event) {
        if (event.keyCode == 13) {
            document.getElementById("signin").click();
        }
    });
}

// Error messages handler function.
function signInError(th, en) {
    if (en == "" || en == undefined || en == null) {
        en = "An unknown error occured"
    }
    if (th == "" || th == undefined || th == null) {
        th = "เกิดข้อผิดผลาดที่ไม่ทราบขึ้น"
    }

    document.getElementById("incorrect-input").innerHTML = `${th}<br>${en}`;
    document.getElementById("incorrect-input").style.display = "block";

    document.getElementById("username").style.border = "1px solid var(--red)";
    document.getElementById("password").style.border = "1px solid var(--red)";

    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    document.getElementById("username").focus()
}