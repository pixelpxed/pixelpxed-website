function openToDo() {
    if (!document.querySelector(".contentbox-assignments")) {
        fetch("/timetable/assets/components/html/todolist.html")
            .then((res) => res.text())
            .then((data) => {
                document.querySelector(".popup-center").insertAdjacentHTML("beforeend", data)
                fetchToDo()
                handleShowToDo()
            })
    } if (document.querySelector(".contentbox-assignments")) {
        handleShowToDo()
    }
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

var cache_todolist;
function fetchToDo() {
    fetch("https://pawin.tk/to-do/tasks.json")
    // fetch("/timetable/templates/homework.json")
        .then((res) => res.json())
        .then((data) => {
            cache_todolist = data
            getToDo()
        })
}

function getToDo() {
    var homework = cache_todolist.content.homework
    var reminder = cache_todolist.content.reminder
    var exam = cache_todolist.content.exam

    for (let i = 0; i < homework.length; i++) {
        insertToDo(
            ".table-todo-homework",
            homework[i].subject,
            homework[i].item,
            homework[i].classroom,
            homework[i].duedate
        )
    }
    for (let i = 0; i < reminder.length; i++) {
        insertToDo(
            ".table-todo-reminder",
            reminder[i].subject,
            reminder[i].item,
            reminder[i].classroom,
            reminder[i].duedate
        )
    }
    for (let i = 0; i < exam.length; i++) {
        insertToDo(
            ".table-todo-exam",
            exam[i].subject,
            exam[i].item,
            exam[i].classroom,
            exam[i].duedate
        )
    }

    document.querySelector(".todo-lastupdate").innerHTML = cache_todolist.about.lastupdate
}

function insertToDo(location, title, desc, url, due) {
    var formatteddesc = desc
    if (url !== null) {
        formatteddesc = `<a href="${url}" target="_blank">${desc}</a>`
    }

    document.querySelector(location).insertAdjacentHTML("beforeend", `
        <tr>
            <td class="assignments-subj">${title}</td>
            <td class="assignments-desc">${formatteddesc}</td>
            <td class="assignments-date">${due}</td>
        </tr>
    `)
}