// Générer un nombre aléatoire entre 1 et 100.
let randomNumber = Math.floor(Math.random() * 100) + 1;
let guesses = document.querySelector('.guesses');
let lastResult = document.querySelector('.lastResult');
let lowOrHi = document.querySelector('.lowOrHi');
// Fournir au joueur le moyen de saisir un nombre.
let guessSubmit = document.querySelector('.guessSubmit');
let guessField = document.querySelector('.guessField');
let guessCount = 1;
let resetButton;
guessSubmit.addEventListener('click', checkGuess)
function checkGuess() {
    // Stocker le nombre de tours déjà joués. Commencer par 1.
    let userGuess = Number(guessField.value);
    if (guessCount === 1) {
        guesses.textContent = 'Propositions précédentes : ';
    }
    guesses.textContent += userGuess + ' ';
    // Vérifier si le nombre saisi par le joueur est correct.
    // S'il est correct :
    if (userGuess === randomNumber) {
        // Afficher un message de félicitations.
        lastResult.textContent = 'Bravo, vous avez trouvé le nombre !';
        lastResult.style.backgroundColor = 'green';
        lowOrHi.textContent = '';
        // Empêcher que le joueur saisisse de nouveau un nombre.
        setGameOver();
        // S'il est faux et que le joueur n'a plus de tours à jouer :
        // Informer le joueur qu'il a perdu et que la partie est finie.
    } else if (guessCount === 10) {
        lastResult.textContent = '!!! PERDU !!!';
        setGameOver();
        // S'il est faux et que le joueur a encore des tours à jouer :
    } else {
        // Informer le joueur que sa proposition de nombre est fausse.

        lastResult.textContent = 'Faux !';
        lastResult.style.backgroundColor = 'red';
        if (userGuess < randomNumber) {
            lowOrHi.textContent = 'Le nombre saisi est trop petit !';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'Le nombre saisi est trop grand !';
        }
    }
    // Incrémenter le nombre de tours de 1.
    guessCount++;
    // Stocker l'ensemble des propositions de nombres pour que le joueur puisse les consulter
    guessField.value = '';

    // Lui permettre d'entrer une nouvelle proposition de nombre.
    guessField.focus();
}
function setGameOver() {
    // Empêcher que le joueur saisisse de nouveau un nombre.
    guessField.disabled = true;
    guessSubmit.disabled = true;

    // Afficher un contrôle pour que le joueur puisse rejouer.
    resetButton = document.createElement('button');
    resetButton.textContent = 'Start new game';
    document.body.appendChild(resetButton);

    // Afficher un contrôle pour que le joueur puisse rejouer.
    resetButton.addEventListener('click', resetGame);
}
// Une fois le jeu redémarré, s'assurer que la logique du jeu et l'interface utilisateur sont complètement réinitialisées, puis revenir à l'étape 1.
function resetGame() {
    guessCount = 1;
    let resetParas = document.querySelectorAll('.resultParas p');
    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }
    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    lastResult.style.backgroundColor = 'white';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}