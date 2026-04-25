import { buildCoupangSearchURL } from '../utils/api/coupang';
import { buildEmartSearchURL } from '../utils/api/emart';

const ShoppingList = ({ shoppingList, onAddToStore, weekLabel }) => {
  const formatName = (item) => {
    if (typeof item === 'string') return item
    return item?.name + (item?.count || '')
  }

  if (!shoppingList || shoppingList.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">장보기 리스트</h2>
        <p className="text-gray-500">식단을 선택하면 장보기 리스트가 생성됩니다.</p>
      </div>
    );
  }

  const items = shoppingList.map(item => typeof item === 'string' ? item : item.name).filter(Boolean)

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">장보기 리스트</h2>
      {weekLabel && <p className="text-sm text-blue-600 mb-4">{weekLabel}</p>}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <span className="text-gray-700">{item}</span>
            <div className="flex space-x-2">
              <button
                onClick={() => window.open(buildCoupangSearchURL(item), '_blank')}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
              >
                쿠팡
              </button>
              <button
                onClick={() => window.open(buildEmartSearchURL(item), '_blank')}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
              >
                이-Mart
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-gray-500">
        * 선택한 날짜를 포함한 주간의 재료를 통합했습니다.
      </div>
    </div>
  );
};

export default ShoppingList;