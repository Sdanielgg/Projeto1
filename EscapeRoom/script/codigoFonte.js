document.addEventListener("DOMContentLoaded", function() {
    const botao = document.getElementById("botaoCorreto");
    const texto1 = document.getElementById("texto1");
    const texto2 = document.getElementById("texto2");
    const correto = document.getElementById("vistoVerde");
    

botao.addEventListener("click", function(){
    if (texto2.classList.contains('hidden')) {
        texto1.classList.add('hidden');
        texto2.classList.remove('hidden');
        const fillInBlanksDone = true;  
        localStorage.setItem("fillInBlanksDone", fillInBlanksDone);
        setTimeout(function() {
            texto1.classList.add('hidden');
            texto2.classList.add('hidden');
            correto.classList.remove('hidden');
            setTimeout(function() {
                window.location.href = 'viruses.html';
            }, 2000);
        }, 2000);
        
    } 
})

})