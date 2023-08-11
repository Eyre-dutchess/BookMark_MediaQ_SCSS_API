
// header-nav
const headerEl = document.querySelector("header");
const headerBtn = headerEl.querySelector(".header-btn");
const headerNav = headerEl.querySelector(".header-nav");

headerBtn.addEventListener("click", ()=>{
    const visibility = headerNav.getAttribute("data-visible");
    if(visibility === "false"){
        headerBtn.setAttribute("aria-expanded", true);
        headerNav.setAttribute("data-visible", true);
        headerEl.classList.add("active");
    }else{
        headerBtn.setAttribute("aria-expanded", false);
        headerNav.setAttribute("data-visible", false);
        headerEl.classList.remove("active");
    }
})

//header scroll up/down
const bodyEl = document.body;
const heroEl = bodyEl.querySelector(".hero-section");
const heroHeight = heroEl.getBoundingClientRect().height;
const heroIMG = heroEl.querySelector("img");
const links = heroEl.querySelector(".links");
links.parentElement.classList.add("active");

let lastScroll = 0;
window.addEventListener("scroll", ()=>{
    const currentScroll = window.scrollY;
    const scrolledPercent = currentScroll/heroHeight;
    
    heroIMG.style.opacity = scrolledPercent*8 + 0.15;
    heroIMG.style.transform = "translateZ(" + 0.5 + "em)";
    links.style.marginTop = scrolledPercent*8 + 0.15 + "em";
    if(currentScroll>=0 && currentScroll < heroHeight *0.3){
        links.parentElement.classList.add("active")
    }else{
        links.parentElement.classList.remove("active")
    }
    if(currentScroll<=0){
        bodyEl.classList.remove("scroll-up");
    }
    if(currentScroll>lastScroll && !bodyEl.classList.contains("scroll-down")){
        bodyEl.classList.remove("scroll-up");
        bodyEl.classList.add("scroll-down");
    }
    if(currentScroll < lastScroll && bodyEl.classList.contains("scroll-down")){
        bodyEl.classList.add("scroll-up");
        bodyEl.classList.remove("scroll-down");
    }
    lastScroll = currentScroll;
})



//feature-section-slide
const featList = document.querySelector("[data-feature-list]");
const featItems = Array.from(featList.children);

const featDetList = document.querySelector("[data-feature-detail-container]");
const featDetItems = Array.from(featDetList.children);

featList.addEventListener("click", (e)=>{
    const currentFeatItem = featList.querySelector(".active");
    const currentIndex = featItems.findIndex(featItem=>featItem === currentFeatItem);
    const currentFeatDetItem = featDetItems[currentIndex];
    console.log(currentFeatDetItem )
    if(e.target.tagName.toLowerCase()==="li"){
        const targetFeatItem = e.target;
        
        if(targetFeatItem === currentFeatItem) return;
        const targetIndex = featItems.findIndex(featItem=>featItem === targetFeatItem);
        const targetFeatDetItem = featDetItems[targetIndex];

        targetFeatItem.classList.add("active");
        currentFeatItem.classList.remove("active");
        targetFeatDetItem.classList.add("active");
        currentFeatDetItem.classList.remove("active");
    }
})



//extension section
const extendSection = document.querySelector(".extend-section");
const extendContainer = document.querySelector(".extend-container");
const extensionList = Array.from(extendContainer.children);

extendSection.addEventListener("click",(e)=>{
    
    console.log(e.pageX);
    console.log(bodyEl.getBoundingClientRect().width*0.5)
    if(e.pageX < bodyEl.getBoundingClientRect().width*0.5){
        rotateLeft();
        console.log("hi")
    }else{
        rotateRight();
    }
} )

