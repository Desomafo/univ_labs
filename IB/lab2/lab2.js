function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

var password = "";

var Iden = prompt("Введите идентификатор");
document.getElementById("I").innerHTML = Iden;
var N = Iden.length;
document.getElementById("N").innerHTML = N;
var Q = N % 6;

var b1 = String.fromCharCode(randomIntFromInterval(65, 90));
document.getElementById("2").innerHTML += 'b(1) = ' + b1  + '  ';
password += b1;

var b2 = String.fromCharCode(randomIntFromInterval(65, 90));
document.getElementById("2").innerHTML += 'b(2) = ' + b2 + '  ';
password += b2;

var bi = "";
for (var i = 3; i < 10-Q; i++) {
    bi = String.fromCharCode(randomIntFromInterval(1073, 1103));
    document.getElementById("3").innerHTML += 'b(' + i + ') = ' + bi + '  ';
    password += bi;
}

for (var i = 10 - Q; i <= 10; i++) {
    bi = randomIntFromInterval(0, 9);
    document.getElementById("1").innerHTML += 'b(' + i + ') = ' + bi + '  ';
    password += bi;
}

document.getElementById("password").innerHTML = password;