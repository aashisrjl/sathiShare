// confirm
//alert
//success

// let a = parseInt(prompt("enter a"))
// let b = parseInt(prompt ("enter b"))
// confirm("did you want to sum")
// let c= parseInt(a+b)
// alert(c)

//dom 
//document


// const div =document.createElement('div')
// document.body.prepend(div)
// div.classList.add("kedar")
// div.remove()
// div.classList.toggle("kedar")


const button = document.querySelector(".button")
const kedar = document.querySelector(".kedar")
const msg = document.querySelector(".msg")
// const btn = document.getElementById("button")
// const btnn = document.querySelector(".button")
// const btnnn = document.getElementsByTagName("button")

// const changeColor = ()=>{
    
//     alert("click")
// }
// kedar.classList.remove("kedar")
button.addEventListener("click",()=>{
    if(kedar.style.backgroundColor == "yellow"){
        kedar.style.backgroundColor ="white"
        button.textContent = "TURN ON"
        msg.style.backgroundColor = "red"
        msg.textContent= "batti niboo"
    }else{
        kedar.style.backgroundColor ="yellow";
        button.textContent = "TURN OFF"
         msg.style.backgroundColor = "green"
        msg.textContent= "balyo"
    }
})
// this is second day project
// hello 





