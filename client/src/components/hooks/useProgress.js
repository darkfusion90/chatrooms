import { useState } from 'react'

import {
    PROGRESS_INITIAL,
    PROGRESS_PENDING,
    PROGRESS_SUCCESS,
    PROGRESS_FAIL
} from '../standalone/ProgressButton'

const useProgress = () => {
    const [progress, setProgress] = useState(PROGRESS_INITIAL)

    return [
        progress,
        () => setProgress(PROGRESS_PENDING),
        () => setProgress(PROGRESS_SUCCESS),
        () => setProgress(PROGRESS_FAIL)
    ]
}

export default useProgress