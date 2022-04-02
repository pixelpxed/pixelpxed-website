// General variables
var versionnumber = "2.5.0"
var copyrightyear = "2022"

// Translation Variables
var var_day_primary = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
var var_month_primary = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

var var_day_secondary = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์"]
var var_month_secondary = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"]

var timetable_title_primary = "Timetable"
var timetable_title_secondary = "ตารางเวลา"

var timetable_description_primary = "Left Click - Video Call<br>Right Click - Classroom"
var timetable_description_secondary = "คลิกซ้าย - วีดีโอคอล<br>คลิกขวา - คลาสรูม"  // <br> - For a new line.

// Switch for Japanese and Chinese class / Switch for changing between primary and secondary language (By default both false)
var japanesechinese = true
var secondarylanguage = true

// Time to be displayed in Timetable
const time = ["08:00 - 08:40", "08:40 - 09:20", "09:20 - 10:00", "10:20 - 11:00", "11:00 - 11:40", "12:00 - 12:40", "12:40 - 13:20", "13:40 - 14:20", "14:20 - 15:00", "15:20 - 16:00", "16:00 - 16:40"]

// Class to be displayed in Timetable, each line represents each day.
// Automatic operations (All of the below is case-sensitive):
// "Lunch"   - Will set the grid as a lunch grid automaticly
// "Break"   - Will set the grid as a break grid automaticly
// "DClass"  - Will remove the grid, and make the grid before stretch out into double grid.
// "Chinese" - Will add a switcher for Japanese and Chinese class users
// ""        - Will set the grid as a blankclass grid automaticly

const element_primary = ["Time", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] // ["[Time]", "[Monday]", "[Tuesday]", "[Thursday]", "[Friday]"]
const classes_primary = ["Homeroom", "Social", "Core English", "Core Science", "DClass", "Lunch", "Core Maths", "Thai", "R+W", "Tutor", "DClass",
                         "Homeroom", "Thai", "P.E.", "History", "Lunch", "Add Maths", "Art", "Mech. Work", "Core English", "Tutor", "DClass",
                         "Homeroom", "Health", "Core Science", "Flim Making", "DClass", "Lunch", "R+W", "Add Maths", "Chinese", "DClass", "",
                         "Homeroom", "Core Maths", "Buddhism", "Guidance", "Thai", "Lunch", "Music", "", "", "", "", 
                         "Homeroom", "Career", "Core Maths", "R+W", "Lunch", "Social", "Core English", "Additional Science", "DClass", "", ""]

const element_secondary = ["เวลา", "จันทร์", "อังคาร" , "พุธ", "พฤหัสบดี", "ศุกร์"] // ["[Time]", "[Monday]", "[Tuesday]", "[Thursday]", "[Friday]"]
const classes_secondary = ["โฮมรูม", "สังคมฯ", "ภาษาอังกฤษ", "วิทย์ฯ พื้นฐาน", "DClass", "พักกลางวัน", "คณิตฯ พื้นฐาน", "ไทย", "อ่านและเขียน", "ติวเตอร์", "DClass",
                           "โฮมรูม", "ไทย", "พละ", "ประวัติ", "พักกลางวัน", "คณิตฯ เพิ่มเติม", "ศิลปะ", "การช่าง", "ภาษาอังกฤษ", "ติวเตอร์", "DClass",
                           "โฮมรูม", "สุขศึกษา", "วิทย์ฯ พื้นฐาน", "ผลิดสื่อวีดีทัศน์", "DClass", "พักกลางวัน", "อ่านและเขียน", "คณิตฯ เพิ่มเติม", "ภาษาจีน", "DClass", "",
                           "โฮมรูม", "คณิตฯ พื้นฐาน", "พระพุทธศาสนา", "แนะแนว", "ไทย", "พักกลางวัน", "ดนตรี", "", "", "", "",
                           "โฮมรูม", "การงานฯ", "คณิตฯ พื้นฐาน", "อ่านและเขียน", "พักกลางวัน", "สังคมฯ", "ภาษาอังกฤษ", "วิทย์ฯ เพื่มเติม", "DClass", "", "",]


