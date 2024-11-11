import { NOTIFICATION_DELAY } from '@/components/Game/constants'

export const showNotificationWithSound = (
  title: string,
  options: NotificationOptions,
  soundFile: string
) => {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, options)

    const audio = new Audio(soundFile)
    audio.play()

    setTimeout(() => {
      notification.close()
    }, NOTIFICATION_DELAY)
  }
}
