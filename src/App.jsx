import { useState, useEffect, useMemo } from 'react'
import Calendar from './components/Calendar'
import WeeklyMenu from './components/WeeklyMenu'
import ShoppingList from './components/ShoppingList'
import './App.css'
import mealsData from './data/meals.json'
import recipesData from './data/recipes.json'

const getWeekDays = (year, month, selectedDate) => {
  const days = []
  const firstDay = new Date(year, month - 1, 1).getDay()
  const selectedDay = parseInt(selectedDate)
  const weekStart = selectedDay - (selectedDay + firstDay - 1) % 7
  
  for (let i = 0; i < 7; i++) {
    const day = weekStart + i
    if (day > 0 && day <= new Date(year, month, 0).getDate()) {
      days.push(day.toString().padStart(2, '0'))
    }
  }
  return days
}

const mergeIngredients = (ingredientsList) => {
  const merged = {}
  ingredientsList.forEach(items => {
    if (items && Array.isArray(items)) {
      items.forEach(item => {
        merged[item] = (merged[item] || 0) + 1
      })
    }
  })
  return Object.entries(merged).map(([name, count]) => ({
    name,
    count: count > 1 ? `${count}일치` : ''
  }))
}

function App() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [shoppingList, setShoppingList] = useState([])

  const currentMeals = mealsData[currentMonth.getFullYear()]
    ?.['' + (currentMonth.getMonth() + 1).toString().padStart(2, '0')]

  const weekDays = useMemo(() => {
    if (!selectedDate || !currentMeals) return []
    return getWeekDays(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      selectedDate
    )
  }, [selectedDate, currentMonth, currentMeals])

  const weekIngredients = useMemo(() => {
    if (!weekDays.length || !currentMeals) return []
    const allIngredients = []
    weekDays.forEach(day => {
      const dayMeals = currentMeals[day]
      if (dayMeals) {
        allIngredients.push(dayMeals.breakfast?.ingredients)
        allIngredients.push(dayMeals.dinner?.ingredients)
      }
    })
    return mergeIngredients(allIngredients)
  }, [weekDays, currentMeals])

  useEffect(() => {
    setShoppingList(weekIngredients)
  }, [weekIngredients])

  const handleDateClick = (date) => {
    setSelectedDate(date)
  }

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
    setSelectedDate(null)
  }

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
    setSelectedDate(null)
  }

  const handleAddToStore = (ingredient) => {
    console.log('Adding to store:', ingredient)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            가족 식단 플래너
          </h1>
          <p className="text-gray-600 mt-2">
            {currentMonth.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
          </p>
        </header>

        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={handlePrevMonth}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            ◀ 이전월
          </button>
          <button
            onClick={handleNextMonth}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            다음월 ▶
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Calendar
              currentMonth={currentMonth}
              selectedDate={selectedDate}
              onDateClick={handleDateClick}
              meals={currentMeals}
            />
          </div>

          <div className="lg:col-span-1">
            <ShoppingList
              shoppingList={shoppingList}
              onAddToStore={handleAddToStore}
              weekLabel={selectedDate ? `${weekDays[0]}~${weekDays[weekDays.length-1]}일` : ''}
            />
          </div>
        </div>

        {selectedDate && currentMeals && (
          <WeeklyMenu
            date={selectedDate}
            meals={currentMeals[selectedDate]}
            recipes={recipesData}
          />
        )}
      </div>
    </div>
  )
}

export default App