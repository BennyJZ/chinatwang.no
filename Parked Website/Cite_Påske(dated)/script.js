var menu = document.querySelectorAll(".img_meny");
var fullImage = document.querySelector(".f_size");
var close = document.querySelector(".close");


window.addEventListener("resize",()=>{
    width = window.innerWidth;
    
    if (width>900){
        menu.forEach((item)=>{
            item.addEventListener("click", ()=>{
            fullImage.classList.add("f_active");
        })
        });
    }
})




close.addEventListener("click", ()=>{
    fullImage.classList.remove("f_active");
});