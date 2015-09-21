module.exports = {

  // Constructs and returns a "poke" message based on the pokemon name
  getPokeMessage: function(name, msg) {

    var punc = ['.', '!', '?!', '...', '?'];
    var pokeMsg = '';
    var inWord = false;
    var newSentence = true;

    for (var i = 0; i < msg.length; i++) {

      // is not a letter
      if(!/^[a-zA-Z0-9]/.test(msg[i])) {

        if (inWord) {

          if (newSentence) {
            pokeMsg += ' ' + this.capitalize(name);
            newSentence = false;
          } else {
            pokeMsg += name.toLowerCase();
          }

          // If is punctuation
          if(punc.indexOf(msg[i]) != -1) {
            newSentence = true;
          }

          inWord = false;
        }
        // Add non-letter character to the string
        pokeMsg += msg[i];
      } else {
        inWord = true;
      }

    }

    return pokeMsg;

  },

  capitalize: function(string)  {

    return string.charAt(0).toUpperCase() + string.slice(1);

  }

};
