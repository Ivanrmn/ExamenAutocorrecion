var xmlDoc;
var preguntas = 0;
var aciertos = 0;

window.onload = function () {
    alert("Para aprobar el examen debes acertar al menos 5 preguntas. Tienes 10 minutos. Suerte!");
    // Con el siguiente setTimeout, hacemos que se actualice la página automáticamente cada 10 minutos
    setTimeout('document.location.reload()',600000)
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
    xhttp.open("GET", "xml/test.xml", true);
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
            default:
                console.log("default");
        }
    }
}

function crearRadio(i) {
    var numPreg = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta').length;
    var element = document.getElementById("myForm");
    var div = document.createElement("div");
    var enunciado = document.createElement("label");

    div.setAttribute("id", "div" + i);
    div.setAttribute("class", "pregunta");
    element.appendChild(div);

    enunciado.setAttribute('for', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('enunciado')[0].innerHTML + "<br>";
    div.appendChild(enunciado);
    
    for (var k = 0; k < numPreg; k++) {
        var radioBut = document.createElement("input");
        var label = document.createElement('label');
        var pregunta = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta')[k].innerHTML;

        radioBut.setAttribute("type", "radio");
        radioBut.setAttribute("name", i);
        radioBut.setAttribute("value", k);
        radioBut.setAttribute('id', k + "radio");

        div.appendChild(radioBut);

        label.setAttribute('for', i);
        label.innerHTML = pregunta + "<br>";

        div.appendChild(label);
    }
}

function corregirRadio(x) {
    var radio = document.getElementsByName(x);
    var isNull = true;

    for (var z = 0, length = radio.length; z < length; z++) {
        if (radio[z].checked) {
            var pregRespuesta = radio[z].getAttribute("value");
            var resp = xmlDoc.getElementsByTagName("pregunta")[x].getElementsByTagName("respuesta")[pregRespuesta].getAttribute("correcto");
            if (resp) {
                document.getElementById("div"+x).style.color = "green";
                aciertos++;
            }else {
                document.getElementById("div"+x).style.color = "red";        
            }
            break;
        }
        if (isNull) {
            document.getElementById("div" + x).style.color = "red";
        }
    }
}

function crearSelect(i) {
    var numPreg = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta').length;
    var element = document.getElementById("myForm");
    var div = document.createElement("div");
    var enunciado = document.createElement("label");
    var select = document.createElement("select");

    div.setAttribute("id", "div" + i);
    div.setAttribute("class", "pregunta");

    element.appendChild(div);
    
    enunciado.setAttribute('for', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('enunciado')[0].innerHTML + "<br>";
    
    div.appendChild(enunciado);

    select.setAttribute("id", i + "select");
    select.setAttribute("name", i);
    
    div.appendChild(enunciado);
    div.appendChild(select);

    for (var k = 0; k < numPreg; k++) {
        var option = document.createElement("option");
        var label = document.createElement('label');
        var pregunta = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta')[k].innerHTML;

        option.setAttribute("name", i);
        option.setAttribute("value", k);
        option.setAttribute('id', k + "check");
        option.innerHTML = pregunta;
        select.appendChild(option);
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
                document.getElementById("div"+x).style.color="green";
                aciertos++;
            }else {
                document.getElementById("div"+x).style.color="red";
            }
            break;
        }
    }
}

