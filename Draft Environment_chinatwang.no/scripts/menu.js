window.addEventListener("resize",()=>{
    wide = window.innerWidth;

    if(wide<560){
        mobileView.style.display = "block";
    } else {
        mobileView.style.display = "none";
    }
});


var tabsBar = document.querySelector(".allFoodItems");
var clickedElement
var mobileView = document.querySelector("[data-food='mobile']");

function showFood(item){
    item.addEventListener("click",function(){
        var foodItems = [];
        var clickedItem = this.cloneNode(true);
        foodItems.push(clickedItem);

        var foodDisplay = document.querySelector("[data-food='display']");
        var foodTitle = document.querySelectorAll("[data-food='title']");

        var foodPic = document.querySelectorAll("[data-food='pic']");
        var foodPicDis = document.querySelectorAll("[data-food='pic']")[0];
        var foodPicMob = document.querySelectorAll("[data-food='pic']")[1];

        var foodExplanation = document.querySelectorAll("[data-food='explanation']");
        storeChildren(this, foodItems);
        
        if (clickedElement === foodItems[2].innerHTML && foodDisplay.classList.contains("activeDisplay") && mobileView.classList.contains("hiddenMob")){
            foodDisplay.classList.remove("activeDisplay");
            //FOR MOBILE
            mobileView.classList.remove("hiddenMob");


            clickedElement = "newElement"

        }else{
            foodTitle.forEach((fTitle)=>{
                fTitle.innerHTML = "";
                fTitle.appendChild(foodItems[1].cloneNode(true));
            })
            
            foodPic.forEach((fPic)=>{
                fPic.innerHTML = "";
            })
            foodPicDis.appendChild(foodItems[3].cloneNode(true));
            foodPicMob.appendChild(foodItems[4].cloneNode(true));
            foodItems[7].style.display = "flex";

            foodExplanation.forEach((fExp)=>{
                fExp.innerHTML = "";
                fExp.appendChild(foodItems[7].cloneNode(true));
            })

            foodDisplay.classList.add("activeDisplay");

            //FOR MOBILE
            mobileView.classList.add("hiddenMob");

            clickedElement = foodItems[2].innerHTML;
        }
    });
}


function storeChildren(item,foodItems){
    for (var i = 0; i < item.children.length; i++){
        var childElement = item.children[i].cloneNode(true);
        console.log(item.children[i]);
        foodItems.push(childElement);
        storeChildren(item.children[i], foodItems);
    }
};


var selectedTab = "tab-all"

function addSomeSnap(){
    document.querySelector('.allFoodItems').style.scrollSnapType = 'x mandatory'; // Enable scroll snapping temporarily
    setTimeout(() => {
    document.querySelector('.allFoodItems').style.scrollSnapType = ''; // Disable scroll snapping after a short delay
    }, 500);

}

function tabSelection(item){
    item.addEventListener("click", function(){
        document.querySelector(".activeLi").classList.remove("activeLi");
        
        document.querySelector("[data-food='display']").classList.remove("activeDisplay");

        this.classList.add("activeLi");

        // Make it Snap into view, then make the container scrollable again
        addSomeSnap();

        var tabItems = document.querySelectorAll("."+this.classList[1]); // Only applies to the tabs and their 2nd class name, so placement of classanme is only relevant for the tabs
        var allItems = document.querySelectorAll(".tab-all");

        selectedTab = this.classList[1]; //IDENTIFY WHICH TAB TO SEARCH IN

        allItems.forEach(function(e){ //First hide ALL items regardless by ADDING .hide
            if(e.classList.contains("menuItem")){
                e.classList.add("hide");
            }
        })
        tabItems.forEach(function(e){ //then remove .hide from all accepted tabItems
            if (e.classList.contains("menuItem")){
                e.classList.remove("hide"); 
            }
        });
        
    });
}


//THE CLOSE BUTTON THAT REMOVES THE FOOD DISPLAY ON MOBILE

