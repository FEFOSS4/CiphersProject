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

/********************* ~ AFFINE CIPHER ~ **********************/
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
        document.getElementById('key').style.color = '';
        if (encryption) {
            resultMessage = AffineEncrypt(key, key2, message.toUpperCase(), lang, num);
            result.innerHTML = resultMessage;
        } else if (!encryption) {
            resultMessage = AffineDecrypt(key, key2, message.toUpperCase(), lang, num);
            result.innerHTML = resultMessage;
        }
    } else {
        alert('You should enter the first key as Prime number for mod 26 or mod 36 !');
        document.getElementById('key').style.setProperty("color", "#c60000", "important");
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

/********************* ~ RAIL FENCE CIPHER ~ **********************/
function railSolver(encryption) {

    var key = document.getElementById('key').value;
    var message = document.getElementById('cipher-text').value;
    var result = document.getElementById('result-text');
    var resultMessage;

    key = parseInt(key);

    if (encryption) {
        resultMessage = railEncrypt(key, message.toUpperCase());
        result.innerHTML = resultMessage;
    } else if (!encryption) {
        resultMessage = railDecrypt(key, message.toUpperCase());
        result.innerHTML = resultMessage;
    }

}

function railEncrypt(key, message) {

    let fence = [];
    for (let i = 0; i < key; i++) fence.push([]);
    let rail = 0;
    let change = 1;

    for (let char of message.split("")) {
        fence[rail].push(char);

        rail += change;
        if (rail === key - 1 || rail === 0) change = -change;
    }

    let text = "";

    for (let rail of fence) text += rail.join("");

    return text;

}

function railDecrypt(key, message) {
    let fence = [];
    for (let i = 0; i < key; i++) fence.push([]);
    let rail = 0;
    let change = 1;

    message.split("").forEach((char) => {
        fence[rail].push(0);
        rail += change;

        if (rail === key - 1 || rail === 0) change = -change;
    });

    const rFence = [];
    for (let i = 0; i < key; i++) rFence.push([]);

    i = 0;
    let msg = message.split("");
    for (text of fence) {
        for (let j = 0; j < text.length; j++) rFence[i].push(msg.shift());
        i++;
    }
    rail = 0;
    change = 1;

    var text = "";
    for (var i = 0; i < message.length; i++) {
        text += rFence[rail].shift();
        rail += change;
        if (rail === key - 1 || rail === 0) change = -change;
    }

    return text;

}

/********************* ~ PLAYFAIR CIPHER ~ **********************/

function playfairSolver(encryption) {

    var lang = document.getElementById('lang-option').value;
    var num = document.getElementById('num-option').value;
    var key = document.getElementById('key').value.toUpperCase();
    var message = document.getElementById('cipher-text').value.toUpperCase();
    var result = document.getElementById('result-text');
    var resultMessage;

    document.getElementById('key').style.color = '';

    var board;

    if (lang === 'eng' && num === 'execlude') {

        key = key.replace(/[^\a-zA-Z]/g, '');

        if ((/\d/).test(key)) {
            alert('To be able to add numbers, set "Include numbers" to "Include" !');
            document.getElementById('key').style.setProperty("color", "#c60000", "important");
            return;
        }

        board = createBoard5x5(key);
    } else if (lang === 'eng' && num === 'include') {

        key = key.replace(/[^\w]/g, '');
        board = createBoard6x6(key, lang);
    } else {

        key = key.replace(/[^\ء-ي]/g, '');
        board = createBoard6x6(key);
    }

    resultMessage = modifyMessage(message, lang, num);

    if (encryption) {
        resultMessage = encryptPlayfair(resultMessage, message, board, lang);
        result.innerHTML = resultMessage;
    } else {
        resultMessage = decryptPlayfair(resultMessage, message, board, lang);
        result.innerHTML = resultMessage;
    }
}

function createBoard5x5(key) {

    var letters = engAlphabets.join('');
    var keyString = removeDuplicateLetters((key + letters).toUpperCase());
    var playfairBoard = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];

    keyArr = keyString.split('');

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (keyArr[0] == 'J') {
                keyArr.shift();
            }
            playfairBoard[i][j] = keyArr.shift();
        }
    }

    return playfairBoard;
}

