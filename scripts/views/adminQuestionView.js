import { question } from '../models/escape_room_model';

function newQuestion() {
    const questionText=document.getElementById("questionText");
    const answer1=document.getElementById("answer1");
    const answer2=document.getElementById("answer2");
    const answer3=document.getElementById("answer3");
    const answer4=document.getElementById("answer4");
    const correctAnswer=document.getElementById("correctAnswer");

    if (questionText!="" || questionText!=null || answer1!=""||answer1!=null) {

        const newQuestions = new question(questionText,answer1,answer2,answer3,answer4,correctAnswer);

        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.push(newQuestions);
        localStorage.setItem('questions', JSON.stringify(questions));
        console.log("yey nova pergunta");
    }

}