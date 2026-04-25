import { useState } from 'react'

const WeeklyMenu = ({ date, meals, recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  if (!meals) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mt-6">
        <p className="text-gray-500">식단을 선택해주세요.</p>
      </div>
    )
  }

  const renderMealCard = (mealType, meal) => {
    if (!meal) return null

    const recipe = recipes[meal.name?.split(' + ')[0]] || recipes[meal.name]

    return (
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800">
            {mealType === 'breakfast' ? '🌅 아침' : '🌙 저녁'}
          </h3>
          {recipe && (
            <button
              onClick={() => setSelectedRecipe({ ...recipe, name: meal.name })}
              className="text-blue-500 text-sm hover:underline"
            >
              레시피 보기
            </button>
          )}
        </div>
        <p className="font-semibold text-gray-700 mb-2">{meal.name}</p>
        {meal.ingredients && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">재료: </span>
            {meal.ingredients.join(', ')}
          </div>
        )}
        {meal.prepTime && (
          <div className="text-xs text-gray-500 mt-2">
            조리 시간: {meal.prepTime} + {meal.cookTime}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 mt-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📅 {date}일 식단
        </h2>
        {renderMealCard('breakfast', meals.breakfast)}
        {renderMealCard('dinner', meals.dinner)}
      </div>

      {selectedRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-lg w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{selectedRecipe.name}</h3>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-700">🥕 재료</h4>
                  <ul className="mt-2 space-y-1">
                    {selectedRecipe.ingredients?.map((ing, idx) => (
                      <li key={idx} className="text-gray-600 text-sm">• {ing}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700">📝 조리법</h4>
                  <ol className="mt-2 space-y-2">
                    {selectedRecipe.instructions?.split('\n').map((step, idx) => (
                      <li key={idx} className="text-gray-600 text-sm">
                        {idx + 1}. {step.replace(/^\d+\.\s*/, '')}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="flex gap-4 text-sm text-gray-500">
                  <span>준비: {selectedRecipe.prepTime}</span>
                  <span>조리: {selectedRecipe.cookTime}</span>
                  <span>난이도: {selectedRecipe.difficulty}</span>
                  <span>인분: {selectedRecipe.servings}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRecipe(null)}
                className="w-full mt-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default WeeklyMenu