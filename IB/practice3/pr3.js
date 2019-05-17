Object.prototype.getKeyByValue = function (value) {
    for (var prop in this) {
        if (this.hasOwnProperty(prop)) {
            if (this[prop] == value) {
                return prop;
            }
        }
    }
}

var encripted_string = "оррпнщю_дфроарцквчмуюсшок_рфуозосфэоарцкв фяуьфпьдуюпэчрффер_ирпэкшннфер_сдмочэвблоко";
var encription_key = "яблоко";

var letters_table = {
    'а': 1,
    'б': 2,
    'в': 3,
    'г': 4,
    'д': 5,
    'е': 6,
    'ж': 7,
    'з': 8,
    'и': 9,
    'й': 9,
    'к': 10,
    'л': 11,
    'м': 12,
    'н': 13,
    'о': 14,
    'п': 15,
    'р': 16,
    'с': 17,
    'т': 18,
    'у': 19,
    'ф': 20,
    'х': 21,
    'ц': 22,
    'ч': 23,
    'ш': 24,
    'щ': 25,
    'ы': 26,
    'ь': 27,
    'э': 28,
    'ю': 29,
    'я': 30,
    ' ': 0,
    '_': 0,
};

var decode_key = [];
var decode_key_str = "";
for (var i = 0; i < encription_key.length; i++) {
    decode_key.push(31 - letters_table[encription_key[i]]);
    decode_key_str += letters_table.getKeyByValue(decode_key[i]);
}

var decoded_numbers = [];
var encripted_numbers = [];
for (var i = 0, j = 0; i < encripted_string.length; i++, j++) {
     if (j == decode_key.length) {
         j = 0;
     }
     encripted_numbers.push(letters_table[encripted_string[i]]);
     decoded_numbers.push((letters_table[encripted_string[i]] + decode_key[j]) % 31);
}

var decoded_string = "";
for (var i = 0; i < decoded_numbers.length; i++) {
    decoded_string += letters_table.getKeyByValue(decoded_numbers[i]);
}

document.getElementById("letter_key").innerHTML += '\t' + encription_key + '\t=> обратный ключ =>\t' + decode_key_str;
document.getElementById("number_key").innerHTML += '\tобратный ключ =>\t' + decode_key.toString();

for (var i = 0, j = 0; i < decoded_numbers.length; i++, j++) {
    if (j == decode_key.length) {
        j = 0;
    }
    document.getElementById("letter_encripted").insertCell(i).innerHTML = encripted_string[i];
    document.getElementById("number_encripted").insertCell(i).innerHTML = encripted_numbers[i];
    document.getElementById("decode_key").insertCell(i).innerHTML = decode_key[j];
    document.getElementById("number_decoded").insertCell(i).innerHTML = decoded_numbers[i];
    document.getElementById("letter_decoded").insertCell(i).innerHTML = decoded_string[i];
}

