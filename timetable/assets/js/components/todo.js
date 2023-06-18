todolist_datahandleversion = "0.1.5"

function openToDo() {
    if (document.querySelector(".contentbox-assignments")) {
        handleShowToDo()
    } if (!document.querySelector(".contentbox-assignments")) {
        fetch("/timetable/assets/components/html/todolist.html")
            .then((res) => res.text())
            .then((data) => {
                document.querySelector(".popup-center").insertAdjacentHTML("beforeend", data)
                fetchToDo(data)
            })
            .catch((error) => {
                cannotGetPopupContentError("to-do", error)
            })
        return
    }
}

var cache_todolist;
function fetchToDo() {
    fetch("https://pawin.tk/to-do/tasks.json")
    // fetch("/timetable/templates/homework.json")
        .then((res) => {
            if (res.ok) {
                return res.json()
            }
        })
        .then((data) => {
            cache_todolist = data
            getToDo()
        })
        .catch((error) => {
            console.warn("Failed to fetch pawin.tk API, opening to-do failed.");
            return popupOK(
                `Can't connect to 'pawin.tk' API.`, 
                `Timetable couldn't get an reponse from the server required for to-do to display information.<br><br>

                If you're connected to the internet, this problem is <abbr style="color: var(--color-gray-1); text-decoration: underline;" title="likely Pawin's server loose Ethernet cable.">likely on our end</abbr>. Meanwhile please try again later.<br><br>
                
                <span class="popup-description">Error:</span><br>
                ${error}`,
                "resetToDo"
            )
        })
}

function handleShowToDo() {
    document.querySelector(".contentbox-assignments").style.display = "block"

    disableScrollbar()
    document.querySelector(".full-page-overlay").style.display = "block"
}

function closeToDo() {
    document.querySelector(".contentbox-assignments").style.display = "none"

    enableScrollbar()
    document.querySelector(".full-page-overlay").style.display = "none"
}

function resetToDo() {
    document.querySelector(".contentbox-assignments").remove()

    enableScrollbar()
    document.querySelector(".full-page-overlay").style.display = "none"
}

function getToDo() {
    if (cache_todolist.about.dataversion != todolist_datahandleversion) {
        document.querySelector(".assignments-wrapper").insertAdjacentHTML(
            "afterbegin",
            `
                <div style="
                    display: flex; 
                    gap: 0.5rem; 
                    align-items: center; 
                    
                    padding: 0.5rem; 
                    margin-bottom: 1rem; 
                    
                    background: var(--color-gray-5); 
                    
                    border-radius: 0.3rem; 
                    border: 1px solid var(--color-gray-4);
                ">
                    <span class="material-symbols-outlined">info</span>
                    <span>This data version recieved from Pawin's server seemed to be newer than what we're supporting, results displayed might be inaccurate.</span>
                </div>
            `
        )
    }

    var homework = cache_todolist.content.homework
    var reminder = cache_todolist.content.reminder
    var exam = cache_todolist.content.exam

    for (let i = 0; i < homework.length; i++) {
        if (homework[i].status != "Active") {
            continue
        }
        insertToDo(
            ".table-todo-homework",
            homework[i].subject,
            homework[i].item,
            homework[i].classroom,
            homework[i].duedate
        )
    }
    for (let i = 0; i < reminder.length; i++) {
        if (reminder[i].status != "Active") {
            continue
        }
        insertToDo(
            ".table-todo-reminder",
            reminder[i].subject,
            reminder[i].item,
            reminder[i].classroom,
            reminder[i].duedate
        )
    }
    for (let i = 0; i < exam.length; i++) {
        if (exam[i].status != "Active") {
            continue
        }
        insertToDo(
            ".table-todo-exam",
            exam[i].subject,
            exam[i].item,
            exam[i].classroom,
            exam[i].duedate
        )
    }

    document.querySelector(".todo-lastupdate").innerHTML = cache_todolist.about.lastupdate

    handleShowToDo()
}

function insertToDo(location, title, desc, url, due) {
    var formatteddesc = desc
    if (url !== null) {
        formatteddesc = `<a href="${url}" target="_blank">${desc}</a>`
    }

    var assignmentsdatedata = "<b style='color: var(--color-gray-1);'>None</b>"
    if (due !== null) {
        var rawtasktime = new Date(due)
    
        var taskdayint = rawtasktime.getDay()
        var taskdate = rawtasktime.getDate()
        var taskmonth = rawtasktime.getMonth() + 1
        var taskyear = rawtasktime.getFullYear()
    
        var duedateformatted = `${taskdate > 9 ? taskdate : "0" + taskdate}/${taskmonth > 9 ? taskmonth : "0" + taskmonth}/${taskyear}`
    
        var dayname = daylist[taskdayint]

        assignmentsdatedata = `<b>${dayname}</b>, ${duedateformatted}`
    }

    document.querySelector(location).insertAdjacentHTML("beforeend", `
        <tr>
            <td class="assignments-item">
                <b>${title}</b><br>
                ${formatteddesc}
            </td>
            <td class="assignments-date">
                ${assignmentsdatedata}
            </td>
        </tr>
    `)
}