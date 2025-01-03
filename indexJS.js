const menuHamburger = document.querySelector(".menu_burger");
const navLinks = document.querySelector(".nav_links");
const principalBody = document.querySelector(".principal_body")
 
menuHamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile_menu')
});

menuHamburger.addEventListener('click',()=>{
    principalBody.classList.toggle('overlay')
});

const videos = document.querySelectorAll('Video');

videos.forEach(video => {
    video.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement === video) {
            video.style.filter = 'none';
        } else {
            video.style.filter = '';
        }
    })
});

class Calendar {
    constructor() {
        this.currentDate = new Date();
        this.selectedDate = null;
        this.months = [
            "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin",
            "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
        ];
        
        this.initializeElements();
        this.setupEventListeners();
        this.renderCalendar();
    }

    initializeElements() {
        this.monthDisplay = document.getElementById('monthDisplay');
        this.daysGrid = document.getElementById('daysGrid');
        this.selectedDateDisplay = document.getElementById('selectedDate');
    }

    setupEventListeners() {
        document.getElementById('prevMonth').addEventListener('click', () => this.navigateMonth(-1));
        document.getElementById('nextMonth').addEventListener('click', () => this.navigateMonth(1));
    }

    navigateMonth(delta) {
        this.currentDate.setMonth(this.currentDate.getMonth() + delta);
        this.renderCalendar();
    }

    getDaysInMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    }

    getFirstDayOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    }

    renderCalendar() {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        this.monthDisplay.textContent = `${this.months[month]} ${year}`;
        this.daysGrid.innerHTML = '';

        const firstDay = this.getFirstDayOfMonth(this.currentDate);
        const daysInMonth = this.getDaysInMonth(this.currentDate);
        const today = new Date();

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement('div');
            this.daysGrid.appendChild(emptyDay);
        }

        // Add the days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayButton = document.createElement('button');
            dayButton.className = 'day';
            dayButton.textContent = day;

            const currentDate = new Date(year, month, day);
            
            if (currentDate.toDateString() === today.toDateString()) {
                dayButton.classList.add('today');
            }
            
            if (this.selectedDate && currentDate.toDateString() === this.selectedDate.toDateString()) {
                dayButton.classList.add('selected');
            }

            dayButton.addEventListener('click', () => this.selectDate(currentDate));
            this.daysGrid.appendChild(dayButton);
        }
    }

    // selectDate(date) {
    //     this.selectedDate = date;
    //     this.selectedDateDisplay.textContent = `Selected: ${date.toLocaleDateString()}`;
    //     this.renderCalendar();
    // }
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});

