function setUserAvatar() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.status === "active");
    const avatarImg=document.getElementById("avatar")
    const loginRegisterButton=document.getElementById("loginRegisterButton")
    loginRegisterButton.classList.remove("visible")
    loginRegisterButton.classList.add("hidden")
    if (userIndex !== -1) {
        let newAvatarSrc = users[userIndex].avatar;
        document.getElementById("avatar").src = newAvatarSrc;
    } else {
        avatarImg.style.display="none"
        loginRegisterButton.classList.remove('hidden');
        loginRegisterButton.classList.add('visible');
    }
}

window.addEventListener('load', setUserAvatar);