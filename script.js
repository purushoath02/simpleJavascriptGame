let xp = 0;
let health = 100;
let gold = 200;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick","null","null"]
const controls = document.getElementById("controls");
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const deathScreen = document.getElementById("deathScreen");
let retryButton = document.getElementById("retryButton");


retryButton.addEventListener("click", function() {
  location.reload(); 
});

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = function(params) {
  text.innerText = "No monsters found."
};
function updateStats() {
  xpText.innerText = xp
  healthText.innerText = health
  goldText.innerText = gold
  if(health <=0)
  {
    controls.style.display = "none";
    deathScreen.style.display = "block";
  }
}
function updateMonsterStats(monster) {
  monsterNameText.innerText = monster.Name
  monsterHealthText.innerText = monster.Health
  if(health <=0)
  {
    controls.style.display = "none";
    deathScreen.style.display = "block";
  }
}
function goTown() {
  button1.innerText = "Go to store"
  button2.innerText = "Go to cave"
  button3.innerText = "Fight Dragon"
  text.innerText = "You Reached back to the town square"
  button1.onclick = goStore;
  button2.onclick = goCave;
  button3.onclick = function(params) {
    text.innerText = "No monsters found."
  };

  xpText.innerText = xp
  healthText.innerText = health
  goldText.innerText = gold
  updateStats
  monsterStats.style.display = "None";
}
function goStore() {
  console.log("goStore funtion called")
  button1.innerText = "buy health"
  button2.innerText = "buy weapon"
  button3.innerText = "Go to Town"

  button1.onclick = buyHealth;
  button2.onclick = buyWeapon;
  button3.onclick = goTown;

  text.innerText ="You are in the store."

  xpText.innerText = xp
  healthText.innerText = health
  goldText.innerText = gold
  updateStats
  monsterStats.style.display = "None";
  
}
function goCave() {
  
  console.log("Going to cave.")
  updateStats()

  button1.innerText ="Go back"
  button2.innerText = "Go Forward"
  button3.innerText = "Fight Dragon"

  button1.onclick = function(){goTown()}
  button2.onclick = function(){goForward()}
  monsterStats.style.display = "None";
  

  
}
function goForward(){
  console.log("going further in cave")
  button1.innerText = "Exit cave"
  button2.innerText = "Go forward"
  button3.innerText = "Fight Monster"
  let number  = Math.floor(Math.random() * 50); // Correcting Math.random usage
  console.log("the number is " + number)
  explore(number)
  if (number > 45) {
    button3.onclick = function(){preFight(number)} // Pass the number to fight function
  } else {
    button3.onclick = function(){text.innerText = "No monsters to fight"}
  }
  button1.onclick = function(){goTown()}
  button2.onclick = function(){goForward()}
  monsterStats.style.display = "None";
  updateStats()
}

function preFight(number){
  let monsterName, monsterHealth
  if (number > 45) { // Correcting the conditional check
    monsterName = "dragon"
    monsterHealth = 500
    text.innerText = "It's a dragon"
  } else {
    monsterName = "bear"
    monsterHealth = 100
    text.innerText = "It's a bear"
  }
  let monster = {Name:monsterName, Health:monsterHealth}
  

  monsterNameText.innerText = monster.Name; 
  monsterHealthText.innerText = monster.Health;
  monsterStats.style.display = "block";
  fight(monster)
  
}
function fight(monster)
{
  if (monster.Health <= 0) {
    text.innerText = "You slayed the monster and received 10 gold";
    gold+=10;
    setTimeout(function() {
      goForward();
    }, 2000); 
    return 
  }
  button1.innerText = "Run"; 
  button2.innerText = "Dodge"; 
  button3.innerText = "Attack"; 

  button1.onclick = function(){goTown()}
  button2.onclick = function(){dodge(monster.Name)}
  button3.onclick = function(){attack(monster)}

  updateMonsterStats(monster)
  updateStats()

}
function monsterAttack(monsterName)
{
  if (monsterName == "Bear") {
      gold+=10;
      text.innerText = "Monster attacked You";
      health-=5;
  }
  else
  {
    gold+=10;
    text.innerText = "Monster attacked You";
    health-=10;
  }
  
}
function attack(monster)
{
  setTimeout(function(){
    monsterAttack(monster.Name);
  },1000)
  let playerAttack = 10; 
  if (inventory[2] == "sword")
    {
      playerAttack += 100; 
    }
  if (inventory[1]=="dagger")
  {
    playerAttack+=50;
  }
  text.innerText = "You dealt " + playerAttack + " damage."
  monster.Health-=playerAttack;
  updateMonsterStats(monster)
  updateStats()
  fight(monster)
}
function dodge(monsterName) {
  let dodge= Math.random();
  if (monsterName == "bear")
  {
     if (dodge < 0.5)
     {
       text.innerText = "You succesfully dodged"
     }
    else
     {
       text.innerText = "monster hit you"
       health-=5;
     }
  }
  else
  {
     if (dodge < 0.7)
     {
       text.innerText = "You succesfully dodged"
     }
    else
     {
       text.innerText = "monster hit you"
       health-=20;
     }
  }
  
}
function explore(number){
  if(number > 45)
  {
    text.innerText = "You encounter a monster"
    
  }
  else if(number ===0)
  {
    text.innerText = "You found 10 Gold!"
    gold+=10;
  }
  else if(number > 30)
  {
    text.innerText = "You found 2 gold"
    gold+=2;
  }
  else
  {
    text.innerText = "You found 1 gold"
    gold+=1;
  }
  updateStats()
 
}

function buyHealth() {
  if(gold <10) {
    text.innerText="You don't have enough gold."
  }
  else {
    text.innerText="You Restored 10 Hp."
    gold -=10; 
    health+=10; 
    if(health >100) {
      health =100; 
    }
  }
  console.log("You bought health" )
  updateStats()
}

function buyItem(x) {
  //console.log("ordered item "+ x)
  let price;
  let weapon
  let weaponSlot
  if(x == 1){
    weapon = "dagger"
    weaponSlot = 1
    price = 20;

  }
  else if (x == 2){
    weapon = "sword"
    weaponSlot =2;
    price = 30
  }
  if(gold<price){
    text.innerText = "You don't have enough gold";
  }
  else{
    gold -=price; 
    inventory[weaponSlot] = weapon
    console.log("You bought " + weapon )
  }
  updateStats
}

function buyWeapon() {
  button1.innerText = "Buy Dagger";
  button2.innerText = "Buy Sword";
  button3.innerText = "Back";

  button1.onclick = function() { buyItem(1); }; // Assigning a function as a callback
  button2.onclick = function() { buyItem(2); }; // Assigning a function as a callback
  button3.onclick = goStore;

  updateStats()
}

