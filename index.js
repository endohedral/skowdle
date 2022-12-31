// Define the two solution nouns
var solutionNoun1 = "appetite";
var solutionNoun2 = "ghost";

// Set flags to track whether the player has revealed either noun or won the game
var noun1Revealed = false;
var noun2Revealed = false;
var gameWon = false;

// Add a function to handle the player's guess
function handleGuess(guess) {
  // Convert guess word to all lowercase
  guess = guess.toLowerCase(); 
  
  // Add the guess to the list of previous guesses
  // TODO: reverse order!
  $("#guesses-list").append("<li>" + guess + "</li>");

  // Update the number of guesses
  $("#guesses-count").text("Number of guesses: " + $("#guesses-list li").length);

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
      alert("Yay, you guessed both nouns :)");
    }
  }
}

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
setTimeout(promptGuess, 3000);