function createBoard6x6(key, lang) {

    var letters = (lang === 'eng' ? engNumAlphabets.join('') : arbAlphabets.join(''));
    var keyString = removeDuplicateLetters((key + letters).toUpperCase());
    var playfairBoard = [
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', ''],
        ['', '', '', '', '', '']
    ];

    keyArr = keyString.split('');

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            playfairBoard[i][j] = keyArr.shift();
        }
    }

    return playfairBoard;
}

function encryptPlayfair(message, originalMessage, board, lang) {

    var a, b, r1, c1, r2, c2, corA, corB;
    var result = '';

    for (let i = 0; i < message.length - 1; i += 2) {

        a = message[i];
        b = message[i + 1];

        corA = getCoordinates(a, board);
        corB = getCoordinates(b, board);

        r1 = corA[0];
        c1 = corA[1];
        r2 = corB[0];
        c2 = corB[1];

        if (r1 == r2) {

            if (lang === 'eng' && board.length == 5) {
                c1 = (c1 + 1) % 5;
                c2 = (c2 + 1) % 5;
            } else {
                c1 = (c1 + 1) % 6;
                c2 = (c2 + 1) % 6;
            }

        } else if (c1 == c2) {

            if (lang === 'eng' && board.length == 5) {
                r1 = (r1 + 1) % 5;
                r2 = (r2 + 1) % 5;
            } else {
                r1 = (r1 + 1) % 6;
                r2 = (r2 + 1) % 6;
            }

        } else {

            let t = c1;
            c1 = c2;
            c2 = t;
        }

        result += (board[r1][c1] + board[r2][c2]);
    }

    result = addSymbolsToResult(result, originalMessage, board, lang);


    return result;
}

function decryptPlayfair(message, originalMessage, board, lang) {

    var a, b, r1, c1, r2, c2, corA, corB;
    var result = '';

    for (let i = 0; i < message.length - 1; i += 2) {

        a = message[i];
        b = message[i + 1];

        corA = getCoordinates(a, board);
        corB = getCoordinates(b, board);

        r1 = corA[0];
        c1 = corA[1];
        r2 = corB[0];
        c2 = corB[1];

        if (r1 == r2) {

            if (lang === 'eng' && board.length == 5) {
                c1 = (c1 + 4) % 5;
                c2 = (c2 + 4) % 5;
            } else {
                c1 = (c1 + 5) % 6;
                c2 = (c2 + 5) % 6;
            }

        } else if (c1 == c2) {

            if (lang === 'eng' && board.length == 5) {
                r1 = (r1 + 4) % 5;
                r2 = (r2 + 4) % 5;
            } else {
                r1 = (r1 + 5) % 6;
                r2 = (r2 + 5) % 6;
            }

        } else {

            let t = c1;
            c1 = c2;
            c2 = t;
        }

        result += (board[r1][c1] + board[r2][c2]);
    }

    result = addSymbolsToResult(result, originalMessage, board, lang);

    return result;
}

function addSymbolsToResult(message, originalMessage, board, lang) {

    var result = '';

    if (lang === 'eng' && board.length == 5) {
        for (let i = j = 0; i < originalMessage.length; i++) {
            if (/^[a-zA-Z]+$/.test(originalMessage[i])) {
                result += message[j];
                j++;
            } else {
                result += originalMessage[i];
            }
        }
    } else if (lang === 'eng' && board.length == 6) {
        for (let i = j = 0; i < originalMessage.length; i++) {
            if (/\w/.test(originalMessage[i])) {
                result += message[j];
                j++;
            } else {
                result += originalMessage[i];
            }
        }
    } else {
        for (let i = j = 0; i < originalMessage.length; i++) {
            if (/^[ء-ي]+$/.test(originalMessage[i])) {
                result += message[j];
                j++;
            } else {
                result += originalMessage[i];
            }
        }
    }
    return result;
}

