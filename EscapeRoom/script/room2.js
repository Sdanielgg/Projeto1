document.addEventListener("DOMContentLoaded", function() {
    const retangulo = document.getElementById("center-rectangle");
    const texto = document.getElementById("texto");



let textos = [
    "Estou a escrever uma parte do codigo de uma página que faz uma bola mover pelo ecra e colidir com as paredes.",
    "Qual destas opções te parece mais acertada para fazer uma bola se mover pelo ecra e colidir com as bordas?",
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
    var hoot = document.getElementById("hoot");
    container.style.top = "3%";
    container.style.transform = "translate(-50%, 0)";
    hoot.style.top = "10%";
    hoot.style.transform = "translate(-70%, -15%)";
    container.style.height = "100px";

    var buttons = document.getElementsByClassName("button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].style.display = "block";
    }
}

function handleClick(buttonId) {
    if(buttonId == 1)
        {
            const room2Done = true;  
            localStorage.setItem("room2Done", room2Done);
            setTimeout(function() {
                window.location.href = 'viruses.html';
            }, 1000);
        }else if(buttonId == 2){ 
            var botao = document.getElementById('botao2');
            botao.style.backgroundColor ="#6d0000" 
            loseLife();
        }else{
            var botao = document.getElementById('botao3');
            botao.style.backgroundColor ="#6d0000" 
            loseLife();
        }
} 