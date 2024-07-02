const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span"),
  dailyButton = document.getElementById("dailyView"),
  weeklyButton = document.getElementById("weeklyView"); // Assuming you have a button with the ID "weeklyView"
  monthlyButton = document.getElementById("monthlyView");
  yearlyButton = document.getElementById("yearlyView");

// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth(),
  lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();

// storing full name of all months in an array
const months = ["January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December"];

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday = i === date.getDate() && currMonth === new Date().getMonth()
      && currYear === new Date().getFullYear() ? "active" : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
}

renderCalendar();

prevNextIcon.forEach(icon => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});

dailyButton.addEventListener("click", () => {
  // Get all the date elements in the calendar
  const dateElements = document.querySelectorAll(".days li");

  // Remove the "active" class from all date elements first
  dateElements.forEach(dateElement => {
    dateElement.classList.remove("active");
  });

  // Calculate the first day of the current month
  const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();

  // Add the "active" class to date elements that belong to the current month
  dateElements.forEach((dateElement, index) => {
    if (index >= firstDayofMonth && index < firstDayofMonth + lastDateofMonth) {
      dateElement.classList.add("active");
    }
  });
});

weeklyButton.addEventListener("click", () => {
    // Get all the date elements in the calendar
    const dateElements = document.querySelectorAll(".days li");
  
    // Remove the "active" class from all date elements first
    dateElements.forEach(dateElement => {
      dateElement.classList.remove("active");
    });
  
    // Calculate the first day of the current month
    const firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  
    // Loop through date elements
    dateElements.forEach((dateElement, index) => {
      if (index >= firstDayofMonth && index < firstDayofMonth + lastDateofMonth) {
        // Calculate the day of the week for the current date
        const dayNumber = index - firstDayofMonth + 1;
        const currentDate = new Date(currYear, currMonth, dayNumber);
        const currentMonthDayOfWeek = currentDate.getDay();
  
        // Check if the day is a Sunday
        if (currentMonthDayOfWeek === 0) {
          dateElement.classList.add("active");
        }
      }
    });
  });
  
  monthlyButton.addEventListener("click", () => {
    // Get all the date elements in the calendar
    const dateElements = document.querySelectorAll(".days li");
  
    // Loop through date elements and remove the "active" class from all
    dateElements.forEach(dateElement => {
      dateElement.classList.remove("active");
    });
  
    // Add the "active" class to the 1st day of the current month
    const firstDayIndex = Array.from(dateElements).findIndex(dateElement => {
      const dayNumber = parseInt(dateElement.textContent, 10);
      return !isNaN(dayNumber) && dayNumber === 1;
    });
  
    if (firstDayIndex >= 0) {
      dateElements[firstDayIndex].classList.add("active");
    }
  });

  yearlyButton.addEventListener("click", () => {
    // Get all the date elements in the calendar
    const dateElements = document.querySelectorAll(".days li");
  
    // Loop through date elements and remove the "active" class from all
    dateElements.forEach(dateElement => {
      dateElement.classList.remove("active");
    });
  
    // Add the "active" class to January 1st of the current year
    const januaryFirstIndex = Array.from(dateElements).findIndex(dateElement => {
      const dayNumber = parseInt(dateElement.textContent, 10);
      const currentMonthIndex = new Date(currYear, currMonth, 1).getMonth();
      return !isNaN(dayNumber) && dayNumber === 1 && currentMonthIndex === 0;
    });
  
    if (januaryFirstIndex >= 0) {
      dateElements[januaryFirstIndex].classList.add("active");
    }
  });
  
  