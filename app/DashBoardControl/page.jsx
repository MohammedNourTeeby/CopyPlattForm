import React from 'react'
import Link from 'next/link'
import { FaUserCog, FaUsers, FaChartLine, FaBullhorn } from 'react-icons/fa'

export default function ControlPanelPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Header Section */}
      <header className="w-full max-w-4xl mb-10">
        <div className="flex justify-between items-center py-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">إ</span>
            </div>
            <h1 className="text-xl font-bold text-[#0D1012]">نظام الإدارة المتكامل</h1>
          </div>
          
          <div className="flex space-x-3">
            <button className="text-sm bg-gray-100 text-[#0D1012] px-3 py-1 rounded-full hover:bg-gray-200 transition">
              الإعدادات
            </button>
            <button className="text-sm bg-gray-100 text-[#0D1012] px-3 py-1 rounded-full hover:bg-gray-200 transition">
              المساعدة
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0D1012] mb-3">لوحة تحكم الإدارة</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            إدارة كافة جوانب مؤسستك من خلال لوحات التحكم المتخصصة. اختر القسم الذي تريد إدارته.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* مدير */}
          <Link 
            href="/DashBoardAdmin" 
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6 flex items-start">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <FaUserCog className="text-blue-600 text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#0D1012] mb-1">لوحة تحكم المدير</h2>
                <p className="text-gray-600 text-sm">
                  الوصول الكامل إلى إحصائيات المؤسسة والإدارة الشاملة
                </p>
              </div>
              <div className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                مدير
              </div>
            </div>
            <div className="bg-blue-50 px-6 py-3 border-t border-gray-100 text-blue-600 text-sm flex items-center">
              <span>الوصول إلى التقارير الشاملة</span>
              <span className="mr-auto text-xs bg-blue-100 px-2 py-1 rounded">مميز</span>
            </div>
          </Link>

          {/* الموارد البشرية */}
          <Link 
            href="/DashBoardHR" 
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6 flex items-start">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                <FaUsers className="text-yellow-500 text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#0D1012] mb-1">لوحة تحكم الموارد البشرية</h2>
                <p className="text-gray-600 text-sm">
                  إدارة الموظفين، الرواتب، الإجازات والتقييمات
                </p>
              </div>
              <div className="bg-yellow-500 text-[#0D1012] text-xs px-2 py-1 rounded-full">
                HR
              </div>
            </div>
            <div className="bg-yellow-50 px-6 py-3 border-t border-gray-100 text-yellow-700 text-sm">
              12 مهمة جديدة تحتاج للمراجعة
            </div>
          </Link>

          {/* المالية */}
          <Link 
            href="/DashBoardFinicial" 
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6 flex items-start">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <FaChartLine className="text-red-600 text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#0D1012] mb-1">لوحة تحكم المالية</h2>
                <p className="text-gray-600 text-sm">
                  تتبع الإيرادات، المصروفات، الفواتير والميزانيات
                </p>
              </div>
              <div className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                مال
              </div>
            </div>
            <div className="bg-red-50 px-6 py-3 border-t border-gray-100 text-red-700 text-sm flex items-center">
              <span>آخر تحديث: اليوم 10:30 ص</span>
              <span className="mr-auto text-xs bg-red-100 px-2 py-1 rounded text-red-800">
                3 تنبيهات
              </span>
            </div>
          </Link>

          {/* التسويق */}
          <Link 
            href="/DashBoardMarketing" 
            className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="p-6 flex items-start">
              <div className="bg-gray-200 p-3 rounded-lg mr-4">
                <FaBullhorn className="text-gray-700 text-2xl" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-[#0D1012] mb-1">لوحة تحكم التسويق</h2>
                <p className="text-gray-600 text-sm">
                  إدارة الحملات التسويقية، التحليلات والعملاء
                </p>
              </div>
              <div className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">
                تسويق
              </div>
            </div>
            <div className="bg-gray-100 px-6 py-3 border-t border-gray-200 text-gray-700 text-sm">
              حملة جديدة قيد التنفيذ
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
            <p className="text-blue-600 text-sm font-medium">المستخدمون النشطون</p>
            <p className="text-2xl font-bold text-[#0D1012]">142</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
            <p className="text-yellow-700 text-sm font-medium">المهام المكتملة</p>
            <p className="text-2xl font-bold text-[#0D1012]">89%</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-100">
            <p className="text-red-700 text-sm font-medium">الإيرادات اليوم</p>
            <p className="text-2xl font-bold text-[#0D1012]">$24.2k</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
            <p className="text-gray-700 text-sm font-medium">متوسط الاستجابة</p>
            <p className="text-2xl font-bold text-[#0D1012]">28m</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-4xl mt-12 pt-6 border-t border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 text-sm">
            © 2023 نظام الإدارة المتكامل. جميع الحقوق محفوظة.
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <button className="text-gray-600 hover:text-blue-600 transition">
              الشروط والأحكام
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition">
              الخصوصية
            </button>
            <button className="text-gray-600 hover:text-blue-600 transition">
              الدعم
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}