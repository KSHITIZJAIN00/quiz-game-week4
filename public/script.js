let curr = 0;
let score= 0;
let questions = [];

const sb = document.querySelector(".star");
const screen = document.querySelector(".welcome");
const quizsc = document.querySelector(".quiz");
const quesele =  document.querySelector(".question");
const ans = document.querySelector(".answers");
const nextele = document.querySelector(".nextb");    


sb.addEventListener("click",startq);

async function questioncoming(){
    const response = await fetch("/question");
    let allq = await response.json();
    questions = allq.sort(() => Math.random() - 0.5).slice(0, 10);
}

async function startq(){
    await questioncoming();
    screen.style.display = "none";
    quizsc.style.display = "block";
    curr = 0;
    score = 0;
    nextele.innerHTML="Next";
    nextele.style.display="none";
    display();
}
function resetc(){
    ans.innerHTML="";
}

function display(){
    resetc();
    const question = questions[curr];
    quesele.textContent=question.question;

    question.options.forEach(option =>{
        const button = document.createElement("button");
        button.textContent=option;
        button.classList.add("ans-btn");
        ans.appendChild(button);

        if(option==question.answer){
            button.dataset.correct=true;
        }
        button.addEventListener("click",cheak);
    })
}

function cheak(event){
    const select = event.target;
    const correct = select.dataset.correct === "true";
    if(correct){
        score++;
        select.classList.add("correct-ans");
    }
    else{
        select.classList.add("wrong-ans");
    }

    Array.from(ans.children).forEach(button=>{
        button.disabled = true ;
        if(button.dataset.correct === "true"){
            button.classList.add("correct-ans");
        }
    })
    nextele.style.display="block";
}

function nextq(){
    curr++;
    if(curr < questions.length){
        display();  
        nextele.style.display="none";
    }
    else{
        result();
    }
}

function result() {
    re();
    quesele.innerHTML = `QUIZ DONE <br> YOUR SCORE : <span class="score">${score}/${questions.length}</span>`;
    nextele.innerHTML = "RESET QUIZ";
    nextele.style.display = "block";
    nextele.style.marginTop="30px"
}

nextele.addEventListener("click",()=>{
    if(curr<questions.length){
        nextq();
    }
    else{
        startq();
    }
});

function re(){
    quesele.textContent="";
    ans.innerHTML="";
}