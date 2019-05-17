function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}
  
var T = 12;
document.getElementById('T').innerHTML = T;
var V = 11 * 60 * 24 * T;
document.getElementById('V').innerHTML = V;
var P = Math.pow(10, -4);
document.getElementById('P').innerHTML = P;
var S_aster =  Math.ceil(V * T / P);
document.getElementById('S*').innerHTML = S_aster;
var A = 46;
document.getElementById('A').innerHTML = A;
var L = Math.ceil(Math.log(S_aster)/Math.log(A));
document.getElementById('L').innerHTML = L;
var S = Math.pow(A, L);
document.getElementById('S').innerHTML = S;
document.getElementById('S*<S').innerHTML = S_aster <= S;
var password = "";
for (var i = 1; i <= L; i++) {
    password += String.fromCharCode(randomIntFromInterval(45, 90));
}
document.getElementById('password').innerHTML = password;