document.querySelector(".close").addEventListener("click",()=>{
    mobileView.classList.remove("hiddenMob");
    document.querySelector("[data-food='display']").classList.remove("activeDisplay");

    if(wide<560){
        showingTheNav()
    }

});


// Search Function will be available for all the cards available

var searchInput = document.querySelector("[data-search]");
let users = [];

searchInput.addEventListener("input", e=>{
    var value = e.target.value.toLowerCase();

    users.forEach(user =>{
        let isVisible = user.id.toLowerCase().includes(value) || user.price.toLowerCase().includes(value) || user.ingredients.toLowerCase().includes(value);
        if(Array.from(user.element.classList).includes(selectedTab)){ //Convert element.classList(domTokenList) to regular Array, then for all the elements that include the "selectedTab" which is a global array from earlier, we can do a keyword reearch
            user.element.classList.toggle("hide",!isVisible);
        }
    });

});



// Creating The Cards
cardTemplate = document.querySelector("[data-food='item']"); //Selected template cards will follow
cardContainer = document.querySelector("[data-food-card-container"); //Where the cards will be input

fetch("foodItems.json")
    .then(res => res.json())
    .then(data => {
        users = data.map(user=>{
            let card = cardTemplate.content.cloneNode(true).children[0];

            let title = card.querySelector("[data-food-title]");
            let price = card.querySelector("[data-food-price]");
            let image = card.querySelector("[data-food-image]");
            let ingredients = card.querySelector("[data-food-info]");
            let allergies = card.querySelector("[data-food-icon]");

            price.textContent = user.price; 
            title.textContent = user.id;
            ingredients.textContent = user.ingredients;
            allergies.innerHTML = user.allergies;


            card.classList.add(user.tab); //Set its tab category
            image.setAttribute("src", "/Assets/food/"+user.image); //Set image name in food dir

            showFood(card);
            //ShowFood works here because, as each element is created it applies an eventlistener to each card.
            //Previously I queryselected all .itemsMenu elements and then applied the eventlistener via .forEach

            cardContainer.append(card);
            return{id: user.id, price: user.price, ingredients: user.ingredients, element: card} //Look at the start where user = data.map() This returns this array into this array
        });
    });

function tabSelectionNoClick(slideChild){
    document.querySelector("[data-food='display']").classList.remove("activeDisplay");
    mobileView.classList.remove("hiddenMob")

    var tabItems = document.querySelectorAll("."+slideChild.classList[1]); // Only applies to the tabs and their 2nd class name, so placement of classanme is only relevant for the tabs
    var allItems = document.querySelectorAll(".tab-all");

    selectedTab = slideChild.classList[1]; //IDENTIFY WHICH TAB TO SEARCH IN

    allItems.forEach(function(e){ //First hide ALL items regardless by ADDING .hide
        if(e.classList.contains("menuItem")){
            e.classList.add("hide");
        }
    })
    tabItems.forEach(function(e){ //then remove .hide from all accepted tabItems
        if (e.classList.contains("menuItem")){
            e.classList.remove("hide"); 
        }
    });
    
}

document.querySelectorAll("[data-btn]").forEach(button => {
    button.addEventListener("click",()=>{
    var offset = button.dataset.btn === "next" ? -1 : 1;
    var slides = document.querySelector(".allFoodItems").querySelectorAll(".tab");
    var index = Array.from(slides).findIndex(function(slide){
        return slide.classList.contains("activeLi");
    })
    var newIndex = index+offset
    tabSelectionNoClick(slides[newIndex]);

    if(newIndex < 0) newIndex = slides.length - 1
    if(newIndex >= slides.length) newIndex = 0


    slides[newIndex].classList.add("activeLi");
    addSomeSnap();
    slides[index].classList.remove("activeLi");

})
})


//Executing general functions onto documents
document.querySelectorAll(".tab").forEach(tabSelection);
