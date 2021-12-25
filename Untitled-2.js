const btn = document.querySelector(".ajouter");
// const mod = document.querySelector(".modifier");
// var table = document.getElementById('table');
var titre = document.getElementById('titre');
var nom = document.getElementById('auteur');
var prix = document.getElementById('prix');
var langue = document.getElementById('langue');
var date = document.getElementById('date');
var tayp = document.querySelector('input[name="fav_language"]');
var email_author = document.querySelector("#email_author");
let span = document.getElementById("span");
let spn = document.getElementById("spn");
var filedsWithValidation = ["prix", "email"];

class Ouvrage {
    constructor(titre, nom, prix, date, langue, type, email_author) {
        this.titre = titre;
        this.nom = nom;
        this.prix = prix;
        this.date = date;
        this.langue = langue;
        this.type = type;
        this.email_author = email_author;
    }
    DétailOuvrage() {
        return " L'ouvrage " + this.titre + ' est un ' + this.type + " en langue " + this.langue + " écrire par " + this.nom + " et publié le " + this.date + " Le prix de " + this.titre + " est de " + this.prix + " DH "

    }

}

var table = document.getElementById('table');
var nb = [];
var t = document.querySelector("tbody");

function ajou() {
    //Checking if all fields are valid ✅
    if (!filedsWithValidation.length) {
        var sn = new Ouvrage(titre.value, nom.value, prix.value, date.value, langue.value, tayp.value, email_author.value);

        nb.push(sn);
        alert(sn.DétailOuvrage())

        nb.sort((a, b) => {
            const titreA = a.titre.toLowerCase()
            const titreB = b.titre.toLowerCase()

            if (titreA < titreB) {
                return -1;
            }
            if (titreA > titreB) {
                return 1;
            }
            return 0;
        })

        fillTable();

        save();
        return;
    }

    const filteredArray = [...new Set(filedsWithValidation)]
    const errorMsg = "Please check those fileds: " + filteredArray;
    alert(errorMsg)
}


email_author.onkeyup = function () {
    const ExpReg = /^.{5,}@.{5,}\.(?:com|fr|ma)$/i;
    if (ExpReg.test(email_author.value)) {
        span.innerHTML = "valide";
        span.style.color = "green";
        while (filedsWithValidation.indexOf("email") > -1) {
            filedsWithValidation.splice(filedsWithValidation.indexOf("email"), 1);
        }
    }
    else {
        span.innerHTML = " non valide";
        span.style.color = "red";
        filedsWithValidation.push("email")
    }
}

prix.onkeyup = function () {
    const ExpR = /^[0-9]{3,4}$/;
    if (ExpR.test(prix.value)) {
        spn.innerHTML = " valide";
        spn.style.color = "green";
        while (filedsWithValidation.indexOf("prix") > -1) {
            filedsWithValidation.splice(filedsWithValidation.indexOf("prix"), 1);
        }
    }
    else {
        spn.innerHTML = "non valide";
        spn.style.color = "red";
        filedsWithValidation.push("prix")
    }
}

window.addEventListener("load", (e) => {
    nb = JSON.parse(localStorage.getItem("library")) || [];
    fillTable();
}
);

function save() {
    localStorage.setItem("library", JSON.stringify(nb))
}


function fillTable() {
    t.innerHTML = '' //Clearing the table comes first

    for (let i = 0; i < nb.length; i++) {
        var tr = document.createElement("tr");
        tr.innerHTML += `<td>${nb[i].titre}</td>     
                      <td>${nb[i].nom}</td>
                      <td>${nb[i].prix}</td>
                      <td>${nb[i].date}</td>
                     <td>${nb[i].langue}</td>
                      <td> ${nb[i].type}</td>
                      <td>${nb[i].email_author}</td>`
        t.appendChild(tr);
    }

}
