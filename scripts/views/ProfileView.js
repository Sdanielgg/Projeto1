function setUserAvatar() {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(u => u.status === "active");
    const avatarImg=document.getElementById("avatar");
    const loginRegisterButton=document.getElementById("loginRegisterButton");

    if (userIndex !== -1) {
        let newAvatarSrc = users[userIndex].avatar;
        document.getElementById("avatar").src = newAvatarSrc;
        avatarImg.style.display="block";
        loginRegisterButton.style.display="none";
    } else {
        loginRegisterButton.style.display="block";
        avatarImg.style.display="none";
    }
}

// function to check if the user is logged in and to give him access to the escape room will show alert if alerting the user to login to be able to use the escape room

function escapeRoomStatus(){
    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userIndex = users.findIndex(u => u.status === "active");

    if (userIndex !== -1) {
        window.location="./EscapeRoom/menu.html";
    } else {
        console.log("user not logged in");
        // samuel faz as tuas alerts aqui se puderes :)
    }
}

window.addEventListener('load', setUserAvatar);
