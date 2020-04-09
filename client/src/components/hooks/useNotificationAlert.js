import useAudio from './useAudio'
import notificationAlert from '../../assets/sounds/notification.mp3'

const useNotificationAlert = () => {
    return useAudio(notificationAlert)
}

export default useNotificationAlert