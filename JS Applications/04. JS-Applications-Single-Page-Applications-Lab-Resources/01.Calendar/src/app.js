const yearSelection = document.getElementById('years');

const years = [...document.querySelectorAll('.monthCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});

const months = [...document.querySelectorAll('.daysCalendar')].reduce((acc, c) => {
    acc[c.id] = c;
    return acc;
}, {});

displaySection(yearSelection);

yearSelection.addEventListener('click', (e => {
    if (e.target.classList.contains('date') || e.target.classList.contains('day')) {
        e.stopImmediatePropagation();
        const year = `year-${e.target.textContent.trim()}`;
        displaySection(years[year]);
    }
}))

document.addEventListener('click', (e) => {
    if (e.target.tagName == 'CAPTION') {
        const sectionId = e.target.parentNode.parentNode.id;
        if (sectionId.includes('year-')) {
            displaySection(yearSelection);
        } else if (sectionId.includes('month-')) {
            const year = `year-${sectionId.split('-')[1]}`;
            displaySection(years[year]);
        }
    } else if (e.target.tagName == 'TD' || e.target.tagName == 'DIV'){
        const monthName = e.target.textContent.trim();
        if (monthsNames.hasOwnProperty(monthName)) {
            const yearId = document.body.querySelector('caption').textContent.trim();
            const monthId = `month-${yearId}-${monthsNames[monthName]}`;
            displaySection(months[monthId]);
        }
    }
});

function displaySection(section) {
    document.body.innerHTML = '';
    document.body.appendChild(section);
}

const monthsNames = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sept': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12,
}