import { useState, useEffect } from 'react'

const useAudio = (url) => {
    const [audio] = useState(new Audio(url))
    useEffect(() => {
        audio.addEventListener('ended', () => setAudioPlaying(false))
        return () => audio.removeEventListener('ended', () => setAudioPlaying(false))
    })

    const [isAudioPlaying, setAudioPlaying] = useState(false)
    useEffect(() => {
        isAudioPlaying ? audio.play() : audio.pause()
    }, [isAudioPlaying, audio])

    return [isAudioPlaying, setAudioPlaying]
}

export default useAudio