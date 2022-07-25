var copyrightyear = "2022"
var timetableversion = "3.1.2"

var elective_toggle = true
var elective_primary = "Chinese"
var elective_secondary = "Japanese"

var enable_specialclass = true

const classtimes_regular = [
    "08:00 - 08:40", 
    "08:40 - 09:20", 
    "09:20 - 10:00", 
    "10:20 - 11:00", 
    "11:00 - 11:40", 
    "12:00 - 12:40", 
    "12:40 - 13:20", 
    "13:40 - 14:20", 
    "14:20 - 15:00", 
    "15:20 - 16:00", 
    "16:00 - 16:40"
]

const classtimes_special = [
    "08:00 - 08:30",
    "08:30 - 09:10",
    "09:10 - 09:50",
    "09:50 - 10:30",
    "10:30 - 11:10",
    "11:10 - 11:50",
    "11:50 - 12:30",
    "12:30 - 13:10",
    "13:10 - 13:50",
    "13:50 - 14:30",
    "14:30 - 15:10"
]

const bookmarks = {
    "0": {
        "title": "QuickLinks",
        "bookmarks": {
            "0": {
                "title": "Google Classroom",
                "gaiRequired": true,
                "url": "https://classroom.google.com/u/",
                "urlAfter": "/h",
            },
            "1": {
                "title": "Google Classroom - To Do",
                "gaiRequired": true,
                "url": "https://classroom.google.com/u/",
                "urlAfter": "/a/not-turned-in/all",
            },
            "2": {
                "title": "Google Meet",
                "gaiRequired": true,
                "url": "https://meet.google.com/?authuser=",
                "urlAfter": "",
            },
            "3": {
                "title": "Google Docs",
                "gaiRequired": true,
                "url": "https://docs.google.com/document/u/",
                "urlAfter": "/",
            },
            "4": {
                "title": "Google Drive",
                "gaiRequired": true,
                "url": "https://drive.google.com/drive/u/",
                "urlAfter": "/",
            },
        }
    },
    "1": {
        "title": "After School",
        "bookmarks": {
            "0": {
                "title": "YouTube",
                "gaiRequired": false,
                "url": "https://www.youtube.com/",
                "urlAfter": "",
            },
            "1": {
                "title": "Facebook",
                "gaiRequired": false,
                "url": "https://www.facebook.com/",
                "urlAfter": "",
            },
            "2": {
                "title": "Instagram",
                "gaiRequired": false,
                "url": "https://www.instagram.com/",
                "urlAfter": "",
            },
            "3": {
                "title": "Twitter",
                "gaiRequired": false,
                "url": "https://twitter.com/",
                "urlAfter": "",
            },
            "4": {
                "title": "AnimeKimi",
                "gaiRequired": false,
                "url": "https://animekimi.com/",
                "urlAfter": "",
            },
        }
    },
}