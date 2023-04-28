import { yellowElement, greyElement, greenElements } from './index';

function getYellowLetters() {
    let yellowLetters = yellowElement.value.toLowerCase();
    yellowLetters = yellowLetters.split('');
    return yellowLetters;
}

function getGreyLetters() {
    let greyLetters = greyElement.value.toLowerCase();
    return greyLetters;
}

function getGreenLetters() {
    let greenLetters = [];
    for (let i = 0; i < 5; i++) {
        greenLetters[i] = greenElements[i].value.toLowerCase();
    }
    return greenLetters;
}


function isNumber(e) {
    if (e == null) {
        return false
    }
    if (!isNaN(e)) {
        return true;
    } else {
        return false
    }
}

export { isNumber, getGreenLetters, getGreyLetters, getYellowLetters }