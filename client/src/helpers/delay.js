export default (_, onSuccess, onFailure) => {
    return new Promise((resolve, reject) => {
        const sleepDurationMs = Math.random() * 10000
        console.log('Sleep Duration: ', sleepDurationMs)
        setTimeout(() => {
            if (Math.random() < 0.5) {
                reject(new Error('Dummy Promise Reject'))
            } else {
                resolve('Dummy Promise Resolve')
            }
        }, sleepDurationMs);
    }).then(onSuccess).catch(onFailure)
}