const activeUserName=document.getElementById("userName")
const activeUserAvatar=document.getElementById("userAvatar")
const activeUserTime=document.getElementById("userTime")
const activeUserPlacement=document.getElementById("userPlacement")    
let users = JSON.parse(localStorage.getItem("users")) || [];
let usersTime=[]
for (let i = 0; i < users.length; i++) {
    usersTime.push({
    time: users[i].escapeRoomTime,
    username: users[i].username
    });
}   
console.log(usersTime)
usersTime.sort((a, b) => a.time - b.time);
console.log(usersTime)

function loadActiveUser(){
    const userIndex = users.findIndex(u => u.status === "active");
    if (userIndex !== -1) {
        activeUserName.innerHTML=users[userIndex].username
        activeUserAvatar.src=users[userIndex].avatar
        let userTime=users[userIndex].escapeRoomTime
        if (userTime==0){
            activeUserPlacement.innerHTML="--"
            activeUserTime.innerHTML="00min--00sec"
            console.log("Ola")
        }else{
            activeUserTime.innerHTML=(userTime-userTime%60)/60+"min--"+userTime%60+"s"
            activeUserPlacement.innerHTML=usersTime.findIndex(element=> element= users[userIndex].escapeRoomTime)+1
            console.log(usersTime.findIndex(element=> element=== users[userIndex].escapeRoomTime))
            
        }
    }
}
function loadRanking(){
for (i=0;i<5;i++){
    let userIndex=users.findIndex(u=>u.escapeRoomTime=== usersTime[i].time && u.username ===usersTime[i].username)
    let userCard=document.createElement("div")
    let name=document.createElement("div")
    let time=document.createElement("div")
    let placement=document.createElement("div")
    let avatarContainer=document.createElement("div")
    let avatar=document.createElement("img")
    let userRanking=document.getElementById("userRankingCard")

    let userTime=users[userIndex].escapeRoomTime 
    userCard.id="userCard"
    placement.innerHTML=i+1
    name.innerHTML=users[userIndex].username
    time.innerHTML= (userTime-userTime%60)/60+"min--"+userTime%60+"s"
    avatar.src=users[userIndex].avatar
    avatar.className="rankingAvatar"

    userRanking.appendChild(userCard)
    userCard.appendChild(placement)
    userCard.appendChild(name)
    userCard.appendChild(time)
    userCard.appendChild(avatar)
}
}
window.addEventListener('load', loadActiveUser);
loadRanking()
function goBack(){
window.location="./escape_room.html"
}