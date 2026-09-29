const header = document.querySelector('.header');
const details = document.querySelector('.details');

const tabs = Array.from(
    header.querySelectorAll('.tab')
);

const contents = Array.from(
    details.querySelectorAll('.tab-content')
);

const indicator = document.querySelector('#indicator');
const progress = document.querySelector('#progress');
const counter = document.querySelector('#counter');

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

let activeIndex = 0;

// Move the sliding indicator
function moveIndicator() {
    const activeTab = tabs[activeIndex];

    indicator.style.width = activeTab.offsetWidth + 'px';
    indicator.style.height = activeTab.offsetHeight + 'px';

    indicator.style.transform = `
        translate(
            ${activeTab.offsetLeft}px,
            ${activeTab.offsetTop}px
        )
    `;
}

// Change active tab
function changeTab(index) {
    activeIndex = (index + tabs.length) % tabs.length;

    tabs.forEach((tab, i) => {
        const isActive = i === activeIndex;

        tab.classList.toggle('active', isActive);

        tab.setAttribute(
            'aria-selected',
            String(isActive)
        );

        tab.tabIndex = isActive ? 0 : -1;

        contents[i].hidden = !isActive;
        contents[i].classList.toggle(
            'active',
            isActive
        );
    });

    // Update progress bar
    const percentage =
        ((activeIndex + 1) / tabs.length) * 100;

    progress.style.width = percentage + '%';

    // Update counter
    counter.textContent =
        String(activeIndex + 1).padStart(2, '0') +
        ' / ' +
        String(tabs.length).padStart(2, '0');

    moveIndicator();
}

// Tab click
tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
        changeTab(index);
    });

    // Keyboard navigation
    tab.addEventListener('keydown', (event) => {
        let newIndex = activeIndex;

        if (event.key === 'ArrowRight') {
            newIndex++;
        } else if (event.key === 'ArrowLeft') {
            newIndex--;
        } else if (event.key === 'Home') {
            newIndex = 0;
        } else if (event.key === 'End') {
            newIndex = tabs.length - 1;
        } else {
            return;
        }

        event.preventDefault();
        changeTab(newIndex);
        tabs[activeIndex].focus();
    });
});

// Previous button
prev.addEventListener('click', () => {
    changeTab(activeIndex - 1);
});

// Next button
next.addEventListener('click', () => {
    changeTab(activeIndex + 1);
});

// Keep indicator aligned on resize
window.addEventListener('resize', moveIndicator);

// Initialize
changeTab(0);