//There will come a time only god knows whats going on in here, make sure its good now

// Mobile View, toggle the Nav Hamburger
document.querySelector(".toggleHam").addEventListener("click", e=>{
    document.querySelector(".logo").classList.toggle("active");
});

//Toggle underline decoration for the ham buttons

var lastScroll = 0;
var wide = window.innerWidth;

function hidingTheNav(){
    document.querySelector("#navBar").classList.add("hideNav");
    document.querySelector(".logo").classList.add("hideLogo");
    document.querySelector(".navBar").classList.add("hideBar");
    for (let i = 0 ;i < document.querySelectorAll(".mobIcon").length; i++) {
        document.querySelectorAll(".mobIcon")[i].classList.add("mobIconHidden");
    }
    document.querySelector(".logo").classList.remove("active");

}

function showingTheNav(){
    document.querySelector(".navBar").classList.remove("hideBar");
    for (let i = 0 ;i < document.querySelectorAll(".mobIcon").length; i++) {
        document.querySelectorAll(".mobIcon")[i].classList.remove("mobIconHidden");
    }
    document.querySelector("#navBar").classList.remove("hideNav");
    document.querySelector(".logo").classList.remove("hideLogo");

}

window.addEventListener("scroll",(e=>{
    var scrollPos = Math.floor(window.scrollY);

    if (scrollPos > 100){
        if (scrollPos > lastScroll){
            hidingTheNav();

        }else if(scrollPos < lastScroll && wide >= 860){
            showingTheNav();
        }

    }else{
        showingTheNav();
    }

    lastScroll = scrollPos;
}));

//-----------------------------------------------------------

// var oss = document.getElementById("omOss");
// var plxSpeed = oss.querySelectorAll(".plx");
// document.body.addEventListener("mousemove", parallax);

// function parallax(event){
//     plxSpeed.forEach(plx=>{
//         const speed = plx.getAttribute("data-speed");

//         const x = (window.innerWidth - event.clientX*speed)/1500;
//         const y = (window.innerHeight - event.clientY*speed)/1500;

//         plx.style.transform = `translateX(${x}px) translateY(${y}px)`;
//     })
// }


// let map, mapDiv;

// async function initMap() {
//   // The location of Uluru
//     const position = { lat: 59.20647430419922, lng: 9.606868743896484 };
//   // Request needed libraries.
//   //@ts-ignore
//     const { Map } = await google.maps.importLibrary("maps");
//     const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   // The map, centered at Uluru
//     map = new Map(document.getElementById("map"), {
//     zoom: 17,
//     center: position,
//     mapId: "DEMO_MAP_ID",
//     });

//     var marker = new google.maps.Marker({
//         map: map,
//         position: position,
//         icon: {
//             url: '/test.chinatwang.no/Assets/lg_ptr_chinat4.png', // Customize the icon URL
//             scaledSize: new google.maps.Size(50, 80) // Set the size of the icon
//         }

        //   The marker, positioned at Uluru
    // const marker = new AdvancedMarkerElement({
    // map: map,
    // position: position,
    // title: "ChinaT",
    // icon: {
    //     url: 'Assets/lg_ptr_chinat.png', // Customize the icon URL
    //     scaledSize: new google.maps.Size(100, 100) // Set the size of the icon
    // }
    // });
//     });

// }

// initMap();

window.addEventListener("scroll",(e=>{
    var scrollPos = Math.floor(window.scrollY);
    console.log(scrollPos);
    var percentVH = Math.floor((window.scrollY/document.body.scrollHeight)*100)
    console.log(percentVH)

    if (percentVH > 72){
        document.getElementById("firstFood").style.transform="translateX(10%)"
        document.getElementById("secondFood").style.transform="translateX(10%)"
        document.getElementById("thirdFood").style.transform="translateX(10%)";
        console.log("hello");
        console.log(document.body.scrollHeight)
    } else if (percentVH <= 72){ 

        document.getElementById("firstFood").style.transform="translateX(-100%)"
        document.getElementById("secondFood").style.transform="translateX(-100%)"
        document.getElementById("thirdFood").style.transform="translateX(-100%)";

    };
}));