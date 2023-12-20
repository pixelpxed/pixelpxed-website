window.addEventListener("load", () => {
    setClassVariables()
})

var classes
var classtime_type = "Regular"
var classtimes = {
    "Regular": {
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
    "Special": {
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 40,
            "starthour": 7,
            "startmin": 50,
        }
    },
    "Online": {
        "timeremaining": {
            "periodperday": 10,
            "periodlength": 50,
            "starthour": 7,
            "startmin": 40,
        }
    },
}

var subj = {}
var customClassJSON
const classTimetable = localStorage.getItem("timetable-classTimetable")
function setClassVariables() {
    if (classTimetable === "405") {
        fetch(`${classdatafetchpath}/${classTimetable}.json`)
            .then((res) => res.json())
            .then((data) => { 
                regularClasses = data.class               
                subj = data.links
                
                if (data.override.state != true) {
                    classes = data.class
                } if (data.override.state == true) {
                    var weekNum = calculateWeekNumber()

                    if (data.override.class[weekNum]) {
                        classes = data.override.class[weekNum]
                        subj = Object.assign(subj, data.override.links)
                    } if (!data.override.class[weekNum]) {
                        classes = data.class
                    }
                }
                bigPictureScript()
            })
        return
    }
    document.getElementById("subjname").innerHTML = `Big picture isn't supported on custom classes.`;
}

// Public variables
var timeleftinterval = undefined
var bellChimes = new Audio("/timetable/assets/sound/bellChimes.mp3")

function bigPictureScript() {
    // Calculated every 1 second.
    timeleftinterval = setInterval(() => {
        var periodTimeLeft = classtimes[classtime_type]["timeremaining"];
        var periodperday = periodTimeLeft["periodperday"];
        var periodlength = periodTimeLeft["periodlength"];
        var starthour = periodTimeLeft["starthour"];
        var startmin = periodTimeLeft["startmin"];
    
        var curtimeM = (hour * 60) + minute;
        var curtimeS = (curtimeM * 60) + second;
    
        var endtime = ((starthour * 60) * 60) + (startmin * 60);
        var timediff = endtime - curtimeS;
    
        var periodno = -1;
    
        while (timediff < 0) {
            var timediff = timediff + (periodlength * 60);
            var periodno = periodno + 1;
        }
    
        var rseconds = timediff % 60;
        var rminutes = Math.floor(timediff / 60);
    
        if (periodno >= 0 && periodno <= periodperday) {
            var classnumberid = ((today.getDay() - 1) * 11) + (periodno) + 11

            var classtofetch = classes[classnumberid]

            if (classtofetch == "-extend") {
                i = 1
                while (classes[classnumberid - i] == "-extend") {
                    i = i + 1
                }

                classtofetch = [classes[classnumberid - i]]
            }
    
            if (day == "Sunday" || day == "Saturday") {
                classtofetch = "-"
            }
            
            if (subj[classtofetch].subjname !== "") {
                classtofetch = subj[classtofetch].subjname
            }

            document.getElementById("subjname").innerHTML = classtofetch
    
            // ------------------------------------------------------------------
    
            // document.getElementById("period").innerHTML = periodno
            document.getElementById("timeremaining-refreshcontent").innerHTML = `Period ${periodno} - ${rminutes >= 10 ? rminutes : "0" + rminutes}:${rseconds >= 10 ? rseconds : "0" + rseconds}`;
    
            // Check if period ends (hour and minutes = 0)
            if ((rminutes == 0) && (rseconds == 0)) {
                // If sound setting is enabled, play the sound.
                if (localStorage.getItem("timetable-enableTimeRemainingSound") === "true") {
                    bellChimes.play();
                }
            } 
        }
        if (day !== "Sunday" && day !== "Saturday") {
            if (periodno <= 0) {
                document.getElementById("timeremaining-refreshcontent").innerHTML = `Day Start`;
            }
            if (periodno > periodperday) {
                document.getElementById("timeremaining-refreshcontent").innerHTML = `Day End`;
            }
        } if (day == "Sunday" || day == "Saturday") {
            document.getElementById("timeremaining-refreshcontent").innerHTML = `Weekend`;
        }
    }, 1000);
    
    fetch("http://api.quotable.io/quotes/random")
        .then((res) => res.json())
        .then((data) => {
            var quote = data
    
            document.querySelector(".quotes-wrapper").style.opacity = "1"
    
            document.querySelector(".quote").innerHTML = `"${quote[0].content}"`
            document.querySelector(".author").innerHTML = `- ${quote[0].author}`
    
            setTimeout(() => {
                document.querySelector(".quotes-wrapper").style.opacity = "0"
            }, 29000);
        })
    setInterval(() => {
        fetch("http://api.quotable.io/quotes/random")
            .then((res) => res.json())
            .then((data) => {
                var quote = data
        
                document.querySelector(".quotes-wrapper").style.opacity = "1"
        
                document.querySelector(".quote").innerHTML = `"${quote[0].content}"`
                document.querySelector(".author").innerHTML = `- ${quote[0].author}`
        
                setTimeout(() => {
                    document.querySelector(".quotes-wrapper").style.opacity = "0"
                }, 29000);
            })
    }, 30000);
}

