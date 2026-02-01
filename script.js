 // Create hearts effect
 function createHearts() {
    const hearts = document.querySelector('.hearts');
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    hearts.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

setInterval(createHearts, 300);

// Move "No" button function
function moveButton(button) {
    const container = button.closest('.buttons');
    const yesButton = container.querySelector('.btn-yes');

    // 🔒 Lock size once (prevents shrinking)
    if (!button.dataset.sizeLocked) {
        button.style.width = button.offsetWidth + 'px';
        button.style.height = button.offsetHeight + 'px';
        button.dataset.sizeLocked = 'true';
    }

    // 🔒 Lock initial position before absolute
    if (button.style.position !== 'absolute') {
        const btnRect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        button.style.position = 'absolute';
        button.style.left = (btnRect.left - containerRect.left) + 'px';
        button.style.top  = (btnRect.top  - containerRect.top)  + 'px';
    }

    const maxX = container.clientWidth - button.offsetWidth;
    const maxY = container.clientHeight - button.offsetHeight;

    let x, y, overlap;
    const safeGap = 15; // space between buttons

    do {
        x = Math.random() * maxX;
        y = Math.random() * maxY;

        const noRect = {
            left: x,
            top: y,
            right: x + button.offsetWidth,
            bottom: y + button.offsetHeight
        };

        const yesRect = yesButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        const yes = {
            left: yesRect.left - containerRect.left - safeGap,
            top: yesRect.top - containerRect.top - safeGap,
            right: yesRect.right - containerRect.left + safeGap,
            bottom: yesRect.bottom - containerRect.top + safeGap
        };

        overlap = !(
            noRect.right < yes.left ||
            noRect.left > yes.right ||
            noRect.bottom < yes.top ||
            noRect.top > yes.bottom
        );

    } while (overlap);

    button.style.left = x + 'px';
    button.style.top = y + 'px';
}






// Navigation functions
function goToStep2() {
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step2').classList.add('active');
    triggerConfetti();
}

function goToStep3() {
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
    triggerConfetti();
}

function finalStep() {
    document.getElementById('step3').classList.remove('active');
    document.querySelector('.final-message').style.display = 'block';
    document.querySelector('.whatsapp-btn').style.display = 'inline-block';
    triggerConfetti();
    
    // Additional confetti for the final celebration
    setTimeout(() => triggerConfetti(), 500);
    setTimeout(() => triggerConfetti(), 1000);
    setTimeout(() => triggerConfetti(), 1500);
}

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}