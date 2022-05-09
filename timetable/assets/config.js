// General variables
var versionnumber = "2.9.2a"
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

var online_onsite_primary = "On-Site/Online Calandar"
var online_onsite_secondary = "ปฏิทินเรียนที่โรงเรียน/บ้าน"

// Switch for Class Swapping [true/false]
var swapper_control = true

var swapper_primary_language_primary = "Chinese"
var swapper_secondary_language_primary = "Japanese"

var swapper_primary_language_secondary = "ภาษาจีน"
var swapper_secondary_language_secondary = "ภาษาญี่ปุ่น"

// 'Change Language' function. [true/false]
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
const classes_primary = ["Homeroom", "P.E.", "Core Maths", "Guidance", "Lunch", "Social", "History", "Health", "M3 Meeting", "Club", "",
                         "Homeroom", "Compute Sci", "DClass", "Core Maths", "Lunch", "R+W", "Thai", "Core English", "Buddhism", "Art", "",
                         "Homeroom", "Core English", "Add Maths", "R+W", "Lunch", "Social", "Thai", "Music", "Scout", "Tutor", "DClass",
                         "Homeroom", "Compute Sci", "Thai", "Core Maths", "Lunch", "R+W", "Core English", "Core Science", "DClass", "Tutor", "DClass",
                         "Homeroom", "Core Science", "Add Maths", "Design and Technology", "DClass", "Lunch", "Chinese", "DClass", "Additional Science", "DClass", "",]

const element_secondary = ["เวลา", "จันทร์", "อังคาร" , "พุธ", "พฤหัสบดี", "ศุกร์"] // ["[Time]", "[Monday]", "[Tuesday]", "[Thursday]", "[Friday]"]
const classes_secondary = ["โฮมรูม", "พละ", "คณิตฯ พื้นฐาน", "แนะแนว", "พักกลางวัน", "สังคมฯ", "ประวัติฯ", "สุขศึกษา", "ประชุม ม.3", "ชุมนุม", "",
                           "โฮมรูม", "วิทยาการคำนวณ", "DClass", "คณิตฯ พื้นฐาน", "พักกลางวัน", "อ่านและเขียน", "ภาษาไทย", "ภาษาอังกฤษ", "พุทธศาสนา", "ศิลปะ", "",
                           "โฮมรูม", "ภาษาอังกฤษ", "คณิตฯ เพิ่มเติม", "อ่านและเขียน", "พักกลางวัน", "สังคมฯ", "ภาษาไทย", "ดนตรี", "ลูกเสือ", "ติวเตอร์", "DClass",
                           "โฮมรูม", "วิทยาการคำนวณ", "ภาษาไทย", "คณิตฯ พื้นฐาน", "พักกลางวัน", "อ่านและเขียน", "ภาษาอังกฤษ", "วิทย์ฯ พื้นฐาน", "DClass", "ติวเตอร์", "DClass",
                           "โฮมรูม", "วิทย์ฯ พื้นฐาน", "คณิตฯ เพิ่มเติม", "การออกแบบและเทคโนโลยี", "DClass", "พักกลางวัน", "ภาษาจีน", "DClass", "วิทย์ฯ เพิ่มเติม", "DClass", ""]


// Subject's Google Meet and Google Classroom links.
// "[Subject]": { **MUST BE THE SAME WITH ONE YOU PUT ON 'class_primary' CONST**
//     "videocall": "[Video Call Link]",
//     "classroom": "[Classroom Link]"    
// }, <- Do not add the ',' if it's the last element.

const subj = {
    "Homeroom"  : {
        "videocall": "",
        "classroom": ""
    },
    "Core Maths": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1ODE4MTEyMjg1"
    },
    "Add Maths": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1ODE4MTEyNDM5"
    },
    "Core English": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/4/c/NDg1NzU1MjUyMzgw"
    },
    "R+W": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NTEwODIyMDk4NjI0"
    },
    "Core Science": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1ODE0NDUxMTA1"
    },
    "Additional Science": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1ODEzODc3MTIx"
    },
    "Design and Technology": {
        "videocall": "",
        "classroom": ""
    },
    "Compute Sci": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1MTY1NjA4MjE2"
    },
    "Social": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NTA5NzMwNzk4NzA4"
    },
    "Health": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1ODE2NTE2OTI3"
    },
    "P.E.": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1ODQxNjQxOTk3"
    },
    "Thai": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NTEzODYyMTc3MTk4"
    },
    "Guidance": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1ODE2MzY3ODk4"
    },
    "History": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1NzQwODYyMDIy"
    },
    "Buddhism": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1NzU1Mzg5MDkw"
    },
    "Art": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg2NTIzOTU5NDI3"
    },
    "Chinese": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1NzczMDI2MTM2"
    },
    "Japanese": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1NzcyMDYwOTQw"
    },
    "Music": {
        "videocall": "",
        "classroom": "https://classroom.google.com/u/2/c/NDg1ODE3MTgwMDI4"
    },
    "Scout": {
        "videocall": "",
        "classroom": ""
    },
    "M3 Meeting": {
        "videocall": "",
        "classroom": ""
    },
    "Club": {
        "videocall": "",
        "classroom": ""
    },
    "Tutor": {
        "videocall": "",
        "classroom": ""
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
