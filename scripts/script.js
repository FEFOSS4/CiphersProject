// Alphabets
var engAlphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
var engNumAlphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
var arbAlphabets = ['ء', 'آ', 'أ', 'ؤ', 'إ', 'ئ', 'ا', 'ب', 'ة', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ى', 'ي'];
/********************* ~ CAESAR CIPHER ~ **********************/

function caesarSolver(encryption) {

    var lang = document.getElementById('lang-option').value;
    var num = document.getElementById('num-option').value;
    var key = document.getElementById('key').value;
    var message = document.getElementById('cipher-text').value;
    var result = document.getElementById('result-text');

    if (key === '') {
        key = 0;
    }

    alignText(lang, result);

    if (lang === "eng" && num === "include") {
        var shiftedArray = engNumAlphabets.slice();
    } else if (lang === "eng" && num === "execlude") {
        var shiftedArray = engAlphabets.slice();
    } else {
        var shiftedArray = arbAlphabets.slice();
    }

    shiftedArray = shiftArrayToRight(shiftedArray, key);

    if (encryption) {
        var encryptedMessage = encryptCaesar(shiftedArray, message, lang, num);
        result.innerHTML = encryptedMessage;
    } else {
        var decryptedMessage = decryptCaesar(shiftedArray, message, lang, num);
        result.innerHTML = decryptedMessage;
    }
}

function shiftArrayToRight(array, noShifts) {

    if (noShifts < 0 && array.length == 36) {
        shiftArrayToRight(array, noShifts + 36)
    } else if (noShifts < 0 && array.length == 26) {
        shiftArrayToRight(array, noShifts + 26)
    }

    for (var i = 0; i < noShifts; i++) {
        var temp = array.shift();
        array.push(temp);
    }

    return array;
}

function encryptCaesar(array, message, lang, num) {

    var encryptedMessage = '';

    for (i = 0; i < message.length; i++) {

        var c = message.charCodeAt(i)

        if (num === 'include' && lang === 'eng' && (isLetter(c) || isNumber(c))) {

            if (isUppercase(c)) {
                encryptedMessage += array[(engNumAlphabets.indexOf(message[i]))];
            } else {
                encryptedMessage += (array[engNumAlphabets.indexOf(message[i].toUpperCase())]).toLowerCase();
            }

        } else if (num === 'execlude' && lang === 'eng' && isLetter(c)) {

            if (isUppercase(c)) {
                encryptedMessage += array[(engAlphabets.indexOf(message[i]))];
            } else {
                encryptedMessage += (array[engAlphabets.indexOf(message[i].toUpperCase())]).toLowerCase();
            }

        } else if (isArabic(c) && lang === 'arb') {

            encryptedMessage += array[arbAlphabets.indexOf(message[i])];

        } else {
            encryptedMessage += message.charAt(i);
        }
    }

    return encryptedMessage;
}

function decryptCaesar(array, message, lang, num) {

    var decryptedMessage = '';

    for (i = 0; i < message.length; i++) {

        var c = message.charCodeAt(i)

        if (num === 'include' && lang === 'eng' && (isLetter(c) || isNumber(c))) {

            if (isUppercase(c)) {
                decryptedMessage += engNumAlphabets[(array.indexOf(message[i]))];
            } else {
                decryptedMessage += (engNumAlphabets[array.indexOf(message[i].toUpperCase())]).toLowerCase();
            }

        } else if (num === 'execlude' && lang === 'eng' && isLetter(c)) {

            if (isUppercase(c)) {
                decryptedMessage += engAlphabets[(array.indexOf(message[i]))];
            } else {
                decryptedMessage += (engAlphabets[array.indexOf(message[i].toUpperCase())]).toLowerCase();
            }

        } else if (isArabic(c) && lang === 'arb') {

            decryptedMessage += arbAlphabets[array.indexOf(message[i])];

        } else {
            decryptedMessage += message.charAt(i);
        }
    }

    return decryptedMessage;
}

/********************* ~ VIGENERE CIPHER ~ **********************/

function vigenereSolver(encryption) {

    var lang = document.getElementById('lang-option').value;
    var num = document.getElementById('num-option').value;
    var key = document.getElementById('key').value;
    var message = document.getElementById('cipher-text').value;
    var result = document.getElementById('result-text');

    alignText(lang, result);

    if (key === '') {
        key = 'A';
    }

    key = filterKey(key, lang);

    if (!encryption) {
        for (var i = 0; i < key.length; i++) {
            if (lang === 'eng' && num === 'execlude') {
                key[i] = (26 - key[i]) % 26;
            } else if (lang === 'eng' && num === 'include') {
                key[i] = (36 - key[i]) % 36;
            } else if (lang === 'arb') {
                key[i] = (36 - key[i]) % 36;
            }
        }
    }

    var resultMessage = encryptDecryptVigenere(key, message, lang, num);
    result.innerHTML = resultMessage;
}

// This function returns the encrypted / decrypted text.
function encryptDecryptVigenere(key, message, lang, num) {

    var encryptedMessage = '';

    for (var i = 0, j = 0; i < message.length; i++) {

        var c = message.charCodeAt(i)

        if (num === 'include' && lang === 'eng' && (isLetter(c) || isNumber(c))) {

            if (isUppercase(c)) {
                encryptedMessage += engNumAlphabets[(engNumAlphabets.indexOf(message[i]) + key[j % key.length]) % 36];
            } else {
                encryptedMessage += (engNumAlphabets[(engNumAlphabets.indexOf(message[i].toUpperCase()) + key[j % key.length]) % 36]).toLowerCase();
            }
            j++;

        } else if (num === 'execlude' && lang === 'eng' && isLetter(c)) {

            if (isUppercase(c)) {
                encryptedMessage += engAlphabets[(engAlphabets.indexOf(message[i]) + key[j % key.length]) % 26];
            } else {
                encryptedMessage += (engAlphabets[(engAlphabets.indexOf(message[i].toUpperCase()) + key[j % key.length]) % 26]).toLowerCase();
            }
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
            result.push(engAlphabets.indexOf(key[i].toUpperCase()));
        } else if (isLetter(c) && lang === 'arb') {
            result.push(arbAlphabets.indexOf(key[i]));
        }
    }

    return result;
}

/********************* ~ MONOALPHABETIC CIPHER ~ **********************/

function monoSolver(encryption) {

    var lang = document.getElementById('lang-option').value;
    var num = document.getElementById('num-option').value;
    var key = document.getElementById('key').value;
    var message = document.getElementById('cipher-text').value;
    var result = document.getElementById('result-text');
    var resultMessage;

    alignText(lang, result);

    if (encryption) {
        resultMessage = monoEncrypt(key, message, lang, num);
        result.innerHTML = resultMessage;
    } else if (!encryption) {
        resultMessage = monoDecrypt(key, message, lang, num);
        result.innerHTML = resultMessage;
    }
}

function monoEncrypt(key, message, lang, num) {

    var textArr = message.split("");
    key.split("");
    var array = [];

    if (lang === "eng" && num === "include") {
        var array = engNumAlphabets.slice();
    } else if (lang === "eng" && num === "execlude") {
        var array = engAlphabets.slice();
    } else {
        var array = arbAlphabets.slice();
    }

    for (let i = 0; i < textArr.length; i++) {
        if ((textArr[i] == ' ') || (textArr[i] == '\t') || (textArr[i] == '\n' || array.indexOf(textArr[i].toUpperCase()) == -1)) {
            continue;

        } else
            textArr[i] = key[array.indexOf(textArr[i].toUpperCase())];
    }
    textArr.join().replace(/,/g, '')
    return textArr.join('');
}


function monoDecrypt(key, message, lang, num) {

    var textArr = message.split("");
    key.split("");
    var array = [];

    if (lang === "eng" && num === "include") {
        var array = engNumAlphabets.slice();
    } else if (lang === "eng" && num === "execlude") {
        var array = engAlphabets.slice();
    } else {
        var array = arbAlphabets.slice();
    }

    for (let i = 0; i < textArr.length; i++) {
        if ((textArr[i] == ' ') || (textArr[i] == '\t') || (textArr[i] == '\n' || array.indexOf(textArr[i].toUpperCase()) == -1)) {
            continue;

        } else {
            textArr[i] = array[key.toUpperCase().indexOf(textArr[i].toUpperCase())];
        }
    }
    textArr.join().replace(/,/g, '')
    return textArr.join('');
}

/********************* ~ Affine CIPHER ~ **********************/
function affineSolver(encryption) {

    var lang = document.getElementById('lang-option').value;
    var num = document.getElementById('num-option').value;
    var key = document.getElementById('key').value;
    var key2 = document.getElementById('key2').value;
    var message = document.getElementById('cipher-text').value;
    var result = document.getElementById('result-text');
    var resultMessage;

    var length = 0;
    if (lang == "eng" && num == "include") {
        length = 36;
    } else if (lang == "eng" && num == "execlude") {
        length = 26;
    } else {
        length = 36
    }
    key = parseInt(key);
    length = parseInt(length);

    var checkGCD = gcd(key, length);

    alignText(lang, result);
    if (checkGCD === 1) {
        document.getElementById('key').style.backgroundColor = '';
        document.getElementById('key').style.borderColor = '';
        if (encryption) {
            resultMessage = AffineEncrypt(key, key2, message.toUpperCase(), lang, num);
            result.innerHTML = resultMessage;
        } else if (!encryption) {
            resultMessage = AffineDecrypt(key, key2, message.toUpperCase(), lang, num);
            result.innerHTML = resultMessage;
        }
    } else {
        alert('You Should Enter the first Key as Prime number for mod 26 or mod 36')
        document.getElementById('key').style.backgroundColor = '#FF4545';
        document.getElementById('key').style.borderColor = '#FF4545';
    }
}

function AffineEncrypt(a, b, message, lang, num) {

    var textArr = message.split("");

    a = parseInt(a);
    b = parseInt(b);

    var array = [];

    if (lang === "eng" && num === "include") {
        var array = engNumAlphabets.slice();
    } else if (lang === "eng" && num === "execlude") {
        var array = engAlphabets.slice();
    } else {
        var array = arbAlphabets.slice();
    }

    for (let i = 0; i < textArr.length; i++) {
        if ((textArr[i] == ' ') || (textArr[i] == '\t') || (textArr[i] == '\n' || array.indexOf(textArr[i].toUpperCase()) == -1)) {
            continue;

        } else
            var alphaIndex = array.indexOf(textArr[i]);
        var crypt = (a * alphaIndex + b) % array.length;
        textArr[i] = array[crypt];
    }
    textArr.join().replace(/,/g, '')
    return textArr.join('');
}


function AffineDecrypt(a, b, message, lang, num) {


    var textArr = message.split("");

    a = parseInt(a);
    b = parseInt(b);

    var array = [];

    if (lang === "eng" && num === "include") {
        var array = engNumAlphabets.slice();
    } else if (lang === "eng" && num === "execlude") {
        var array = engAlphabets.slice();
    } else {
        var array = arbAlphabets.slice();
    }

    for (var i = 0; i < message.length; i++) {
        a %= array.length;

        for (var j = 1; j < array.length; j++) {
            if ((a * j) % array.length == 1)
                var invert = j;
        }
    }

    for (let i = 0; i < textArr.length; i++) {
        if ((textArr[i] == ' ') || (textArr[i] == '\t') || (textArr[i] == '\n' || array.indexOf(textArr[i].toUpperCase()) == -1)) {
            continue;

        } else
            var alphaIndex = array.indexOf(textArr[i]);
        var crypt = (invert * (alphaIndex - b)) % array.length;
        if (crypt < 0)
            crypt += array.length;
        textArr[i] = array[crypt];
    }
    textArr.join().replace(/,/g, '')
    return textArr.join('');
}



/********************* ~ OTHER FUNCTIONS ~ **********************/

function showNumbersSelect() {

    var lan = document.getElementById('lang-option').value;
    var num = document.getElementById('num-option');

    if (lan === 'eng') {
        num.disabled = false;
    } else {
        num.disabled = true;
    }
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

function isNumber(c) {
    return 48 <= c && c <= 57;
}

function alignText(lang, textArea) {
    if (lang === 'eng') {
        textArea.style.textAlign = "left";
    } else {
        textArea.style.textAlign = "right";
    }
}

function gcd(x, y) {
    if ((typeof x !== 'number') || (typeof y !== 'number'))
        return false;
    x = Math.abs(x);
    y = Math.abs(y);
    while (y) {
        var t = y;
        y = x % y;
        x = t;
    }
    return x;
}