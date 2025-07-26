import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationSystem = () => {
  // حالات المكون
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('general');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const [emailContent, setEmailContent] = useState('');

  // جلب المستخدمين من Strapi
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // بناء استعلام Strapi باستخدام qs
      const qs = require('qs');
      const query = qs.stringify(
        {
          // فلترة المستخدمين بالدور "authenticated"
          filters: {
            role: {
              type: {
                $eq: 'authenticated'
              }
            }
          },
          // تحديد الحقول المراد استردادها
          fields: ['username', 'email'],
          // استرداد العلاقات
          populate: {
            role: {
              fields: ['type']
            }
          }
        },
        {
          encodeValuesOnly: true
        }
      );
      
      // جلب البيانات من Strapi
      const response = await axios.get(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/users?${query}`);
      
      // تحديث حالة المستخدمين
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('فشل في جلب المستخدمين:', err);
      setError('فشل في تحميل المستخدمين. يرجى المحاولة مرة أخرى.');
      setLoading(false);
    }
  };

  // معالجة تغيير حالة اختيار المستخدم
  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId) 
        : [...prev, userId]
    );
  };

  // معالجة إرسال الإشعار
  const handleSendNotification = async (e) => {
    e.preventDefault();
    
    if (!message || selectedUsers.length === 0) {
      setError('يرجى إدخال رسالة واختيار مستخدمين على الأقل');
      return;
    }

    try {
      setSuccessMessage('');
      setError(null);
      
      // إرسال الإشعار إلى المستخدمين المختارين
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/notifications`,
        {
          data: {
            message,
            type,
            sendEmail, // خيار إرسال البريد
            emailContent, // محتوى البريد
            users_permissions_users: selectedUsers // مصفوفة من المعرفات
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      
      // إعادة تعيين النموذج
      setMessage('');
      setType('general');
      setSendEmail(false);
      setEmailContent('');
      setSelectedUsers([]);
      
      // رسالة النجاح
      const baseMessage = `تم إرسال الإشعار بنجاح إلى ${selectedUsers.length} مستخدمين`;
      const emailMessage = sendEmail ? ' وتم إرسال البريد الإلكتروني' : '';
      setSuccessMessage(baseMessage + emailMessage);
    } catch (err) {
      console.error('فشل في إرسال الإشعار:', err);
      
      // معالجة الأخطاء بدقة
      if (err.response) {
        console.error('بيانات الخطأ:', err.response.data);
        setError(`فشل في إرسال الإشعار: ${err.response.data.error?.message || 'طلبية خاطئة'}`);
      } else if (err.request) {
        console.error('لم يتم استلام استجابة من الخادم');
        setError('فشل في الاتصال بالخادم. يرجى التحقق من اتصالك بالإنترنت.');
      } else {
        console.error('خطأ في إعداد الطلبية:', err.message);
        setError('فشل في إرسال الإشعار. يرجى المحاولة مرة أخرى.');
      }
    }
  };

  // تحميل المستخدمين عند تحميل المكون
  useEffect(() => {
    fetchUsers();
  }, []);

  // عرض حالة التحميل
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 min-h-[50vh]">
        <div 
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" 
          style={{ borderColor: '#008DCB' }}
        ></div>
        <span className="ml-3 text-[#0D1012]">جاري تحميل المستخدمين...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div 
          className="py-6 px-4 md:px-8"
          style={{ background: 'linear-gradient(90deg, #008DCB 0%, #006A9E 100%)' }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-center text-white">
            نظام إدارة الإشعارات
          </h1>
        </div>
        
        <div className="p-4 md:p-8">
          {/* رسالة الخطأ */}
          {error && (
            <div 
              className="mb-6 p-4 rounded-lg border-l-4 flex items-start"
              style={{ 
                backgroundColor: 'rgba(226, 16, 30, 0.08)', 
                borderColor: '#E2101E',
                borderLeftWidth: '4px'
              }}
            >
              <svg 
                className="w-6 h-6 mt-0.5 mr-2 flex-shrink-0" 
                style={{ color: '#E2101E' }} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-[#E2101E]">{error}</p>
            </div>
          )}
          
          {/* رسالة النجاح */}
          {successMessage && (
            <div 
              className="mb-6 p-4 rounded-lg border-l-4 flex items-start"
              style={{ 
                backgroundColor: 'rgba(0, 141, 203, 0.08)', 
                borderColor: '#008DCB',
                borderLeftWidth: '4px'
              }}
            >
              <svg 
                className="w-6 h-6 mt-0.5 mr-2 flex-shrink-0" 
                style={{ color: '#008DCB' }} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-[#008DCB]">{successMessage}</p>
            </div>
          )}
          
          {/* نموذج إرسال الإشعار */}
          <form 
            onSubmit={handleSendNotification} 
            className="mb-8 p-6 rounded-xl border"
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: 'rgba(153, 153, 153, 0.2)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <h2 className="text-xl font-bold mb-6 pb-2 border-b" style={{ borderColor: 'rgba(153, 153, 153, 0.3)', color: '#0D1012' }}>
              إرسال إشعار جديد
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2" style={{ color: '#0D1012' }}>
                  محتوى الرسالة *
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                  style={{ 
                    borderColor: 'rgba(153, 153, 153, 0.5)',
                    backgroundColor: '#FFFFFF',
                    minHeight: '120px',
                    color: '#0D1012',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
                    focusBorderColor: '#008DCB',
                    focusRingColor: 'rgba(0, 141, 203, 0.2)'
                  }}
                  placeholder="أدخل محتوى الإشعار هنا..."
                ></textarea>
              </div>
              
              <div>
                <div className="mb-6">
                  <label htmlFor="type" className="block text-sm font-medium mb-2" style={{ color: '#0D1012' }}>
                    نوع الإشعار
                  </label>
                  <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all appearance-none"
                    style={{ 
                      borderColor: 'rgba(153, 153, 153, 0.5)',
                      backgroundColor: '#FFFFFF',
                      color: '#0D1012',
                      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23999' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '16px 12px'
                    }}
                  >
                    <option value="general">عام</option>
                    <option value="reminder">تذكير</option>
                  </select>
                </div>

                <div className="flex items-start mb-4">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      checked={sendEmail}
                      onChange={(e) => setSendEmail(e.target.checked)}
                      className="h-5 w-5 rounded border focus:ring-2 focus:ring-offset-1 transition-all"
                      style={{ 
                        borderColor: 'rgba(153, 153, 153, 0.5)',
                        focusRingColor: 'rgba(249, 208, 17, 0.4)',
                        backgroundColor: sendEmail ? '#F9D011' : '#FFFFFF'
                      }}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="send-email" className="font-medium" style={{ color: '#0D1012' }}>
                      إرسال البريد الإلكتروني
                    </label>
                    <p className="mt-1" style={{ color: 'rgba(13, 16, 18, 0.7)' }}>
                      سيتم إرسال نسخة من الإشعار إلى بريد المستخدم
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* حقل محتوى البريد الإلكتروني */}
            {sendEmail && (
              <div className="mb-6">
                <label htmlFor="emailContent" className="block text-sm font-medium mb-2" style={{ color: '#0D1012' }}>
                  محتوى البريد الإلكتروني *
                </label>
                <textarea
                  id="emailContent"
                  value={emailContent}
                  onChange={(e) => setEmailContent(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all"
                  style={{ 
                    borderColor: 'rgba(153, 153, 153, 0.5)',
                    backgroundColor: '#FFFFFF',
                    minHeight: '120px',
                    color: '#0D1012',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
                    focusBorderColor: '#008DCB',
                    focusRingColor: 'rgba(0, 141, 203, 0.2)'
                  }}
                  placeholder="أدخل محتوى البريد الإلكتروني هنا..."
                ></textarea>
              </div>
            )}
            
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 py-3 px-4 rounded-lg" style={{ backgroundColor: 'rgba(249, 208, 17, 0.1)' }}>
              <span className="text-sm font-medium" style={{ color: '#0D1012' }}>
                عدد المستخدمين المختارين: 
                <span className="font-bold ml-1" style={{ color: '#F9D011' }}>{selectedUsers.length}</span>
              </span>
              
              <button
                type="submit"
                className="px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ 
                  backgroundColor: '#008DCB',
                  color: '#FFFFFF',
                  boxShadow: '0 4px 6px rgba(0, 141, 203, 0.3)',
                  focusRingColor: 'rgba(0, 141, 203, 0.4)',
                  minWidth: '160px'
                }}
              >
                إرسال الإشعار
              </button>
            </div>
          </form>
          
          {/* قائمة المستخدمين */}
          <div 
            className="p-6 rounded-xl border"
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderColor: 'rgba(153, 153, 153, 0.2)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
          >
            <h2 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: 'rgba(153, 153, 153, 0.3)', color: '#0D1012' }}>
              قائمة المستخدمين (المصادق عليهم)
            </h2>
            
            <div className="overflow-x-auto rounded-lg border" style={{ borderColor: 'rgba(153, 153, 153, 0.2)' }}>
              <table className="min-w-full divide-y" style={{ color: '#0D1012', backgroundColor: '#FFFFFF' }}>
                <thead>
                  <tr style={{ backgroundColor: 'rgba(153, 153, 153, 0.05)' }}>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === users.length && users.length > 0}
                          onChange={() => {
                            if (selectedUsers.length === users.length) {
                              setSelectedUsers([]);
                            } else {
                              setSelectedUsers(users.map(user => user.id));
                            }
                          }}
                          className="h-5 w-5 rounded border focus:ring-2 focus:ring-offset-1 transition-all"
                          style={{ 
                            borderColor: 'rgba(153, 153, 153, 0.5)',
                            backgroundColor: selectedUsers.length > 0 ? '#008DCB' : '#FFFFFF',
                            focusRingColor: 'rgba(0, 141, 203, 0.2)'
                          }}
                        />
                        <span className="ml-2">تحديد الكل</span>
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      اسم المستخدم
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      البريد الإلكتروني
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ backgroundColor: '#FFFFFF', color: '#0D1012' }}>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-sm" style={{ color: 'rgba(13, 16, 18, 0.7)' }}>
                        لا يوجد مستخدمين
                      </td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr 
                        key={user.id} 
                        className="transition-colors hover:bg-gray-50"
                        style={{ backgroundColor: selectedUsers.includes(user.id) ? 'rgba(0, 141, 203, 0.03)' : '#FFFFFF' }}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserSelect(user.id)}
                            className="h-5 w-5 rounded border focus:ring-2 focus:ring-offset-1 transition-all"
                            style={{ 
                              borderColor: 'rgba(153, 153, 153, 0.5)',
                              backgroundColor: selectedUsers.includes(user.id) ? '#008DCB' : '#FFFFFF',
                              focusRingColor: 'rgba(0, 141, 203, 0.2)'
                            }}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm" style={{ color: 'rgba(13, 16, 18, 0.8)' }}>
                          {user.email}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSystem;