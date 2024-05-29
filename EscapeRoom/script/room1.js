document.addEventListener("DOMContentLoaded", function() {
    const retangulo = document.getElementById("center-rectangle");
    const texto = document.getElementById("texto");
    const botoes = document.getElementById("botoes");
    const botao1 = document.getElementById("botao1");
    const botao2 = document.getElementById("botao2");
    const botao3 = document.getElementById("botao3");
    const botao4 = document.getElementById("botao4");


let textos = [
    "Depressa! Ajuda-me a completar o código para podermos aniquilar este vírus!",
    "Mas primeiro: para acessar o código terás que responder a umas perguntas para provares que és um programador. Vamos lá!",
    "Qual tag HTML ____ é usada para criar uma lista não ordenada?"
];

let textos2 = [
    "A tag ___ é usada para definir o cabeçalho de um documento HTML.",
    "Para definir a fonte de texto em um documento HTML usando CSS, usamos a propriedade ___.",
    "Identidade confirmada!",
    "Texto 5"
];



let indice = 0;

retangulo.addEventListener("click", function() {
    if (indice < textos.length) {
        texto.textContent = textos[indice];
        indice++;
    }if(indice == textos.length){
        botoes.style.display = "block";
        indice++;
    }
});

botao2.addEventListener("click", function(){
    if(texto.textContent == textos[2]){
        texto.textContent = textos2[0];
        botao1.textContent = "<footer>";
        botao2.textContent = "<body>";
        botao3.textContent = "<head>";
        botao4.textContent = "<script>";
    }
})

botao3.addEventListener("click", function(){
    if(texto.textContent == textos2[0]){
        texto.textContent = textos2[1];
        botao1.textContent = "font-family";
        botao2.textContent = "text-font";
        botao3.textContent = "font-size";
        botao4.textContent = "<typography>";
        
    }
})

let contagem = 0;
let loops = 0;
const maxLoops = 2;



botao1.addEventListener("click", function(){
    if(texto.textContent == textos2[1]){
        texto.textContent = textos2[2];
        botoes.style.display = "none";
        const intervalId = setInterval(() => {
            contagem++;
            switch (contagem % 3) {
                case 1:
                    texto.textContent = 'a acessar código.';
                    break;
                case 2:
                    texto.textContent = 'a acessar código..';
                    break;
                case 0:
                    texto.textContent = 'a acessar código...';
                    break;
            }

            if (contagem % 3 === 0) {
                loops++;
                if (loops >= maxLoops) {
                    clearInterval(intervalId);
                    window.location.href = 'codigofonte.html'; 
                }
            }
        }, 1000);

        
    }
})


})
