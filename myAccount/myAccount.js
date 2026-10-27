let personalDetailsContainer=document.querySelector(".personalDetails")
let userIdSingle=localStorage.getItem("id");
let singleUser=async()=>{

    let response=await fetch(`http://localhost:3000/users/${userIdSingle}`);
    let userData=await response.json();
    let value=Object.entries(userData).filter(value=>value[0]!=="id" && value[0]!=="password");
    let container=document.createElement("article");
    let h1=document.createElement("h1");
    h1.innerHTML="Personal Details";
    container.append(h1);
    value.map((userValue)=>{
        let p=document.createElement("p");
        p.innerHTML=`${userValue[0]} : ${userValue[1]}`;
        container.append(p);
    });
    personalDetailsContainer.append(container);
};
singleUser();