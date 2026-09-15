/* =========================================================
   PAGE CONTROL
========================================================= */

function showPage(id) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const page = document.getElementById(id);

    if (page) {

        page.classList.add("active");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
}


/* =========================================================
   SPARKLES
========================================================= */

function createSparkles() {

    const container =
        document.getElementById("sparkles");

    if (!container) return;

    for (let i = 0; i < 35; i++) {

        const sparkle =
            document.createElement("div");

        sparkle.className = "sparkle";
        sparkle.innerHTML = "✦";

        sparkle.style.left =
            Math.random() * 100 + "%";

        sparkle.style.top =
            Math.random() * 100 + "%";

        sparkle.style.fontSize =
            (Math.random() * 10 + 5) + "px";

        sparkle.style.animationDelay =
            (Math.random() * 4) + "s";

        container.appendChild(sparkle);
    }
}

createSparkles();


/* =========================================================
   PAGE 1
========================================================= */

function checkSuno() {

    const input =
        document
            .getElementById("sunoInput")
            .value
            .trim()
            .toLowerCase();

    const error =
        document.getElementById("sunoError");

    if (
        input === "sunaao ji" ||
        input === "sunao ji"
    ) {

        error.textContent = "";

        showPage("salamPage");

    } else {

        error.textContent =
            "Hmm... ye nahi 😌";
    }
}


const sunoInput =
    document.getElementById("sunoInput");

if (sunoInput) {

    sunoInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {
                checkSuno();
            }

        }
    );
}


/* =========================================================
   SESSION 1
========================================================= */

const session1Questions = [

    {
        text: "Do you keep old messages?",
        type: "normal"
    },

    {
        text: "Do you love surprises?",
        type: "normal"
    },

    {
        text: "Do you believe in luck?",
        type: "normal"
    },

    {
        text: "Have you ever talked to a moon?",
        type: "normal"
    },

    {
        text: "Do you believe dreams mean something?",
        type: "normal"
    },

    {
        text: "Do you like to travel?",
        type: "normal"
    }

];


/* =========================================================
   SESSION 2
========================================================= */

const session2Questions = [

    /* 1 */
    {
        text: "Should I keep disturbing you?",
        type: "forcedYes",

        noImages: [
            "HMPH SAB SAI BEST.jpeg",
            "2nd hmph.jpeg",
            "3d hmph.jpeg"
        ]
    },


    /* 2 */
    {
        text: "Do I talk too much?",
        type: "forcedNo"
    },


    /* 3 */
    {
        text:
            "If the answer were completely up to you, would you choose me?",
        type: "normal"
    },


    /* 4 */
    {
        text:
            "Did you ever think if you said yes, where would it go?",
        type: "textAnswer"
    },


    /* 5 */
    {
        text:
            "Have you ever re-read one of my messages?",
        type: "normal",

        yesImage:
            "arree aap bhi na.jpeg"
    },


    /* 6 */
    {
        text:
            "Do you think we are a little too comfortable with each other?",
        type: "normal"
    },


    /* 7 */
    {
        text:
            "Have you ever looked at my picture and smiled?",
        type: "normal"
    },


    /* 8 */
    {
        text:
            "Have you ever decided to say something but decided not to?",
        type: "normal"
    },


    /* 9 */
    {
        text:
            "Have you ever caught yourself thinking about me?",
        type: "normal"
    },


    /* 10 */
    {
        text:
            "Have you ever wanted to compliment me but stopped yourself?",
        type: "normal"
    },


    /* 11 */
    {
        text:
            "Have you ever thought I was more special to you than you wanted to admit?",

        type: "normal",

        yesImage:
            "yeshhh.png"
    },


    /* 12 */
    {
        text:
            "Do you agree to tolerate my HMPH for the rest of your life?",

        type: "forcedYes",

        noImages: [
            "HMPH SAB SAI BEST.jpeg",
            "2nd hmph.jpeg",
            "3d hmph.jpeg"
        ]
    },


    /* 13 */
    {
        text:
            "Will you run away with me?",

        type: "forcedYes",

        noImages: [
            "HMPH SAB SAI BEST.jpeg",
            "2nd hmph.jpeg",
            "3d hmph.jpeg"
        ],

        yesImage:
            "good boy.jpeg"
    },


    /* 14 */
    {
        text:
            "Do you accept I might become your favorite person one day?",

        type: "forcedYes"
    },


    /* 15 */
    {
        text:
            "Do you want me to learn flirting for you?",

        type: "normal"
    },


    /* 16 */
    {
        text:
            "Do you think I might have a special space in your heart?",

        type: "forcedYes"
    },


    /* =====================================================
       MARRIAGE
    ===================================================== */

    {
        text:
            "Will you marry me?",

        type:
            "marriage",

        noImages: [
            "HMPH SAB SAI BEST.jpeg",
            "2nd hmph.jpeg",
            "3d hmph.jpeg"
        ],

        yesImage:
            "pout.jpeg"
    },


    /* 17 */
    {
        text:
            "Will you let me know about you more in the future?",

        type:
            "forcedYes"
    },


    /* 18 */
    {
        text:
            "Do you think I sometimes get angry on fazool reasons?",

        type:
            "forcedNo"
    },


    /* 19 */
    {
        text:
            "Did you ever notice while playing with me and another girl that my mood went off because of your attention to the other girl?",

        type:
            "normal",

        staticImage:
            "Lobby.jpeg"
    },


    /* 20 */
    {
        text:
            "Did you notice my silence?",

        type:
            "normal",

        staticImage:
            "Lobby.jpeg"
    },


    /* 21 */
    {
        text:
            "What do you think you have changed from the first time we met?",

        type:
            "textAnswer"
    },


    /* 22 */
    {
        text:
            "Am I changed?",

        type:
            "changedQuestion"
    },


    /* 23 */
    {
        text:
            "Why did you share my private spot with everyone? I was the first one who used to talk and wait for you in the lobby.",

        type:
            "textAnswer",

        staticImage:
            "Lobby.jpeg"
    },


    /* FINAL */
    {
        text:
            "Did you answer all the questions?",

        type:
            "final"
    }

];


