`use strict`;

var score = 0;

const questionsArr = [
    {
        question: 'How many eggs does a turtle lay?',
        points: 15,
        option: [
            70, 100, 120, 150
        ],
        answer: 1
    },
    {
        question: 'What year was Abraham Lincoln elected as president?',
        points: 10,
        option: [
            1860, 1940, 1955, 1960
        ],
        answer: 0
    },
];


function clearRadioGroupSelection() {
    $('.card-questions input').prop('checked', false);
}

function isOptionSelected(){
    return $('.card-questions input').is(':checked');
}

function setQuestion(){
    let dataQuestionIndex = Number.parseInt($('#question[data-question-index]').attr('data-question-index')) + 1 || 0;
    
    if (dataQuestionIndex == questionsArr.length){ // Answered final question
        // Tabulate total score
        alert('Total score: ' + score);
    }
    
    let points = questionsArr[dataQuestionIndex]['points'] || 0;
    let optionArr = questionsArr[dataQuestionIndex]['option'];
    let question = questionsArr[dataQuestionIndex]['question'];

    if (dataQuestionIndex == questionsArr.length){
        alert("reached the end of arr index");
    }

    $('#question').text(`${question}`);
    $('#points').text(`${points} points`);
    $('.card-questions input').each(function(i, elem){
        elem.nextElementSibling.innerText = `${optionArr[i]}`;
    })

    $('#question[data-question-index]').attr('data-question-index', dataQuestionIndex);
    
    clearRadioGroupSelection();
}

setQuestion();

$('.card-questions input').on('mousedown', function(){
    let isAnyOptionSelected = $('.card-questions input').is(':checked');
    if (isAnyOptionSelected){
        $('.card-questions input:checked').prop('checked', false);
    }
});



$('#submit').on('click', function(){
    
    if (isOptionSelected()){
        // Get selected option's value
        let selectedOptionsVal = $('.card-questions input:checked').val();
        let dataQuestionIndex = $('#question[data-question-index]').attr('data-question-index') || 0;
        let questionAnswer = questionsArr[dataQuestionIndex]['answer'];

        // Check if correct option
        if (selectedOptionsVal == questionAnswer) {
            score += questionsArr[dataQuestionIndex]['points'];
        }

        setQuestion();


    } else {
        alert('Please choose an option');
    }
});