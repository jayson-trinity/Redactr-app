document.getElementById('redactButton').addEventListener('click', function() {
    let startTime = new Date().getTime(); // Start timing

    let originalText = document.getElementById('originalText').value;
    let wordsToScramble = document.getElementById('wordsToScramble').value.split(' ');
    let redactionCharacter = document.getElementById('redactionCharacter').value;
    let customRedactionCharacter = document.getElementById('customRedactionCharacter').value;

    // Handle the custom redaction character option
    if (redactionCharacter === 'CUSTOM') {
        redactionCharacter = customRedactionCharacter;
    }

    let redactedText = originalText;
    let wordCount = 0;
    let matchedWordCount = 0;
    let charactersScrambled = 0;

    for (let i = 0; i < wordsToScramble.length; i++) {
        let wordToMatch = wordsToScramble[i];
        let regex = new RegExp(wordToMatch, 'g');

        redactedText = redactedText.replace(regex, function(match) {
            matchedWordCount++;
            charactersScrambled += match.length;
            return redactionCharacter.repeat(match.length);
        });
    }

    let wordsInOriginalText = originalText.split(/\s+/);
    wordCount = wordsInOriginalText.length;
    let endTime = new Date().getTime(); // Stop timing
    let timeElapsed = (endTime - startTime) / 1000;

    document.getElementById('output').textContent = redactedText;

    var stats = `
        <i class="icon fas fa-list-ul"></i> Words Scanned: ${wordCount}<br>
        <i class="icon fas fa-check-circle"></i> Matched Words: ${matchedWordCount}<br>
        <i class="icon fas fa-random"></i> Characters Scrambled: ${charactersScrambled}<br>
        <i class="icon fas fa-clock"></i> Time Taken: ${timeElapsed} seconds
    `;
    document.getElementById('stats').innerHTML = stats;

   
    let copyButton = document.getElementById('copyButton');
    copyButton.style.display = 'block';
    copyButton.addEventListener('click', function() {
        let copyText = document.getElementById('output').textContent;
        let textArea = document.createElement('textarea');
        textArea.value = copyText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Redacted text copied to clipboard!');
    });
    copyButton = document.getElementById('copyButton');
    copyButton.style.display = redactedText !== originalText ? 'block' : 'none';
});
