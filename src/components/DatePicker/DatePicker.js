import React, { useState, useEffect, useRef } from 'react';
import './DatePicker.css';

const DatePicker = ({ selectedDate, onChange, placeholder, disablePastDates }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [displayValue, setDisplayValue] = useState('');
    const datePickerRef = useRef(null);

    // Formater la date pour l'affichage
    const formatDate = (date) => {
        if (!date) return '';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Mettre à jour l'affichage de la date
    useEffect(() => {
        setDisplayValue(selectedDate ? formatDate(new Date(selectedDate)) : '');
        if (selectedDate) {
            setCurrentMonth(new Date(selectedDate));
        }
    }, [selectedDate]);

    // Fermer le calendrier lorsqu'on clique à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Générer les jours du mois
    const generateDays = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Premier jour du mois
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        // 0 = dimanche, donc on ajuste pour avoir lundi = 0
        const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        // Nombre de jours dans le mois
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const days = [];

        // Jours vides avant le premier jour du mois
        for (let i = 0; i < adjustedFirstDay; i++) {
            days.push(<div key={`empty-${i}`} className="day empty"></div>);
        }

        // Jours du mois
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            date.setHours(0, 0, 0, 0);
            const isSelected = selectedDate &&
                new Date(selectedDate).setHours(0,0,0,0) === date.setHours(0,0,0,0);

            const isPastDate = disablePastDates && date < today;

            days.push(
                <div
                    key={`day-${day}`}
                    className={`day ${isSelected ? 'selected' : ''} ${isPastDate ? 'disabled' : ''}`}
                    onClick={() => !isPastDate && handleSelectDate(date)}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const handlePreviousMonth = () => {
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);

        if (disablePastDates) {
            const today = new Date();
            const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
            if (newMonth < currentMonthStart) return;
        }

        setCurrentMonth(newMonth);
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleSelectDate = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();

        const formattedMonth = String(month + 1).padStart(2, '0');
        const formattedDay = String(day).padStart(2, '0');
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

        onChange(formattedDate);
        setIsOpen(false);
    };

    const handleClear = () => {
        onChange(null);
        setIsOpen(false);
    };

    const monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const dayNames = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];



    return (
        <div className="custom-datepicker" ref={datePickerRef}>
            <div className="datepicker-input" onClick={() => setIsOpen(!isOpen)}>
                <input
                    type="text"
                    value={displayValue}
                    readOnly
                    placeholder={placeholder || "Sélectionner une date"}
                />
                <span className="calendar-icon">📅</span>
            </div>

            {isOpen && (
                <div className="datepicker-dropdown">
                    <div className="datepicker-header">
                        <button onClick={handlePreviousMonth} className="month-nav">
                            &lt;
                        </button>
                        <div className="current-month">
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </div>
                        <button onClick={handleNextMonth} className="month-nav">
                            &gt;
                        </button>
                    </div>

                    <div className="datepicker-days-header">
                        {dayNames.map((day, index) => (
                            <div key={`header-${index}`} className="day-name">{day}</div>
                        ))}
                    </div>

                    <div className="datepicker-days">
                        {generateDays()}
                    </div>

                    <div className="datepicker-footer">
                        <button onClick={handleClear} className="clear-btn">
                            Effacer
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;