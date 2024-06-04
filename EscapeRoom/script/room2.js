document.addEventListener("DOMContentLoaded", function() {
    const retangulo = document.getElementById("center-rectangle");
    const texto = document.getElementById("texto");



let textos = [
    "Estou a escrever uma parte do codigo de uma página que faz uma bola mover pelo ecra e colidir com as paredes.",
    "Mas não sei se estou a fazer certo... destas opções qual te parece mais acertada para fazer uma bola se mover pelo ecra e colidir com as bordas?",
];



let indice = 0;

retangulo.addEventListener("click", function() {
    if (indice < textos.length) {
        texto.textContent = textos[indice];
        indice++;
    }if(indice == textos.length){
        indice++;
        moveAndShow();
    }
});
})


function moveAndShow() {
    var container = document.getElementById("center-rectangle");
    container.style.top = "10%";
    container.style.transform = "translate(-50%, 0)";
    container.style.height = "150px";

    var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "block";
    }
}

function handleClick(buttonId) {
    alert("Você clicou no botão " + buttonId);
}