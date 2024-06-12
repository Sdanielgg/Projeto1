function setUserAvatar() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.status === "active");
    const avatarImg=document.getElementById("avatar")
    const loginRegisterButton=document.getElementById("loginRegisterButton")
    if (userIndex !== -1) {
        let newAvatarSrc = users[userIndex].avatar;
        document.getElementById("avatar").src = newAvatarSrc;
        avatarImg.style.display="block"
        loginRegisterButton.style.display="none"
    } else {
        loginRegisterButton.style.display="block"
        avatarImg.style.display="none"
    }
}

window.addEventListener('load', setUserAvatar);