function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

var action_btn = document.getElementById("action");
var actions_list = document.getElementById("actions_list");
action_btn.style.visibility = "hidden";
actions_list.style.visibility = "hidden";

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
admin.id = randomIntFromInterval(1, 10);
admin.name = Users[admin.id];
document.getElementById("admin_name").innerHTML += Users[admin.id];

delete Users[admin.id];
document.getElementById(admin.id).insertCell(0).innerHTML = admin.name;
for (var j = 1; j <= 5; j++) {
    document.getElementById(admin.id).insertCell(j).innerHTML = rights[7];
}
console.log(Users);

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
console.log(Users);

var active_user = {};
document.getElementById("sign_in").addEventListener("click", function () {
    active_user.name = prompt("Введите идентификатор");
    for (var i in Users) {
        console.log(i);
        if (Users[i].name == active_user.name) {
            active_user = Users[i];
            alert("Вход совершен успешно");
            action_btn.style.visibility = "visible";
            actions_list.style.visibility = "visible";
            return;
        }
    }
    if (active_user.name == admin.name) {
        active_user = admin;
        alert("Вход совершен успешно");
        action_btn.style.visibility = "visible";
        actions_list.style.visibility = "visible";
    } else {
        alert("Неверный ввод, попробуйте еще раз");
        delete active_user;
        action_btn.style.visibility = "hidden";
        actions_list.style.visibility = "hidden";
    }
});

var action;
var file, actionTo, fileTo;
action_btn.addEventListener("click", function () {
    action = +prompt("Введите номер действия");
    if (action == 3) {
        file = +prompt("Право на какой объект передается?");
        if (file <= 0 && file > 6) {
            alert("Выбран неверный файл");
            return;
        }
        actionTo = +prompt("Какое право передается?");
        if (actionTo - active_user[file][0] != 1 ||
            actionTo - active_user[file][0] != 2 ||
            actionTo - active_user[file][0] != 4) {
                alert("Выбран неверный файл");
                return;
        }
    }
    if (typeof active_user[action] !== 'undefined') {
        switch (aciton) {
            case 3:

                break;
        }
    } else {
        alert("У вас нет прав для данного действия");
    }
});