function readText(){
      var lines = document.getElementById("originalText").value.split("\n");
      var container = document.getElementById("transliteration");
      container.innerHTML = "";
      var wordsInLines = [];
      var words = [];
      for (i in lines){
        words = lines[i].split(" ");
        console.log(words);
        wordsInLines.push(words);
      }
      return wordsInLines;
    }


    function generateWords(wordsInLines) {
      // body...
      this.wordsInLines = wordsInLines;
      this.lines = 0;
      this.words = 0;
    }

    generateWords.prototype.next = function() {
      // body...
      if(this.lines < this.wordsInLines.length){
        if(this.words < this.wordsInLines[this.lines].length){
          return this.wordsInLines[this.lines].slice(this.words, this.words+=5);
        }
        else{
          this.words = 0;
          this.lines++;
          return this.wordsInLines[this.lines].slice(this.words, this.words+=5);
        }
      }
    };

    function transliterateLine() {
      // body...
      var words = new generateWords(readText());
      transliterateWords(words);
    }

    function outputResult(words, result) {
        console.log(result);
        if (!result.error) {
          var container = document.getElementById("transliteration");
          if (result.transliterations && result.transliterations.length > 0 &&
            result.transliterations[0].transliteratedWords.length > 0) {
            for (var i = 0; i <= result.transliterations.length - 1; i++) {
              container.innerHTML += result.transliterations[i].transliteratedWords[0] + " ";
            };
            if(words.words >= words.wordsInLines[words.lines].length){
              container.innerHTML += "<br />";
            }
            
            transliterateWords(words);
          }
        }
      }

    function transliterateWords(words) {
      // body...
      var useWords = words.next();
      while(useWords[0] == ""){
        useWords = words.next();
        var container = document.getElementById("transliteration");
        container.innerHTML += "<br /><br />";

      }
      google.language.transliterate(useWords, "en", "hi",function (result) {
        // body...
        console.log(useWords);
        outputResult(words, result);
      });
    }


    google.load("language", "1");