import { useState } from 'react';

const CustomDatePicker = ({ selectedDate, onDateChange, onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const formattedDate = `${year}-${month}-${String(day).padStart(2, '0')}`;
    onDateChange(formattedDate);
    onClose();
  };

  const renderDays = () => {
    const totalDays = daysInMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const startDay = firstDayOfMonth(currentMonth.getMonth(), currentMonth.getFullYear());
    const days = [];

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-9 w-9"></div>);
    }

    for (let d = 1; d <= totalDays; d++) {
      const year = currentMonth.getFullYear();
      const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
      const dateStr = `${year}-${month}-${String(d).padStart(2, '0')}`;
      const isSelected = selectedDate === dateStr;
      const today = new Date();
      const isToday = d === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear();

      days.push(
        <button
          key={d}
          type="button"
          onClick={() => handleDateClick(d)}
          className={`h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition
            ${isSelected 
              ? 'bg-gold text-navy font-bold' 
              : isToday 
                ? 'border border-gold text-gold' 
                : 'text-navy dark:text-white hover:bg-gold/20'
            }
          `}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-darkCard rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700">
        
        {/* Header */}
        <div className="bg-navy p-4 flex justify-between items-center">
          <h3 className="text-white font-bold text-base">📅 Select Date</h3>
          <button 
            type="button"
            onClick={onClose} 
            className="text-white text-2xl hover:text-gold leading-none"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Month Navigation */}
          <div className="flex justify-between items-center mb-4 px-2">
            <button 
              type="button"
              onClick={handlePrevMonth} 
              className="text-navy dark:text-white text-xl font-bold hover:text-gold w-8 h-8 flex items-center justify-center rounded-full hover:bg-lightGray dark:hover:bg-darkBg"
            >
              ‹
            </button>
            <span className="text-navy dark:text-white font-bold text-sm">
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </span>
            <button 
              type="button"
              onClick={handleNextMonth} 
              className="text-navy dark:text-white text-xl font-bold hover:text-gold w-8 h-8 flex items-center justify-center rounded-full hover:bg-lightGray dark:hover:bg-darkBg"
            >
              ›
            </button>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-1 mb-2 justify-items-center">
            {dayNames.map((day) => (
              <div key={day} className="text-xs font-semibold text-gray-400 uppercase h-8 flex items-center justify-center w-9">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 justify-items-center">
            {renderDays()}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
          <button 
            type="button"
            onClick={() => { onDateChange(''); onClose(); }} 
            className="text-gray-500 font-semibold text-sm hover:text-navy dark:hover:text-white"
          >
            Clear
          </button>
          <button 
            type="button"
            onClick={onClose} 
            className="text-gold font-semibold text-sm hover:text-yellow-500"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default CustomDatePicker;