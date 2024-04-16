// Elementy
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const resultDiv = document.getElementById("resultContainer");

// Otázky
let questions = [
    {
        question : "Co je to Phishing?",
        imgSrc : "img/Phis.png",
        choiceA : "A) Rybaření ve virtuální realitě",
        choiceB : "B) Typ útoku, jehož cílem je cílovou službu znefunkčnit a znepřístupnit",
        choiceC : "C) Podvodná technika používaná na Internetu k získávání citlivých údajů",
        choiceD : "D) Největší internetová komunita rybářů",
        correct : "C"
        
    },{
        question : "Jaký je rozdíl mezi šifrováním a kódováním?",
        imgSrc : "img/crypto.png",
        choiceA : "A) Není v tom žádný rozdíl",
        choiceB : "B) Kódování má za cíl informaci utajit, šifrování jen upravit",
        choiceC : "C) Šifrování je složitější, proto se mu říká jinak než kódování",
        choiceD : "D) Šifrování má za cíl informaci utajit, kódování jen upravit",
        correct : "D"
    },{
        question : "Co je etický hacking?",
        imgSrc : "img/eth.png",
        choiceA : "A) Napadení systému v podobě slušného požádání o přístup k datům oběti",
        choiceB : "B) Hacking s cílem získat data a finance pro dobročinné účely",
        choiceC : "C) Kompromitace systému za účelem otestování systémového zabezpečení",
        choiceD : "D) Hacking zaměřen na národnostní menšinu",
        correct : "C"
      },{
        
        question : "Který z následujících výroků je <b>ne</b>pravdivý?",
        imgSrc : "img/Secure.png",
        choiceA : "A) Autentizace je ověření pravosti identity",
        choiceB : "B) Většina serverů po celém světě běží na operačním systému Windows",
        choiceC : "C) Autorizace dává oprávnění pro určitou činnost",
        choiceD : "D) Elektronický podpis jsou data připojená ke zprávě, která příjemci zprávy umožňují ověřit zdroj této zprávy",
        correct : "B"
      },{
        question : "Který z následujících pojmů <b>ne</b>označuje kybernetický útok?",
        imgSrc : "img/Cyber.png",
        choiceA : "A) DDoS útok",
        choiceB : "B) Man-in-the-Middle",
        choiceC : "C) HTTPS",
        choiceD : "D) SQL Injection",
        correct : "C"
      },{
        question:  "Kdo zajišťuje kybernetickou ochranu na národní úrovni?",
        imgSrc : "img/justice.png",
        choiceA : "A) Národní úřad pro kybernetickou a informační bezpečnost (NÚKIB)",
        choiceB : "B) Ministerstvo obrany",
        choiceC : "C) Úřád pro uchování národní kybernetické bezpečnosti (ÚCHKB)",
        choiceD : "D) Computer Emergency Response Team (CERT)",
        correct : "A"
      }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 45; //
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

function renderQuestion(){
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}


function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        answerIsWrong();
        setTimeout(()=> {
            if(runningQuestion < lastQuestion){
                runningQuestion++;
                renderQuestion();
                count = 0;

            }else{
                
                scoreRender();
                clearInterval(TIMER);
                }
         }
         ,2900);
         
    }

}


function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        score++;
        answerIsCorrect();
    }else{
        answerIsWrong();
    }

    setTimeout(()=> {
        count = 0;
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
    
            scoreRender();
        }  
     }
     ,3000);
}

function answerIsCorrect(){
    resultDiv.style.display = "block";

    count = 0;
    document.getElementById(questions[runningQuestion].correct).style.backgroundColor = "#0f0";
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
    
    setTimeout(()=> {
        document.getElementById(questions[runningQuestion].correct).style.backgroundColor = "#fff";
        resultDiv.style.display = "none";   
     }
     ,2900);
}

function answerIsWrong(){
    resultDiv.style.display = "block";

    count = 0;
    //document.getElementById(questions[runningQuestion].answer).style.backgroundColor = "#f00";
    document.getElementById(questions[runningQuestion].correct).style.backgroundColor = "#0f0";
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
    
    setTimeout(()=> {
        document.getElementById(questions[runningQuestion].correct).style.backgroundColor = "#fff";
        resultDiv.style.display = "none";   
     }
     ,2900);

}
function clearResult(){

}

function scoreRender(){
    scoreDiv.style.display = "block";

    const scorePerCent = score;

    let img = (scorePerCent == 6) ? "img/5.png" :
              (scorePerCent == 5) ? "img/4.png" :
              (scorePerCent == 4) ? "img/4.png" :
              (scorePerCent == 3) ? "img/3.png" :
              (scorePerCent == 2) ? "img/2.png" :
              (scorePerCent == 1) ? "img/1.png" :
              (scorePerCent == 0) ? "img/1.png" :
              "img/1.png";

    scoreDiv.innerHTML = "<img src="+ img +">";
    if((scorePerCent == 2) || (scorePerCent == 3) || (scorePerCent == 4)){
        scoreDiv.innerHTML += "<p>"+ scorePerCent +" Body</p>"; 

    }
    else{
        if(scorePerCent == 1){
            scoreDiv.innerHTML += "<p>"+ scorePerCent +" Bod</p>"; 
        }
        else{
            scoreDiv.innerHTML += "<p>"+ scorePerCent +" Bodů</p>"; 
        }
    }
}