/* =========================================================
   VARIABLES
========================================================= */

let currentSession = 1;
let currentQuestionIndex = 0;

let forcedYesAttempts = 0;
let marriageNoAttempts = 0;

let collectedSignature = null;
let thumbCollected = false;

let popupTimer = null;

let extraTermCount = 0;

/* =========================================================
   BACKEND SAVING
========================================================= */

function saveAnswer(answer) {

    const questions =
        currentSession === 1
            ? session1Questions
            : session2Questions;

    const question =
        questions[currentQuestionIndex];

    if (!question) return;

    fetch("/api/answer", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            session_number: currentSession,
            question_number: currentQuestionIndex + 1,
            question: question.text,
            answer: String(answer)
        })
    }).catch(function(error) {

        console.warn(
            "Could not save answer:",
            error
        );

    });
}


function saveExtraTerm(term) {

    fetch("/api/term", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            term: term
        })
    }).catch(function(error) {

        console.warn(
            "Could not save term:",
            error
        );

    });
}


/* =========================================================
   START SESSION 1
========================================================= */

function startSession1() {

    currentSession = 1;

    currentQuestionIndex = 0;

    forcedYesAttempts = 0;
    marriageNoAttempts = 0;

    showPage("questionPage");

    loadQuestion();
}


/* =========================================================
   SESSION 1 → SESSION 2 INTRO
========================================================= */

function startSession2() {

    currentSession = 2;

    currentQuestionIndex = 0;

    forcedYesAttempts = 0;
    marriageNoAttempts = 0;

    showPage("session2IntroPage");
}


/* =========================================================
   ACTUALLY BEGIN SESSION 2 QUESTIONS
========================================================= */

function beginSession2Questions() {

    currentSession = 2;

    currentQuestionIndex = 0;

    forcedYesAttempts = 0;
    marriageNoAttempts = 0;

    showPage("questionPage");

    loadQuestion();
}


/* =========================================================
   LOAD QUESTION
========================================================= */

