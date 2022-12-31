// Define the two solution nouns and display the number of characters
var solutionNoun1 = "appetite";
var solutionNoun2 = "ghost";
$("#solution-noun-1").text('?'.repeat(solutionNoun1.length));
$("#solution-noun-2").text('?'.repeat(solutionNoun2.length));

// Set flags to track whether the player has revealed either noun or won the game
var noun1Revealed = false;
var noun2Revealed = false;
var gameWon = false;

// Add a function to handle the player's guess
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

    // Check if both nouns have been revealed
    if (noun1Revealed && noun2Revealed) {
      // If both nouns have been revealed, the player has won the game
      gameWon = true;
      $("#game-won").text("Yay, you guessed both nouns, go you");
    }
  }
}


// Set up a function to receive a guess from the text box
function receiveGuess() {
  if (!gameWon) {

    // Handle the player guess from the text box if 'Guess' button is clicked, and clear the text box
    const button= document.getElementById("button");
    button.addEventListener('click', function(){
      var playerGuess = document.getElementById("textbox-guess").value;
      document.getElementById('textbox-guess').value = '';
      handleGuess(playerGuess);
    });

    // If the enter key is pressed while in the text box, simulate a button click
    $("#textbox-guess").keyup(function(event){
    if(event.keyCode == 13){
        $("#button").click();
    }
});
  }
}


receiveGuess();





// no longer used, can be removed, good riddance to annoying dialog boxes
// Set up a function to prompt the player for a guess
function promptGuess() {
  // If the game has not been won, prompt the player for a guess
  if (!gameWon) {
    var playerGuess = prompt("Enter one noun:");
    handleGuess(playerGuess);
    // Schedule the next guess prompt
    setTimeout(promptGuess, 750);
  }
}

// Schedule the first guess prompt
//setTimeout(promptGuess, 3000);
