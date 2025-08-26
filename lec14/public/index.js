let usercontainer=document.querySelector(".user-container");
let registerform= dpucment.querySelector(".register");
let 
function getUsersData(URL){
    fetch(URL)
    .then((res)=>{
        console.log(res);
        return res.json();
    })
    .then((data)=>{
        // console.log(data);
        const body=document.body;
        data.forEach(user=>{
            const p=document.createElement("p");
            p.textContent=`${user.id}. ${user.name} (${user.email})`;
            body.appendChild(p);
            display(body);
        })

    })
    .catch((err)=>{
        console.log(err);
    })
}
function display(user){
    let li=document.createElement("li");
    li.setAttribute("class","user-item");
    li.innerHTML=`<div class="user-info">
            </div>
            <div class="user-btn">
                <button class="user-delete">Delete</button>
                <button class="user-edit">Edit</button>
            </div>`
    user.appendChild(li);
}
getUsersData("http://localhost:8000/users");


function addUser(name,username,URL){
let data={
    name:name,
    username:username
}
    fetch(URL,{
    method:"POST",
    body:JSON.stringify(data)
})
.then ((res)=>{
    return res.json()
})
.them ((data)=>{
    console.log(data)
})
}
registerform.addEventListener("submit",function(e){
    let name=nameInput.value ;
    let username=usernameNameInput.value;
    addUser(name,username,"http://localhost")
})