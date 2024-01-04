document.addEventListener("DOMContentLoaded", function () {
    const cardSlider = document.getElementById("cardSlider");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let cardIndex = 0;
    let isAnimating = false;

    function updateSliderPosition() {
        const cardWidth = cardSlider.children[0].offsetWidth + 30;
        const bounceAmount = 0.2;
        const newPosition = -cardIndex * cardWidth + bounceAmount * Math.sin(cardIndex / 2);

        cardSlider.style.transition = 'transform 0.5s ease-out';
        cardSlider.style.transform = `translateX(${newPosition}px)`;

        isAnimating = true;
    }

    function handleTransitionEnd() {
        cardSlider.style.transition = 'none';
        isAnimating = false;
    }

    prevBtn.addEventListener("click", function () {
        if (!isAnimating && cardIndex > 0) {
            cardIndex--;
            updateSliderPosition();
        }
    });

    nextBtn.addEventListener("click", function () {
        const totalCards = cardSlider.children.length;
        if (!isAnimating && cardIndex < totalCards - 3) {
            cardIndex++;
            updateSliderPosition();
        }
    });

    cardSlider.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
    });

    cardSlider.addEventListener("touchmove", function (e) {
        e.preventDefault();
        const touchMoveX = e.touches[0].clientX;
        const deltaX = touchMoveX - touchStartX;
        if (Math.abs(deltaX) > 10 && !isAnimating) {
            if (deltaX > 0 && cardIndex > 0) {
                cardIndex--;
                updateSliderPosition();
            } else if (deltaX < 0) {
                const totalCards = cardSlider.children.length;
                if (cardIndex < totalCards - 3) {
                    cardIndex++;
                    updateSliderPosition();
                }
            }
        }
    });

    cardSlider.addEventListener('transitionend', handleTransitionEnd);
});
