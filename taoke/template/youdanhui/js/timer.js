// 倒计时
var kk = 0,
    uptimer = null,
    timerLen = 0,
    $timer;
//setObject.el为倒计时dom setObject.endTxt为结束内容
function runTimer(setObject){
    $timer = setObject.el;
    timerLen = $timer.length;
    clearInterval(uptimer);
    uptimer = setInterval(countDown,1000,setObject);
    countDown(setObject);
}
// 补零
function fillZero(num, digit) {
    var str = '' + num;
    while (str.length < digit) {
        str = '0' + str;
    }
    return str;
}
function countDown(setObject) {
    for (var i = 0;i < timerLen; i++) {
        var time = parseInt($timer.eq(i).attr("data-second"));
        var iRemain = time;
        iRemain = iRemain - kk;
        var iDay = 0;
        var iHour = 0;
        var iMin = 0;
        var iSec = 0;
        var _sHTML = '';
        iHour = parseInt(iRemain / 3600);
        if (!(iDay == 0 && iHour == 0)) {
            iHour = fillZero(iHour, 2);
            _sHTML += "<span class='over_hour'>" + iHour + "</span>:";
        } else {
            _sHTML += "<span class='over_hour'>00</span>:";
        }
        iRemain %= 3600;

        iMin = parseInt(iRemain / 60);
        if (!(iDay == 0 && iHour == 0 && iMin == 0)) {
            iMin = fillZero(iMin, 2);
            _sHTML += "<span class='over_minute'>" + iMin + "</span>:";
        } else {
            _sHTML += "<span class='over_minute'>00</span>:";
        }
        iRemain %= 60;

        iSec = iRemain;
        if (time > kk) {
            iSec = fillZero(iSec, 2);
            _sHTML += "<span class='over_second'>" + iSec + "</span>后结束";
        } else {
            _sHTML = setObject.endTxt;
            if(timerLen < 2){
                clearInterval(uptimer);
            }
            $timer.eq(i).removeClass('timer');
        }
        $timer.eq(i).html(_sHTML);
    }
    kk++;
}