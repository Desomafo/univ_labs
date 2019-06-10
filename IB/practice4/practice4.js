var gcd = function(a, b) {
    if ( ! b) {
        return a;
    }

    return gcd(b, a % b);
};

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function simplified_pow_n_mod (number, power, mod) {
    var acc = 1;
    for (var i = 1; i <= power; i++) {
        acc *= number % mod;
    }

    return acc % mod;
}

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
};

var p = 17;
var q = 41;
var n = p * q;
var fe = (p-1) * (q-1);
var d = 20;
while (gcd(fe, d) != 1) {
    d++;
}

var k = 2;
e = Math.floor((k*fe+1)/d);

var message = "камалов";
var keys = [];
for (var i = 0; i < message.length; i++) {
    keys.push(letters_table[message[i]]);
}
var encripted_keys = [];
for (var i = 0; i < keys.length; i++) {
    encripted_keys.push(simplified_pow_n_mod(keys[i], e, n));
}
var decoded_keys = [];
for (var i = 0; i < encripted_keys.length; i++) {
    decoded_keys.push(simplified_pow_n_mod(encripted_keys[i], d, n));
}

var H = [];
H.push(randomIntFromInterval(4, 10));
for (var i = 1; i < keys.length-1; i++) {
    H.push(simplified_pow_n_mod(H[i-1]+keys[i], 2, n));
}

var S = simplified_pow_n_mod(H[H.length-1], d, n);
var check = simplified_pow_n_mod(S, e, n);
debugger;


