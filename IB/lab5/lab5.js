var ASCII_values = {
    'А': 192, 'а': 224,
    'Б': 193, 'б': 225,
    'В': 194, 'в': 226,
    'Г': 195, 'г': 227,
    'Д': 196, 'д': 228,
    'Е': 197, 'е': 229,
    'Ж': 198, 'ж': 230,
    'З': 199, 'з': 231,
    'И': 200, 'и': 232,
    'Й': 201, 'й': 277,
    'К': 202, 'к': 234,
    'Л': 203, 'л': 235,
    'М': 204, 'м': 236,
    'Н': 205, 'н': 237,
    'О': 206, 'о': 238,
    'П': 207, 'п': 239,
    'Р': 208, 'р': 240,
    'С': 209, 'с': 241,
    'Т': 210, 'т': 242,
    'У': 211, 'у': 243,
    'Ф': 212, 'ф': 244,
    'Х': 213, 'х': 245,
    'Ц': 214, 'ц': 246,
    'Ч': 215, 'ч': 247,
    'Ш': 216, 'ш': 248,
    'Щ': 217, 'щ': 249,
    'Ъ': 218, 'ъ': 250,
    'Ы': 219, 'ы': 251,
    'Ь': 220, 'ь': 252,
    'Э': 221, 'э': 253,
    'Ю': 222, 'ю': 254,
    'Я': 223, 'я': 255,
};

var change_table = [
    [4, 10 , 9, 2, 13, 8, 0, 14, 6, 11, 1, 12, 7, 15, 5, 3],
    [14, 11, 4, 12, 6, 13, 15, 10, 2, 3, 8, 1, 0, 7, 5, 9],
    [5, 8, 1, 13, 10, 3, 4, 2, 14, 15, 12, 7, 6, 0, 9, 11],
    [7, 13, 10, 1, 0, 8, 9, 15, 14, 4, 6, 12, 11, 2, 5, 3],
    [6, 12, 7, 1, 5, 15, 13, 8, 4, 10, 9, 14, 0, 3, 11, 2],
    [4, 11, 10, 0, 7, 2, 1, 13, 3, 6, 8, 5, 9, 12, 15, 14],
    [13, 11, 4, 1, 3, 15, 5, 9, 0, 10, 14, 7, 6, 8, 2, 12],
    [1, 15, 13, 0, 5, 7, 10, 4, 9, 2, 3, 14, 6, 11, 8, 12]
];

var getById = document.getElementById.bind(document);
var txt_error = getById("txt_error");

var init_string = "";
var init_encription_key_str = "";

var A_str = "";
var B_str = "";
var key_str = "";
var key_position =  0;
var S = "";

function init () {

    init_string = getById("input_init_string").value;
    if (!check_init_string(init_string)) {
        return;
    }

    init_encription_key_str = getById("input_init_key").value;
    if (!check_init_key(init_encription_key_str)) {
        return;
    }

    A_str = init_string.substr(0, 4);
    B_str = init_string.substr(4, 4);

    for (var i = 1; i <= 32; i++) {
        document.getElementById("div_rounds").appendChild(create_round(i));
    }
}

function get_key_block () {
    var key_block = "";
    for (var i = 0; i < 4; key_position++, i++) {
        if (key_position === init_encription_key_str.length) {
            key_position = 0;
        }
        key_block += init_encription_key_str[key_position];
    }

    return key_block;
}

function get_full_bin_4 (bin_str) {
    var full_bin = bin_str;
    for (var i = full_bin.length; i < 4; i++) {
        full_bin = '0' + full_bin;
    }
    return full_bin;
}

function get_full_bin_8 (bin_str) {
    var full_bin = bin_str;
    for (var i = full_bin.length; i < 8; i++) {
        full_bin = '0' + full_bin;
    }
    return full_bin;
}

