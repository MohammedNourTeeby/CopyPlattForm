"use client"
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { resetDashboardSelector } from '@/store/slices/authSlice';

const SelectDashboard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { availableDashboards } = useSelector((state) => state.auth);

  const handleSelect = (dashboard) => {
    dispatch(resetDashboardSelector());
    router.push(`/${dashboard}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            اختر لوحة التحكم المناسبة
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            لديك صلاحية الوصول إلى اللوحات التالية
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {availableDashboards.map((dashboard) => (
              <button
                key={dashboard}
                onClick={() => handleSelect(dashboard)}
                className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {dashboard.replace('DashBoard', 'لوحة ')}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectDashboard;
