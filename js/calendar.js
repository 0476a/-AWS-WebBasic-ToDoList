class Calendar {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new Calendar();
        }
        return this.#instance;
    }

    constructor() {
        this.displayDate = new Date();
        this.renderCalendar();
        this.addEventListeners();
    }

    addEventListeners() {
        const prevButton = document.querySelector('.calendar-prev');
        const nextButton = document.querySelector('.calendar-next');

        prevButton.onclick = () => {
            this.displayDate.setMonth(this.displayDate.getMonth() - 1);
            this.renderCalendar();
        }

        nextButton.onclick = () => {
            this.displayDate.setMonth(this.displayDate.getMonth() + 1);
            this.renderCalendar();
        };
    }

    renderCalendar() {
        const monthYear = document.querySelector('.calendar-month-year');
        const calendarTable = document.querySelector('.calendar-table tbody');
        calendarTable.innerHTML = '';

        const firstDayOfMonth = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth(), 1);
        const lastDayOfMonth = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth() + 1, 0);

        let currentDay = new Date(firstDayOfMonth);

        monthYear.innerHTML = `
            <span class="calendar-year">${this.displayDate.getFullYear() + '년'}</span>
            <span class="calendar-month">${this.getMonthName(this.displayDate.getMonth())}</span>
        `;

        while (currentDay <= lastDayOfMonth) {
            const weekRow = document.createElement('tr');

            for (let i = 0; i < 7; i++) {
                const dayCell = document.createElement('td');
                dayCell.classList.add("calendar-day");

                if ((i === currentDay.getDay()) && (currentDay <= lastDayOfMonth)) {
                    dayCell.textContent = currentDay.getDate();
                    dayCell.onclick = () => {
                        const year = this.displayDate.getFullYear();
                        const month = this.displayDate.getMonth() + 1;
                        const day = parseInt(dayCell.textContent);
                        const dateString = `${year}.${month}.${day}`;
                        window.location.href = `./index.html?date=${dateString}`;
                    }

                    currentDay.setDate(currentDay.getDate() + 1);
                }
                weekRow.appendChild(dayCell);
            }

            calendarTable.appendChild(weekRow);
        }
    }

    getMonthName(month) {
        const monthNames = [
            '1월', '2월', '3월', '4월', '5월', '6월',
            '7월', '8월', '9월', '10월', '11월', '12월'
        ];

        return monthNames[month];
    }
}

window.onload = () => {
    Calendar.getInstance();
}