// Subject's Google Meet and Google Classroom links.
// "[Subject]": { **MUST BE THE SAME WITH ONE YOU PUT ON 'class_primary' CONST**
//     "videocall": "[Video Call Link]",
//     "classroom": "[Classroom Link]"    
// }, <- Do not add the ',' if it's the last element.

const subj = {
    "Homeroom"  : {
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
        "videocall": "https://meet.google.com/anb-bgwt-jqb?authuser=2",
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
        "videocall": "https://meet.google.com/lookup/ddlxbpb3gt?authuser=2",
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
        "videocall": "https://meet.google.com/gzv-wipn-vse?authuser=2",
        "classroom": "https://classroom.google.com/u/2/c/NDE4OTcwMDQ2ODky"
    },

    // Do not edit here!
    "DClass": {
        "videocall": "",
        "classroom": ""
    },
    "Lunch": {
        "videocall": "",
        "classroom": ""
    },
    "Break": {
        "videocall": "",
        "classroom": ""
    },
    "": {
        "videocall": "",
        "classroom": ""
    }
}

// Bookmarks
//
// "[! DO NOT EDIT !]": {
//     "rowname": "[Row Name]",
//     "rowname_secondary": "[Secondary Row Name]",
//     "[! DO NOT EDIT !]" {
//         "name": "[Bookmark Name]",
//         "name_secondary": "[Secondary Bookmark Name]",
//         "url": "[Bookmark URL]"
//     },
//     "[! DO NOT EDIT !]" {
//         "name": "[Bookmark Name]",
//         "name_secondary": "[Secondary Bookmark Name]",
//         "url": "[Bookmark URL]"
//     }
// }
//
// Fixed amount of bookmarks (4 links, 2 changeable name types)
//    Future update(s) might feature more customizable types

var bookmark_google_title_primary = "Search with Google"
var bookmark_google_title_secondary = "ค้นหาด้วยกูเกิ้ล"

var bookmark_google_search_primary = "Search"
var bookmark_google_search_secondary = "ค้นหา"

var bookmark_go_name_primary = "Go"
var bookmark_go_name_secondary = "ไป"
var bookmarks = {
    "row0": {
        "rowname": "QuickLinks",
        "rowname_secondary": "ลิ้งค์รวดเร็ว",
        "content0": {
            "name": "Google Classroom",
            "name_secondary": "กูเกิ้ลคลาสรูม",
            "url": "https://classroom.google.com/u/2/h"
        },
        "content1": {
            "name": "Google Classroom - To Do",
            "name_secondary": "กูเกิ้ลคลาสรูม - ที่ต้องทำ",
            "url": "https://classroom.google.com/u/2/a/not-turned-in/all"
        },
        "content2": {
            "name": "Google Meet",
            "name_secondary": "กูเกิ้ลมีท",
            "url": "https://meet.google.com/landing?authuser=2"
        },
        "content3": {
            "name": "Google Drive",
            "name_secondary": "กูเกิ้ลไดรฟ์",
            "url": "https://drive.google.com/drive/u/2/"
        }
    },
    "row1": {
        "rowname": "After School",
        "rowname_secondary": "ลิ้งค์เลิกเรียน",
        "content0": {
            "name": "YouTube",
            "name_secondary": "ยูทูป",
            "url": "https://www.youtube.com/"
        },
        "content1": {
            "name": "Facebook",
            "name_secondary": "เฟสบุ๊ค",
            "url": "https://www.facebook.com/"
        },
        "content2": {
            "name": "Instagram",
            "name_secondary": "อินสตราแกรม",
            "url": "https://www.instagram.com/"
        },
        "content3": {
            "name": "Twitter",
            "name_secondary": "ทวิตเตอร์",
            "url": "https://twitter.com/"
        }
    }
}