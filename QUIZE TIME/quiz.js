document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.question-container');
    let currentPage = 0;
    const totalPages = pages.length;
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const submitButton = document.getElementById('submitButton');
    const scorePopup = document.getElementById('scorePopup');
    const overlay = document.getElementById('overlay');

    // Initialize first page
    pages[currentPage].classList.add('active');

    // Pagination controls
    prevButton.addEventListener('click', function() {
        if (currentPage > 0) {
            pages[currentPage].classList.remove('active');
            currentPage--;
            pages[currentPage].classList.add('active');
        }
    });

    nextButton.addEventListener('click', function() {
        if (currentPage < totalPages - 1) {
            pages[currentPage].classList.remove('active');
            currentPage++;
            pages[currentPage].classList.add('active');
        }
    });

    // Submit quiz
    submitButton.addEventListener('click', function() {
        const score = calculateScore();
        showScore(score);
    });

    // Calculate score
    function calculateScore() {
        let score = 0;

        // Correct answers for each question
        const correctAnswers = {
            question1: "4",
            question2: ["Red", "Blue", "Green"],
            question3: "Paris",
            question4: "Apple",
            question5: "", // Textarea questions can have custom logic
            question6: "25",
            question7: ["Cat", "Dog", "Bird"],
            question8: "Tokyo",
            question9: "Soccer",
            question10: "", // Textarea questions can have custom logic
            question11: "5",
            question12: ["JavaScript", "Python", "Java"],
            question13: "Rome",
            question14: "Spring",
            question15: "", // Textarea questions can have custom logic
            question16: "4",
            question17: ["Car", "Bike", "Train"],
            question18: "Ottawa",
            question19: "Italian",
            question20: "", // Textarea questions can have custom logic
        };

        // Collect answers
        for (let [question, answer] of Object.entries(correctAnswers)) {
            const userAnswer = document.querySelectorAll(`[name="${question}"]`);

            if (userAnswer[0].type === "text" || userAnswer[0].type === "textarea") {
                if (userAnswer[0].value.trim().toLowerCase() === answer.toString().toLowerCase()) {
                    score++;
                }
            } else if (userAnswer[0].type === "radio") {
                for (const input of userAnswer) {
                    if (input.checked && input.value === answer) {
                        score++;
                    }
                }
            } else if (userAnswer[0].type === "checkbox") {
                let checkedAnswers = [];
                for (const input of userAnswer) {
                    if (input.checked) {
                        checkedAnswers.push(input.value);
                    }
                }
                if (arraysEqual(checkedAnswers, answer)) {
                    score++;
                }
            } else if (userAnswer[0].tagName === "SELECT") {
                if (userAnswer[0].value === answer) {
                    score++;
                }
            }
        }
        return score;
    }

    // Utility function to compare arrays
    function arraysEqual(a, b) {
        if (a.length !== b.length) return false;
        a.sort();
        b.sort();
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }

    // Display score
    function showScore(score) {
        overlay.style.display = 'block';
        scorePopup.style.display = 'block';
        scorePopup.innerHTML = `<p>Your score is: ${score} out of 20</p>`;
    }

    // Countdown timer (optional)
    let countdownTime = 60 * 5; // 5 minutes in seconds
    let timerElement = document.createElement('div');
    timerElement.id = "timer";
    document.body.prepend(timerElement);
    const timer = setInterval(function() {
        let minutes = Math.floor(countdownTime / 60);
        let seconds = countdownTime % 60;
        timerElement.innerHTML = `Time remaining: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        countdownTime--;
        if (countdownTime < 0) {
            clearInterval(timer);
            const score = calculateScore();
            showScore(score);
        }
    }, 1000);
});
