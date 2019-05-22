function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function refreshTable() {
    for (var i in Users) {
        for (var j = 1; j <= 5; j++) {
            document.getElementById(i).childNodes[j+1].innerHTML = rights[Users[i][j]];
        }
    }
}

function log_out() {
    active_user = {};
    action_btn.style.visibility = "hidden";
    actions_list.style.visibility = "hidden";
    active_user_name_txt.style.visibility = "hidden";
}

function log_in() {
    alert("Вход совершен успешно");
    action_btn.style.visibility = "visible";
    actions_list.style.visibility = "visible";
    active_user_name_txt.style.visibility = "visible";
    active_user_name_txt.innerHTML =  "Текущий пользователь: " + active_user.name;
}

///////////////
// Data section
///////////////

var action_btn = document.getElementById("action");
var actions_list = document.getElementById("actions_list");
var active_user_name_txt = document.getElementById("active_user_name");

// 10 Users list
var Users = {
    1: "Иван",
    2: "Андрей",
    3: "Александр",
    4: "Рашид",
    5: "Мария",
    6: "Дмитрий",
    7: "Ильшат",
    8: "Вадим",
    9: "Дарья",
    10: "Эдуард",
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

// Rights list
var rights = {
    0: "Полный запрет",
    1: "Передача прав",
    2: "Запись",
    3: "Запись, передача прав",
    4: "Чтение",
    5: "Чтение, передача прав",
    6: "Чтение, запись",
    7: "Полный доступ",
}

var admin = {};
var active_user = {};


/////////
// Begin
////////

// Hide interactions with user onload
log_out();

// Random admin creation
admin.id = randomIntFromInterval(1, 10);
admin.name = Users[admin.id];
for (var i = 1; i < 6; i++) {
    admin[i] = 7;
}
document.getElementById("admin_name").innerHTML += Users[admin.id];

// Randomize rights
delete Users[admin.id];
document.getElementById(admin.id).insertCell(0).innerHTML = admin.name;
for (var j = 1; j <= 5; j++) {
    document.getElementById(admin.id).insertCell(j).innerHTML = rights[7];
}

// Fill names and rights into table
var data = {};
for (var i in Users) {
    data = {};
    data.name = Users[i];
    document.getElementById(i).insertCell(0).innerHTML = data.name;
    for (var j = 1; j <= 5; j++) {
        data[j] = randomIntFromInterval(0, 7);
        document.getElementById(i).insertCell(j).innerHTML = rights[data[j]];
    }
    Users[i] = data;
}

///////////////////
// Event listeners
///////////////////

// User authorization
document.getElementById("sign_in").addEventListener("click", function () {
    input_name = prompt("Введите идентификатор");
    for (var i in Users) {
        if (Users[i].name == input_name) {
            active_user = Users[i];
            log_in();
            return;
        }
    }
    if (input_name == admin.name) {
        active_user = admin;
        log_in();
    } else {
        alert("Неверный ввод, попробуйте еще раз");
        log_out();
    }
});

// User actions
var action;
var file, rightTo, give_name;
action_btn.addEventListener("click", function () {
    action = +prompt("Введите номер действия");
    if (action == 3) {

        file = +prompt("Право на какой объект передается?");
        if (file <= 0 && file > 6) {
            alert("Выбран неверный файл");
            return;
        }

        rightTo = +prompt("Какое право передается?", "2 - запись или 4 - чтение");
        if (rightTo != 2 && rightTo != 4) {
            alert("Выбрано неверное право");
            return;
        } else {
            if (active_user[file] - rightTo != 1 &&
                active_user[file] != 7) {
                    alert("Вы не можете передать данное право");
                    return;
            }
        }

        give_name = prompt("Идентификатор получателя");
        var give_id = Users.findUserByName(give_name);
        if (rightTo ==  Users[give_id][file] ||
            rightTo ==  Users[give_id][file] - 1 ||
            Users[give_id][file] == 7 ||
            Users[give_id][file] == 6) {
                alert("У данного пользователя уже есть данное право");
                return;
        } else {
            Users[give_id][file] += rightTo;
            alert("Передача прав успешно совершена");
            refreshTable();
        }
    }
    if (action == 2) {

        file = +prompt("В какой файл производить запись?");
        if (file <= 0 && file > 6) {
            alert("Выбран неверный файл");
            return;
        }

        if (active_user[file] != 2 &&
            active_user[file] != 3 &&
            active_user[file] != 6 &&
            active_user[file] != 7) {
                alert("Вы не можете производить запись в данный файл");
                return;
        }

        alert("Запись успешно произведена");
    }
    if (action == 1) {

        file = +prompt("Какой файл читать?");
        if (file <= 0 && file > 6) {
            alert("Выбран неверный файл");
            return;
        }

        if (active_user[file] != 4 &&
            active_user[file] != 5 &&
            active_user[file] != 6 &&
            active_user[file] != 7) {
                alert("Вы не можете читать данный файл");
                return;
        }

        alert("Чтение успешно завершено");
    }
    if (action == 4) {
        log_out();
    }
});