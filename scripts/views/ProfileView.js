function setUserAvatar() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(u => u.status === "active");

    if (userIndex !== -1) {
        let newAvatarSrc = users[userIndex].avatar;
        document.getElementById("avatar").src = newAvatarSrc;
    } else {
        console.log("No active user found.");
    }
}

window.addEventListener('load', setUserAvatar);