document.addEventListener('DOMContentLoaded', () => {
    // --- State Management ---
    let currentWizardStep = 1;
    let quizScore = 0;
    let currentQuizIndex = 0;
    const API_URL = '/ask'; // Relative path for the same domain

    // --- Data Objects ---
    const timelineData = [
        { name: "Notification", icon: "fa-bullhorn", detail: "The President (for Lok Sabha) or Governor (for State Assembly) issues the official notification calling upon the constituency to elect members." },
        { name: "Nomination", icon: "fa-user-plus", detail: "Candidates file their nomination papers with the Returning Officer (RO). They must submit security deposits and disclosures." },
        { name: "Scrutiny", icon: "fa-magnifying-glass", detail: "The RO examines all nomination papers to ensure they are valid and that candidates meet all legal requirements." },
        { name: "Withdrawal", icon: "fa-user-minus", detail: "Candidates are given a short window (usually 2 days) to voluntarily withdraw their names from the contest." },
        { name: "Campaign", icon: "fa-megaphone", detail: "Political parties and candidates campaign to win voter support. This must stop 48 hours before the end of polling." },
        { name: "Polling", icon: "fa-check-to-slot", detail: "Voters go to polling stations to cast their votes using EVMs (Electronic Voting Machines)." },
        { name: "Counting", icon: "fa-calculator", detail: "Votes are counted under strict supervision. EVMs and VVPAT slips are verified according to ECI protocols." },
        { name: "Results", icon: "fa-trophy", detail: "The results are declared, and the RO issues a certificate of election to the winning candidate." }
    ];

    const faqData = [
        { q: "What is VVPAT?", a: "Voter Verifiable Paper Audit Trail (VVPAT) is an independent system attached to EVMs that allows voters to verify that their votes are cast as intended." },
        { q: "Can I vote if I'm not on the Roll?", a: "No. Being a citizen and having a Voter ID (EPIC) is not enough. Your name must be in the Electoral Roll of that specific constituency." },
        { q: "What is NOTA?", a: "'None of the Above' (NOTA) is a ballot option that allows voters to officially register a vote of rejection for all candidates." },
        { q: "What ID do I need to vote?", a: "The EPIC (Voter ID) is preferred, but ECI usually allows around 12 alternative photo IDs like Aadhar, PAN, or Passport." }
    ];

    const glossaryData = [
        { term: "EVM", desc: "Electronic Voting Machine used to record votes." },
        { term: "ECI", desc: "Election Commission of India, the constitutional body." },
        { term: "EPIC", desc: "Elector's Photo Identity Card (Voter ID)." },
        { term: "RO", desc: "Returning Officer responsible for the election in a constituency." }
    ];

    const quizQuestions = [
        { 
            q: "What is the minimum age to vote in India?", 
            options: ["16 Years", "18 Years", "21 Years", "25 Years"],
            correct: 1
        },
        { 
            q: "What does VVPAT stand for?", 
            options: ["Voter Verified Paper Audit Trail", "Visual Voter Power Audit Tool", "Voice Verified Paper Account Trial", "None of these"],
            correct: 0
        },
        { 
            q: "Can a person vote without their name in the Electoral Roll if they have a Voter ID?", 
            options: ["Yes", "No", "Only in emergencies", "Depends on the officer"],
            correct: 1
        }
    ];

    // --- UI Initialization ---
    const initTimeline = () => {
        const wrapper = document.getElementById('timelineItems');
        timelineData.forEach((step, idx) => {
            const item = document.createElement('div');
            item.className = 'timeline-step';
            item.innerHTML = `
                <div class="step-marker"></div>
                <span class="step-name">${step.name}</span>
            `;
            item.setAttribute('role', 'button');
            item.setAttribute('tabindex', '0');
            item.setAttribute('aria-label', `View details for ${step.name} stage`);
            item.onclick = () => showTimelineDetail(idx);
            item.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    showTimelineDetail(idx);
                }
            };
            wrapper.appendChild(item);
        });
    };

    const showTimelineDetail = (idx) => {
        const detailBox = document.getElementById('timelineDetail');
        const steps = document.querySelectorAll('.timeline-step');
        steps.forEach(s => s.classList.remove('active'));
        steps[idx].classList.add('active');
        
        detailBox.innerHTML = `
            <div class="detail-content animate-in">
                <i class="fa-solid ${timelineData[idx].icon}"></i>
                <h3>${timelineData[idx].name}</h3>
                <p>${timelineData[idx].detail}</p>
            </div>
        `;
    };

    const initFaq = () => {
        const container = document.getElementById('faqAccordion');
        faqData.forEach((item, idx) => {
            const accItem = document.createElement('div');
            accItem.className = 'accordion-item';
            accItem.innerHTML = `
                <div class="acc-header">
                    <span>${item.q}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                </div>
                <div class="acc-content">${item.a}</div>
            `;
            accItem.setAttribute('role', 'button');
            accItem.setAttribute('tabindex', '0');
            accItem.setAttribute('aria-expanded', 'false');
            accItem.onclick = () => {
                const isActive = accItem.classList.contains('active');
                document.querySelectorAll('.accordion-item').forEach(i => {
                    i.classList.remove('active');
                    i.setAttribute('aria-expanded', 'false');
                });
                if (!isActive) {
                    accItem.classList.add('active');
                    accItem.setAttribute('aria-expanded', 'true');
                }
            };
            accItem.onkeydown = (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    accItem.click();
                }
            };
            container.appendChild(accItem);
        });
    };

    const initGlossary = () => {
        const grid = document.getElementById('glossaryGrid');
        glossaryData.forEach(item => {
            const card = document.createElement('div');
            card.className = 'glos-card';
            card.innerHTML = `
                <h4>${item.term}</h4>
                <p>${item.desc}</p>
            `;
            grid.appendChild(card);
        });
    };

    // --- Wizard Logic ---
    const updateWizard = () => {
        const steps = document.querySelectorAll('.w-step');
        const pSteps = document.querySelectorAll('.p-step');
        const bar = document.getElementById('progressBar');
        
        steps.forEach(s => s.classList.remove('active'));
        document.getElementById(`w-step-${currentWizardStep}`).classList.add('active');
        
        pSteps.forEach((ps, idx) => {
            ps.classList.remove('active', 'completed');
            if (idx + 1 === currentWizardStep) ps.classList.add('active');
            if (idx + 1 < currentWizardStep) ps.classList.add('completed');
        });
        
        bar.style.width = `${(currentWizardStep / 4) * 100}%`;
        
        document.getElementById('prevStep').disabled = (currentWizardStep === 1);
        document.getElementById('nextStep').innerText = (currentWizardStep === 4) ? 'Finish' : 'Next Step';
    };

    document.getElementById('nextStep').onclick = () => {
        if (currentWizardStep < 4) {
            currentWizardStep++;
            updateWizard();
        } else {
            document.getElementById('successSeal').classList.remove('hidden');
        }
    };

    document.getElementById('prevStep').onclick = () => {
        if (currentWizardStep > 1) {
            currentWizardStep--;
            updateWizard();
        }
    };

    // Eligibility interaction
    document.querySelectorAll('.opt-btn').forEach(btn => {
        btn.onclick = (e) => {
            const parent = btn.parentElement;
            parent.querySelectorAll('.opt-btn').forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            checkEligibility();
        };
    });

    const checkEligibility = () => {
        const isCitizen = document.querySelector('.opt-btn[data-val="yes"]').classList.contains('selected');
        const age = document.getElementById('wizardAge').value;
        const msg = document.getElementById('eligibilityMessage');
        
        if (isCitizen && age >= 18) {
            msg.innerHTML = '<span class="text-green">You are eligible! Proceed to Step 2.</span>';
        } else if (age && age < 18) {
            msg.innerHTML = '<span class="text-saffron">You must be 18+ to vote.</span>';
        } else if (document.querySelector('.opt-btn.selected')) {
            msg.innerHTML = '<span class="text-saffron">Only Indian citizens can vote.</span>';
        }
    };
    document.getElementById('wizardAge').oninput = checkEligibility;

    // --- Quiz Logic ---
    const loadQuizQuestion = () => {
        const q = quizQuestions[currentQuizIndex];
        const content = document.getElementById('quizContent');
        const progress = document.getElementById('quizProgress');
        
        progress.innerText = `Question ${currentQuizIndex + 1}/${quizQuestions.length}`;
        content.innerHTML = `
            <h3>${q.q}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `<div class="quiz-option" onclick="handleQuizAnswer(${i})">${opt}</div>`).join('')}
            </div>
        `;
    };

    window.handleQuizAnswer = (idx) => {
        const q = quizQuestions[currentQuizIndex];
        const options = document.querySelectorAll('.quiz-option');
        const feedback = document.getElementById('quizFeedback');
        
        if (idx === q.correct) {
            options[idx].classList.add('correct');
            quizScore++;
            feedback.innerText = "Correct! Well done.";
            feedback.className = "quiz-feedback correct-text";
        } else {
            options[idx].classList.add('wrong');
            options[q.correct].classList.add('correct');
            feedback.innerText = "Incorrect. The highlighted option was correct.";
            feedback.className = "quiz-feedback wrong-text";
        }
        
        feedback.classList.remove('hidden');
        
        setTimeout(() => {
            feedback.classList.add('hidden');
            if (currentQuizIndex < quizQuestions.length - 1) {
                currentQuizIndex++;
                loadQuizQuestion();
            } else {
                showQuizResult();
            }
        }, 2000);
    };

    const showQuizResult = () => {
        const content = document.getElementById('quizContent');
        content.innerHTML = `
            <div class="quiz-result">
                <h3>Quiz Completed!</h3>
                <p>Your Score: <strong>${quizScore}/${quizQuestions.length}</strong></p>
                <button class="btn btn-primary" onclick="location.reload()">Retry Quiz</button>
            </div>
        `;
    };

    // --- Chat Logic ---
    const chatOverlay = document.getElementById('chatOverlay');
    const openChatBtn = document.getElementById('openChatBtn');
    const closeChatBtn = document.getElementById('closeChatBtn');
    const chatForm = document.getElementById('chatForm');
    const chatMessages = document.getElementById('chatMessages');
    const typingIndicator = document.getElementById('typingIndicator');

    let isProcessingMessage = false;

    openChatBtn.onclick = () => chatOverlay.classList.add('open');
    closeChatBtn.onclick = () => chatOverlay.classList.remove('open');

    chatForm.onsubmit = async (e) => {
        e.preventDefault();
        
        if (isProcessingMessage) return;

        const input = document.getElementById('userInput');
        const msg = input.value.trim();
        if (!msg) return;

        isProcessingMessage = true;
        appendMessage(msg, 'user');
        input.value = '';
        
        typingIndicator.classList.remove('hidden');
        chatMessages.scrollTop = chatMessages.scrollHeight;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': window.authHeader || ''
                },
                body: JSON.stringify({ question: msg })
            });

            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.detail || 'API returned an error');
            }
            
            appendMessage(data.answer, 'ai');
        } catch (err) {
            console.error("Chat API Error:", err);
            appendMessage("Sorry, I'm having trouble connecting to the brain. Please ensure the backend is running and try again.", 'ai');
        } finally {
            typingIndicator.classList.add('hidden');
            chatMessages.scrollTop = chatMessages.scrollHeight;
            isProcessingMessage = false;
        }
    };

    const appendMessage = (text, type) => {
        const div = document.createElement('div');
        div.className = `message ${type}-msg`;
        div.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    // --- Scroll Handling ---
    window.onscroll = () => {
        const sections = document.querySelectorAll('section, header');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    // Initialize all components
    initTimeline();
    initFaq();
    initGlossary();
    loadQuizQuestion();
});
