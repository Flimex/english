let name1 = prompt("Введіть ваше ім'я:");
document.getElementById("name").textContent = name1;
document.getElementById("restart").hide = true;
$('#stats').prop('disabled', true);
if(!name1){
    document.getElementById("name").textContent = "Здобувач";
}
const resetButton = document.getElementById("restart");
resetButton.addEventListener("click", reset);
resetButton.disabled = true;
const words = [
    { word: 'study', translation: 'навчатись' },
    { word: 'application', translation: 'застосунок' },
    { word: 'keyboard', translation: 'клавіатура' },
    { word: 'monitor', translation: 'монітор' },
    { word: 'winter', translation: 'зима' },
    { word: 'CEO', translation: 'начальник' },
    { word: 'programming', translation: 'програмування' },
    { word: 'pencil', translation: 'олівець' },
];
let currentIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let isAnswered = false;
let isClicked = false;

function updateFlashcard() {
    $('#word').text(words[currentIndex].word);
    $('#answer').val('');
    isAnswered = false;
}
function reset(){
    location.reload();
}
function updateStats() {
    $('#correct').text(`Вірно ${correctCount}`);
    $('#incorrect').text(`Невірно ${incorrectCount}`);
}

function checkIfFinished() {
    if (correctCount + incorrectCount === words.length) {
        $('#answer').prop('disabled', true); 
        $('#prev').prop('disabled', true);
        $('#next').prop('disabled', true);
        $('#stats').prop('disabled', false);
        $('#stats').on('click', function() {
            var textElement = document.getElementById("text1");
            if (correctCount === words.length) {
                textElement.textContent = `Ваш результат ${correctCount}, ви молодець!!! Отримайте свою нагороду!`;
                document.getElementById("reward").style.visibility = "visible";
            } else {
                textElement.textContent = `Ваш результат ${correctCount}, попрактикуйтесь ще...`;
                document.getElementById("restart").style.visibility = "visible";
                resetButton.disabled = false;
            }
        });
    }
}
$('#answer').on('change', function() {
    if (isAnswered) return;
    
    const userAnswer = $(this).val().trim().toLowerCase();
    const correctAnswer = words[currentIndex].translation.toLowerCase();

    if (userAnswer === correctAnswer) {
        correctCount++;
    } else {
        incorrectCount++;
    }

    updateStats();
    isAnswered = true;
    checkIfFinished();
});

$('#next').on('click', function() {
    if (isAnswered) {
        currentIndex = (currentIndex + 1) % words.length;
        updateFlashcard();
        $('#counter').text(`${currentIndex + 1}/8`);
    }
});

$('#prev').on('click', function() {
    if (isAnswered) {
        currentIndex = (currentIndex - 1 + words.length) % words.length;
        updateFlashcard();
        $('#counter').text(`${currentIndex + 1}/8`);
    }
});
updateFlashcard();
updateStats();
