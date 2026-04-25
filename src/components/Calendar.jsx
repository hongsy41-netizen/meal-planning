import { useState } from 'react'

const Calendar = ({ currentMonth, selectedDate, onDateClick, meals }) => {
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2"></div>)
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = d.toString().padStart(2, '0')
    const hasMeal = meals && meals[dateStr]
    const isSelected = selectedDate === dateStr
    days.push(
      <div
        key={d}
        onClick={() => onDateClick(dateStr)}
        className={`p-2 text-center cursor-pointer rounded-lg transition-colors
          ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}
          ${hasMeal ? 'font-bold' : 'text-gray-400'}
        `}
      >
        {d}
        {hasMeal && <div className="text-xs mt-1">식단 있음</div>}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-600">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days}
      </div>
    </div>
  )
}

export default Calendar