function UserDisplay() {
    const userName=document.getElementById("Username")
    const avatar=document.getElementById("Avatar")
    console.log(userName.innerHTML)
    console.log(avatar.src)

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const userIndex = users.findIndex(u => u.status==="active");

    usernameDisplay=users[userIndex].username
    userName.innerHTML=usernameDisplay
    avatarDisplay=users[userIndex].avatar
    avatar.src=avatarDisplay

}
let userInfo=document.getElementById("uInfo")
let userChanges=document.getElementById("uChanges")
let avatarChanges=document.getElementById("avatarChanges")
let buttonUserEdit=document.getElementById("userEdit")
let buttonAvatarChange=document.getElementById("avatarChange")


buttonAvatarChange.addEventListener("click",()=>{
    buttonAvatarChange.style.display="none";
    buttonUserEdit.style.display="none";
    avatarChanges.style.display="flex";
    userChanges.style.display="none"
})
buttonUserEdit.addEventListener("click",()=>{
    buttonAvatarChange.style.display="none";
    buttonUserEdit.style.display="none";
    avatarChanges.style.display="none";
    userChanges.style.display="flex"
})

UserDisplay()


function changeCredentials() {
    const newUsername = document.querySelector('#Confs input[placeholder="Username"]').value;
    const newPassword = document.querySelector('#Confs input[placeholder="Password"]').value;
    const confirmPassword =document.querySelector('#Confs input[placeholder="Confirm Password"]').value;

    if (newUsername !== null && newUsername !== "" && newPassword !== null && newPassword === confirmPassword){
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const userIndex = users.findIndex(u => u.status==="active");


        if (userIndex !== -1) {
                users[userIndex].username=newUsername
                users[userIndex].password=newPassword
                localStorage.setItem("users", JSON.stringify(users));
                handleChange();
            }
        }else{
            console.log("whoops nao deu :(")
        }
    }
    function changeAvatar(clickedId){
        let newAvatar=document.getElementById(clickedId).src
        let selectedAvatar=document.getElementById("Avatar")
        console.log(selectedAvatar)
        console.log(newAvatar)
        selectedAvatar.src=newAvatar
    }
    function confirmAvatar() {
        let newAvatarSrc = document.getElementById("Avatar").src;
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const userIndex = users.findIndex(u => u.status === "active");
    
        if (userIndex !== -1) {
            users[userIndex].avatar = newAvatarSrc;
            localStorage.setItem("users", JSON.stringify(users));
        }
        UserDisplay()
        handleChange(500)
        
    }
    
    
    
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      async function handleChange() {
        
        await wait(1000); // Wait for 1 second (1000 milliseconds)
        
        window.location.href = "./profile.html";
      }


