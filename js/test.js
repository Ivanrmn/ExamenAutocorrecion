var xmlDoc;
var numPreguntas = 0;
var resultados = 0;

window.onload = function () {
    leerXML();
};

function leerXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            xmlDoc = this.responseXML;
            numPreguntas = xmlDoc.getElementsByTagName('pregunta').length;
            imprimirPreguntas();
        }
    };
    xhttp.open("POST", "xml/test.xml", true);
    xhttp.send();

}

function imprimirPreguntas() {

    for (var i = 0; i < numPreguntas; i++) {

        var tipo = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('tipo')[0].innerHTML;

        switch (tipo) {
            case "radio":
                crearRadio(i);
                break;
            case "check":
                crearCheck(i);
                break;
            case "text":
                crearText(i);
                break;
            case "select":
                crearSelect(i);
                break;
            case "range":
                crearRange(i);
                break;
            default:
                console.log("default");
        }
    }
}


function checkPreguntas() {
    document.getElementById("pregunta").innerHTML = "<h3>Resultado:</h3><br/>";
    try{
    var numPreg = xmlDoc.getElementsByTagName('pregunta').length;

    for (var i = 0; i < numPreg; i++) {
        var tipo = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName("tipo")[0].innerHTML;

        if (tipo === "radio") {
            checkRadio(i);
        }
        else if(tipo === "select"){
            checkSelect(i);
        }
        else if (tipo = "text"){
            checkText(i);
        }
		else if (tipo === "check") {
            checkCheckbox(i);
        }
    }
}
    catch (exception) {
        alert("Debes contestar todas las preguntas.");
    }
}




function crearPuntuacion() {
    var element = document.getElementById("formulario");

    var div = document.createElement("div");
    div.setAttribute("id", "puntuacion");
    element.appendChild(div);

    var label = document.createElement('label');
    label.innerHTML = "Puntuacion total:" + totalPoints;
    div.appendChild(label);
}
