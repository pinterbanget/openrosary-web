// Web Vibration API wrapper
// Note: Vibration API is supported on Chrome Android but not iOS Safari or desktop Chrome

export function singleVibrate() {
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
}

export function tripleVibrate() {
    if ('vibrate' in navigator) {
        // Pattern: vibrate 50ms, wait 100ms, vibrate 50ms, wait 100ms, vibrate 50ms
        navigator.vibrate([50, 100, 50, 100, 50]);
    }
}

export function doubleVibrate() {
    if ('vibrate' in navigator) {
        // Pattern: vibrate 50ms, wait 100ms, vibrate 50ms
        navigator.vibrate([50, 100, 50]);
    }
}
