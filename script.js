const calendar = document.getElementById('calendar');
const daysLeftElem = document.getElementById('daysLeft');

// Total days in a year (starting value)
let totalDaysInYear = 365;
let struckDates = JSON.parse(localStorage.getItem('struckDates')) || [];

// Reduce total days by the number of already struck dates
let daysLeft = totalDaysInYear - struckDates.length;

// Display the remaining days initially
daysLeftElem.textContent = daysLeft;

// Get the current date
const today = new Date();
const currentDay = today.getDate();
const currentMonth = today.getMonth() + 1; // JavaScript months are 0-indexed
const currentYear = today.getFullYear();

// Generate calendar for the current month
function generateCalendar(year, month) {
    const daysInMonth = new Date(year, month, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dateDiv = document.createElement('div');
        dateDiv.classList.add('date');
        dateDiv.textContent = day;

        const dateString = `${year}-${month}-${day}`;

        // Add background color based on whether the date is past, today, or future
        if (year === currentYear && month === currentMonth) {
            if (day < currentDay) {
                dateDiv.classList.add('past');
            } else if (day === currentDay) {
                dateDiv.classList.add('today');
            } else {
                dateDiv.classList.add('future');
            }
        }

        // Check if the date has been struck already
        if (struckDates.includes(dateString)) {
            dateDiv.classList.add('struck');
        }

        // Add click event to strike or unstrike the date if it is today or past
        if (day <= currentDay) {
            dateDiv.addEventListener('click', () => toggleStrike(year, month, day));
        }

        calendar.appendChild(dateDiv);
    }
}

// Function to toggle strike (strike or unstrike) on a date
function toggleStrike(year, month, day) {
    const dateString = `${year}-${month}-${day}`;

    // If the date is struck, unstrike it
    if (struckDates.includes(dateString)) {
        struckDates = struckDates.filter(date => date !== dateString);
        localStorage.setItem('struckDates', JSON.stringify(struckDates));

        // Increment the days left by 1 and update the UI
        daysLeft += 1;
        daysLeftElem.textContent = daysLeft;

        // Find the date div and remove the struck style
        const dateDivs = document.querySelectorAll('.date');
        dateDivs[day - 1].classList.remove('struck');
    } 
    // If the date is not struck, strike it
    else {
        struckDates.push(dateString);
        localStorage.setItem('struckDates', JSON.stringify(struckDates));

        // Decrement the days left by 1 and update the UI
        daysLeft -= 1;
        daysLeftElem.textContent = daysLeft;

        // Find the date div and apply the struck style
        const dateDivs = document.querySelectorAll('.date');
        dateDivs[day - 1].classList.add('struck');
    }
}

// Generate the calendar when the page loads
generateCalendar(currentYear, currentMonth);