// ----------------------------------

// var backgrounds = [
//     "/timetable/bigpicture/video/alive.mp4",
//     "/timetable/bigpicture/video/dna.mp4"
// ]

var backgrounds = [
    "http://sylvan.apple.com/Aerials/2x/Videos/SE_A016_C009_HDR_20190717_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A114_C001_0305OT_v10_HDR_FINAL_22062018_Bert_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GL_G002_C002_PSNK_v03_HDR_PS_20180925_HDR_2K_tuned.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT026_363A_103NC_E1027_KOREA_JAPAN_NIGHT_v18_HDR_PS_20180907_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/PA_A001_C007_HDR_20190719_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A008_C004_ALTB_ED_FROM_FLAME_RETIME_v46_HDR_PS_20180917_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_L007_C007_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT312_162NC_139M_1041_AFRICA_NIGHT_v14_HDR_FINAL_20180706_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_CH_C002_C005_PSNK_v05_HDR_FINAL_20180709_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GL_G004_C010_PSNK_v04_HDR_FINAL_20180709_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/PA_A004_C003_HDR_20190719_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A005_C009_PSNK_ALT_v09_HDR_PS_20180914_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A009_C001_010181A_v09_HDR_PS_FINAL_20180725_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A011_C003_DGRN_LNFIX_STAB_v57_HDR_PS_20181002_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/KP_A010_C002_HDR_20190717_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_N013_C004_PS_v01_HDR_PS_20180925_F1970F7193_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT329_113NC_396B_1105_ITALY_TO_ASIA_v03_HDR_PS_20180824_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A006_C004_v01_HDR_FINAL_PS_20180730_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A105_C002_v06_HDR_FINAL_25062018_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A013_C012_0122D6_CC_v01_HDR_PS_FINAL_20180710_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/BO_A018_C029_HDR_20190812_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_CH_C007_C004_PSNK_v02_HDR_FINAL_20180709_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT314_139M_170NC_NORTH_AMERICA_AURORA__COMP_v22_HDR_20181206_v12CC_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A006_C008_PSNK_ALL_LOGOS_v10_HDR_PS_FINAL_20180801_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D011_C010_PSNK_DENOISE_v19_HDR_PS_20180914_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A001_C004_1207W5_v23_HDR_FINAL_20180706_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A083_C002_1130KZ_v04_HDR_PS_FINAL_20180725_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/PA_A002_C009_HDR_20190730_ALT02_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT308_139K_142NC_CARIBBEAN_DAY_v09_HDR_PS_FINAL_22062018_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_H012_C009_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GL_G010_C006_PSNK_NOSUN_v12_HDR_FINAL_20180709_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT306_139NC_139J_3066_CALI_TO_VEGAS_v08_HDR_PS_20180824_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_N008_C009_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_LA_A009_C009_PSNK_v02_HDR_FINAL_20180709_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_L012_C002_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_H004_C009_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A108_C001_v09_HDR_PS_FINAL_22062018_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT329_117NC_401C_1037_IRELAND_TO_ASIA_v48_HDR_PS_FINAL_20180725_F0F6300_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D008_C010_PSNK_v21_HDR_PS_20180914_F0F16157_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_C003_C003_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/conform_PA_A010_C007_HDR_2019070_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_HK_B005_C011_PSNK_v16_HDR_PS_20180914_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_H005_C012_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT329_113NC_396B_1105_CHINA_v04_HDR_FINAL_20180706_F900F2700_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A015_C018_0128ZS_v03_HDR_PS_FINAL_20180710_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A050_C004_1027V8_v16_HDR_FINAL_20180706_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D002_C003_PSNK_v04_HDR_PS_20180914_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_CH_C007_C011_PSNK_v02_HDR_FINAL_20180709_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/BO_A012_C031_HDR_20190726_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A105_C003_0212CT_FLARE_v10_HDR_PS_FINAL_20180711_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_LW_L001_C003__PSNK_DENOISE_v04_HDR_PS_FINAL_20180803_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_HK_H004_C010_PSNK_v08_HDR_PS_20181009_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A351_C001_v06_HDR_PS_FINAL_20180725_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/BO_A014_C008_HDR_20190719_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A001_C001_120530_v04_HDR_FINAL_20180706_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A006_C003_1219EE_CC_v01_HDR_PS_FINAL_20180710_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D001_C001_PSNK_v06_HDR_PS_20180824_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/BO_A014_C023_HDR_20190717_F240F3709_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_N008_C003_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT110_112NC_364D_1054_AURORA_ANTARTICA__COMP_FINAL_v34_PS_HDR_20181107_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_L010_C006_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_1223LV_FLARE_v21_HDR_PS_FINAL_20180710_F0F5700_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A103_C002_0205DG_v12_HDR_FINAL_20180706_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_N003_C006_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_C001_C005_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A008_C007_011550_CC_v01_HDR_PS_FINAL_20180710_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT307_136NC_134K_8277_NY_NIGHT_01_v25_HDR_PS_20180907_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_L004_C011_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_H004_C007_PS_v02_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/HK_H004_C013_2K_HDR_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_DB_D001_C005_COMP_PSNK_v12_HDR_PS_20180912_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A012_C014_1223PT_v53_HDR_PS_FINAL_20180710_F0F8700_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_H007_C003_PS_v01_HDR_PS_20180925_HDR_2K_tuned.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_HK_H004_C008_PSNK_v19_HDR_PS_20180914_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_A007_C017_01156B_v02_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_LW_L001_C006_PSNK_DENOISE_v02_HDR_FINAL_20180709_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_GMT060_117NC_363D_1034_AUSTRALIA_v35_HDR_PS_FINAL_20180831_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/comp_C004_C003_PS_v01_HDR_PS_20180925_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/g201_WH_D004_L014_HDR_20191031_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/DL_B002_C011_HDR_20191122_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/g201_TH_803_A001_8_HDR_20191031_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/g201_TH_804_A001_8_HDR_20191031_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/RS_A008_C010_HDR_20191218_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/MEX_A006_C008_HDR_20190923_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/g201_CA_A016_C002_HDR_20191114_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/g201_AK_A003_C014_HDR_20191028_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/FK_U009_C004_HDR_20191220_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/CR_A009_C007_HDR_20191113_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/AK_A004_C012_HDR_20191217_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/G007_C004_UHD_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/G008_C015_UHD_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/G009_C003_UHD_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/G009_C014_UHD_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/G010_C026_UHD_HDR_v02_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/P001_C005_UHD_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/P005_C002_UHD_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/P006_C002_UHD_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/P007_C027_UHD_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/Y004_C015_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/Y005_C003_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/Y002_C013_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/Y003_C009_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/Y011_C001_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/Y009_C015_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/Y011_C008_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/I003_C008_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/S003_C020_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/I003_C011_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/I004_C014_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/I003_C015_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/I003_C004_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/S006_C007_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/S005_C015_HDR_2K_HEVC.mov",
    "http://sylvan.apple.com/Aerials/2x/Videos/I005_C008_CROP_HDR_2K_HEVC.mov"
]
var videosrc = backgrounds[Math.floor(Math.random() * backgrounds.length)];
document.querySelector(".background-video").src = videosrc

// ----------------------------------

function toggleFullScreen(element) {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullScreen) {
            element.webkitRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}