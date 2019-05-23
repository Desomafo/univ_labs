function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function init() {

    // Table initialization
    for (i in Users) {
        var row = table_users_access.insertRow(i);
        row.insertCell(0).innerHTML = Users[i].name;
        for (var j = 1; j <= ObjectsProps.length; j++) {
            var cell = row.insertCell(j);
            if ()
        }
    }

    log_in();

    // Show user elements after success
    btn_action.style.display = "block";
    div_actions.style.display = "block";
    span_user_name.style.display = "block";
}

function log_in () {
    while (typeof active_user === "undefined") {
        var identificator = prompt("Введите идентификатор");
        active_user = Users.findUserByName(identificator);
        if (typeof active_user === "undefined") {
            alert("Введен неверный идентификатор\nПопробуйте еще раз");
        }
    }

    alert("Вход совершен успешно");
    span_user_name.innerHTML = "Пользователь: " + Users[active_user];
}

function log_out () {
    delete active_user;
    
    btn_action.style.display = "none";
    div_actions.style.display = "none";
    span_user_name.style.display = "none";
}


///////////////
// Data section
///////////////

// HTML elements
var btn_action = document.getElementById("btn_action");
var div_actions = document.getElementById("actions");
var span_user_name = document.getElementById("user_name");
var table_users_access = document.getElementById("users_access");
var table_file_access = document.getElementById("file_access");

// Security attrs
var ObjectsProps = [
    "Совершенно секретно",
    "Секретно",
    "Открытые данные",
];

// 10 Users list
var Users = {
    1: { name: "Иван" },
    2: { name: "Андрей" },
    3: { name: "Александр" },
    4: { name: "Рашид" },
    5: { name: "Мария" },
    6: { name: "Дмитрий" },
    7: { name: "Ильшат" },
    8: { name: "Вадим" },
    9: { name: "Дарья" },
    10: { name: "Эдуард" },
};

Object.defineProperty(Users, "findUserByName", {enumerable: false, writable: true});
Users.findUserByName = function (name) {
    for (var id in this) {
        if (this.hasOwnProperty(id)) {
            if (this[id].name == name) {
                return +id;
            }
        }
    }
};

var Objects = [];
Objects.length = 5;

var active_user;


///////////////////
// Event listeners
///////////////////

btn_action.addEventListener("click", setTimeout(function () {
    var action = +prompt("Введите номер действия");
    if (action < 1 || action > 2) {
        alert("Неверный ввод");
        return;
    }

    if (action == 1) {
        var file = +prompt("К какому файлу получить доступ?"):
        if (file < 1 || file > 6) {
            alert("Выбран неверный файл");
            return;
        }
        if (User[active_user][file])
    }


}, 50));