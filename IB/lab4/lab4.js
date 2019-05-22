function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

function init() {
    for (var i in Users) {
        document.getElementById(i-1).insertCell(0).innerHTML = Users[i].name;
        for (var j = 1; j <= ObjectsProps.length; j++) {
            Users[i][j] = randomIntFromInterval(0, 2);
            document.getElementById(i+1).insertCell(j).innerHTML = ObjectsProps[Users[i][j]];
        }
    }

    log_in();

    btn_action.style.display = "block";
    div_actions.style.display = "block";
}

function log_in () {
    var identificator = prompt("Введите идентификатор");
    
}


///////////////
// Data section
///////////////

// HTML elements
var btn_action = document.getElementById("btn_action");
var div_actions = document.getElementById("actions");

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