const minNumber = document.querySelector('.min-num'),
      maxNumber = document.querySelector('.max-num'),
      guessInput = document.querySelector('.guess-input'),
      guessBtn = document.querySelector('.guess-btn'),
      message = document.querySelector('#message');

let min = 1,
    max = 10,
    correctNum = Math.floor(Math.random()*10)+1;
    guessCount = 3;

minNumber.textContent = min;
maxNumber.textContent = max;
console.log(correctNum);
guessBtn.addEventListener('click', results);

function results(){
    let inputValue = parseInt(guessInput.value),
        extra = inputValue;
    if(isNaN(inputValue) || inputValue < min || inputValue > max){
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
        guessInput.value = '';    
    }
    else{
        guessInput.value = '';
        guessCount -= 1;
        
        setMessage(`${inputValue} is not correct, You are left with ${guessCount} guesses`,'red')
        
        if(guessCount === 0){
            gameOver(false,`You lost! The correct number is ${correctNum}`,extra)
        }

        if(inputValue === correctNum){
            gameOver(true,`Correct, WOW! You Did It`,extra)
        }
    
     }
    }
    


function gameOver(won,msg,num){
    let col;
    won === true ? col = 'green' : col = 'red';
    guessInput.disabled = true;
    guessInput.value = num;
    setMessage(msg,col)
    guessBtn.removeEventListener('click',results);
    guessBtn.value = 'Play Again';
    guessBtn.addEventListener('click',function(){
        location.reload();
    })
}

function setMessage(msg,col){
    message.textContent = msg;
    message.style.color = col;
    guessInput.style.color = col;
    guessInput.style.borderColor = col;    
}