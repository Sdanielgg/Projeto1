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



UserDisplay()


function changeCredentials() {
    const newUsername = document.querySelector('#Confs input[placeholder="Username"]').value;
    const newPassword = document.querySelector('#Confs input[placeholder="Password"]').value;
    const confirmPassword =document.querySelector('#Confs input[placeholder="Confirm Password"]').value;

    if (newUsername !== null && newUsername !== "" && newPassword !== null && newPassword === confirmPassword){
        let users = JSON.parse(localStorage.getItem('users')) || [];

        const userIndex = users.findIndex(u => u.status==="active");


        if (userIndex !== -1) {
                users[userIndex].username=newUsername
                users[userIndex].password=newPassword
                localStorage.setItem('users', JSON.stringify(users));
                handleLoginSuccess();
            }
        }else{
            console.log("whoops nao deu :(")
        }
    }

    
    
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      async function handleLoginSuccess() {
        displayAlert('Login successful!', 'success');
        
        await wait(1000); // Wait for 1 second (1000 milliseconds)
        
        window.location.href = "./profile.html"
      }
document.getElementById("confirmButton").addEventListener("click", changeCredentials);
buttonUserEdit.addEventListener("click",(event)=>{
    userInfo.style.display="none"
    userChanges.style.display="flex";
    })
buttonAvatarChange.addEventListener("click",(event)=>{
    userInfo.style.display="none";
    avatarChanges.style.display="flex"
})