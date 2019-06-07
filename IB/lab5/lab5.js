var getById = document.getElementById.bind(document);
var txt_error = getById("txt_error");

var init_string = "";
var init_encription_key_str = "";

function init () {

    init_string = getById("input_init_string").value;
    if (!check_init_string(init_string)) {
        return;
    }

    init_encription_key_str = getById("input_init_key").value;
    if (!check_init_key(init_encription_key_str)) {
        return;
    }
}

function check_init_string (input_string) {
    if (input_string.length !== 8) {
        txt_error.innerHTML += "Шифруемая строка должна состоять из 8ми символов<br/>";
        return false;
    } else {
        txt_error.innerHTML = "";
        return true;
    }
}

function check_init_key (input_string) {
    if (typeof input_string === "undefined" || input_string.length === 0) {
        txt_error.innerHTML += "Ключ шифрования не должен быть путым";
        return false;
    } else {
        txt_error.innerHTML = "";
        return true;
    }
}