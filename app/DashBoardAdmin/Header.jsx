'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BellIcon,
  UserCircleIcon,
  ChevronDownIcon,
  ChartPieIcon,
  DocumentChartBarIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';
import Link from 'next/link';

const COLORS = {
  primary: '#008DCB',    // أزرق 10%
  secondary: '#0D1012',  // أسود 5%
  neutral: '#999999',    // رمادي 20%
  danger: '#E2101E',     // أحمر 7%
  background: '#FFFFFF', // أبيض 50%
  accent: '#F9D011'      // أصفر 8%
};

const BoardHeader = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return null; // or a loading spinner
  }
  
  // If user data isn't available yet
  if (!user) {
    return (
      <motion.header 
        className="fixed w-full z-50 shadow-xl"
        style={{ backgroundColor: COLORS.background }}
      >
        <div className="flex justify-between items-center px-8 py-4">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
          </div>
          <div className="flex items-center gap-6">
            <div className="animate-pulse">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </motion.header>
    );
  }

  return (
    <motion.header 
      className="fixed w-full z-50 shadow-xl"
      style={{ backgroundColor: COLORS.background }}
      initial={{ y: -20 }}
      animate={{ y: 0 }}
    >
      <div className="flex justify-between items-center px-8 py-1">
        {/* الجانب الأيسر مع المؤشرات */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <img 
              src="/الاعتماد العربي.png" 
              alt="Board Logo" 
              className="h-12 w-auto"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              مجلس الإدارة التنفيذي
            </h1>
          </div>
        </div>
        
        {/* الجانب الأيمن مع أدوات التحكم */}
        <div className="flex items-center gap-6">
          {/* الإشعارات */}
          <Link href="/Navigation">
            <motion.button
              className="relative p-2 rounded-full"
              whileTap={{ scale: 0.95 }}
            >
              <BellIcon 
                className="h-7 w-7" 
                style={{ color: COLORS.secondary }}
              />
              <span 
                className="absolute top-0 right-0 w-2 h-2 rounded-full"
                style={{ backgroundColor: COLORS.danger }}
              />
            </motion.button>
          </Link>
          
          {/* ملف العضو */}
          <div className="relative">
            <Link href="/AccountSettings">
              <motion.div
                className="flex items-center gap-3 cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative">
                  {user?.profile?.avatar ? (
                    <img 
                      src={user.profile.avatar} 
                      alt={user.username} 
                      className="h-12 w-12 rounded-full border-2"
                      style={{ borderColor: COLORS.primary }}
                    />
                  ) : (
                    <div 
                      className="h-12 w-12 rounded-full border-2 flex items-center justify-center"
                      style={{ 
                        borderColor: COLORS.primary,
                        backgroundColor: COLORS.primary + '20'
                      }}
                    >
                      <UserCircleIcon 
                        className="h-8 w-8" 
                        style={{ color: COLORS.primary }}
                      />
                    </div>
                  )}
                  <div 
                    className="absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white"
                    style={{ backgroundColor: COLORS.accent }}
                  />
                </div>
                <div className="text-right">
                  <p 
                    className="font-bold"
                    style={{ color: COLORS.secondary }}
                  >
                    {user.username || 'عضو مجلس'}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: COLORS.neutral }}
                  >
                    {user.role?.name || 'عضو'}
                  </p>
                </div>
              </motion.div>
            </Link>
            
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl"
                  style={{ 
                    border: `1px solid ${COLORS.neutral}30`,
                    backgroundColor: COLORS.background
                  }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {[
                    { name: 'الملف الشخصي', icon: UserCircleIcon },
                    { name: 'تسجيل الخروج', icon: ChevronDownIcon }
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      className={`flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer ${
                        index !== 1 ? 'border-b' : ''
                      }`}
                      style={{ borderColor: COLORS.neutral + '20' }}
                      whileHover={{ x: 5 }}
                      onClick={() => {
                        if (item.name === 'تسجيل الخروج') {
                          dispatch(logout());
                        }
                      }}
                    >
                      <item.icon 
                        className="h-5 w-5" 
                        style={{ color: COLORS.primary }}
                      />
                      <span 
                        className="text-sm font-medium"
                        style={{ color: COLORS.secondary }}
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* شريط الحالة اللوني */}
      <div className="h-1.5 w-full flex">
        <div style={{ width: '10%', backgroundColor: COLORS.primary }} />
        <div style={{ width: '5%', backgroundColor: COLORS.secondary }} />
        <div style={{ width: '20%', backgroundColor: COLORS.neutral }} />
        <div style={{ width: '7%', backgroundColor: COLORS.danger }} />
        <div style={{ width: '8%', backgroundColor: COLORS.accent }} />
        <div style={{ width: '50%', backgroundColor: COLORS.background }} />
      </div>
    </motion.header>
  );
};

export default BoardHeader;