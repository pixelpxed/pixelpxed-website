window.onload = function() {
    document.getElementById("year").innerHTML = "2022"
}


function popup(code, msg, status) {
    document.querySelector(".popup").className = "popup";
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
                document.getElementById("popup").style.background = "var(--textcolor)";

                document.getElementById("codewrap").style.color = "var(--alt-textcolor)";
                document.getElementById("code").style.color = "var(--alt-textcolor)";
                document.getElementById("msg").style.color = "var(--alt-textcolor)";
            } if (!status || status != "white") {
                document.getElementById("popup").style.background = "var(--red)";

                document.getElementById("codewrap").style.color = "var(--textcolor)";
                document.getElementById("code").style.color = "var(--textcolor)";
                document.getElementById("msg").style.color = "var(--textcolor)";

                console.error(`[${code}] ${msg}`)
            }

            document.getElementById("code").innerHTML = code;
            document.getElementById("msg").innerHTML = msg;
            document.querySelector(".popup").className = "popup popup-ani";
        });
    });
}