function shift_11 (bin_str) {
    for (var i = 0; i < 11; i++) {
        bin_str = bin_str.substr(1, bin_str.length-1) + bin_str[0];
    }

    return bin_str;
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

function create_ASCII_table (title) {
    var table = document.createElement("table");
    table.createCaption().innerHTML = '<b>' + title + '</b>';
    
    var tbody = table.createTBody();
    var row_names = ['Номер символа (байта)', 'Исходный текст', 'Десятичный Unicode код', 'Двоичный Unicode код'];

    for (var i = 0; i < 4; i++) {
        var row = tbody.insertRow(i);
        row.insertCell(0).innerHTML = row_names[i];
    }

    return table;
}

function create_A_B_tables () {
    var A_B_div = document.createElement("div");
    A_B_div.style.display = "inline-block";

    var table_A = create_ASCII_table("Блок А");
    for (var i = 1; i < 5; i++) {
        // Заполнение строки с номерами символов
        table_A.rows[0].insertCell(i).innerHTML = 4 - i;
        // Заполнение строки исходного текста
        table_A.rows[1].insertCell(i).innerHTML = A_str[4 - i];
        // Заполнение строки десятичного ACII кода
        table_A.rows[2].insertCell(i).innerHTML = A_str[4 - i].charCodeAt(0);
        // Заполнение строки двоичного ACII кода
        table_A.rows[3].insertCell(i).innerHTML = A_str[4 - i].charCodeAt(0).toString(2);
    }


    var table_B = create_ASCII_table("Блок Б");
    for (var i = 1; i < 5; i++) {
        // Заполнение строки с номерами символов
        table_B.rows[0].insertCell(i).innerHTML = 8 - i;
        // Заполнение строки исходного текста
        table_B.rows[1].insertCell(i).innerHTML = B_str[4 - i];
        // Заполнение строки десятичного ACII кода
        table_B.rows[2].insertCell(i).innerHTML = B_str[4 - i].charCodeAt(0);
        // Заполнение строки двоичного ACII кода
        table_B.rows[3].insertCell(i).innerHTML = B_str[4 - i].charCodeAt(0).toString(2);
    }

    A_B_div.appendChild(table_B);
    A_B_div.appendChild(table_A);

    return A_B_div;
}

function create_key_table (key_title) {
    var key_div = document.createElement("div");
    key_div.style.display = "inline-block";
    key_div.style.width = "100%";

    key_str = get_key_block();

    var table = create_ASCII_table(key_title);
    for (var i = 1; i < 5; i++) {
        // Заполнение строки с номерами символов
        table.rows[0].insertCell(i).innerHTML = 4 - i;
        // Заполнение строки исходного текста
        table.rows[1].insertCell(i).innerHTML = key_str[4 - i];
        // Заполнение строки десятичного ACII кода
        table.rows[2].insertCell(i).innerHTML = key_str[4 - i].charCodeAt(0);
        // Заполнение строки двоичного ACII кода
        table.rows[3].insertCell(i).innerHTML = key_str[4 - i].charCodeAt(0).toString(2);
    }

    table.style.marginLeft = "444px";
    key_div.appendChild(table);

    return key_div;
}

function create_sum_table () {
    var sum_div = document.createElement("div");
    sum_div.style.display = "inline-block";
    sum_div.style.width = "100%";

    var table = document.createElement("table");
    table.createCaption().innerHTML = '<b>' + 'Сложение с ключом' + '</b>';
    
    var tbody = table.createTBody();
    var row_names = ['Номер байта', 'А', 'К', 'S = (A+K) mod 2^32'];

    for (var i = 0; i < 4; i++) {
        var row = tbody.insertRow(i);
        row.insertCell(0).innerHTML = row_names[i];
    }

    for (var i = 1; i < 5; i++) {
        // Заполнение строки с номерами символов
        table.rows[0].insertCell(i).innerHTML = 4 - i;
        // Заполнение строки исходного текста
        table.rows[1].insertCell(i).innerHTML = A_str[4 - i].charCodeAt(0).toString(2);
        // Заполнение строки десятичного ACII кода
        table.rows[2].insertCell(i).innerHTML = key_str[4 - i].charCodeAt(0).toString(2);
        // Заполнение строки двоичного ACII кода
        table.rows[3].insertCell(i).innerHTML = ((A_str[4 - i].charCodeAt(0) + key_str[4 - i].charCodeAt(0)) % Math.pow(2, 32)).toString(2);
    }

    table.style.marginLeft = "444px";
    sum_div.appendChild(table);

    return sum_div;
}

function create_divide_table (title) {
    var table = document.createElement("table");
    table.createCaption().innerHTML = '<b>' + title + '</b>';
    
    var tbody = table.createTBody();
    var row_names = ['Номер блока данных S', 'Десятичный код', 'Двоичный код'];

    for (var i = 0; i < row_names.length; i++) {
        var row = tbody.insertRow(i);
        row.insertCell(0).innerHTML = row_names[i];
    }

    return table;
}

function create_before_change_table () {
    var before_change_div = document.createElement("div");
    before_change_div.style.display = "inline-block";
    before_change_div.style.width = "100%";

    var table = create_divide_table("Исходные блоки данных Sm");

    for (var i = 1; i < 5; i++) {
        // Заполнение строки с номерами блоков данных
        table.rows[0].insertCell(i*2-1).innerHTML = 'S' + (9 - i*2);
        table.rows[0].insertCell(i*2).innerHTML = 'S' + (8 - i*2);

        var to_split_block = ((A_str[4 - i].charCodeAt(0) + key_str[4 - i].charCodeAt(0)) % Math.pow(2, 32)).toString(2);

        var first_half = to_split_block.substr(0, 4);
        var second_half = to_split_block.substr(4, 4);
        // Заполнение строки двоичого кода
        table.rows[2].insertCell(i*2-1).innerHTML = first_half;
        table.rows[2].insertCell(i*2).innerHTML = second_half;
        // Заполнение строки десятичного кода
        table.rows[1].insertCell(i*2-1).innerHTML = parseInt(first_half, 2);
        table.rows[1].insertCell(i*2).innerHTML = parseInt(second_half, 2);
    }

    table.style.marginLeft = "444px";
    before_change_div.appendChild(table);

    return before_change_div;
}

function create_after_change_table () {
    var after_change_div = document.createElement("div");
    after_change_div.style.display = "inline-block";
    after_change_div.style.width = "100%";

    var table = create_divide_table("Блоки данных Sm после замены");

    for (var i = 1; i < 5; i++) {
        // Заполнение строки с номерами блоков данных
        table.rows[0].insertCell(i*2-1).innerHTML = 'S' + (9 - i*2);
        table.rows[0].insertCell(i*2).innerHTML = 'S' + (8 - i*2);

        var to_split_block = ((A_str[4 - i].charCodeAt(0) + key_str[4 - i].charCodeAt(0)) % Math.pow(2, 32)).toString(2);

        var first_half = to_split_block.substr(0, 4);
        var second_half = to_split_block.substr(4, 4);
        // Заполнение строки десятичного кода
        table.rows[1].insertCell(i*2-1).innerHTML = change_table[(9 - i*2)][parseInt(first_half, 2)];
        table.rows[1].insertCell(i*2).innerHTML = change_table[(8 - i*2)][parseInt(second_half, 2)];
        // Заполнение строки двоичого кода
        table.rows[2].insertCell(i*2-1).innerHTML = get_full_bin_4(change_table[(9 - i*2)][parseInt(first_half, 2)].toString(2));
        table.rows[2].insertCell(i*2).innerHTML = get_full_bin_4(change_table[(8 - i*2)][parseInt(second_half, 2)].toString(2));
    }

    table.style.marginLeft = "444px";
    after_change_div.appendChild(table);

    return after_change_div;
}

function create_cycle_shift_table () {
    var cycle_shift_div = document.createElement("div");
    cycle_shift_div.style.display = "inline-block";
    cycle_shift_div.style.width = "100%";

    var table = document.createElement("table");
    table.createCaption().innerHTML = '<b>' + 'Циклический сдвиг на 11 бит влево' + '</b>';
    
    var tbody = table.createTBody();
    var row_names = ['Номер байта', 'S до сдвига', 'S после сдвига'];

    for (var i = 0; i < row_names.length; i++) {
        var row = tbody.insertRow(i);
        row.insertCell(0).innerHTML = row_names[i];
    }

    var S_str = "";
    for (var i = 1; i < 5; i++) {
        var to_split_block = ((A_str[4 - i].charCodeAt(0) + key_str[4 - i].charCodeAt(0)) % Math.pow(2, 32)).toString(2);

        var first_half = to_split_block.substr(0, 4);
        var second_half = to_split_block.substr(4, 4);

        S_str += get_full_bin_4(change_table[(9 - i*2)][parseInt(first_half, 2)].toString(2));
        S_str += get_full_bin_4(change_table[(8 - i*2)][parseInt(second_half, 2)].toString(2));
    }

    var S_str_shifted = shift_11(S_str);

    for (var i = 1; i < 5; i++) {
        // Заполнение строки с байтов
        table.rows[0].insertCell(i).innerHTML = 4 - i;
        // Заполнение строки S до сдвига
        table.rows[1].insertCell(i).innerHTML = S_str.substr((i-1)*8, 8);
        // Заполнение строки S после сдвига
        table.rows[2].insertCell(i).innerHTML = S_str_shifted.substr((i-1)*8, 8);
    }

    table.style.marginLeft = "444px";
    cycle_shift_div.appendChild(table);

    return cycle_shift_div;
}

function create_xor_table () {
    var xor_div = document.createElement("div");
    xor_div.style.display = "inline-block";
    xor_div.style.width = "100%";

    var table = document.createElement("table");
    table.createCaption().innerHTML = '<b>' + 'Побитовое сложение по модулю 2' + '</b>';
    
    var tbody = table.createTBody();
    var row_names = ['Номер байта', 'S', 'B', 'S = S xor B'];

    for (var i = 0; i < row_names.length; i++) {
        var row = tbody.insertRow(i);
        row.insertCell(0).innerHTML = row_names[i];
    }

    var S_str = "";
    for (var i = 1; i < 5; i++) {
        var to_split_block = ((A_str[4 - i].charCodeAt(0) + key_str[4 - i].charCodeAt(0)) % Math.pow(2, 32)).toString(2);

        var first_half = to_split_block.substr(0, 4);
        var second_half = to_split_block.substr(4, 4);

        S_str += get_full_bin_4(change_table[(9 - i*2)][parseInt(first_half, 2)].toString(2));
        S_str += get_full_bin_4(change_table[(8 - i*2)][parseInt(second_half, 2)].toString(2));
    }

    var S_str_shifted = shift_11(S_str);

    S = "";
    for (var i = 1; i < 5; i++) {
        // Заполнение строки с байтов
        table.rows[0].insertCell(i).innerHTML = 4 - i;
        // Заполнение строки S
        table.rows[1].insertCell(i).innerHTML = S_str_shifted.substr((i-1)*8, 8);
        // Заполнение строки B
        table.rows[2].insertCell(i).innerHTML = B_str[4 - i].charCodeAt(0).toString(2);
        // Заполнение строки S = S xor B
        S += get_full_bin_8((parseInt(S_str_shifted.substr((i-1)*8, 8), 2) ^ B_str[4 - i].charCodeAt(0)).toString(2));
        table.rows[3].insertCell(i).innerHTML = (parseInt(S_str_shifted.substr((i-1)*8, 8), 2) ^ B_str[4 - i].charCodeAt(0)).toString(2);
    }

    table.style.marginLeft = "444px";
    xor_div.appendChild(table);

    return xor_div;
}

function create_round (round_id) {
    var round = document.createElement("div");
    round.setAttribute("display", "inline-block");

    round.appendChild(create_A_B_tables());
    round.appendChild(create_key_table("K" + round_id));
    round.appendChild(create_sum_table());
    round.appendChild(create_before_change_table());
    round.appendChild(create_after_change_table());
    round.appendChild(create_cycle_shift_table());
    round.appendChild(create_xor_table());

    
    B_str = A_str;
    A_str = "";

    for (var i = 0; i < 4; i++) {
        A_str += String.fromCharCode(parseInt(S.substr(i*8, 8), 2));
    }

    return round;
}