function loadQuestion() {

    const questions =
        currentSession === 1
            ? session1Questions
            : session2Questions;

    const question =
        questions[currentQuestionIndex];

    if (!question) {

        finishQuestions();

        return;
    }


    /* Session label */

    document
        .getElementById("sessionLabel")
        .textContent =
            currentSession === 1
                ? "SESSION 01 — I WANT TO KNOW MORE ABOUT YOU"
                : "SESSION 02 — I WANT TO TALK ABOUT US";


    /* Number */

    document
        .getElementById("questionNumber")
        .textContent =
            `QUESTION ${currentQuestionIndex + 1}`;


    /* Question */

    document
        .getElementById("questionText")
        .textContent =
            question.text;


    /* Reset everything */

    clearQuestionImage();

    resetQuestionButtons();


    /* Static image */

    if (question.staticImage) {

        showStaticQuestionImage(
            question.staticImage
        );
    }


    /* Text question */

    if (question.type === "textAnswer") {

        createTextAnswer();
    }


    /* Forced YES */

    if (question.type === "forcedYes") {

        forcedYesAttempts = 0;

        document
            .getElementById("noBtn")
            .style.display =
                "inline-block";
    }


    /* Forced NO */

    if (question.type === "forcedNo") {

        document
            .getElementById("yesBtn")
            .style.display =
                "inline-block";

        document
            .getElementById("noBtn")
            .style.display =
                "inline-block";
    }


    /* Marriage */

    if (question.type === "marriage") {

        marriageNoAttempts = 0;

        document
            .getElementById("noBtn")
            .style.display =
                "inline-block";

        document
            .getElementById("yesBtn")
            .textContent =
                "YES 💍";
    }
}


/* =========================================================
   CLEAR QUESTION IMAGE
========================================================= */

function clearQuestionImage() {

    const container =
        document.getElementById(
            "questionImageContainer"
        );

    if (container) {

        container.innerHTML = "";
    }
}


/* =========================================================
   STATIC QUESTION IMAGE
========================================================= */

function showStaticQuestionImage(filename) {

    const container =
        document.getElementById(
            "questionImageContainer"
        );

    if (!container) return;

    const img =
        document.createElement("img");

    img.className =
        "question-static-image";

    img.src =
        "assets/" + filename;

    img.alt =
        "Question image";

    img.onerror = function() {

        console.warn(
            "Image not found:",
            "assets/" + filename
        );
    };

    container.appendChild(img);
}


/* =========================================================
   REACTION POPUP
========================================================= */

function showReaction(
    filename,
    duration = 1800
) {

    if (!filename) return;

    const overlay =
        document.getElementById(
            "reactionOverlay"
        );

    const image =
        document.getElementById(
            "reactionImage"
        );

    if (!overlay || !image) return;

    image.src =
        "assets/" + filename;

    overlay.classList.remove("hidden");

    clearTimeout(popupTimer);

    popupTimer =
        setTimeout(
            hideReaction,
            duration
        );
}


function hideReaction() {

    const overlay =
        document.getElementById(
            "reactionOverlay"
        );

    if (!overlay) return;

    overlay.classList.add("hidden");

    const image =
        document.getElementById(
            "reactionImage"
        );

    if (image) {

        image.src = "";
    }
}


/* =========================================================
   RESET BUTTONS
========================================================= */

function resetQuestionButtons() {

    const yesBtn =
        document.getElementById("yesBtn");

    const noBtn =
        document.getElementById("noBtn");

    yesBtn.style.display =
        "inline-block";

    noBtn.style.display =
        "inline-block";

    yesBtn.textContent =
        "Yes 💜";

    noBtn.textContent =
        "No";


    yesBtn.style.transform =
        "translate(0, 0)";

    noBtn.style.transform =
        "translate(0, 0)";


    yesBtn.onclick = function() {

        answerQuestion(true);
    };


    noBtn.onclick = function() {

        answerQuestion(false);
    };


    document
        .getElementById("answerButtons")
        .classList.remove("hidden");


    document
        .getElementById("continueTextBtn")
        .classList.add("hidden");


    document
        .getElementById("textAnswerContainer")
        .innerHTML = "";
}


/* =========================================================
   ANSWER QUESTION
========================================================= */

