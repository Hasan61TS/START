document.addEventListener('DOMContentLoaded', () => {
    // Check if user has completed puzzle 4
    if (localStorage.getItem('loginEnabled') !== 'true') {
        // Redirect to posts page if trying to access without completing puzzle 4
        window.location.href = 'posts.html';
        return;
    }
    
    initializePuzzles();
});

const challengeAnswers = {
    1: 'THIS IS THE PASSWORD',
    2: 'WE NEED CONNECTIONS IN MOTION',
    3: 'JOIN',
    4: 'LIGHT',
    5: 'PUERO'
};

function initializePuzzles() {
    showPuzzle(1);
    initializeDragAndDrop();
}

function initializeDragAndDrop() {
    const fragments = document.querySelectorAll('.fragment');
    const fragmentsContainer = document.querySelector('.fragments-puzzle');

    fragments.forEach(fragment => {
        fragment.addEventListener('dragstart', () => {
            fragment.classList.add('dragging');
        });

        fragment.addEventListener('dragend', () => {
            fragment.classList.remove('dragging');
        });
    });

    fragmentsContainer?.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(fragmentsContainer, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (draggable) {
            if (afterElement) {
                fragmentsContainer.insertBefore(draggable, afterElement);
            } else {
                fragmentsContainer.appendChild(draggable);
            }
        }
    });
}

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.fragment:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

function showPuzzle(number) {
    const puzzles = document.querySelectorAll('.puzzle');
    puzzles.forEach(puzzle => {
        puzzle.classList.remove('active');
    });
    
    const currentPuzzle = document.getElementById(`puzzle${number}`);
    if (currentPuzzle) {
        currentPuzzle.classList.add('active');
    }
}

function checkChallenge(number) {
    const input = document.getElementById(`challenge${number}-input`).value.toUpperCase();
    const isCorrect = input === challengeAnswers[number];

    if (isCorrect) {
        // Transition effect
        const currentPuzzle = document.getElementById(`puzzle${number}`);
        currentPuzzle.classList.add('transitioning-out');
        
        setTimeout(() => {
            currentPuzzle.classList.remove('active', 'transitioning-out');
            
            if (number === 5) {
                // Final puzzle solved
                window.location.href = 'login.html'; // Redirect to final login page
            } else {
                // Show next puzzle
                const nextPuzzle = document.getElementById(`puzzle${number + 1}`);
                nextPuzzle.classList.add('active', 'transitioning-in');
                
                setTimeout(() => {
                    nextPuzzle.classList.remove('transitioning-in');
                }, 500);
            }
        }, 500);
    } else {
        showError('Incorrect solution. Try again.');
    }
}

function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
} 