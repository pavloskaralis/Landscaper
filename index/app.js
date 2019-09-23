/////Items Objects/////
const teeth = {
    text: "Teeth",
    value: 0,
    earningPower: 1,
    image: "img/teeth.jpg",
}
const razor = {
    text: "Razor",
    value: 5,
    earningPower: 5,
    image: "img/razor.jpg",
}
const goat = {
    text: "Gary",
    value: 25,
    earningPower: 50,
    image: "img/goat.jpg",
}
const mower = {
    text: "Mower",
    value: 250,
    earningPower: 100,
    image: "img/mower.jpg",
    preventBuy: 4
}
const kids = {
    text: "Kids",
    value: 500,
    earningPower: 250,
    image: "img/kids.jpg",
}

///// shopToInventory()'s buyItem() Variables/////
const objectArray = [teeth, razor, goat, mower, kids];
let nextItemIndex = 0; 

/////Score Counter Variables/////
let lawnsCut = 0;
let cash = 0; 
let itemsOwned = 0;

/////Query Selectors//////
const lawnsCutText = document.getElementsByTagName("h1")[1];
const cashText = document.getElementsByTagName("h1")[2];
const itemsOwnedText = document.getElementsByTagName("h1")[3];
const inventorySlots = document.getElementById("inventory");
const promptArea = document.getElementById("prompt");
const grass = document.getElementById("grass");
const background = document.getElementById("background"); 

/////Stored Prompts/////
const winConditionsPrompt = () => {
    promptArea.innerHTML = `<span class="altH1">Win Conditions:</span><br>Buy all items and earn $1000.`
}
const howToEquipPrompt = () => {
    promptArea.innerHTML = `Click an inventory item to equip it,<br>Then click the grass to begin landscaping.`
}
const mustEquipPrompt = () => {
    promptArea.innerHTML = `You must equip an item to cut the grass.`
}
const notEnoughMoneyPrompt = () => {
    promptArea.innerHTML = `You do not have enough to buy this item.`
}
const notUnlockedPrompt = () => {
    promptArea.innerHTML = `You have not unlocked this item.`
}
const winningMessageOne = () => {
    promptArea.innerHTML = `<span class="title">Congratulations!</span>`;
}
const winningMessageTwo = () => {
    promptArea.innerHTML = `You are a master <span class="title">LANDSCAPER</span>`;
}
const winningMessageThree = () => {
promptArea.innerHTML = `Collect your prize by clicking <a href="https://www.amazon.com/Pack-Scope-Mouthwash-Outlast-Lasting/dp/B017HTAOSY/ref=sr_1_6?crid=1HMVO25MM0FM5&keywords=scope+mouthwash&qid=1569102917&s=gateway&sprefix=scope+mout%2Caps%2C127&sr=8-6" class="altH1">here!</a>`;
}
const blankPrompt = () => {
    promptArea.innerHTML = ``
}
    
/////Functions/////

const start = () => {  
    itemsOwned += 1; 
    nextItemIndex += 1; 
    lawnsCutText.innerHTML = `Lawns Cut: ${lawnsCut}`;
    cashText.innerHTML = `Cash: $${cash}/$1000`;
    itemsOwnedText.innerHTML = `Items: ${itemsOwned}/5`; 
    promptArea.innerHTML = `Welcome to: <span class="title">LANDSCAPER</span>`; 
    itemToShop(razor, 0);
    itemToInventory(teeth);
    grass.addEventListener("click", mowGrass);
    grass.style.opacity = 0; 
    setTimeout(grassGrowAtStart, 1500);
    noClickAtStart();
    setTimeout(noClickAtStart, 6000);
    setTimeout(winConditionsPrompt, 3000);
    setTimeout(howToEquipPrompt, 6000);  
}

const grassGrowAtStart = () => {
    grass.classList.toggle("unMow"); 
    grass.style.opacity = 100;
    const undueGrassSettings = () => {
        grass.classList.remove("unMow"); 
        grass.style.opacity = null;
    }
    setTimeout(undueGrassSettings, 2500);
}

