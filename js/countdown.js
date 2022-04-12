export default function countdown(duration = 3600000) {
  let notification = webkitNotifications.createNotification(
    '../image/icon.png',
    'time to rest!',
    'get off your chair!'
  )
  setTimeout(() => {
    notification.show()
  }, duration)
}