function rotateLeft(){
    const currentExtension = extendContainer.querySelector(".active");
    const currentIndex = extensionList.findIndex(extension=> extension === currentExtension);
    if(currentIndex === 0){
        nextExtension = extensionList[2];
        oddExtension = extensionList[1] ;
    }else if(currentIndex === 2){
        nextExtension = extensionList[currentIndex - 1];
        oddExtension = extensionList[0];
    }else{
        nextExtension = extensionList[currentIndex - 1];
        oddExtension = extensionList[currentIndex + 1];
    }
    currentExtension.classList.remove("active");
    nextExtension.classList.add("active");
    currentExtension.style.transform ="rotateY(-" + 120+ "deg) translateZ("+ 15 + "em) translateX(-"+ 40+"%)";
    nextExtension.style.transform = "translateZ(" +5 +"em)" ;
    oddExtension.style.transform  = "rotateY(-" + 240+ "deg) translateZ("+ 15 + "em) translateX("+ 20+"%)";
}
function rotateRight(){
    const currentExtension = extendContainer.querySelector(".active");
    const currentIndex = extensionList.findIndex(extension=> extension === currentExtension);
    if(currentIndex === 2){
        prevExtension = extensionList[0];
        oddExtension = extensionList[1] ;
    }else if(currentIndex === 0){
        prevExtension = extensionList[1];
        oddExtension = extensionList[2];
    }else{
        prevExtension = extensionList[2];
        oddExtension = extensionList[0];
    }
    currentExtension.classList.remove("active");
    prevExtension.classList.add("active");
    currentExtension.style.transform ="rotateY(" + 120+ "deg) translateZ("+ 15 + "em) translateX("+ 20+"%)";
    prevExtension.style.transform = "translateZ(" +5 +"em)" ;
    oddExtension.style.transform  = "rotateY(" + 240+ "deg) translateZ("+ 15 + "em) translateX(-"+ 40+"%)";
}


//faq-section
const faq = [
    {
        question: "What's Bookmark?",
        answer:"Manage has supercharged our team’s workflow. The ability to maintain visibility on larger milestones at all times keeps everyone motivated."
    },
    {
        question: "How can I request a new browser?",
        answer:"We have been able to cancel so many other subscriptions since using Manage. There is no more cross-channel confusion and everyone is much more focused."
    },
    {
        question: "Why is the market the first step?",
        answer:"The first step is always to find a better partner. Moving onto the next chapter has always been about employing the joy from the hope of the future, to ease the pain in the scar of the past"
    },
    {
        question: "Where do we find support?",
        answer:"Manage allows us to provide structure and process. It keeps us organized and focused. I can’t stop recommending them to everyone I talk to!"
    },
    {
        question: "What about other Chromium browsers?",
        answer:"Their software allows us to track, manage and collaborate on our projects from anywhere. It keeps the whole team in-sync without being intrusive."
    }
]

const faqContainer = document.querySelector("[data-faq-container]");
window.addEventListener("DOMContentLoaded", ()=>{
    renderFAQ(faq);
    const faqItems = faqContainer.querySelectorAll(".faq-item");
    faqItems.forEach(faqItem=>{
        faqItem.addEventListener("click", ()=>{
            faqItem.classList.toggle("active")
        })
    })
})

function renderFAQ(faqItems){
    let loadFAQ = faqItems.map(faqItem=>{
        return `
        <div class="faq-item">
            <div class="faq-top">
                <h6 class="question">${faqItem.question}</h6>
                <i class="fa fa-chevron-down"></i>
            </div>
            <p>${faqItem.answer}</p>
        </div>
        `
    })
    loadFAQ = loadFAQ.join("");
    faqContainer.innerHTML = loadFAQ;
}



//email verify
const formEl = document.querySelector(".cta-form");
const emailContainer = document.querySelector("[data-email-container]");
const emailInput = emailContainer.querySelector("input");
const emailError = emailContainer.querySelector("span");
formEl.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(emailInput.value == null || emailInput.value === "") {
        emailContainer.classList.add("error");
        emailError.innerText = "Email is required!"
    }else if(!emailValid(emailInput.value)){
        emailContainer.classList.add("error");
        emailError.innerText = "Whoops, make sure it's an email!"
    }else{
        emailContainer.classList.remove("error");
    }
    
})

