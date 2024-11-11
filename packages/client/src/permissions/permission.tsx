export const requestNotificationPermission = () => {
  if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        console.warn('Permission for notifications was not granted')
      }
    })
  }
}
