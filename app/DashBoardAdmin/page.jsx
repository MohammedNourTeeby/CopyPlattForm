// pages/AdminDashboard.jsx
"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // <-- أضف هذا السطر
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './Sidbar';
import UsersTable from './UsersTable';
import SummaryCard from './SummaryCard';
import ActivityLog from './ActivityLog';

import dashboardData from '../../data/dashboardData.json';
import statsData from '../../data/statsData.json';
import DashboardStats from './DashboardStats'; // تأكد من المسار الصحيح
import CourseManagement from './components/CourseManagment/page';
import coursesData from '../../data/coursesData.json';
import supportData from '../../data/supportTickets.json';
import SupportTickets from './SupportTickets';
import FinancialReports from './FinancialReports';
import InviteLinkGenerator from './InviteLinkGenerator';
import CourseManagementy from './components/CourseManagementy';
import ReviewStats from './components/ReviewStats';
import AdminAdsPage from '../ads/page';

import PrivacyPage from './components/legal/page';
import CertificatesPage from './components/Certificates/page';
import AcademicDashboard from './components/Academic/page';
import FinancialDashboard from '../DashBoardFinicial/components/financial/page';
import NotificationSystem from './components/SMS/page';
import EmailTemplatesPage from './Email/page';
import AnalyticsDashboard from './components/CRM/page';
import LicenseDashboard from './components/Saas/page';
import SosialDashboard from '../../app/Social/page';
import CommunityCoursePage from './components/communitycourse/page';
import ReportsDashboard from './components/Reports/page';

import TicketsManager from './components/Support/TicketsManager';
import TasksPage from './components/Support/page';
import InternalCommunication from './components/voip/InternalCommunication';
import VoipDashboard from './components/voip/page';
import UsersPage from '../DashBoardHR/components/managmentTeam/page';
import StatsOverview from './StatsOverview';

const AdminDashboard = () => {
  // State management
  const [activeSection, setActiveSection] = useState();
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [activityLogs, setActivityLogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    try {
      setUsers(dashboardData.users || []);
      setStats(dashboardData.stats || {});
      setActivityLogs(dashboardData.activityLogs || []);
      setCourses(coursesData.courses || []);
      setTickets(supportData.tickets || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load data:", error);
      setIsLoading(false);
    }
  }, []);

  // Handle user operations
  const handleUserSubmit = (userData) => {
    if (userData.id) {
      setUsers(users.map(user => 
        user.id === userData.id ? userData : user
      ));
    } else {
      const newUser = {
        ...userData,
        id: Date.now()
      };
      setUsers([...users, newUser]);
    }
  };

  // Handle course operations
  const handleCourseSubmit = (courseData) => {
    if (courseData.id) {
      setCourses(courses.map(course =>
        course.id === courseData.id ? courseData : course
      ));
    } else {
      const newCourse = {
        ...courseData,
        id: Date.now()
      };
      setCourses([...courses, newCourse]);
    }
  };

  // Handle ticket operations
  const handleTicketUpdate = (ticketId, updates) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, ...updates } : ticket
    ));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50">
      
      <div className="flex pt-16">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sections={{
            dashboard: 'لوحة التحكم',
  content: 'المحتوى والدورات',
  support: 'الدعم والتذاكر',
  finance: 'العمليات المالية',
  addstudent: 'إضافة متدرب جديد',
  addgroup: 'إضافة فريق إداري',
  tracker: 'تفاعل المستخدمين',
  payouts: 'تسوية العمولات الآلية',
  ads: 'إدارة الاعلانات',
  offers: 'إدارة العروض',
  copon: 'إدارة الخصومات',
  refunds: 'إدارة الرسوم المالية',
  promotion: 'ظهور المدرب في الصفحة الأولى',
  legal: 'سياسة و شروط المنصة',
  certif: 'إدارة الشهادات',
  email: ' إدارة النظام البريدي',
  crm: ' CRM  ',
  saas: ' ادارة التراخيص  SaaS  ',
  social: ' إدارة التواصل الاجتماعي',



          }}
        />

        <main className="flex-1 mr-64 p-8">
         
 {activeSection === 'dashboard' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <StatsOverview
               
              />
        
            </div>
            
          ) }
          

          {/* Content Section */}
          {activeSection === 'content' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CourseManagement
               
              />
        
            </div>
            
          ) }

          {/* Support Section */}
          {activeSection === 'support' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <SupportTickets
                tickets={tickets}
                teams={supportData.teams || []}
                onUpdate={handleTicketUpdate}
                onDelete={(ticketId) => setTickets(tickets.filter(t => t.id !== ticketId))}
              />
            </div>
          )}

          {/* Finance Section */}
          {activeSection === 'finance' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
          {activeSection === 'finance' && <FinancialReports />}
          {activeSection === 'finance' && <FinancialDashboard />}
          </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">إعدادات النظام</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">إعدادات المظهر</h3>
                  <p className="text-gray-600 text-sm">تخصيص واجهة المستخدم</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">إعدادات الأمان</h3>
                  <p className="text-gray-600 text-sm">إدارة الصلاحيات والمستخدمين</p>
                </div>
              </div>
            </div>
          )}
                {activeSection === 'Employee' && <UsersPage />}
          
                {activeSection === 'addstudent' && <InviteLinkGenerator />}
                {activeSection === 'tracker' && <CourseManagementy  />}
                {activeSection === 'tracker' && <ReviewStats  />}
                {activeSection === 'ads' && <AdminAdsPage   />}
                {activeSection === 'legal' && <PrivacyPage   />}
                {activeSection === 'certif' && <CertificatesPage   />}
                {activeSection === 'email' && <NotificationSystem   />}
                {activeSection === 'crm' && <AnalyticsDashboard   />}
                {activeSection === 'saas' && <LicenseDashboard   />}
                {activeSection === 'social' && <SosialDashboard   />}
                {activeSection === 'report' && <ReportsDashboard />}
{activeSection === 'tasks' && (
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                    {activeSection === 'tasks' && <TasksPage />}
                    </div>
                    )}
                    {activeSection === 'finance' && (
                                          <div className="bg-white p-6 rounded-lg shadow-sm">
                                        {activeSection === 'finance' && <TicketsManager />}
                                        </div>
                                        )}
                                        {activeSection === 'user' && (
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                    {activeSection === 'user' && <InternalCommunication />}
                    </div>
                    )}{activeSection === 'voip' && (
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                    {activeSection === 'voip' && <VoipDashboard />}
                    </div>
                    )}
        </main>
      </div>
    </div>
        </ProtectedRoute>

  );
};

export default AdminDashboard;