function emailValid(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


//api
const randomContainer = document.querySelector("[data-random-container]");
const favProContainer = document.querySelector("[data-fav-container]");

const LOCAL_STORAGE_FAVPRODUCT_KEY = "fav_pros";
let favProducts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FAVPRODUCT_KEY ))||[];

const APIURL = "https://fakestoreapi.com/products";
getRandomProduct(APIURL);
async function getRandomProduct(url){
    await fetch(url)
        .then(resp=>{
            return resp.json()})
        .then(respData =>{
           return randomProduct = respData; 
        })  
        displayRandomProduct(randomProduct);
        const apiIMGs = randomContainer.querySelectorAll(".random-item");
        apiIMGs.forEach(apiIMG=>{
            iMGObserver.observe(apiIMG)
        })
}

function createFavProducts(item){
    return {
        id: item.id,
        name: item.title,
        price: item.price,
        img: item.image,
    }
}
function saveANDRenderFav(){
    saveLS();
    renderFav();
}
function saveLS(){
    localStorage.setItem(LOCAL_STORAGE_FAVPRODUCT_KEY, JSON.stringify(favProducts))
}

function displayRandomProduct(items){
    items.forEach(item=>{
        const randomItem = document.createElement("div");
        randomItem.classList.add("random-item");
        randomItem.innerHTML = `
            <img src="${item.image}" alt="" class="random-img">
            <div class="random-content">
                <h6 class="random-name">${item.title}</h6>
                <p class="random-intro">${item.category}<br>${item.price}</p>
                <p class="random-infor">${item.description}</p>
            </div>
            <button class="like-btn"><i class="fa fa-heart"></i></button>
        `
        
        const likeBtn = randomItem.querySelector(".like-btn");
        favProducts.forEach(favProduct=>{
            if(favProduct.id === item.id){
                likeBtn.classList.add("active")
            }else return;
        })

        likeBtn.addEventListener("click", (e)=>{
            const targetBtn = e.target.tagName.toLowerCase()==="button"? e.target : e.target.parentElement;
            
            if(targetBtn.classList.contains("active")){
                targetBtn.classList.remove("active");
                favProducts = favProducts.filter(favProduct=>favProduct.id !== item.id);
                saveANDRenderFav();
            }else{
                targetBtn.classList.add("active");
                const newFav = createFavProducts(item);
                favProducts.push(newFav);
                saveANDRenderFav();
            }
        })
        
        
        
        randomContainer.append(randomItem);
    })
    
   
}

function renderFav(){
    clearContainer(favProContainer);
    favProducts.forEach(favProduct=>{
        const favItem = document.createElement("li");
        favItem.classList.add("fav-item");
        favItem.innerHTML = `
                <img src="${favProduct.img}" alt="" class="fav-img">
                <h6 class="fav-name">${favProduct.name}</h6>
                <p>${favProduct.price}</p>
        `
        
        favProContainer.append(favItem);
    })
}
window.addEventListener("DOMContentLoaded", ()=>{
    renderFav();
    const favIMGs = favProContainer.querySelectorAll("li");
        favIMGs.forEach(favIMG=>{
            iMGObserver.observe(favIMG)
        })
})

function clearContainer(container){
    while(container.firstChild){
        container.removeChild(container.firstChild)
    }
}





// section observe img
const sectionImgs = document.querySelectorAll("[data-img]");


const options = {
    rootMargin: "-50px"
};
const iMGObserver = new IntersectionObserver(function(entries, observe){
    entries.forEach(entry=>{
        entry.target.classList.toggle("active", entry.isIntersecting);
    })
}, options);

sectionImgs.forEach(sectionImg=>{
    iMGObserver.observe(sectionImg)
})