function modifyMessage(message, lang, num) {

    if (lang === 'eng' && num === 'include') {
        message = message.replace(/[^\w]/g, '');
    } else if (lang === 'eng' && num === 'execlude') {
        message = message.replace(/[^\A-Z]/g, '');
    } else {
        message = message.replace(/[^\ء-ي]/g, '');
    }

    message = replaceDuplicateLetters(message, lang);

    if (message.length % 2 == 1 && lang === 'eng') {
        message.push('X');
    } else if (message.length % 2 == 1 && lang === 'arb') {
        message.push('ؤ');
    }

    return message;
}

function replaceDuplicateLetters(message, lang) {

    var temp = [];

    temp.push(message[0]);

    for (let i = 0; i < message.length - 1; i++) {
        if (message[i] === message[i + 1]) {
            if (lang === 'eng') {
                temp.push('X');
            } else {
                temp.push('ؤ');
            }
        } else {
            temp.push(message[i + 1]);
        }
    }

    return temp;
}

function removeDuplicateLetters(string) {
    return string
        .split('')
        .filter(function (item, pos, self) {
            return self.indexOf(item) == pos;
        })
        .join('');
}

function getCoordinates(val, board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board.length; j++) {
            if (val === board[i][j]) {
                return [i, j]
            }
        }
    }
}

/********************* ~ ROW TRANSPOSITION CIPHER ~ **********************/

function rowTranSolver(encryption) {

    var key = document.getElementById('key').value;
    var message = document.getElementById('cipher-text').value;
    var result = document.getElementById('result-text');
    var resultMessage;

    if (encryption) {
        resultMessage = encryptRowTransposition(message, key);
        result.innerHTML = resultMessage;
    } else {
        resultMessage = decryptRowTransposition(message, key);
        result.innerHTML = resultMessage;
    }
}

function encryptRowTransposition(message, key) {

    var result = "";
    var row = (Math.floor(message.length / key));

    if (message.length % key != 0) {
        row += 1;
    }

    var rowTran = new Array(row);

    for (let i = 0; i < rowTran.length; i++) {
        rowTran[i] = new Array(key);
    }

    for (let i = 0, k = 0; i < row; i++) {
        for (let j = 0; j < key; j++) {
            if (k < message.length) {
                rowTran[i][j] = message.charAt(k++);
            } else {
                rowTran[i][j] = ' ';
            }
        }
    }

    for (let j = 0; j < key; j++) {
        for (let i = 0; i < row; i++) {
            result += rowTran[i][j];
        }
    }

    return result;
}

function decryptRowTransposition(message, key) {

    var result = "";
    var row = (Math.floor(message.length / key));

    if (message.length % key != 0) {
        row += 1;
    }

    var rowTran = new Array(row);

    for (let i = 0; i < rowTran.length; i++) {
        rowTran[i] = new Array(key);
    }

    for (let j = 0, k = 0; j < key; j++) {
        for (let i = 0; i < row; i++) {
            if (k < message.length) {
                rowTran[i][j] = message.charAt(k++);
            } else {
                rowTran[i][j] = ' ';
            }
        }
    }

    for (let i = 0; i < row; i++) {
        for (let j = 0; j < key; j++) {
            result += rowTran[i][j];
        }
    }

    return result;
}

/********************* ~ DOUBLE TRANSPOSITION CIPHER ~ **********************/

