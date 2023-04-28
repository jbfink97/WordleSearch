import './style.css';
import { importedList } from './wordList';
import { getYellowLetters, getGreyLetters, getGreenLetters, isNumber } from './functions';



// variable declarations
let wordList = importedList.split('\n');
let yellowElement = document.getElementById('yellow');
let greyElement = document.getElementById('grey');
let greenElements = document.querySelectorAll('.greenLetter')
let yellowLetters;
let greenLetters = [];
let greyLetters;
let searchBtn = document.querySelector('.search');
let skip = 0;
let currentLetter;
let remainingWords = document.querySelector('.remaining');
let errorMessage = document.querySelector('.error');

// listener prevents two of the same letter being in the same text box
// and prevents a letter from being in both the good and bad text boxes at the same time
yellowElement.addEventListener('beforeinput', e => {
    //yellowLetters = yellowElement.value.split('');
    yellowLetters = getYellowLetters();
    greyLetters = getGreyLetters();
    if (isNumber(e.data)) {
        e.preventDefault();
        errorMessage.textContent = "Only input  letters, no numbers";
    } else if (e.data == null) {
        errorMessage.textContent = "";
    }
    // If the letter the user is trying to type is already in the grey letters input,
    // give an error message and prevent it from being put in the yellow text box
    else if (greyLetters.includes(e.data.toLowerCase())) {
        e.preventDefault();
        errorMessage.textContent = "Letters cannot be grey and yellow/green at the same time";
    } else if (yellowLetters.includes(e.data.toLowerCase())) {
        e.preventDefault();
        errorMessage.textContent = "Don't repeat letters please";
    } else {
        errorMessage.textContent = "";
    }
})

// Do the same thing as above for grey tile text box
greyElement.addEventListener('beforeinput', e => {
    yellowLetters = getYellowLetters();
    greyLetters = getGreyLetters();
    greenLetters = getGreenLetters();
    if (isNumber(e.data)) {
        e.preventDefault();
        errorMessage.textContent = "Only input  letters, no numbers";
    } else if (e.data == null) {
        errorMessage.textContent = "";
    }
    else if (yellowLetters.includes(e.data.toLowerCase()) || greenLetters.includes(e.data.toLowerCase())) {
        e.preventDefault();
        errorMessage.textContent = "Letters cannot be grey and yellow/green at the same time";
    } else if (greyLetters.includes(e.data.toLowerCase())) {
        e.preventDefault();
        errorMessage.textContent = "Don't repeat letters please";
    } else {
        errorMessage.textContent = "";
    }
})

// Add similar listeners to green tile letters
// However, forEach must be used since there is > 1 element
greenElements.forEach(letterBox => {
    letterBox.addEventListener('beforeinput', e => {
        greyLetters = getGreyLetters();
        if (isNumber(e.data)) {
            e.preventDefault();
            errorMessage.textContent = "Only input  letters, no numbers";
        } else if (e.data == null) {
            errorMessage.textContent = "";
        }
        else if (greyLetters.includes(e.data.toLowerCase())) {
            e.preventDefault();
            errorMessage.textContent = "Letters cannot be grey and yellow/green at the same time";
        } else {
            errorMessage.textContent = "";
        }
    })
})

searchBtn.addEventListener('click', () => {
    // Split word list at new line to create array of possible words rather than
    // one long string
    // Re-defining the variable on each click makes sure the search iterates over the entire
    // list again. In case the user deleted or changed anything in the text boxes.
    // wordList = importedList.split('\n');
    greyLetters = getGreyLetters();
    greenLetters = getGreenLetters();
    yellowLetters = getYellowLetters();

    // Loop over each word in wordList
    for (let j = 0; j < wordList.length; j++) {
        // Loop over each letter in each word in wordList (5 letters per word)
        for (let k = 0; k < 5; k++) {
            // Loop over all the greenLetters array and remove words that do not have
            // a green letter in the same spot
            for (let l = 0; l < greenLetters.length; l++) {
                // If no letters in current green letter box, move to next letter box
                if (greenLetters[l] == "" || l != k) {
                    continue;
                } else if (wordList[j][k] != greenLetters[l]) {
                    // remove word for wordList if its letter does not match a green letter
                    wordList.splice(j, 1);
                    // setting skip to 1 will allow us to skip the remaining letters after
                    // exiting this loop
                    skip = 1;
                    // must decrement i because we removed a word. If not, the next word
                    // in the list would be skipped
                    j--;
                    break;
                }
            }
            // This will skip the remaining letters of the word we just removed and 
            // move on to the next word in wordList
            if (skip == 1) {
                skip = 0;
                break;
            }

            // Remove current word from wordList if it contains a grey letter
            for (let m = 0; m < greyLetters.length; m++) {
                currentLetter = greyLetters[m];
                if (wordList[j].includes(currentLetter)) {
                    wordList.splice(j, 1);
                    skip = 1;
                    j--;
                    break;
                }
            }
            if (skip == 1) {
                skip = 0;
                break;
            }

            // Remove current word from wordList if it does not contain yellow letter
            for (let n = 0; n < yellowLetters.length; n++) {
                currentLetter = yellowLetters[n];
                if (wordList[j].includes(currentLetter) == false) {
                    wordList.splice(j, 1);
                    skip = 1;
                    j--;
                    break;
                }
            }
            if (skip == 1) {
                skip = 0;
                break;
            }
        }
    }

    // Remove current remaing word list elements
    while (remainingWords.firstChild) {
        remainingWords.removeChild(remainingWords.firstChild);
    }

    // Add new remaining word list elements
    for (let o = 0; o < wordList.length; o++) {
        const possibleWord = document.createElement('div');
        possibleWord.classList.add('possibleWord');
        possibleWord.textContent = wordList[o];
        remainingWords.append(possibleWord);
    }
})

export { yellowElement, greyElement, greenElements }
