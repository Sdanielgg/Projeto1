document.addEventListener("DOMContentLoaded", function() {
    const centerRectangle = document.getElementById("center-rectangle");
    const clickableText = document.getElementById("clickable-text");
    const cornerImage = document.getElementById("hoot");
    const backgroundIMG = document.getElementById("background");

    centerRectangle.addEventListener("click", function() 
    {
        if (clickableText.textContent === "Parece que temos um Vírus no nosso computador que nos impede de o usar! Tenta acabar com o vírus com os teus conhecimentos de programação!") 
            {
                clickableText.textContent = "Boa sorte!";
                cornerImage.src = "style/images/hootFeliz.png";
                centerRectangle.addEventListener("click", function() 
    {
        if (clickableText.textContent === "Boa sorte!") 
            {
                backgroundIMG.src = "style/images/room-virus.png";
                clickableText.style.display = 'none';
                cornerImage.style.display = 'none';
                centerRectangle.style.display = 'none';
                
            }
})
            }
})}

);