function doubleSolver(encryption) {

    var key1 = document.getElementById('key1').value;
    var key2 = document.getElementById('key2').value;
    var message = document.getElementById('cipher-text').value;
    var result = document.getElementById('result-text');
    var resultMessage;

    if (encryption) {
        resultMessage = encryptDoubleTransposition(message, key1, key2);
        result.innerHTML = resultMessage;
    } else {
        resultMessage = decryptDoubleTransposition(message, key1, key2);
        result.innerHTML = resultMessage;
    }
}

function encryptDoubleTransposition(message, rowsKey, colsKey) {

    var result = '';
    var rows, cols;
    var arr = [];

    var rowsKey = rowsKey.split(" ");
    var colsKey = colsKey.split(" ");

    rows = rowsKey.length;
    cols = colsKey.length;

    for (let i = 0; i < rows; i++) {
        let data = [];
        for (let j = 0; j < cols; j++) {
            data.push('');
        }
        arr.push(data);
    }

    for (let i = 0, k = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (k < message.length) {
                arr[i][j] = message.charAt(k++);
            } else {
                arr[i][j] = ' ';
            }
        }
    }

    var rowTransArr = [];

    for (let row1 = 0, row2 = rowsKey[0] - 1; row1 < rows; row1++, row2 = rowsKey[row1] - 1) {
        let data = [];
        for (let n = 0; n < cols; n++) {
            data.push(arr[row2][n]);
        }
        rowTransArr.push(data);
    }

    for (let col1 = 0, col2 = colsKey[0] - 1; col1 < cols; col1++, col2 = colsKey[col1] - 1) {
        let data = [];
        for (let n = 0; n < rows; n++) {
            data.push(arr[col2][n]);
        }
        rowTransArr.push(data);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result += rowTransArr[i][j];
        }
    }

    return result;
}

function decryptDoubleTransposition(message, rowsKey, colsKey) {

    var result = '';
    var rows, cols;
    var arr = [];

    var rowsKey = rowsKey.split(" ");
    var colsKey = colsKey.split(" ");

    rows = rowsKey.length;
    cols = colsKey.length;

    for (let i = 0; i < rows; i++) {
        let data = [];
        for (let j = 0; j < cols; j++) {
            data.push('');
        }
        arr.push(data);
    }

    for (let i = 0, k = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (k < message.length) {
                arr[i][j] = message.charAt(k++);
            } else {
                arr[i][j] = ' ';
            }
        }
    }

    var rowTransArr = [];

    for (let row1 = 0, row2 = rowsKey[0] - 1; row1 < rows; row1++, row2 = rowsKey[row1] - 1) {
        let data = [];
        for (let n = 0; n < cols; n++) {
            data.push(arr[row2][n]);
        }
        rowTransArr.push(data);
    }

    for (let col1 = 0, col2 = colsKey[0] - 1; col1 < cols; col1++, col2 = colsKey[col1] - 1) {
        let data = [];
        for (let n = 0; n < rows; n++) {
            data.push(arr[col2][n]);
        }
        rowTransArr.push(data);
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            result += rowTransArr[i][j];
        }
    }

    return result;
}

/********************* ~ OTHER FUNCTIONS ~ **********************/

function showNumbersSelect() {

    var lan = document.getElementById('lang-option').value;
    var num = document.getElementById('num-option');

    if (lan === 'eng') {
        num.style.setProperty("background-color", "#3a9535", "important");
        num.disabled = false;
    } else {
        num.style.setProperty("background-color", "grey", "important");
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

/********************* ~ ANIMATIONS ~ **********************/

$(document).ready(function () {

    $('.dropdown-menu').show();
    $('.dropdown-menu').hide();

    var optionsLen = ($('.cipher-settings').height() / 1.2);

    $('.input-field').css("height", optionsLen);
    $('.output-field').css("height", optionsLen);
});

$('.dropdown-toggle').focusout(function () {
    $(this).next('.dropdown-menu').slideUp(400);
});

$('.dropdown-toggle').click(function () {
    $(this).next('.dropdown-menu').slideToggle(600);
});