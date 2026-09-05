// Android OpenRosary uses these exact timings (including the leading 0ms delay).
const SINGLE_PATTERN: VibratePattern = 50;
const DOUBLE_PATTERN: VibratePattern = [0, 50, 100, 50];
const TRIPLE_PATTERN: VibratePattern = [0, 50, 100, 50, 100, 50];

type VibratePattern = number | number[];

function vibrate(pattern: VibratePattern) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
    }
}

export function singleVibrate() {
    vibrate(SINGLE_PATTERN);
}

export function tripleVibrate() {
    vibrate(TRIPLE_PATTERN);
}

export function doubleVibrate() {
    vibrate(DOUBLE_PATTERN);
}
