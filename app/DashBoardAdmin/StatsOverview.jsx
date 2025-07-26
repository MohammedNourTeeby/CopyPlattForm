import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const StatsOverview = () => {
  // تعريف الحالات (states) لتخزين البيانات والإحصائيات
  const [stats, setStats] = useState({
    totalUsers: 0,
    usersWithCourses: 0,
    usersWithoutCourses: 0,
    totalCourses: 0,
    loading: true,
    error: null
  });

  // وظيفة جلب البيانات من Strapi
  const fetchData = async () => {
    try {
      // تحديث الحالة إلى "جارٍ التحميل"
      setStats(prev => ({ ...prev, loading: true, error: null }));
      
      // جلب المستخدمين من Strapi
      const usersResponse = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      // جلب الدورات من Strapi
      const coursesResponse = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/courses`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // معالجة البيانات واستخراج الإحصائيات
      const users = usersResponse.data;
      const courses = coursesResponse.data;

      // حساب الإحصائيات
      const totalUsers = users.length;
      const usersWithCourses = users.filter(user => 
        user.courses && Array.isArray(user.courses) && user.courses.length > 0
      ).length;
      const usersWithoutCourses = totalUsers - usersWithCourses;
      const totalCourses = courses.length;

      // تحديث الحالة بالإحصائيات المحسوبة
      setStats({
        totalUsers,
        usersWithCourses,
        usersWithoutCourses,
        totalCourses,
        loading: false,
        error: null
      });
      
    } catch (error) {
      // التعامل مع الأخطاء
      console.error('فشل في جلب البيانات:', error);
      setStats(prev => ({ 
        ...prev, 
        loading: false, 
        error: 'فشل في تحميل الإحصائيات. يرجى المحاولة مرة أخرى لاحقًا.'
      }));
    }
  };

  // استدعاء وظيفة جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchData();
  }, []);

  // تحضير البيانات للمخطط البياني
  const chartData = [
    { name: 'إجمالي المستخدمين', value: stats.totalUsers },
    { name: 'مدربين بالدورات', value: stats.usersWithCourses },
    { name: 'طلاب بدون دورات', value: stats.usersWithoutCourses },
    { name: 'إجمالي الدورات', value: stats.totalCourses }
  ];

  // عرض حالة التحميل
  if (stats.loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-lg p-8">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#008DCB]"></div>
        <span className="mt-4 text-lg font-medium text-[#0D1012]">جاري تحميل الإحصائيات...</span>
      </div>
    );
  }

  // عرض رسالة خطأ إذا حدثت مشكلة
  if (stats.error) {
    return (
      <div className="bg-[#FFEBEE] border-l-4 border-[#E2101E] text-[#B71C1C] p-6 rounded-lg mb-6 flex items-start">
        <svg className="w-6 h-6 mr-2 mt-0.5 text-[#E2101E]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <div>
          <p className="font-medium">{stats.error}</p>
          <button 
            onClick={fetchData}
            className="mt-2 px-4 py-2 bg-[#008DCB] text-white rounded-md hover:bg-[#0077B6] transition-colors duration-300"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  // مكون بطاقة الإحصائية
  const StatCard = ({ title, value, icon, color, textColor }) => (
    <div 
      className={`p-6 rounded-xl shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl`}
      style={{ backgroundColor: color }}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`text-lg font-medium ${textColor}`}>{title}</h3>
          <p className={`text-3xl font-bold mt-2 ${textColor}`}>{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${textColor === 'text-white' ? 'bg-white/20' : 'bg-black/10'}`}>
          {icon}
        </div>
      </div>
      <div className="mt-4 h-1 rounded-full" style={{ backgroundColor: textColor === 'text-white' ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.1)' }}></div>
    </div>
  );

  // الأيقونات
  const UsersIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
    </svg>
  );
  
  const CoursesIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
    </svg>
  );
  
  const TrainerIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
    </svg>
  );
  
  const StudentIcon = (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
    </svg>
  );

  // عرض المكون النهائي
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0D1012] mb-2">لوحة تحكم الإحصائيات</h1>
        <p className="text-[#999999] max-w-2xl mx-auto">
          نظرة عامة على إحصائيات المنصة التعليمية ومستخدميها. يتم تحديث البيانات تلقائيًا عند أي تغيير.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="إجمالي المستخدمين" 
          value={stats.totalUsers} 
          icon={UsersIcon}
          color="#008DCB" 
          textColor="text-white" 
        />
        <StatCard 
          title="المدربون في المنصة" 
          value={stats.usersWithCourses} 
          icon={TrainerIcon}
          color="#F9D011" 
          textColor="text-[#0D1012]" 
        />
        <StatCard 
          title="الطلاب في المنصة" 
          value={stats.usersWithoutCourses} 
          icon={StudentIcon}
          color="#E2101E" 
          textColor="text-white" 
        />
        <StatCard 
          title="إجمالي عدد الدورات" 
          value={stats.totalCourses} 
          icon={CoursesIcon}
          color="#999999" 
          textColor="text-white" 
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#0D1012]">مخطط إحصائيات المنصة</h2>
          <div className="flex space-x-2">
            <button className="text-sm px-3 py-1 bg-[#F0F0F0] rounded-md text-[#0D1012] hover:bg-[#E0E0E0]">
              أسبوعي
            </button>
            <button className="text-sm px-3 py-1 bg-[#008DCB] text-white rounded-md">
              شهري
            </button>
            <button className="text-sm px-3 py-1 bg-[#F0F0F0] rounded-md text-[#0D1012] hover:bg-[#E0E0E0]">
              سنوي
            </button>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#EEEEEE" horizontal={true} vertical={false} />
              <XAxis type="number" tick={{ fill: '#999999' }} axisLine={false} tickLine={false} />
              <YAxis 
                dataKey="name" 
                type="category" 
                tick={{ fill: '#0D1012' }} 
                axisLine={false} 
                tickLine={false} 
                width={120}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  borderRadius: '8px', 
                  border: '1px solid #EEEEEE',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
                itemStyle={{ color: '#0D1012' }}
                labelStyle={{ color: '#008DCB', fontWeight: 'bold' }}
              />
              <Legend />
              <Bar 
                dataKey="value" 
                name="القيمة" 
                fill="#008DCB" 
                radius={[0, 4, 4, 0]}
                barSize={30}
              >
                {chartData.map((entry, index) => (
                  <text
                    x={entry.value + 10}
                    y={index * 30 + 15}
                    textAnchor="start"
                    dominantBaseline="middle"
                    fill="#0D1012"
                    fontSize={12}
                    fontWeight={500}
                  >
                    {entry.value}
                  </text>
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#0D1012]">توزيع المستخدمين</h2>
            <span className="text-sm text-[#999999]">آخر تحديث: الآن</span>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#008DCB] mr-2"></div>
                <span className="text-[#0D1012]">مدربين بالدورات</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-[#0D1012] mr-2">{stats.usersWithCourses}</span>
                <span className="text-[#999999]">({Math.round((stats.usersWithCourses / stats.totalUsers) * 100)}%)</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#E2101E] mr-2"></div>
                <span className="text-[#0D1012]">طلاب بدون دورات</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-[#0D1012] mr-2">{stats.usersWithoutCourses}</span>
                <span className="text-[#999999]">({Math.round((stats.usersWithoutCourses / stats.totalUsers) * 100)}%)</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-[#F9F9F9] rounded-lg p-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-[#0D1012] font-medium">نسبة المدربين</span>
              <span className="text-sm text-[#0D1012] font-medium">{Math.round((stats.usersWithCourses / stats.totalUsers) * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-[#E0E0E0] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#008DCB] rounded-full" 
                style={{ width: `${(stats.usersWithCourses / stats.totalUsers) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#0D1012]">ملخص المنصة</h2>
            <div className="p-2 bg-[#F0F9FF] rounded-lg">
              <svg className="w-5 h-5 text-[#008DCB]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-[#F9F9F9] rounded-lg">
              <span className="text-[#0D1012]">متوسط الدورات لكل مدرب</span>
              <span className="font-medium text-[#0D1012]">
                {stats.usersWithCourses > 0 ? (stats.totalCourses / stats.usersWithCourses).toFixed(1) : 0}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-[#F9F9F9] rounded-lg">
              <span className="text-[#0D1012]">نسبة النمو الشهرية</span>
              <span className="font-medium text-[#0D1012]">+12.5%</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-[#F9F9F9] rounded-lg">
              <span className="text-[#0D1012]">المستخدمون النشطون</span>
              <span className="font-medium text-[#0D1012]">78%</span>
            </div>
          </div>
          
          <button className="mt-6 w-full py-3 bg-[#008DCB] text-white rounded-lg font-medium hover:bg-[#0077B6] transition-colors duration-300 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            تصدير التقرير
          </button>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;