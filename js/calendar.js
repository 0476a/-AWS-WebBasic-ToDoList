class Calendar {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new Calendar();
        }
        return this.#instance;
    }

    calendar() {
        const months = [
            { name: "1월", days: 31 },
            { name: "2월", days: 28 },
            { name: "3월", days: 31 },
            { name: "4월", days: 30 },
            { name: "5월", days: 31 },
            { name: "6월", days: 30 },
            { name: "7월", days: 31 },
            { name: "8월", days: 31 },
            { name: "9월", days: 30 },
            { name: "10월", days: 31 },
            { name: "11월", days: 30 },
            { name: "12월", days: 31 }
          ];
          
          let currentMonth = 0;
          
          function generateCalendar(monthIndex) {
            const month = months[monthIndex];
            const tableBody = document.querySelector("tbody");
            tableBody.innerHTML = "";
            let date = 1;
            for (let i = 0; i < 6; i++) {
              const row = document.createElement("tr");
              for (let j = 0; j < 7; j++) {
                const cell = document.createElement("td");
                if (i === 0 && j < new Date(month.name + " 1, " + new Date().getFullYear()).getDay()) {
                  const lastMonth = months[monthIndex - 1] || months[11];
                  const cellText = document.createTextNode(lastMonth.days - new Date(lastMonth.name + " " + new Date().getFullYear()).getDay() + j + 1);
                  cell.classList.add("inactive");
                  cell.appendChild(cellText);
                  row.appendChild(cell);
                } else if (date > month.days) {
                  break;
                } else {
                  const cellText = document.createTextNode(date);
                  if (date === new Date().getDate() && monthIndex === new Date().getMonth()) {
                    cell.classList.add("today");
                } else if (j === 0 || j === 6) {
                cell.classList.add("weekend");
                }
                cell.appendChild(cellText);
                row.appendChild(cell);
                date++;
                }
                }
                tableBody.appendChild(row);
                }
                }
                
                generateCalendar(currentMonth);
                
                const nextMonthBtn = document.querySelector("#nextMonthBtn");
                nextMonthBtn.addEventListener("click", function() {
                currentMonth++;
                if (currentMonth > 11) {
                currentMonth = 0;
                }
                const title = document.querySelector("h1");
                title.innerText = months[currentMonth].name + " 달력";
                generateCalendar(currentMonth);
                });
    }
}