const noClickAtStart = () => {
    for (let i = 0; i < 5; i++){
        document.getElementsByClassName("circle")[i].classList.toggle("noclick");
    }
    grass.classList.toggle("noclick");
}

const itemToInventory = (object) => {  
    let inventoryItem = document.createElement("img");
    inventoryItem.setAttribute("class","circle");
    inventoryItem.setAttribute("data-earningPower", object.earningPower);
    inventoryItem.setAttribute("src", object.image);
    inventorySlots.appendChild(inventoryItem); 
    inventoryItem.addEventListener("click",() => equipItem(inventoryItem));

    let inventoryItemText = document.createElement("h2");
    inventoryItemText.innerHTML = `${object.text} <span class="altH2"> +$${object.earningPower}</span>`;
    inventorySlots.appendChild(inventoryItemText); 
    
    let divTwo = document.createElement("div");				
	divTwo.className = "blank";									
    inventorySlots.appendChild(divTwo); 
}

const equipItem = (inventoryItem) => {
    if(document.getElementsByClassName("equip")[0]){
           document.getElementsByClassName("equip")[0].classList.toggle("equip");
       }
       inventoryItem.classList.toggle("equip");   
 }

const itemToShop = (object, shopIndex) => {     
    let shopItem = document.getElementsByClassName("circle")[shopIndex];
    shopItem.setAttribute("src", object.image);     
    shopItem.addEventListener("click",() => buyItem(shopItem));

    let inventoryItemText = document.getElementsByTagName("h2")[shopIndex];
    inventoryItemText.innerHTML = `${object.text} <span class="altH2">-$${object.value}</span>`;
}

const buyItem = (shopItem) => {
    let nextItem = objectArray[nextItemIndex];
    if (cash < nextItem.value) {
        notEnoughMoneyPrompt();
    } else if (cash >= nextItem.value) {
        itemToInventory(nextItem);
        shopItem.classList.toggle("noclick");
        shopItem.setAttribute("src","img/empty.jpg");
        document.getElementsByTagName("h2")[nextItemIndex - 1].innerHTML = `${nextItem.text} <span class="altH2">Sold`;
        nextItemIndex += 1; 
        itemsOwned +=1;
        itemsOwnedText.innerHTML = `Items: ${itemsOwned}/5`; 
        cash -= nextItem.value;
        cashText.innerHTML = `Cash: $${cash}/$1000`;
        promptArea.innerHTML = `You have unlocked: <span class="title">${nextItem.text}</span>`;
        itemToShop(objectArray[nextItemIndex], nextItemIndex - 1);   
    }
}  

const mowGrass = () => {
    const noClickGrass = () => {
        grass.classList.remove("noclick");
    }
    const unMowGrass = () => {
            grass.classList.toggle("unMow");
            grass.classList.remove("mow"); 
            setTimeout(noClickGrass, 500);        
        }
    if (document.getElementsByClassName("equip")[0]){
        blankPrompt();
        grass.classList.remove("unMow");
        grass.classList.toggle("noclick");
        grass.classList.toggle("mow");
        setTimeout(updateScore, 700);
        setTimeout(unMowGrass, 1000);  
        setTimeout(checkForWin, 1000);  
    } else {
        mustEquipPrompt(); 
    }
}

const updateScore = () => {     
    let currentEarningPower = document.getElementsByClassName("equip")[0].getAttribute("data-earningPower");
    currentEarningPower = parseInt(currentEarningPower,10);
    lawnsCutText.innerHTML = `Lawns Cut: ${lawnsCut += 1}`;
    cashText.innerHTML = `Cash: $${(cash += currentEarningPower)}/$1000`;
    promptArea.innerHTML = `You earned $${currentEarningPower}!`;
}       

const checkForWin = () => {
    if (cash >= 1000 && itemsOwned === 5) {
        background.style.backgroundImage = `url("img/win.jpg")`;
        background.removeChild(grass);
        winningMessageOne();
        setTimeout(winningMessageTwo, 3000);
        setTimeout(winningMessageThree, 6000);
    }
}

start();
