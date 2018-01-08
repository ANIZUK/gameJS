var riddle = {};

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

function playGame() {

    var field1 = randomNumber(10, 100);
    var field2 = randomNumber(10, 100);
    var result = field1 + field2;

    var resultsArray = generateRandomOptions(result);
    resultsArray.push(result);
    resultsArray.sort(function(a, b) { return 0.5 - Math.random() });

    riddle = {
        field1: field1,
        field2: field2,
        resultsArray: resultsArray,
        answer: result
    };

    document.getElementById('field1').innerHTML = riddle.field1;
    document.getElementById('field2').innerHTML = riddle.field2;
    document.getElementById('option1').innerHTML = riddle.resultsArray[0];
    document.getElementById('option2').innerHTML = riddle.resultsArray[1];
    document.getElementById('option3').innerHTML = riddle.resultsArray[2];
    document.getElementById('option4').innerHTML = riddle.resultsArray[3];

}

function generateRandomOptions(sum) {
    var resultsArray = [];
    var randomNumberArray = [];

    while(randomNumberArray.length < 3) {
        var random = randomNumber(1, 10);

        if (randomNumberArray.indexOf(random) > -1)
            continue;
        randomNumberArray.push(random);
    }

    // console.log(randomNumberArray, addSubtract);

    for (var i = 0; i < 3; i++) { //3, bo potrzebujemy 3 przypadkowych liczb i jednej poprawnej odpowiedzi
        var addSubtract = randomNumber(0,1);
        var result = sum;

        if (addSubtract === 1) {
            //dodaj random number do rezultatu
            result += randomNumberArray[i];
        } else {
            //odejmij
            result -= randomNumberArray[i];
        }
        resultsArray.push(result);
    }
   
    return resultsArray;
}

function checkAnswer(selectedElement) {
    console.log(riddle);
    console.log(selectedElement.innerHTML);

    var after = document.getElementById('after');

    if (selectedElement.innerHTML == riddle.answer) {
        //poprawna odpowiedź
        after.classList.remove('hide');
        after.classList.add('correct');
        after.classList.add('animated');
        after.classList.add('zoomIn');
        after.innerHTML = "Good answer! Click the button to continue!"
    } else {
        //wrong
        after.classList.remove('hide');
        after.classList.add('wrong');
        after.classList.add('animated');
        after.classList.add('zoomIn');
        after.innerHTML = "Wrong answer! Click the button to continue!";

    }
}

function playAgain() {
    var after = document.getElementById('after');
    after.classList.remove('wrong');
    after.classList.remove('correct');
    after.classList.add('hide');
    playGame();

}

