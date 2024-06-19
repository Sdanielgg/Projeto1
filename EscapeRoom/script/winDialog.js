document.addEventListener("DOMContentLoaded", function() {
    const centerRectangle = document.getElementById("center-rectangle");
    const clickableText = document.getElementById("clickable-text");
    const cornerImage = document.getElementById("hoot");
    const backgroundIMG = document.getElementById("background");

    centerRectangle.addEventListener("click", function() 
    {
        if (clickableText.textContent === "BOA! Conseguiste vencer este virus e agora posso finalmente voltar ao ambiente de trabalho do meu computador!") 
            {
                clickableText.textContent = "Muito obrigado! Provaste ser um verdadeiro programador, deves ser aluno de TSIW!";
                cornerImage.src = "style/images/hootFeliz.png";
                centerRectangle.addEventListener("click", function() 
    {
        if (clickableText.textContent === "Muito obrigado! Provaste ser um verdadeiro programador, deves ser aluno de TSIW!") 
            {
                window.location.href= "win.html"
            }
})
            }
})}

);


localStorage.setItem("puzzleDone", false);
localStorage.setItem("fillInBlanksDone", false);
localStorage.setItem("room2Done", false);

