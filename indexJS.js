// Code pour le menu-burger

const menuHamburger = document.querySelector(".menu_burger");
const navLinks = document.querySelector(".nav_links");
const principalBody = document.querySelector(".principal_body")
const bodyScroll = document.querySelector("body");
 
menuHamburger.addEventListener('click',()=>{
    navLinks.classList.toggle('mobile_menu')
});

menuHamburger.addEventListener('click',()=>{
    principalBody.classList.toggle('overlay')
});

// Code pour bloquer le scroll à l'ouverture du menu-burger

menuHamburger.addEventListener('click', ()=>{
    bodyScroll.classList.toggle('no_scroll')
});

// Code pour un pseudo carousel

const container = document.querySelector('.carouselle'); // Sélectionnez l'élément conteneur
const rightButton = document.querySelector('.move-right'); // Bouton pour défiler à droite
const leftButton = document.querySelector('.move-left'); // Bouton pour défiler à gauche
let scrollAmount = 380; // Distance à défiler en pixels

container.style.scrollBehavior = 'smooth';

function handleScroll(button) {
    if (button === rightButton) {
        container.scrollLeft += scrollAmount;
    } else {
        container.scrollLeft -= scrollAmount;
    }
}

rightButton.addEventListener('click', () => handleScroll(rightButton));
leftButton.addEventListener('click', () => handleScroll(leftButton));

// Code pour annuler le flou de la video sur grand écrant au passage de la souris 

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

// Code pour calendrier

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
}

// Initialize the calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calendar();
});

