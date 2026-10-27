let display_container=document.querySelector("#display_container")

let history=async()=>{
    let response=await fetch("http://localhost:3000/history")
    let responseData=await response.json();

    let userId=localStorage.getItem("id")

    let filterData=responseData.filter(value=>value.sendId===userId || value.receiverId===userId,
    );
//    console.log(filterData);
    filterData.reverse().forEach(async(value)=> {
        getUserDetails(value.sendId);
        getUserDetails(value.receiverId);
        let transactionId=document.createElement("p")
        let amount=document.createElement("p")
        let date=document.createElement("p")
        let message=document.createElement("p")
        let container=document.createElement("article")

        // Assigning the values to the elements

        transactionId.innerHTML=`transaction Id:-${value.transactionId}`
        amount.innerHTML=`Amount:-${value.amount}`
        date.innerHTML=`Date:-${value.date}`

        if(value.receiverId===userId){
            message.innerHTML=`The ${value.amount} is Credited To Your Account From ${await getUserDetails(value.sendId)}`;
            message.style.color="Green"
        }else{
            message.innerHTML=`The ${value.amount} is Debited From Your Account And Send To ${await getUserDetails(value.receiverId)}`;
            message.style.color="Red"
        }
    
        // Append the values to the container
        container.append(transactionId,amount,message,date);
        display_container.append(container);
    });
};
history();

let getUserDetails=async(id)=>{
    let response=await fetch("http://localhost:3000/users");
    let responseData=await response.json();
    let user=responseData.find((value)=>value.id===id);
    // console.log(user.name)
    return user.name;
};