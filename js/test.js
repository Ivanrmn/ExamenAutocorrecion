var xmlDoc;
var preguntas = 0;
var aciertos = 0;
var isNull = true;
var pregunta = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta')[k].innerHTML;

window.onload = function () {
    leerXML();
};

function leerXML() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {

            xmlDoc = this.responseXML;
            preguntas = xmlDoc.getElementsByTagName('pregunta').length;
            imprimirPreguntas();
            mostrarBoton();
        }
    };
    xhttp.open("POST", "xml/test.xml", true);
    xhttp.send();

}

function imprimirPreguntas() {

    for (var i = 0; i < preguntas; i++) {

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


function crearRadio(i) {

    var numPreg = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta').length;
    var element = document.getElementById("myForm");

    var div = document.createElement("div");
    div.setAttribute("id", "div" + i);
    div.setAttribute("class", "pregunta");
    element.appendChild(div);

    var enunciado = document.createElement("label");
    enunciado.setAttribute('for', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('enunciado')[0].innerHTML + "<br>";
    div.appendChild(enunciado);
    
    for (var k = 0; k < numPreg; k++) {
        var radioBut = document.createElement("input");

        radioBut.setAttribute("type", "radio");
        radioBut.setAttribute("name", i);
        radioBut.setAttribute("value", k);
        radioBut.setAttribute('id', k + "radio");
        div.appendChild(radioBut);

        var label = document.createElement('label');
        label.setAttribute('for', i);
        label.innerHTML = pregunta + "<br>";

        div.appendChild(label);
    }
}

function corregirRadio(x) {

    var radio = document.getElementsByName(x);

    for (var z = 0, length = radio.length; z < length; z++) {

        if (radio[z].checked) {
            var pregRespuesta = radio[z].getAttribute("value");
            var resp = xmlDoc.getElementsByTagName("pregunta")[x].getElementsByTagName("respuesta")[pregRespuesta].getAttribute("correcto");
            if (resp) {
                document.getElementById("div"+x).style.color = "green";
				aciertos++;
            }else{
                document.getElementById("div"+x).style.color = "red";
            }
            break;
        }
        if(isNull){
            document.getElementById("div"+x).style.color = "red";
        }
    }
}

function crearSelect(i) {
    var numPreg = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta').length;
    var element = document.getElementById("myForm");

    var div = document.createElement("div");
    div.setAttribute("id", "div" + i);
    div.setAttribute("class", "pregunta");
    element.appendChild(div);

    var enunciado = document.createElement("label");
    enunciado.setAttribute('for', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('enunciado')[0].innerHTML + "<br>";
    div.appendChild(enunciado);

    var select = document.createElement("select");
    select.setAttribute("id", i + "select");
    select.setAttribute("name", i);
    div.appendChild(select);

    div.appendChild(enunciado);

    for (var k = 0; k < numPreg; k++) {
        var option = document.createElement("option");

        option.setAttribute("name", i);
        option.setAttribute("value", k);
        option.setAttribute('id', k + "check");
        option.innerHTML = pregunta;
        select.appendChild(option);

        var label = document.createElement('label');
        label.setAttribute('for', i);
    }
    label.innerHTML = "<br>";

    div.appendChild(label);
}

function corregirSelect(x) {

    var option = document.getElementsByName(x);

    for (var z = 0, length = option.length; z < length; z++) {
        if (option[z].selected){
            var pregRespuesta = document.getElementById(x + "select").value;
            var resp = xmlDoc.getElementsByTagName("pregunta")[x].getElementsByTagName("respuesta")[pregRespuesta].getAttribute("correcto");

        if (resp) {
            document.getElementById("div"+x).style.backgroundColor="green";
            aciertos++;   
        }
        else {
            document.getElementById("div"+x).style.backgroundColor="red";
        }
            break;
        }
        if(isNull){
            document.getElementById("div"+x).style.color = "red";
    }
}
}

function crearText(i) {
    var numPreg = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta').length;
    var element = document.getElementById("myForm");

    var div = document.createElement("div");
    div.setAttribute("id", "div" + i);
    div.setAttribute("class", "pregunta");
    element.appendChild(div);

    var enunciado = document.createElement("label");
    enunciado.setAttribute('for', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('enunciado')[0].innerHTML + "<br>";
    
	div.appendChild(enunciado);

    for (var k = 0; k < numPreg; k++) {
        var text = document.createElement("input");

        text.setAttribute("type", "text");
        text.setAttribute("name", i);
        text.setAttribute('id', i + "text");
        div.appendChild(text);

        var label = document.createElement('label');
        label.setAttribute('for', i);
        label.innerHTML = "<br>";
        div.appendChild(label);
    }
}

function corregirText(x) {
    var user = document.getElementById(x + "text").value;

    var respuesta = xmlDoc.getElementsByTagName("pregunta")[x].getElementsByTagName("respuesta")[0].innerHTML;

    if(isNull){
        document.getElementById("div"+x).style.color = "red";
        
    } else if (respuesta == user) {
        document.getElementById("div"+x).style.backgroundColor="green";
        aciertos++;
        
    }else {
         document.getElementById("div"+x).style.backgroundColor="red";
    }
}


function crearCheck(i) {
    var numPreg = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta').length;
    var element = document.getElementById("myForm");

    var div = document.createElement("div");
    div.setAttribute("id", "div" + i);
    div.setAttribute("class", "pregunta");
    element.appendChild(div);
    
    var enunciado = document.createElement("label");
    enunciado.setAttribute('for', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('enunciado')[0].innerHTML + "<br>";
 
	div.appendChild(enunciado);

    for (var k = 0; k < numPreg; k++) {        
        var check = document.createElement("input");

        check.setAttribute("type", "checkbox");
        check.setAttribute("name", i);
        check.setAttribute("value", k);
        check.setAttribute('id', k + "check");

        div.appendChild(check);

        var label = document.createElement('label');
        label.setAttribute('for', i);
        label.innerHTML = pregunta + "<br>";

        div.appendChild(label);
    }
}
