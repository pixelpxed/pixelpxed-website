// General variables
var versionnumber = "2.0.0"
var copyrightyear = "2022"

// If you want a switch for Japanese and Chinese class
var japanesechinese = true

// Time to be displayed in Timetable
const time = ["08:00 - 08:40", "08:40 - 09:20", "09:20 - 10:00", "10:20 - 11:00", "11:00 - 11:40", "12:00 - 12:40", "12:40 - 13:20", "13:40 - 14:20", "14:20 - 15:00", "15:20 - 16:00", "16:00 - 16:40"]

// Class to be displayed in Timetable, each line represents each day.
// Automatic operations (All of the below is case-sensitive):
// "Lunch"   - Will set the grid as a lunch grid automaticly
// "DClass"  - Will remove the grid, and make the grid before stretch out into double grid.
// "Chinese" - Will add a switcher for Japanese and Chinese class users
// ""        - Will set the grid as a blankclass grid automaticly

const classes = ["Social", "Core English", "Core Science", "DClass", "Lunch", "Core Maths", "Thai", "R+W", "Tutor", "DClass",
                "Thai", "P.E.", "History", "Lunch", "Add Maths", "Art", "Mech. Work", "Core English", "Tutor", "DClass",
                "Health", "Core Science", "Flim Making", "DClass", "Lunch", "R+W", "Add Maths", "Chinese", "DClass", "",
                "Core Maths", "Buddhism", "Guidance", "Thai", "Lunch", "Music", "", "", "", "", 
                "Career", "Core Maths", "R+W", "Lunch", "Social", "Core English", "Additional Science", "DClass", "", ""]


// Subject's Google Meet and Google Classroom links.
// "[Subject]": {
//     "videocall": "[Video Call Link]",
//     "classroom": "[Classroom Link]"    
// }, <- Do not add the ',' if it's the last element.

const subj = {
    "Homeroom": {
        "videocall": "https://meet.google.com/cug-fqam-xoy?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQ3OTY2NzAwNjQz"
    },
    "Tutor": {
        "videocall": "https://meet.google.com/kvr-hrmx-jjo?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzU4ODk4MzgxMjMz"
    },
    "Social": {
        "videocall": "https://meet.google.com/jne-tpyd-hjy?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzMwNjA0MTM1NjY2"
    },
    "Health": {
        "videocall": "https://meet.google.com/bmn-mozj-uig?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzMwNjA0MTM1NzE3"
    },
    "P.E.": {
        "videocall": "https://meet.google.com/buo-obyb-iih?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzMwNjA0MTQ4NTM1"
    },
    "Core Science": {
        "videocall": "https://meet.google.com/ksm-qsei-mid?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/NDE5Nzk2NDM1MTU1"
    },
    "Additional Science": {
        "videocall": "https://meet.google.com/lookup/d2lq6fo5a2?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQzOTkyNjMxMDQ4"
    },
    "Core Maths": {
        "videocall": "https://meet.google.com/gzv-wipn-vse?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/NDE5NzQ3NjIwNjkx"
    },
    "Add Maths": {
        "videocall": "https://meet.google.com/cxe-ntdr-put?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/NDE5NzUwMjAwNTg5"
    },
    "Thai": {
        "videocall": "https://meet.google.com/wko-ywfc-rcu?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQ3OTU5NTAzOTcw"
    },
    "Core English": {
        "videocall": "https://meet.google.com/ubp-evqe-pag?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzM1MTcyNDc5ODQ0"
    },
    "R+W": {
        "videocall": "https://meet.google.com/cog-zwyi-jwt?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzEyNTIyNzg4MDQ4"
    },
    "Chinese": {
        "videocall": "https://meet.google.com/qkc-qmcj-ukt?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQ3ODM2MzI4Njk2"
    },
    "Japanese": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/MTE1ODAxNTg5MDk0"
    },
    "Art": {
        "videocall": "https://meet.google.com/lookup/e27kcllzvs?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQzOTYwMTQ5ODUz"
    },
    "History": {
        "videocall": "https://meet.google.com/lookup/e27kcllzvs?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQzNDgxNTc5MTI0"
    },
    "Mech. Work": {
        "videocall": "https://meet.google.com/wcq-gqpv-kst?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/NDE4MTM4ODY2MzI1"
    },
    "Flim Making": {
        "videocall": "https://meet.google.com/yyu-pujm-tus?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/NDE5MzQwMjAxNjQ4"
    },
    "Buddhism": {
        "videocall": "https://meet.google.com/gmp-qpyi-xan?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQzNjI3Mjg2NDU1"
    },
    "Guidance": {
        "videocall": "https://meet.google.com/fgy-kcye-fzx?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQzOTgxNjMzNjkw"
    },
    "Music": {
        "videocall": "https://meet.google.com/xnm-kdan-hoc?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/MzQ0MDIwOTk5MjU5"
    },
    "Career": {
        "videocall": "https://meet.google.com/gzv-wipn-vse?authuser=",
        "classroom": "https://classroom.google.com/u/2/c/NDE4OTcwMDQ2ODky"
    }
}

// Bookmarks
//
// "[! DO NOT EDIT !]": {
//     "name": "[Bookmark Name]"
//     "link": "[Bookmark Link]" 
// }
//
// Fixed amount of bookmarks (4 links, 2 unchangeable types)
//  -- Future update(s) might feature customizable types --

const bookmarks = {
    // QuickLinks
    "bookmark0": {
        "name": "Google Classroom",
        "url": "https://classroom.google.com/u/2/h"
    },
    "bookmark1": {
        "name": "Google Classroom - To Do",
        "url": "https://classroom.google.com/u/2/a/not-turned-in/all"
    },
    "bookmark2": {
        "name": "Google Meet",
        "url": "https://meet.google.com/landing?authuser=2"
    },
    "bookmark3": {
        "name": "Google Drive",
        "url": "https://drive.google.com/drive/u/2/"
    },

    // After School Links
    "bookmark4": {
        "name": "YouTube",
        "url": "https://www.youtube.com/"
    },
    "bookmark5": {
        "name": "Facebook",
        "url": "https://www.facebook.com/"
    },
    "bookmark6": {
        "name": "Instagram",
        "url": "https://www.instagram.com/"
    },
    "bookmark7": {
        "name": "Twitter",
        "url": "https://twitter.com/"
    }
}