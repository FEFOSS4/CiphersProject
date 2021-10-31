// Alphabets
var engAlphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var arbAlphabets = ['ء', 'آ', 'أ', 'ؤ', 'إ', 'ئ', 'ا', 'ب', 'ة', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ى', 'ي'];

// Caesar Cipher
function caesarSolver(encryption) {

    var lang = document.getElementById('lang-option').value;
    var key = document.getElementById('key').value;
    var message = document.getElementById('cipher-text').value;
    var result = document.getElementById('result-text');

    if (key === '') {
        key = 0;
    }

    if (lang === "eng") {
        var shiftedArray = engAlphabets.slice();
        result.style.textAlign = "left";
    } else {
        var shiftedArray = arbAlphabets.slice();
        result.style.textAlign = "right";
    }

    shiftedArray = shiftArrayToRight(shiftedArray, key);

    if (encryption) {
        var encryptedMessage = encryptCaesar(shiftedArray, message);
        result.innerHTML = encryptedMessage;
    } else {
        var decryptedMessage = decryptCaesar(shiftedArray, message);
        result.innerHTML = decryptedMessage;
    }
}

function shiftArrayToRight(array, noShifts) {

    if (noShifts < 0 && array.length == 26) {
        shiftArrayToRight(array, noShifts + 26)
    } else if (noShifts < 0 && array.length == 36) {
        shiftArrayToRight(array, noShifts + 36)
    }

    for (var i = 0; i < noShifts; i++) {
        var temp = array.shift();
        array.push(temp);
    }

    return array;
}

function encryptCaesar(array, message) {

    var encryptedMessage = '';

    for (i = 0; i < message.length; i++) {
        if (array.length == 26 && /^[a-z]+$/i.test((message[i]))) {
            encryptedMessage += array[engAlphabets.indexOf((message[i]).toUpperCase())];
        } else if (array.length == 36 && /^[ء-ي]+$/i.test(message[i])) {
            encryptedMessage += array[arbAlphabets.indexOf(message[i])];
        } else {
            encryptedMessage += message[i];
        }
    }

    return encryptedMessage;
}

function decryptCaesar(array, message) {

    var decryptedMessage = '';

    for (i = 0; i < message.length; i++) {
        if (array.length == 26 && /^[a-z]+$/i.test(message[i])) {
            decryptedMessage += engAlphabets[array.indexOf((message[i]).toUpperCase())];
        } else if (array.length == 36 && /^[ء-ي]+$/i.test(message[i])) {
            decryptedMessage += arbAlphabets[array.indexOf(message[i])];
        } else {
            decryptedMessage += message[i];
        }
    }

    return decryptedMessage;
}

/*****************************************************************/

function vigenereSolver(encryption) {

    var lang = document.getElementById('lang-option').value;
    var key = document.getElementById('key').value;
    var message = document.getElementById('cipher-text').value;
    var result = document.getElementById('result-text');

    key = filterKey(key, lang);

    if (!encryption) {
        for (var i = 0; i < key.length; i++) {
            if (lang === 'eng') {
                key[i] = (26 - key[i]) % 26;
            } else {
                key[i] = (36 - key[i]) % 36;
            }
        }
    }

    var resultMessage = encryptDecryptVigenere(key, message, lang);
    result.innerHTML = resultMessage;
}

// This function returns the encrypted text
// generated with the help of the key
function encryptDecryptVigenere(key, message, lang) {

    var encryptedMessage = '';

    for (var i = 0, j = 0; i < message.length; i++) {
        
        var c = message.charCodeAt(i)

        if (isUppercase(c) && lang === 'eng') {
            encryptedMessage += String.fromCharCode((c - 65 + key[j % key.length]) % 26 + 65);
            j++;
        } else if (isLowercase(c) && lang === 'eng') {
            encryptedMessage += String.fromCharCode((c - 97 + key[j % key.length]) % 26 + 97);
            j++;
        } else if (isArabic(c) && lang === 'arb') {
            encryptedMessage += arbAlphabets[(arbAlphabets.indexOf(message[i]) + key[j % key.length]) % 36];
            j++;
        } else {
            encryptedMessage += message.charAt(i);
        }
    }

    return encryptedMessage;
}

function filterKey(key, lang) {
    
    var result = [];
    
    for (var i = 0; i < key.length; i++) {
        var c = key.charCodeAt(i);
        if (isLetter(c) && lang === 'eng') {
            result.push((c - 65) % 32);
        } else if (isLetter(c) && lang === 'arb') {
            result.push(arbAlphabets.indexOf(key[i]));
        }
    }

    return result;
}

function isLetter(c) {
    return isUppercase(c) || isLowercase(c) || isArabic(c);
}

function isArabic(c) {
    return (1569 <= c && c <= 1594) || (1601 <= c && c <= 1610);
}

function isUppercase(c) {
    return 65 <= c && c <= 90;
}

function isLowercase(c) {
    return 97 <= c && c <= 122;
}