function answerQuestion(answer) {

    const questions =
        currentSession === 1
            ? session1Questions
            : session2Questions;

    const question =
        questions[currentQuestionIndex];


    /* =====================================================
       SESSION 1
    ===================================================== */

    if (currentSession === 1) {

    saveAnswer(answer);

    nextQuestion();

    return;
}


    /* =====================================================
       FORCED YES
    ===================================================== */

    if (question.type === "forcedYes") {

        if (answer) {

            if (question.yesImage) {

                showReaction(
                    question.yesImage,
                    1800
                );

                setTimeout(
                    nextQuestion,
                    1800
                );

            } else {

                nextQuestion();
            }

        } else {

            forcedYesAttempts++;


            if (
                question.noImages &&
                forcedYesAttempts <= 3
            ) {

                showReaction(
                    question.noImages[
                        forcedYesAttempts - 1
                    ],
                    1800
                );

                return;
            }


            /*
                After third No,
                remove No on fourth attempt.
            */

            if (forcedYesAttempts >= 4) {

                document
                    .getElementById("noBtn")
                    .style.display =
                        "none";

                document
                    .getElementById("yesBtn")
                    .textContent =
                        "YES 💜";
            }
        }

        return;
    }


    /* =====================================================
       FORCED NO
    ===================================================== */

    if (question.type === "forcedNo") {

        saveAnswer(answer);

        if (answer) {

            moveYesButton();

        } else {

            nextQuestion();
        }

        return;
    }


    /* =====================================================
       MARRIAGE
    ===================================================== */

    if (question.type === "marriage") {

        handleMarriageAnswer(answer);

        return;
    }


    /* =====================================================
       TEXT ANSWER
    ===================================================== */

    if (question.type === "textAnswer") {

        /*
            Text questions do not use Yes/No.
            createTextAnswer() already handles the input.
        */

        return;
    }


    /* =====================================================
       AM I CHANGED?
    ===================================================== */

    if (question.type === "changedQuestion") {

    if (answer) {

        createHowTextAnswer();

    } else {

        saveAnswer(answer);

        nextQuestion();
    }

    return;
}


    /* =====================================================
       FINAL
    ===================================================== */

    if (question.type === "final") {

        saveAnswer(answer);

        if (answer) {

            finishQuestions();

        } else {

            moveNoButton();
        }

        return;
    }


    /* =====================================================
       NORMAL
    ===================================================== */

    saveAnswer(answer);

    if (
        answer &&
        question.yesImage
    ) {

        showReaction(
            question.yesImage,
            1800
        );

        setTimeout(
            nextQuestion,
            1800
        );

    } else {

        nextQuestion();
    }
}


/* =========================================================
   MARRIAGE ANSWER
========================================================= */

function handleMarriageAnswer(answer) {

     saveAnswer(answer);

    if (answer) {

        showReaction(
            "pout.jpeg",
            1800
        );

        setTimeout(
            nextQuestion,
            1800
        );

        return;
    }


    /* NO attempt */

    marriageNoAttempts++;


    /*
        First 3 No attempts
    */

    if (marriageNoAttempts <= 3) {

        const noImages = [

            "HMPH SAB SAI BEST.jpeg",
            "2nd hmph.jpeg",
            "3d hmph.jpeg"

        ];

        showReaction(
            noImages[
                marriageNoAttempts - 1
            ],
            1800
        );

        return;
    }


    /*
        FOURTH NO:
        BOTH BUTTONS BECOME YES.
    */

    if (marriageNoAttempts >= 4) {

        const yesBtn =
            document.getElementById(
                "yesBtn"
            );

        const noBtn =
            document.getElementById(
                "noBtn"
            );


        yesBtn.textContent =
            "YES 💍";

        noBtn.textContent =
            "YES 💍";


        yesBtn.style.display =
            "inline-block";

        noBtn.style.display =
            "inline-block";


        noBtn.onclick =
            function() {

                showReaction(
                    "pout.jpeg",
                    1800
                );

                setTimeout(
                    nextQuestion,
                    1800
                );
            };
    }
}


/* =========================================================
   MOVE NO BUTTON
========================================================= */

function moveNoButton() {

    const noBtn =
        document.getElementById(
            "noBtn"
        );

    if (!noBtn) return;

    const x =
        Math.floor(
            Math.random() * 180
        ) - 90;

    const y =
        Math.floor(
            Math.random() * 100
        ) - 50;

    const rotation =
        Math.floor(
            Math.random() * 30
        ) - 15;

    noBtn.style.transform =
        `translate(${x}px, ${y}px)
         rotate(${rotation}deg)`;
}


/* =========================================================
   MOVE YES BUTTON
   Used for FORCED NO questions.
========================================================= */

