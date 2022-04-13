var duration = 3600000 // 毫秒数 - 一小时
var remainTime = 0
var timer = null
var lastCountStart = null
var isPause = false

var noticeTitle = '休息提醒'
var noticeContent = '该休息了！'

function notice() {
  chrome.notifications.create(
    options = {
      type: 'basic',
      title: noticeTitle,
      message: noticeContent,
      iconUrl: 'image/icon.png'
    }
  )
}

// 连续计时
function consistCountdown(_duration = 3600000) {
  lastCountStart = new Date()
  timer = setInterval(() => {
    notice()
    lastCountStart = new Date()
  }, _duration)
}

// 单次特殊场景下计时，结束后恢复正常连续计时
function singleCountdown(_duration = 0) {
  lastCountStart = new Date()
  timer = setTimeout(() => {
    notice()
    remainTime = 0
    consistCountdown(duration)
  }, _duration)
}

function pauseCd() {
  remainTime = (remainTime? remainTime: duration) - (new Date() - lastCountStart);
  // 一个很有意思的现象：clearInterval可以清除延时器setTimeout，反之亦然
  clearInterval(timer)
  isPause = true
}

function continueCd() {
  singleCountdown(remainTime)
  isPause = false
}

function reset() {
  remainTime = 0
  clearInterval(timer)
  consistCountdown(duration)
}

function setDuration(_duration) {
  duration = _duration
}

function setNotice(title = '消息提醒', content) {
  noticeTitle = title
  noticeContent = content
}

window.onload = function() {
  consistCountdown(duration)
}