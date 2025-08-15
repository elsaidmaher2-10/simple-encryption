function caesarCipherEncrypt(plainText, shiftValue) {
    shiftValue = ((shiftValue % 26) + 26) % 26;
    let encryptedText = "";
    for (let index = 0; index < plainText.length; index++) {
        let characterCode = plainText.charCodeAt(index);
        if (characterCode >= 65 && characterCode <= 90) {
            encryptedText += String.fromCharCode((characterCode - 65 + shiftValue) % 26 + 65);
        } else if (characterCode >= 97 && characterCode <= 122) {
            encryptedText += String.fromCharCode((characterCode - 97 + shiftValue) % 26 + 97);
        } else {
            encryptedText += plainText[index];
        }
    }
    return encryptedText;
}

function caesarCipherDecrypt(cipherText, shiftValue) {
    shiftValue = ((shiftValue % 26) + 26) % 26;
    return caesarCipherEncrypt(cipherText, 26 - shiftValue);
}

function monoalphabeticCipherEncrypt(plainText, keyMapping) {
    let encryptedText = "";
    for (let index = 0; index < plainText.length; index++) {
        let character = plainText[index];
        let characterCode = plainText.charCodeAt(index);
        if (characterCode >= 65 && characterCode <= 90) {
            let lowerCaseLetter = String.fromCharCode(characterCode + 32);
            let mappedLetter = keyMapping[lowerCaseLetter] || lowerCaseLetter;
            encryptedText += String.fromCharCode(mappedLetter.charCodeAt(0) - 32);
        } else if (characterCode >= 97 && characterCode <= 122) {
            encryptedText += keyMapping[character] || character;
        } else {
            encryptedText += character;
        }
    }
    return encryptedText;
}

function monoalphabeticCipherDecrypt(cipherText, keyMapping) {
    let reverseMapping = {};
    for (let key in keyMapping) {
        reverseMapping[keyMapping[key]] = key;
    }
    return monoalphabeticCipherEncrypt(cipherText, reverseMapping);
}

function vigenereCipherEncrypt(plainText, keyText) {
    let cleanKey = "";
    for (let i = 0; i < keyText.length; i++) {
        let code = keyText.charCodeAt(i);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            if (code >= 65 && code <= 90) {
                cleanKey += String.fromCharCode(code + 32);
            } else {
                cleanKey += keyText[i];
            }
        }
    }
    if (cleanKey.length === 0) return plainText;
    let encryptedText = "";
    let keyIndex = 0;
    for (let index = 0; index < plainText.length; index++) {
        let characterCode = plainText.charCodeAt(index);
        let shiftValue = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 97;
        if (characterCode >= 65 && characterCode <= 90) {
            encryptedText += String.fromCharCode((characterCode - 65 + shiftValue) % 26 + 65);
            keyIndex++;
        } else if (characterCode >= 97 && characterCode <= 122) {
            encryptedText += String.fromCharCode((characterCode - 97 + shiftValue) % 26 + 97);
            keyIndex++;
        } else {
            encryptedText += plainText[index];
        }
    }
    return encryptedText;
}

function vigenereCipherDecrypt(cipherText, keyText) {
    let cleanKey = "";
    for (let i = 0; i < keyText.length; i++) {
        let code = keyText.charCodeAt(i);
        if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
            if (code >= 65 && code <= 90) {
                cleanKey += String.fromCharCode(code + 32);
            } else {
                cleanKey += keyText[i];
            }
        }
    }
    if (cleanKey.length === 0) return cipherText;
    let decryptedText = "";
    let keyIndex = 0;
    for (let index = 0; index < cipherText.length; index++) {
        let characterCode = cipherText.charCodeAt(index);
        let shiftValue = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 97;
        if (characterCode >= 65 && characterCode <= 90) {
            decryptedText += String.fromCharCode((characterCode - 65 - shiftValue + 26) % 26 + 65);
            keyIndex++;
        } else if (characterCode >= 97 && characterCode <= 122) {
            decryptedText += String.fromCharCode((characterCode - 97 - shiftValue + 26) % 26 + 97);
            keyIndex++;
        } else {
            decryptedText += cipherText[index];
        }
    }
    return decryptedText;
}

