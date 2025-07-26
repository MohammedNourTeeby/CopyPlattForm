"use client";
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';
import ProtectedRoute from '../../../DashBoardAdmin/components/ProtectedRoute';
import CertificateSystem from "./CertificateSystem";

// تعريف الثيم
const theme = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

// دالة لإنشاء ألوان شبه شفافة
const alpha = (color, opacity) => {
  const opacityHex = Math.floor(opacity * 255).toString(16).padStart(2, '0');
  return `${color}${opacityHex}`;
};

export default function CertificatesPage() {
  const { user } = useSelector((state) => state.auth);
  const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCertificateSystem, setShowCertificateSystem] = useState(false);

  // جلب دورات المستخدم
  const fetchUserCourses = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token || !user?.id) {
        throw new Error('يرجى تسجيل الدخول لعرض دوراتك');
      }

      const query = qs.stringify({
        populate: {
          users_permissions_user: {
            fields: ['username'] // استرداد اسم المدرب
          }
        },
        fields: ['courseName', 'price', 'documentId']
      }, { encodeValuesOnly: true });

      const response = await fetch(`${API_URL}/courses?${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('فشل جلب الدورات');

      const data = await response.json();
      
      // تنسيق الدورات
      const formattedCourses = data.data.map(course => ({
        id: course.documentId,
        name: course.courseName,
        price: course.price || 0,
        instructor: course.users_permissions_user?.username || 'غير محدد'
      }));
      
      setCourses(formattedCourses);
      setIsLoading(false);
    } catch (err) {
      console.error('خطأ في جلب الدورات:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  // تحميل الدورات عند تسجيل الدخول
  useEffect(() => {
    if (user) {
      fetchUserCourses();
    }
  }, [user]);

  // تحديد دورة
  const handleCourseSelect = (course) => {
    setSelectedCourse(course);
    setShowCertificateSystem(true);
  };

  // الرجوع إلى قائمة الدورات
  const handleBackToCourses = () => {
    setShowCertificateSystem(false);
    setSelectedCourse(null);
  };

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 pb-2 border-b" 
            style={{ 
              color: theme.black,
              borderColor: alpha(theme.gray, 0.2) 
            }}>
          دوراتك وشهاداتك
        </h1>
        
        {/* حالة التحميل */}
        {isLoading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} 
                   className="p-6 rounded-xl animate-pulse"
                   style={{ 
                     backgroundColor: alpha(theme.gray, 0.05) 
                   }}>
                <div className="h-6 rounded mb-4" 
                     style={{ 
                       backgroundColor: alpha(theme.gray, 0.15),
                       width: '60%' 
                     }}></div>
                <div className="h-4 rounded" 
                     style={{ 
                       backgroundColor: alpha(theme.gray, 0.15),
                       width: '40%' 
                     }}></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="p-4 rounded-xl mb-6 flex items-start"
               style={{ 
                 backgroundColor: alpha(theme.red, 0.08),
                 borderLeft: `4px solid ${theme.red}`
               }}>
            <svg className="w-5 h-5 mt-1 mr-2 flex-shrink-0" 
                 style={{ color: theme.red }} 
                 fill="currentColor" 
                 viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm" style={{ color: theme.red }}>{error}</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="p-6 sm:p-8 text-center rounded-xl mb-6 flex flex-col items-center"
               style={{ 
                 backgroundColor: alpha(theme.gray, 0.05),
                 border: `1px solid ${alpha(theme.gray, 0.1)}`
               }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                 style={{ 
                   backgroundColor: alpha(theme.blue, 0.1) 
                 }}>
              <svg className="w-8 h-8" style={{ color: theme.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </div>
            <p className="text-gray-600" style={{ color: theme.gray }}>لم تقم بإنشاء أي دورات بعد</p>
          </div>
        ) : !showCertificateSystem && courses.length > 0 ? (
          <div className="space-y-8">
            <div className="rounded-xl overflow-hidden"
                 style={{ 
                   backgroundColor: theme.white,
                   border: `1px solid ${alpha(theme.gray, 0.1)}`,
                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                 }}>
              <div className="p-5 sm:p-6"
                   style={{ 
                     backgroundColor: alpha(theme.blue, 0.03),
                     borderBottom: `1px solid ${alpha(theme.blue, 0.1)}`
                   }}>
                <h2 className="text-xl font-semibold" style={{ color: theme.black }}>دوراتك</h2>
                <p className="mt-2 text-sm" style={{ color: theme.gray }}>اختر دورة لعرض وإدارة الشهادات المرتبطة بها</p>
              </div>
              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {courses.map((course) => (
                    <div 
                      key={course.id}
                      className="rounded-xl p-4 transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
                      style={{ 
                        backgroundColor: theme.white,
                        border: `1px solid ${alpha(theme.gray, 0.15)}`,
                        boxShadow: '0 4px 6px rgba(0,0,0,0.03)'
                      }}
                      onClick={() => handleCourseSelect(course)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg" style={{ color: theme.black }}>{course.name}</h3>
                          <div className="mt-3 space-y-1">
                            <p className="text-sm flex items-center">
                              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: theme.blue }}></span>
                              <span style={{ color: theme.gray }}>السعر: </span>
                              <span className="font-medium ml-1" style={{ color: theme.blue }}>{course.price} $</span>
                            </p>
                            <p className="text-sm flex items-center">
                              <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: theme.yellow }}></span>
                              <span style={{ color: theme.gray }}>المدرب: </span>
                              <span className="font-medium ml-1" style={{ color: theme.black }}>{course.instructor}</span>
                            </p>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center"
                             style={{ 
                               backgroundColor: alpha(theme.blue, 0.1) 
                             }}>
                          <svg className="w-5 h-5" style={{ color: theme.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <button 
                          className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 group-hover:bg-blue-50"
                          style={{ 
                            color: theme.blue,
                            border: `1px solid ${alpha(theme.blue, 0.3)}`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCourseSelect(course);
                          }}
                        >
                          إدارة الشهادات
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : selectedCourse && (
          <div>
            <div className="flex items-center mb-6">
              <button
                className="flex items-center text-sm font-medium px-3 py-1.5 rounded-lg transition-colors duration-300 hover:bg-gray-50"
                style={{ 
                  color: theme.blue,
                  border: `1px solid ${alpha(theme.blue, 0.2)}`
                }}
                onClick={handleBackToCourses}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                الرجوع إلى الدورات
              </button>
            </div>
            
            <div className="rounded-xl overflow-hidden"
                 style={{ 
                   backgroundColor: theme.white,
                   border: `1px solid ${alpha(theme.gray, 0.1)}`,
                   boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                 }}>
              <div className="p-5 sm:p-6 flex flex-wrap justify-between items-center"
                   style={{ 
                     backgroundColor: alpha(theme.blue, 0.03),
                     borderBottom: `1px solid ${alpha(theme.blue, 0.1)}`
                   }}>
                <div>
                  <h2 className="text-xl font-semibold" style={{ color: theme.black }}>{selectedCourse.name}</h2>
                  <div className="mt-2 flex flex-wrap gap-3">
                    <p className="text-sm flex items-center">
                      <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: theme.blue }}></span>
                      <span style={{ color: theme.gray }}>السعر: </span>
                      <span className="font-medium ml-1" style={{ color: theme.blue }}>{selectedCourse.price} $</span>
                    </p>
                    <p className="text-sm flex items-center">
                      <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: theme.gray }}></span>
                      <span style={{ color: theme.gray }}>معرف الدورة: </span>
                      <span className="font-medium ml-1" style={{ color: theme.black }}>{selectedCourse.id}</span>
                    </p>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mt-3 sm:mt-0"
                     style={{ 
                       backgroundColor: alpha(theme.blue, 0.1) 
                     }}>
                  <svg className="w-6 h-6" style={{ color: theme.blue }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
              <div className="p-5 sm:p-6">
                {/* نظام الشهادات للدورة المحددة */}
                <CertificateSystem 
                  courseId={selectedCourse.id} 
                  courseName={selectedCourse.name}
                  onBackToCourses={handleBackToCourses}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}