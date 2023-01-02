//TODO:
//click on image to embiggen to full screen/size
//aspect ratio handling - if wider then left-righty; if taller then uppy-downy
//refreshes every midnight utc
//about section - instructions, midjourney deets
//appearance: dark mode/light mode, phones, etc
//share tweet etc
//track scores in cookie
//visitor numbers?
//payment (kofi/patreon/paypal)



// Define the two solution nouns and display the number of characters
// TODO: should be array really, would make things much tidier later
var solutionNoun1 = "appetite";
var solutionNoun2 = "ghost";
$("#solution-noun-1").text('?'.repeat(solutionNoun1.length));
$("#solution-noun-2").text('?'.repeat(solutionNoun2.length));

// Set flags to track whether the player has revealed either noun or won the game
var noun1Revealed = false;
var noun2Revealed = false;
var gameWon = false;

// Wait for the player to do something
receiveInput();

// A function to receive input from the player
function receiveInput() {

  // Receive the player guess from the text box if 'Guess' button is clicked, and clear the text box
  const guessButton= document.getElementById("guess-button");
  guessButton.addEventListener('click', function(){
    if (!gameWon) {
      var playerGuess = document.getElementById("textbox-guess").value;
      document.getElementById('textbox-guess').value = '';
      handleGuess(playerGuess);
    }
  });

  // If the enter key is pressed while in the text box, simulate a 'Guess' button click
  $("#textbox-guess").keyup(function(event){
  if(event.keyCode == 13){
      $("#guess-button").click();
    }
  });

  // Wait for the 'Hint' button to be clicked
  const hintButton= document.getElementById("hint-button");
  hintButton.addEventListener('click', function(){
    if (!gameWon) {
      deliverHint();
    }
  });

}

// A function to handle the player's guess
function handleGuess(guess) {
  // Convert guess word to all lowercase
  guess = guess.toLowerCase(); 
  
  // Add the guess to the list of previous guesses
  // TODO: add column for correct/incorrect tick/cross
  guessCount = $("#guesses-list li").length + 1;
  $("#guesses-list").prepend("<li>" + guessCount + ". &nbsp;" + guess + "</li>");

  // Check if the player's guess matches either of the solution nouns
  if (guess === solutionNoun1 || guess === solutionNoun2) {
    // If the guess is correct, reveal the solution noun and flag it as revealed
    if (guess === solutionNoun1) {
      $("#solution-noun-1").text(solutionNoun1);
      noun1Revealed = true;
    } else if (guess === solutionNoun2) {
      $("#solution-noun-2").text(solutionNoun2);
      noun2Revealed = true;
    }
   checkWin();
  }
}

// A function that checks if both nouns have been revealed & the player has won the game
function checkWin(){
if (noun1Revealed && noun2Revealed) {
  gameWon = true;
  $("#game-won").text("Yay, you guessed both nouns. You win a biscuit! (biscuit not provided)");
  }
}


// A function that reveals a random letter of an unrevealed noun
function deliverHint() {
  // Pick the noun and set the required variables for that noun
  var hintNoun = pickNoun();

  // TODO: tidy this, rename vars
  var obj = {solutionNoun1, solutionNoun2};
  var key = "solutionNoun" + hintNoun;
  var solutionNoun = obj[key];

  var spanID = "#solution-noun-" + hintNoun;
  var revealedNoun = $(spanID).text();

  // Pick a random character
  var charNo = Math.floor((Math.random() * solutionNoun.length)); 
 
  // Start again if we've picked an already revealed character 
  if (revealedNoun.charAt(charNo) !== "?") {
    deliverHint(); 

  // Otherwise update the revealed noun with the new character
  } else {   
    revealedNoun = revealedNoun.substring(0, charNo) + solutionNoun.charAt(charNo) + revealedNoun.substring(charNo + 1);
    $(spanID).text(revealedNoun);

    // Then check if we've fully revealed the noun, if so set the noun revealed flag
    if ($(spanID).text() === solutionNoun) {
      if (hintNoun === 1) {
        noun1Revealed = true;
      } else {
        noun2Revealed = true;
      }
      // And check if the game is now over ("won", even if cheaply :D) 
      checkWin();
     }
  }
}


// A function that picks an unrevealed noun
function pickNoun() {
  // Pick which noun to hint - random choice if both are unrevealed
  if (noun1Revealed === false && noun2Revealed === false) {
    return Math.random() > 0.5 ? 1 : 2;
  } else if (noun1Revealed === false) {
    return 1;
  } else {
    return 2;
  }
}