function moveYesButton() {

    const yesBtn =
        document.getElementById(
            "yesBtn"
        );

    if (!yesBtn) return;

    const x =
        Math.floor(
            Math.random() * 180
        ) - 90;

    const y =
        Math.floor(
            Math.random() * 100
        ) - 50;

    const rotation =
        Math.floor(
            Math.random() * 30
        ) - 15;

    yesBtn.style.transform =
        `translate(${x}px, ${y}px)
         rotate(${rotation}deg)`;
}


/* =========================================================
   TEXT QUESTION
========================================================= */

function createTextAnswer() {

    const container =
        document.getElementById(
            "textAnswerContainer"
        );

    container.innerHTML = `

        <textarea
            id="questionTextAnswer"
            placeholder="Tell me what you think...">
        </textarea>

    `;


    document
        .getElementById("answerButtons")
        .classList.add("hidden");


    document
        .getElementById("continueTextBtn")
        .classList.remove("hidden");
}


function submitTextAnswer() {

    const input =
        document.getElementById(
            "questionTextAnswer"
        );

    if (!input) return;

    const answer =
        input.value.trim();


    if (!answer) {

        alert(
            "Kuch toh batao 😭"
        );

        return;
    }

    saveAnswer(answer);


    document
        .getElementById("answerButtons")
        .classList.remove("hidden");


    document
        .getElementById("continueTextBtn")
        .classList.add("hidden");


    nextQuestion();
}


function createHowTextAnswer() {

    const container =
        document.getElementById(
            "textAnswerContainer"
        );

    container.innerHTML = `

        <textarea
            id="questionTextAnswer"
            placeholder="How? Batao...">
        </textarea>

    `;


    document
        .getElementById("answerButtons")
        .classList.add("hidden");


    document
        .getElementById("continueTextBtn")
        .classList.remove("hidden");
}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    hideReaction();

    currentQuestionIndex++;


    const questions =
        currentSession === 1
            ? session1Questions
            : session2Questions;


    if (
        currentQuestionIndex >=
        questions.length
    ) {

        finishQuestions();

        return;
    }


    loadQuestion();
}


/* =========================================================
   FINISH
========================================================= */

function finishQuestions() {

    if (currentSession === 1) {

        startSession2();

        return;
    }


    showPage("letterPage");


    setTimeout(
        setupSignatureCanvas,
        200
    );
}


/* =========================================================
   SIGNATURE CANVAS
========================================================= */

let signatureCanvas = null;
let signatureCtx = null;
let drawing = false;


function setupSignatureCanvas() {

    signatureCanvas =
        document.getElementById(
            "signatureCanvas"
        );

    if (!signatureCanvas) return;


    const rect =
        signatureCanvas.getBoundingClientRect();


    signatureCanvas.width =
        rect.width;

    signatureCanvas.height =
        rect.height;


    signatureCtx =
        signatureCanvas.getContext(
            "2d"
        );


    signatureCtx.lineWidth = 3;
    signatureCtx.lineCap = "round";
    signatureCtx.lineJoin = "round";
    signatureCtx.strokeStyle = "#ffffff";


    signatureCanvas.onpointerdown =
        startDrawing;

    signatureCanvas.onpointermove =
        drawSignature;

    signatureCanvas.onpointerup =
        stopDrawing;

    signatureCanvas.onpointerleave =
        stopDrawing;
}


function getCanvasPosition(event) {

    const rect =
        signatureCanvas.getBoundingClientRect();

    return {

        x:
            event.clientX -
            rect.left,

        y:
            event.clientY -
            rect.top

    };
}


function startDrawing(event) {

    drawing = true;

    const pos =
        getCanvasPosition(event);

    signatureCtx.beginPath();

    signatureCtx.moveTo(
        pos.x,
        pos.y
    );
}


function drawSignature(event) {

    if (!drawing) return;

    const pos =
        getCanvasPosition(event);

    signatureCtx.lineTo(
        pos.x,
        pos.y
    );

    signatureCtx.stroke();
}


function stopDrawing() {

    if (!drawing) return;

    drawing = false;

    collectedSignature =
        signatureCanvas.toDataURL();

    checkLetterCompletion();
}


function clearSignature() {

    if (!signatureCanvas) return;

    signatureCtx.clearRect(
        0,
        0,
        signatureCanvas.width,
        signatureCanvas.height
    );

    collectedSignature = null;

    document
        .getElementById(
            "letterContinue"
        )
        .classList.add("hidden");
}


/* =========================================================
   THUMB
========================================================= */