function crearText(i) {
    var numPreg = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta').length;
    var element = document.getElementById("myForm");
    var enunciado = document.createElement("label");
    var div = document.createElement("div");

    div.setAttribute("id", "div" + i);
    div.setAttribute("class", "pregunta");
    element.appendChild(div);

    enunciado.setAttribute('for', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('enunciado')[0].innerHTML + "<br>";
    
	div.appendChild(enunciado);

    for (var k = 0; k < numPreg; k++) {
        var text = document.createElement("input");
        var label = document.createElement('label');
        var pregunta = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta')[k].innerHTML;

        text.setAttribute("type", "text");
        text.setAttribute("name", i);
        text.setAttribute('id', i + "text");
        div.appendChild(text);
        label.setAttribute('for', i);
        label.innerHTML = "<br>";
        div.appendChild(label);
    }
}

function corregirText(x) {
    try {
        var user = document.getElementById(x + "text").value;
    } catch (Exception) {}

    var resp = xmlDoc.getElementsByTagName("pregunta")[x].getElementsByTagName("respuesta")[0].innerHTML;

    if (resp == user) {
        document.getElementById("div"+x).style.color = "green";
        aciertos++;  
    }else {
         document.getElementById("div"+x).style.color = "red";
    }
}


function crearCheck(i) {
    var numPreg = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta').length;
    var element = document.getElementById("myForm");
    var enunciado = document.createElement("label");
    var div = document.createElement("div");

    div.setAttribute("id", "div" + i);
    div.setAttribute("class", "pregunta");
    element.appendChild(div);
    enunciado.setAttribute('for', i);
    enunciado.innerHTML = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('enunciado')[0].innerHTML + "<br>";
 
	div.appendChild(enunciado);

    for (var k = 0; k < numPreg; k++) {        
        var check = document.createElement("input");
        var label = document.createElement('label');
        var pregunta = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName('respuesta')[k].innerHTML;

        check.setAttribute("type", "checkbox");
        check.setAttribute("name", i);
        check.setAttribute("value", k);
        check.setAttribute('id', k + "check");
        div.appendChild(check);
        label.setAttribute('for', i);
        label.innerHTML = pregunta + "<br>";
        div.appendChild(label);
    }
}

function corregirCheck(x) {
    var pregCorrectas = 0;
    var isNull = true;
    var radios = document.getElementsByName(x);

    for (var z = 0, length = radios.length; z < length; z++) {
        var preguntaSel = radios[z].getAttribute("value");
        if (xmlDoc.getElementsByTagName("pregunta")[x].getElementsByTagName("respuesta")[preguntaSel].getAttribute("correcto")) {
            pregCorrectas += 1;
        }
    }
    for (var z = 0, length = radios.length; z < length; z++) {

        if (radios[z].checked){
            var preguntaSel = radios[z].getAttribute("value");
            var resp = xmlDoc.getElementsByTagName("pregunta")[x].getElementsByTagName("respuesta")[preguntaSel].getAttribute("correcto");
            
            if (resp) {
                document.getElementById("div"+x).style.color = "green";
                aciertos++;
                
            }else {
                document.getElementById("div"+x).style.color = "red";
            }
            break;
        }
        if (isNull) {
            document.getElementById("div" + x).style.color = "red";
        }
    }
}

function corregirExamen() {
        var numPreg = xmlDoc.getElementsByTagName('pregunta').length;
    
        for (var i = 0; i < numPreg; i++) {
            var tipo = xmlDoc.getElementsByTagName('pregunta')[i].getElementsByTagName("tipo")[0].innerHTML;
    
            if (tipo === "radio") {
                corregirRadio(i);
            }else if(tipo === "select"){
                corregirSelect(i);
            }else if (tipo = "text"){
                corregirText(i);
            }else if (tipo === "check") {
                corregirCheck(i);
            }
        }
        mostrarResultado();
        alert("Examen corregido. En 10 segundos se reiniciará, pero para ello debes cerrar este");
        }

function mostrarResultado() {
    var element = document.getElementById("myForm");
    var div = document.createElement("div");
    var label = document.createElement('label');

    element.appendChild(div);
    label.innerHTML = "<h4 align='center'>" + "NOTA: "  + aciertos + "/10" + "</h4><br/>";
    div.appendChild(label);
    aciertos = 0;
    setTimeout('document.location.reload()',10000)
}

function mostrarBoton(){
    var element = document.getElementById("myForm");
    var bien = document.createElement('div');
    var textinp = document.createElement('button');

    element.innerHTML = element.innerHTML + "<br/>";
    textinp.setAttribute('type', "button");
    textinp.setAttribute('onclick', "corregirExamen()");
    textinp.innerHTML= "Corregir test";
    element.appendChild(textinp);
    bien.setAttribute('id', "bien");
    element.appendChild(bien);
}
