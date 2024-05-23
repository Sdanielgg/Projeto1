document.addEventListener("DOMContentLoaded", function() {
    const centerRectangle = document.getElementById("center-rectangle");
    const clickableText = document.getElementById("clickable-text");

    centerRectangle.addEventListener("click", function() 
    {
        if (clickableText.textContent === "Clique aqui para mudar o texto") 
            {
                clickableText.textContent = "Novo texto!";
                centerRectangle.addEventListener("click", function() 
                {
                    if (clickableText.textContent === "Novo texto!") 
                        {
                        clickableText.textContent = "Novissimo texto!";
                        }
                }
    )}
    }
    );
});