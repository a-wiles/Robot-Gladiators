console.log(enemyNames);
console.log(enemyNames.length);
console.log(enemyNames[0]);
console.log(enemyNames[3]);

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1)) + min;

  return value;
};



// fight function
var fight = function(enemy) {
  while (playerInfo.health > 0 && enemyHealth > 0) {

    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        playerInfo.money = playerInfo.money - 10;
        console.log("playerMoney", playerInfo.money);
        break;
      }
    }

    // Enemy Recieves Damage
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);

    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // Enemy Health Check
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');
      playerInfo.money = playerInfo.money + 20;
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // Player Recieves Damange
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health = 100;
  attack = 10;
  money = 10;
  reset: function () {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },

  refillHealth: function() {
    if (this.money >=7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
    this.health += 20;
    this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  },

  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
    this.attack += 6;
    this.money -= 7;
    }
    else {
      window.alert("You don't have enough money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },

  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },

  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

var startGame = function() {
  // reset player Stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
     window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

     // pick new enemy to fight based on the index of the enemyNames array
     pickedEnemyObj= enemyInfo[i];
     pickedEnemyObject.health=randomNumber(40, 60);

      fight(pickedEnemyObj);

      // if we're not the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

        // if yes, take them to the store.
        if (storeConfirm) {
        shop();
      }
    }
   }

    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
   }
  }

  //After the loop ends.
  endGame();
};


//End Game Function
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the Game! You now have a score of " + playerInfo.money + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }

// Play Again?
var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    //Restart the Game
    startGame();
  } else {
    window.alert ("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
      "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

  // use switch case to carry out action
    switch (shopOptionPrompt) {
     case 'REFILL':
     case 'refill':
       playerInfo.refillHealth();
       break;
     case "UPGRADE":
     case "upgrade":
       playerInfo.upgradeAttack();
       break;
    }

    // increase health and decrease money
    playerInfo.health = playerInfo.health + 20;
    playerInfo.money = Math.max(0, playerInfo.money - 10);
    
    } else {
      window.alert("You don't have enough money!");
    }
      break;
      case 'UPGRADE':
      case 'upgrade':
      if (playerInfo.money >= 7) {
        window.alert("Upgrading player's attack by 6 for 7 dollars.");

      // increase attack and decrease money
      playerInfo.attack = playerInfo.attack + 6;
      playerInfo.money = playerInfo.money - 7;
    
    } else {
        window.alert("You don't have enough money!");
    } break;
      case 'LEAVE':
      case 'leave':
        window.alert('Leaving the store.');

      // do nothing, so function will end
      break;
      default:
        window.alert('You did not pick a valid option. Try again.');

      // call shop() again to force player to pick a valid option
      shop();
      break;
   }
};

//Start Game
startGame();