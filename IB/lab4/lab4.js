function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function init() {

    // Tables initialization
    for (var i in Users) {
        var row = table_users_access.insertRow(i);
        row.insertCell(0).innerHTML = Users[i].name;
        Users[i].allowed_access = randomIntFromInterval(1, 3);
        for (var j in ObjectsProps) {
            var cell = row.insertCell(j);
            if (Users[i].allowed_access == j) {
                cell.innerHTML = "+";
            }
        }
    }

    for (var i in Objects) {
        var row = table_file_access.insertRow(i);
        row.insertCell(0).innerHTML = Objects[i].name;
        Objects[i].allowed_access = randomIntFromInterval(1, 3);
        for (var j in ObjectsProps) {
            var cell = row.insertCell(j);
            if (Objects[i].allowed_access == j) {
                cell.innerHTML = "+";
            }
        }
    }

    setTimeout(function () {
        log_in();
    }, 100);
}

function log_in () {
    while (active_user == -1) {
        var identificator = prompt("Введите идентификатор");
        active_user = Users.findUserByName(identificator);
        if (active_user == -1) {
            alert("Введен неверный идентификатор\nПопробуйте еще раз");
        }
    }

    alert("Вход совершен успешно");
    span_user_name.innerHTML = "Пользователь: " + Users[active_user].name;
    
    // Show user elements after success
    btn_action.style.display = "block";
    div_actions.style.display = "block";
    span_user_name.style.display = "block";
}

function log_out () {
    active_user = -1;
    
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
var table_file_access = document.getElementById("files_access");

// Security attrs
var ObjectsProps = {
    1: "Совершенно секретно",
    2: "Секретно",
    3: "Открытые данные",
};

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
    return -1;
};

var Objects = {
    1: { name: "Файл 1" },
    2: { name: "Файл 2" },
    3: { name: "Файл 3" },
    4: { name: "Файл 4" },
    5: { name: "Файл 5" },
};

var active_user = -1;


///////////////////
// Event listeners
///////////////////

btn_action.addEventListener("click", function () {
    var action = +prompt("Введите номер действия");
    if (action < 1 || action > 2) {
        alert("Неверный ввод");
        return;
    }

    if (action == 1) {
        var file = +prompt("К какому файлу получить доступ?");
        if (file < 1 || file > 6) {
            alert("Выбран неверный файл");
            return;
        }
        if (Users[active_user].allowed_access > Objects[file].allowed_access) {
            alert("У вас нет досупа к данному файлу");
            return;
        }
    }

    if (action == 2) {
        log_out();
        setTimeout(log_in, 100);
    }

    alert("Успешно");
});

document.addEventListener("load", init);