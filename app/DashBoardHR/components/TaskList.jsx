// components/TaskManagement.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PieController, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

// تسجيل مكونات المخططات
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement
);

export default function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    roleType: '',
    userId: ''
  });
  const [selectedTask, setSelectedTask] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks'); // 'tasks' أو 'analytics'

  // إعداد مثيل axios
  const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // جلب المهام
  const fetchTasks = async () => {
    try {
      setLoading(true);
      
      // بناء الاستعلام مع populate للعلاقات
      const params = new URLSearchParams({
        ...(filters.status && { 'filters[statu]': filters.status }),
        ...(filters.priority && { 'filters[priority]': filters.priority }),
        ...(filters.roleType && { 'filters[roleType]': filters.roleType }),
        ...(filters.userId && { 'filters[users_permissions_user][id]': filters.userId }),
        populate: 'users_permissions_user'
      });

      const response = await apiClient.get(`/tasks?${params.toString()}`);
      
      // معالجة البيانات مباشرة من هيكل Strapi كما هو مقدم
      const formattedTasks = response.data.data.map(task => ({
        id: task.id,
        ...task
      }));
      
      setTasks(formattedTasks);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      
      if (err.response?.status === 401) {
        setError('يجب تسجيل الدخول أولاً لعرض المهام');
      } else {
        setError('فشل تحميل المهام. يرجى التحقق من الاتصال أو الصلاحيات.');
      }
    } finally {
      setLoading(false);
    }
  };

  // عرض تفاصيل مهمة
  const viewTaskDetails = (task) => {
    setSelectedTask(task);
    setShowDetailModal(true);
  };

  // إغلاق نافذة التفاصيل
  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTask(null);
  };

  // تحويل حالة المهمة إلى العربية
  const getStatusArabic = (status) => {
    switch(status) {
      case 'todo': return 'قيد الانتظار';
      case 'inProgress': return 'قيد التنفيذ';
      case 'done': return 'منتهية';
      default: return status;
    }
  };

  // تحويل أولوية المهمة إلى العربية
  const getPriorityArabic = (priority) => {
    switch(priority) {
      case 'critical': return 'حرجة';
      case 'high': return 'عالية';
      case 'medium': return 'متوسطة';
      case 'low': return 'منخفضة';
      default: return priority;
    }
  };

  // تحويل نوع المهمة إلى العربية
  const getRoleTypeArabic = (roleType) => {
    switch(roleType) {
      case 'technician': return 'فني';
      case 'support': return 'دعم فني';
      case 'management': return 'إدارة';
      case 'quality': return 'جودة';
      default: return roleType;
    }
  };

  // إعداد بيانات المخطط العمودي (المهام حسب الحالة)
  const tasksByStatusData = {
    labels: ['قيد الانتظار', 'قيد التنفيذ', 'منتهية'],
    datasets: [{
      label: 'عدد المهام',
      data: [
        tasks.filter(t => t.statu === 'todo').length,
        tasks.filter(t => t.statu === 'inProgress').length,
        tasks.filter(t => t.statu === 'done').length
      ],
      backgroundColor: [
        'rgba(249, 208, 17, 0.7)',
        'rgba(0, 141, 203, 0.7)',
        'rgba(153, 153, 153, 0.7)'
      ],
      borderColor: [
        'rgba(249, 208, 17, 1)',
        'rgba(0, 141, 203, 1)',
        'rgba(153, 153, 153, 1)'
      ],
      borderWidth: 1
    }]
  };

  // إعداد بيانات المخطط الدائري (التوزيع حسب الأولوية)
  const tasksByPriorityData = {
    labels: ['حرجة', 'عالية', 'متوسطة', 'منخفضة'],
    datasets: [{
      label: 'توزيع المهام',
      data: [
        tasks.filter(t => t.priority === 'critical').length,
        tasks.filter(t => t.priority === 'high').length,
        tasks.filter(t => t.priority === 'medium').length,
        tasks.filter(t => t.priority === 'low').length
      ],
      backgroundColor: [
        'rgba(226, 16, 30, 0.7)',
        'rgba(249, 208, 17, 0.7)',
        'rgba(0, 141, 203, 0.7)',
        'rgba(153, 153, 153, 0.7)'
      ],
      borderColor: [
        'rgba(226, 16, 30, 1)',
        'rgba(249, 208, 17, 1)',
        'rgba(0, 141, 203, 1)',
        'rgba(153, 153, 153, 1)'
      ],
      borderWidth: 1
    }]
  };

  // تصدير البيانات إلى CSV
  const exportToCSV = () => {
    const csvRows = [
      ['العنوان', 'الوصف', 'الأولوية', 'النوع', 'الحالة', 'اسم المستخدم', 'البريد الإلكتروني', 'تاريخ الاستحقاق'].join(','),
      ...tasks.map(task => 
        [
          `"${task.title}"`,
          `"${task.description}"`,
          getPriorityArabic(task.priority),
          getRoleTypeArabic(task.roleType),
          getStatusArabic(task.statu),
          `"${task.users_permissions_user?.data?.username || ''}"`,
          `"${task.users_permissions_user?.data?.email || ''}"`,
          new Date(task.dueDate).toLocaleDateString('ar-SA')
        ].join(',')
      )
    ];
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([`\uFEFF${csvString}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'المهام.csv';
    link.click();
  };

  // تكوين خيارات المخططات
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Tajawal, sans-serif',
            size: 12
          },
          color: '#0D1012'
        }
      },
      title: {
        display: true,
        text: 'تحليل المهام',
        font: {
          family: 'Tajawal, sans-serif',
          size: 16,
          weight: 'bold'
        },
        color: '#0D1012',
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        titleFont: {
          family: 'Tajawal, sans-serif',
          size: 12
        },
        bodyFont: {
          family: 'Tajawal, sans-serif',
          size: 12
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            family: 'Tajawal, sans-serif',
            size: 11
          },
          color: '#0D1012'
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        }
      },
      y: {
        ticks: {
          font: {
            family: 'Tajawal, sans-serif',
            size: 11
          },
          color: '#0D1012'
        },
        grid: {
          color: 'rgba(0,0,0,0.05)'
        },
        beginAtZero: true
      }
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#008DCB]"></div>
      <span className="ml-4 text-lg text-[#0D1012]">جاري التحميل...</span>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-[#E2101E] text-white p-6 rounded-lg shadow-lg max-w-md text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl font-bold">{error}</p>
        <button 
          onClick={fetchTasks} 
          className="mt-4 bg-white text-[#E2101E] px-4 py-2 rounded-md font-medium hover:bg-gray-100 transition-colors"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* شريط التنقل العلوي */}
      <div className="bg-[#008DCB] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">نظام إدارة المهام</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-white text-[#008DCB] px-3 py-1 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors">
              ملف التعريف
            </button>
            <button className="bg-[#F9D011] text-[#0D1012] px-3 py-1 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors">
              تسجيل الخروج
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* عنوان الصفحة */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#0D1012]">لوحة تحكم إدارة المهام</h1>
          <p className="text-[#999999] mt-2">عرض وتحليل المهام وتنفيذ التقارير</p>
        </div>

        {/* أزرار التبويب */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-[#f0f0f0] rounded-lg p-1">
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'tasks' 
                  ? 'bg-[#008DCB] text-white' 
                  : 'text-[#0D1012] hover:bg-[#e0e0e0]'
              }`}
              onClick={() => setActiveTab('tasks')}
            >
              قائمة المهام
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'analytics' 
                  ? 'bg-[#008DCB] text-white' 
                  : 'text-[#0D1012] hover:bg-[#e0e0e0]'
              }`}
              onClick={() => setActiveTab('analytics')}
            >
              التحليلات والإحصائيات
            </button>
          </div>
        </div>

        {/* الفلاتر */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-[#e0e0e0]">
          <h2 className="text-xl font-semibold text-[#0D1012] mb-4">تصفية المهام</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#0D1012] mb-1">الحالة</label>
              <select 
                className="w-full p-2 border border-[#999999] rounded-md focus:ring-2 focus:ring-[#008DCB] focus:border-transparent"
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
              >
                <option value="">جميع الحالات</option>
                <option value="todo">قيد الانتظار</option>
                <option value="inProgress">قيد التنفيذ</option>
                <option value="done">منتهية</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0D1012] mb-1">الأولوية</label>
              <select 
                className="w-full p-2 border border-[#999999] rounded-md focus:ring-2 focus:ring-[#008DCB] focus:border-transparent"
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
              >
                <option value="">جميع الأولويات</option>
                <option value="critical">حرجة</option>
                <option value="high">عالية</option>
                <option value="medium">متوسطة</option>
                <option value="low">منخفضة</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0D1012] mb-1">النوع</label>
              <select 
                className="w-full p-2 border border-[#999999] rounded-md focus:ring-2 focus:ring-[#008DCB] focus:border-transparent"
                value={filters.roleType}
                onChange={(e) => setFilters({...filters, roleType: e.target.value})}
              >
                <option value="">جميع الأدوار</option>
                <option value="technician">فني</option>
                <option value="support">دعم فني</option>
                <option value="management">إدارة</option>
                <option value="quality">جودة</option>
              </select>
            </div>

            <div className="flex items-end">
              <button 
                className="w-full bg-[#008DCB] hover:bg-[#0074ad] text-white p-2 rounded-md transition-colors flex items-center justify-center"
                onClick={exportToCSV}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                تصدير إلى CSV
              </button>
            </div>
          </div>
        </div>

        {activeTab === 'analytics' && (
          <div className="mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* مخطط المهام حسب الحالة */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-[#e0e0e0]">
                <h3 className="text-lg font-semibold text-[#0D1012] mb-4">توزيع المهام حسب الحالة</h3>
                <div className="h-80">
                  <Bar options={chartOptions} data={tasksByStatusData} />
                </div>
              </div>
              
              {/* مخطط المهام حسب الأولوية */}
              <div className="bg-white rounded-xl shadow-md p-6 border border-[#e0e0e0]">
                <h3 className="text-lg font-semibold text-[#0D1012] mb-4">توزيع المهام حسب الأولوية</h3>
                <div className="h-80">
                  <Pie options={chartOptions} data={tasksByPriorityData} />
                </div>
              </div>
            </div>

            {/* بطاقات الإحصائيات */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
              <div className="bg-gradient-to-r from-[#008DCB] to-[#00a6ff] text-white rounded-xl shadow-md p-5">
                <div className="text-3xl font-bold">{tasks.length}</div>
                <div className="mt-2">إجمالي المهام</div>
                <div className="mt-3 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#F9D011] to-[#ffdf4a] text-[#0D1012] rounded-xl shadow-md p-5">
                <div className="text-3xl font-bold">
                  {tasks.filter(t => t.statu === 'inProgress').length}
                </div>
                <div className="mt-2">المهام قيد التنفيذ</div>
                <div className="mt-3 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#999999] to-[#b3b3b3] text-white rounded-xl shadow-md p-5">
                <div className="text-3xl font-bold">
                  {tasks.filter(t => t.priority === 'critical').length}
                </div>
                <div className="mt-2">مهام حرجة</div>
                <div className="mt-3 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-[#E2101E] to-[#ff2a39] text-white rounded-xl shadow-md p-5">
                <div className="text-3xl font-bold">
                  {tasks.filter(t => new Date(t.dueDate) < new Date() && t.statu !== 'done').length}
                </div>
                <div className="mt-2">مهام متأخرة</div>
                <div className="mt-3 flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-[#e0e0e0]">
            {/* جدول العرض */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-[#008DCB] text-white">
                  <tr>
                    <th className="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">العنوان</th>
                    <th className="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">الوصف</th>
                    <th className="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">الأولوية</th>
                    <th className="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">النوع</th>
                    <th className="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">الحالة</th>
                    <th className="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">المستخدم</th>
                    <th className="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">تاريخ الاستحقاق</th>
                    <th className="px-6 py-3 text-right text-sm font-medium uppercase tracking-wider">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e0e0e0]">
                  {tasks.map((task) => (
                    <tr key={task.id} className="hover:bg-[#f9f9f9]">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#0D1012]">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0D1012]">
                        <div className="max-w-xs truncate">{task.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.priority === 'critical' ? 'bg-[#E2101E] text-white' :
                          task.priority === 'high' ? 'bg-[#F9D011] text-[#0D1012]' :
                          task.priority === 'medium' ? 'bg-[#008DCB] text-white' :
                          'bg-[#999999] text-white'
                        }`}>
                          {getPriorityArabic(task.priority)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0D1012]">
                        {getRoleTypeArabic(task.roleType)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          task.statu === 'todo' ? 'bg-[#999999] text-white' :
                          task.statu === 'inProgress' ? 'bg-[#008DCB] text-white' :
                          'bg-[#0D1012] text-white'
                        }`}>
                          {getStatusArabic(task.statu)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0D1012]">
                        {task.users_permissions_user?.username || 'غير متوفر'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#0D1012]">
                        <div className={`${
                          new Date(task.dueDate) < new Date() && task.statu !== 'done' 
                            ? 'text-[#E2101E] font-bold' 
                            : 'text-[#0D1012]'
                        }`}>
                          {new Date(task.dueDate).toLocaleDateString('ar-SA')}
                          {new Date(task.dueDate) < new Date() && task.statu !== 'done' && (
                            <span className="ml-1 animate-pulse">!</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          onClick={() => viewTaskDetails(task)}
                          className="text-[#008DCB] hover:text-[#0074ad] transition-colors flex items-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          التفاصيل
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* حالة عدم وجود بيانات */}
            {tasks.length === 0 && (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-[#999999]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-4 text-lg text-[#0D1012]">لا توجد مهام مطابقة للبحث</p>
                <p className="text-[#999999]">حاول تغيير معايير التصفية الخاصة بك</p>
              </div>
            )}

            {/* ترقيم الصفحات */}
            {tasks.length > 0 && (
              <div className="px-6 py-4 bg-[#f9f9f9] border-t border-[#e0e0e0] flex justify-between items-center">
                <div className="text-sm text-[#0D1012]">
                  عرض <span className="font-medium">1</span> إلى <span className="font-medium">10</span> من <span className="font-medium">{tasks.length}</span> مهام
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 rounded-md bg-white border border-[#e0e0e0] text-[#0D1012] hover:bg-[#f0f0f0]">
                    السابق
                  </button>
                  <button className="px-3 py-1 rounded-md bg-[#008DCB] text-white">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-md bg-white border border-[#e0e0e0] text-[#0D1012] hover:bg-[#f0f0f0]">
                    التالي
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* نافذة تفاصيل المهمة */}
        {showDetailModal && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center p-5 bg-[#008DCB] text-white rounded-t-xl">
                <h2 className="text-xl font-bold">تفاصيل المهمة</h2>
                <button 
                  onClick={closeDetailModal} 
                  className="text-white hover:text-gray-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#f9f9f9] p-4 rounded-lg">
                    <h3 className="font-semibold text-[#0D1012] text-lg border-b pb-2 mb-3">معلومات المهمة</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-[#999999]">العنوان:</h4>
                        <p className="text-[#0D1012]">{selectedTask.title}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-[#999999]">الحالة:</h4>
                        <p className="text-[#0D1012]">{getStatusArabic(selectedTask.statu)}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-[#999999]">الأولوية:</h4>
                        <p className="text-[#0D1012]">{getPriorityArabic(selectedTask.priority)}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-[#999999]">النوع:</h4>
                        <p className="text-[#0D1012]">{getRoleTypeArabic(selectedTask.roleType)}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-[#999999]">تاريخ الإنشاء:</h4>
                        <p className="text-[#0D1012]">{new Date(selectedTask.createdAt).toLocaleString('ar-SA')}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-[#999999]">تاريخ الاستحقاق:</h4>
                        <p className={`${
                          new Date(selectedTask.dueDate) < new Date() && selectedTask.statu !== 'done' 
                            ? 'text-[#E2101E] font-bold' 
                            : 'text-[#0D1012]'
                        }`}>
                          {new Date(selectedTask.dueDate).toLocaleString('ar-SA')}
                          {new Date(selectedTask.dueDate) < new Date() && selectedTask.statu !== 'done' && (
                            <span className="ml-2 text-xs bg-[#E2101E] text-white px-2 py-1 rounded-full">متأخرة</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-[#f9f9f9] p-4 rounded-lg">
                    <h3 className="font-semibold text-[#0D1012] text-lg border-b pb-2 mb-3">وصف المهمة</h3>
                    <p className="text-[#0D1012] leading-relaxed">
                      {selectedTask.description || 'لا يوجد وصف لهذه المهمة'}
                    </p>
                  </div>
                  
                  <div className="md:col-span-2 bg-[#f9f9f9] p-4 rounded-lg">
                    <h3 className="font-semibold text-[#0D1012] text-lg border-b pb-2 mb-3">المستخدم المسؤول</h3>
                    {selectedTask.users_permissions_user ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                          <div className="ml-4">
                            <p className="font-bold text-[#0D1012]">{selectedTask.users_permissions_user.username}</p>
                            <p className="text-[#999999]">{selectedTask.users_permissions_user.email}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex">
                            <span className="w-32 text-[#999999]">الحالة:</span>
                            <span className="text-[#0D1012]">
                              {selectedTask.users_permissions_user.confirmed ? 'مؤكد' : 'غير مؤكد'}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-32 text-[#999999]">الحظر:</span>
                            <span className="text-[#0D1012]">
                              {selectedTask.users_permissions_user.blocked ? 'محظور' : 'غير محظور'}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-32 text-[#999999]">الوظيفة:</span>
                            <span className="text-[#0D1012]">
                              {selectedTask.users_permissions_user.jobTitle || 'غير محدد'}
                            </span>
                          </div>
                          <div className="flex">
                            <span className="w-32 text-[#999999]">القسم:</span>
                            <span className="text-[#0D1012]">
                              {selectedTask.users_permissions_user.department || 'غير محدد'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[#0D1012]">لا يوجد مستخدم مرتبط</p>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t flex justify-end space-x-3">
                <button 
                  onClick={closeDetailModal}
                  className="bg-[#999999] hover:bg-[#808080] text-white px-6 py-2 rounded-lg transition-colors"
                >
                  إغلاق
                </button>
                <button 
                  className="bg-[#008DCB] hover:bg-[#0074ad] text-white px-6 py-2 rounded-lg transition-colors"
                >
                  تعديل المهمة
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}