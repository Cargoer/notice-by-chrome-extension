var countdownTimer = null

function showRemain(el, timeVal) {
  let timeVa = Number(timeVal)
  let hour = Math.floor(timeVa / 3600000)
  let minute = Math.floor((timeVa % 3600000) / 60000)
  let second = Math.floor((timeVa % 60000) / 1000)
  el.innerHTML = `${hour}: ${minute}: ${second}`
  if(!pause) {
    countdownTimer = setInterval(() => {
      if(second == 0) {
        if(minute == 0) {
          if(hour == 0) {
            clearInterval(countdownTimer)
            showRemain(el, bg.duration)
          }
          else {
            hour -= 1
            minute = 59
          }
        }
        else {
          minute -= 1
          second = 59
        }
      }
      else {
        second -= 1
      }
      el.innerHTML = `${hour}: ${minute}: ${second}`
    }, 1000)
  }
}

function pauseCountdown() {
  if(!pause) {
    clearInterval(countdownTimer)
    bg.pauseCd()
    pause = true
  }
}

function continueCountdown() {
  if(pause) {
    bg.continueCd()
    initCountdownDisplay()
    pause = false
  }
}

function reset() {
  bg.reset()
  clearInterval(countdownTimer)
  initCountdownDisplay()
}

function initCountdownDisplay() {
  let {duration, remainTime, lastCountStart, noticeTitle, noticeContent, isPause} = bg
  noticeTitleInput.value = noticeTitle
  noticeContentInput.value = noticeContent
  pause = isPause
  var timeVal = (remainTime? remainTime: duration) - (new Date() - lastCountStart);
  if(pause) {
    timeVal = remainTime
  }
  showRemain(showRemainEl, timeVal)
}

function setBgDuration() {
  bg.setDuration(timeInput.value)
}

function setBgNotice() {
  bg.setNotice(
    noticeTitleInput.value,
    noticeContentInput.value,
  )
}


// 本文件相关变量
var pause = false

// 获取背景文件
var bg = chrome.extension.getBackgroundPage();
console.log("bg:", bg)

// 获取展示元素
var showRemainEl = document.getElementById('show_remain')

// 获取按钮控制元素
var pauseBtn = document.getElementById("pause_btn")
pauseBtn.onclick = pauseCountdown

var continueBtn = document.getElementById("continue_btn")
continueBtn.onclick = continueCountdown

var resetBtn = document.getElementById("reset_btn")
resetBtn.onclick = reset

var setTimeBtn = document.getElementById("set_time_btn")
var timeInput = document.getElementById("time_input")
setTimeBtn.onclick = setBgDuration

// 获取提醒输入元素
var noticeTitleInput = document.getElementById("notice_title_input")
var noticeContentInput = document.getElementById("notice_content_input")
var changeNoticeBtn = document.getElementById("change_notice_btn")
changeNoticeBtn.onclick = setBgNotice


initCountdownDisplay()