function addThumb() {

    thumbCollected = true;

    document
        .getElementById(
            "thumbMark"
        )
        .classList.remove("hidden");

    checkLetterCompletion();
}


function checkLetterCompletion() {

    if (
        collectedSignature &&
        thumbCollected
    ) {

        document
            .getElementById(
                "letterContinue"
            )
            .classList.remove("hidden");
    }
}


/* =========================================================
   PRANK
========================================================= */

function goToPrank() {

    showPage(
        "prankPage"
    );
}


function moveSurpriseNo() {

    const button =
        document.getElementById(
            "surpriseNo"
        );

    if (!button) return;

    const x =
        Math.floor(
            Math.random() * 200
        ) - 100;

    const y =
        Math.floor(
            Math.random() * 100
        ) - 50;

    button.style.transform =
        `translate(${x}px, ${y}px)`;
}


/* =========================================================
   CONTRACT
========================================================= */

function showContract() {

    showPage(
        "contractPage"
    );


    setTimeout(
        function() {

            copySignatureToContract();

            createSeenuSignatureCanvas();

        },
        150
    );
}


/* =========================================================
   COPY PROVIDED SHAYA SIGNATURE
========================================================= */

function copySignatureToContract() {

    const target =
        document.getElementById(
            "shayaSignature"
        );

    if (!target) return;


    /*
        Use the provided signature.png.
        No second signature drawing is required.
    */

    const img =
        new Image();

    img.onload =
        function() {

            target.width =
                target.clientWidth;

            target.height =
                target.clientHeight;


            const ctx =
                target.getContext(
                    "2d"
                );

            ctx.clearRect(
                0,
                0,
                target.width,
                target.height
            );


            /*
                Keep the signature proportional
                and centered.
            */

            const scale =
                Math.min(
                    target.width / img.width,
                    target.height / img.height
                );

            const drawWidth =
                img.width * scale;

            const drawHeight =
                img.height * scale;

            const x =
                (target.width - drawWidth) / 2;

            const y =
                (target.height - drawHeight) / 2;


            ctx.drawImage(
                img,
                x,
                y,
                drawWidth,
                drawHeight
            );
        };


    img.onerror =
        function() {

            console.warn(
                "Signature image not found:",
                "assets/signature.png"
            );
        };


    img.src =
        "assets/signature.png";
}


/* =========================================================
   SEENU SIGNATURE
========================================================= */

let seenuCanvas = null;
let seenuCtx = null;
let seenuDrawing = false;


function createSeenuSignatureCanvas() {

    seenuCanvas =
        document.getElementById(
            "seenuSignature"
        );

    if (!seenuCanvas) return;


    seenuCanvas.width =
        seenuCanvas.clientWidth;

    seenuCanvas.height =
        seenuCanvas.clientHeight;


    seenuCtx =
        seenuCanvas.getContext(
            "2d"
        );


    seenuCtx.lineWidth = 2.5;
    seenuCtx.lineCap = "round";
    seenuCtx.strokeStyle =
        "#35233d";


    seenuCanvas.onpointerdown =
        function(event) {

            seenuDrawing = true;

            const rect =
                seenuCanvas
                    .getBoundingClientRect();

            seenuCtx.beginPath();

            seenuCtx.moveTo(

                event.clientX -
                    rect.left,

                event.clientY -
                    rect.top

            );
        };


    seenuCanvas.onpointermove =
        function(event) {

            if (!seenuDrawing) return;

            const rect =
                seenuCanvas
                    .getBoundingClientRect();

            seenuCtx.lineTo(

                event.clientX -
                    rect.left,

                event.clientY -
                    rect.top

            );

            seenuCtx.stroke();
        };


    seenuCanvas.onpointerup =
        function() {

            seenuDrawing = false;
        };


    seenuCanvas.onpointerleave =
        function() {

            seenuDrawing = false;
        };
}


/* =========================================================
   SEENU PHOTO
========================================================= */

