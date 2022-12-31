// Define the two solution nouns
var solutionNoun1 = "appetite";
var solutionNoun2 = "ghost";

// Set a flag to track whether the player has won the game
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
    // If the guess is correct, reveal the solution noun and check if the game has been won
    if (guess === solutionNoun1) {
      $("#solution-noun-1").text(solutionNoun1);
    } else if (guess === solutionNoun2) {
      $("#solution-noun-2").text(solutionNoun2);
    }

    // Check if both nouns have been revealed
    var noun1Revealed = $("#solution-noun-1").text() !== "???";
    var noun2Revealed = $("#solution-noun-2").text() !== "???";
    if (noun1Revealed && noun2Revealed) {
      // If both nouns have been revealed, the player has won the game
      gameWon = true;
      alert("Yay, you guessed one of the nouns :)");
    }
  } else {
    // If the guess is incorrect, display a message
    alert("Nope, that's not one of the nouns :( Guess again...");
  }
}

// Set up a function to prompt the player for a guess
function promptGuess() {
  // If the game has not been won, prompt the player for a guess
  if (!gameWon) {
    var playerGuess = prompt("Enter a noun:");
    handleGuess(playerGuess);
    // Schedule the next guess prompt
    setTimeout(promptGuess, 500);
  }
}

// Schedule the first guess prompt
setTimeout(promptGuess, 3000);