function reverseCipherEncrypt(plainText) {
    let encryptedText = "";
    for (let index = plainText.length - 1; index >= 0; index--) {
        encryptedText += plainText[index];
    }
    return encryptedText;
}

function reverseCipherDecrypt(cipherText) {
    return reverseCipherEncrypt(cipherText);
}

document.addEventListener("DOMContentLoaded", function () {
    const algorithmSelectElement = document.getElementById("algorithmtype");
    const inputTextElement = document.getElementById("inputText");
    const keyInputElement = document.getElementById("keyInput");
    const resultAreaElement = document.getElementById("resultArea");
    const hintElement = document.querySelector(".hint");
    const encryptButton = document.getElementById("encryptBtn");
    const decryptButton = document.getElementById("decryptBtn");
    const clearButton = document.getElementById("clearBtn");

    const algorithmHints = {
        caesar: "Caesar Cipher: Each letter is shifted by a fixed number of positions in the alphabet.",
        mono: "Monoalphabetic Cipher: Each letter is replaced with another fixed letter throughout the text.",
        vigenere: "Vigenère Cipher: Each letter is shifted by a number of positions determined by a multi-letter key.",
        reverse: "Reverse Cipher: The text is reversed from the last character to the first."
    };

    algorithmSelectElement.addEventListener("change", function () {
        hintElement.textContent = algorithmHints[algorithmSelectElement.value] || "";
    });

    encryptButton.addEventListener("click", function () {
        const textValue = inputTextElement.value;
        const keyValue = keyInputElement.value;
        let outputText = "";
        switch (algorithmSelectElement.value) {
            case "caesar":
                outputText = caesarCipherEncrypt(textValue, parseInt(keyValue) || 0);
                break;
            case "mono":
                let keyMapping = { a: "q", b: "w", c: "e", d: "r", e: "t", f: "y", g: "u", h: "i", i: "o", j: "p", k: "a", l: "s", m: "d", n: "f", o: "g", p: "h", q: "j", r: "k", s: "l", t: "z", u: "x", v: "c", w: "v", x: "b", y: "n", z: "m" };
                outputText = monoalphabeticCipherEncrypt(textValue, keyMapping);
                break;
            case "vigenere":
                outputText = vigenereCipherEncrypt(textValue, keyValue || "key");
                break;
            case "reverse":
                outputText = reverseCipherEncrypt(textValue);
                break;
        }
        resultAreaElement.value = outputText;
    });

    decryptButton.addEventListener("click", function () {
        const textValue = inputTextElement.value;
        const keyValue = keyInputElement.value;
        let outputText = "";
        switch (algorithmSelectElement.value) {
            case "caesar":
                outputText = caesarCipherDecrypt(textValue, parseInt(keyValue) || 0);
                break;
            case "mono":
                let keyMapping = { a: "q", b: "w", c: "e", d: "r", e: "t", f: "y", g: "u", h: "i", i: "o", j: "p", k: "a", l: "s", m: "d", n: "f", o: "g", p: "h", q: "j", r: "k", s: "l", t: "z", u: "x", v: "c", w: "v", x: "b", y: "n", z: "m" };
                outputText = monoalphabeticCipherDecrypt(textValue, keyMapping);
                break;
            case "vigenere":
                outputText = vigenereCipherDecrypt(textValue, keyValue || "key");
                break;
            case "reverse":
                outputText = reverseCipherDecrypt(textValue);
                break;
        }
        resultAreaElement.value = outputText;
    });

    clearButton.addEventListener("click", function () {
        inputTextElement.value = "";
        keyInputElement.value = "";
        resultAreaElement.value = "";
        hintElement.textContent = "";
    });
});