function checkSeenuPhoto(event) {

    const file =
        event.target.files[0];

    const preview =
        document.getElementById(
            "photoPreview"
        );

    const message =
        document.getElementById(
            "photoMessage"
        );


    preview.innerHTML = "";

    message.textContent = "";


    if (!file) return;


    const img =
        document.createElement(
            "img"
        );

    const reader =
        new FileReader();


    reader.onload =
        function(e) {

            img.src =
                e.target.result;


            img.onload =
                function() {

                    const ratio =
                        img.width /
                        img.height;


                    /*
                        Basic image-shape check.
                        This is NOT face recognition.
                    */

                    if (
                        img.width >= 180 &&
                        img.height >= 180 &&
                        ratio > 0.45 &&
                        ratio < 1.8
                    ) {

                        preview.appendChild(
                            img
                        );


                        message.textContent =
                            "Okay... that's better 😌💜";


                        message.style.color =
                            "#6c3d75";


                        showReaction(
                            "flirty.jpeg",
                            1800
                        );


                    } else {

                        message.textContent =
                            "Nope. Apni sahi wali pic lagao 😭";


                        message.style.color =
                            "#a52d4b";
                    }
                };
        };


    reader.readAsDataURL(file);
}


/* =========================================================
   EXTRA TERMS
========================================================= */

function addExtraTerm() {

    const input =
        document.getElementById(
            "extraTermInput"
        );

    const container =
        document.getElementById(
            "extraTerms"
        );


    if (!input || !container) return;


    const term =
        input.value.trim();


    if (!term) {

        alert(
            "Pehle apna term likho 😭"
        );

        input.focus();

        return;
    }


    if (extraTermCount >= 6) {

        alert(
            "Maximum 6 extra terms allowed 😭"
        );

        return;
    }


    extraTermCount++;


    const li =
        document.createElement(
            "div"
        );

    li.className =
        "extra-term-added";


    li.innerHTML = `

        <span class="extra-term-number">
            ${extraTermCount}.
        </span>

        <span class="extra-term-text">
            ${escapeHtml(term)}
        </span>

        <button
            type="button"
            class="remove-term"
            onclick="removeExtraTerm(this)">
            ×
        </button>

    `;


    container.appendChild(li);

    saveExtraTerm(term);


    input.value = "";

    input.focus();
}


/* =========================================================
   REMOVE EXTRA TERM
========================================================= */

function removeExtraTerm(button) {

    const item =
        button.closest(
            ".extra-term-added"
        );

    if (!item) return;

    item.remove();

    renumberExtraTerms();
}


/* =========================================================
   RENUMBER EXTRA TERMS
========================================================= */

function renumberExtraTerms() {

    const terms =
        document.querySelectorAll(
            ".extra-term-added"
        );


    extraTermCount =
        terms.length;


    terms.forEach(
        function(term, index) {

            const number =
                term.querySelector(
                    ".extra-term-number"
                );

            if (number) {

                number.textContent =
                    `${index + 1}.`;
            }
        }
    );
}


/* =========================================================
   BASIC HTML ESCAPE
========================================================= */

function escapeHtml(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* =========================================================
   FINAL CONTRACT
========================================================= */

function finishContract() {

    const photoInput =
        document.getElementById("seenuPhoto");

    const photoMessage =
        document.getElementById("photoMessage");

    if (
        !photoInput ||
        !photoInput.files ||
        photoInput.files.length === 0
    ) {

        if (photoMessage) {

            photoMessage.textContent =
                "Please upload your picture first. 📸";

            photoMessage.style.color =
                "#8b1e3f";

            photoMessage.style.fontWeight =
                "700";
        }

        return;
    }


    const file =
        photoInput.files[0];


    if (photoMessage) {

        photoMessage.textContent =
            "Saving your picture... 📸";

        photoMessage.style.color =
            "#6c3d75";
    }


    const formData =
        new FormData();

    formData.append(
        "photo",
        file
    );


    fetch(
        "/api/upload-photo",
        {
            method: "POST",
            body: formData
        }
    )

    .then(function(response) {

        return response.json();

    })

    .then(function(data) {

        if (data.success) {

            showPage(
                "goodnightPage"
            );

        } else {

            if (photoMessage) {

                photoMessage.textContent =
                    data.message ||
                    "Picture save nahi hui 😭";

                photoMessage.style.color =
                    "#8b1e3f";
            }
        }

    })

    .catch(function(error) {

        console.error(
            "Photo upload error:",
            error
        );

        if (photoMessage) {

            photoMessage.textContent =
                "Picture upload nahi ho saki. Dobara try karo 😭";

            photoMessage.style.color =
                "#8b1e3f";
        }
    });
}