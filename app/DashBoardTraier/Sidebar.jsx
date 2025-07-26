"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  FiBookOpen,
  FiMessageCircle,
  FiUsers,
  FiFolder,
  FiCreditCard ,
  FiBarChart2,
  FiClock ,
  FiGlobe ,
  FiGift,
  FiBell,
  FiShare2,
  FiDollarSign,
  FiEdit ,
  FiAward,
  FiHome,
  FiBriefcase ,
  FiLogOut,
  FiChevronLeft,
  FiUser,
  FiSettings,
  FiHelpCircle,
  FiStar,
  FiChevronDown
} from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth, logout } from '@/store/slices/authSlice';

// نظام الألوان المحدد
const COLORS = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

// مكون قائمة المستخدم
const UserList = ({ colors, onClose, user }) => {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };
  
  // تأثيرات الحركة
  const menuVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 260, 
        damping: 20,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="w-full"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={menuVariants}
    >
      {/* رأس الملف الشخصي */}
      <div 
        className="p-4 border-b"
        style={{ borderColor: colors.gray + '30', backgroundColor: colors.blue }}
      >
        <motion.div variants={itemVariants}>
          <h3 
            className="font-bold text-lg mb-1 text-white text-center"
          >
            {user?.username || "المستخدم"}
          </h3>
          <p 
            className="text-sm text-white text-center opacity-80"
          >
            {user?.email || "example@example.com"}
          </p>
        </motion.div>
      </div>

      {/* محتوى القائمة */}
      <div className="p-3 space-y-1 overflow-y-auto max-h-[60vh]">
        {/* القسم الأول */}
        <div className="mb-3">
          {[
            { icon: <FiUser />, text: 'طالب', href: './DashBoardStudent' },
            { icon: <FiBell />, text: 'الإشعارات', href: './Navigation' },
            { icon: <FiSettings />, text: 'إعدادات الحساب', href: './AccountSettings' },
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <a
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg transition-all group"
                style={{ 
                  color: colors.black,
                  backgroundColor: colors.white,
                  marginBottom: '0.25rem'
                }}
                onClick={onClose}
              >
                {React.cloneElement(item.icon, {
                  style: { color: colors.blue }
                })}
                <span>{item.text}</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* قسم الرسائل */}
        <motion.div variants={itemVariants} className="mb-3">
          <a
            href="./Massage"
            className="flex items-center gap-3 p-3 rounded-lg transition-all group relative"
            style={{ 
              color: colors.black,
              backgroundColor: colors.white,
            }}
            onClick={onClose}
          >
            {React.cloneElement(<FiMessageCircle />, {
              style: { color: colors.blue }
            })}
            <span>رسائل</span>
            <span 
              className="absolute top-3 right-3 w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: colors.red }}
            />
          </a>
        </motion.div>

        {/* قسم الدفع والاشتراكات */}
        <div className="mb-3">
          {[
            { icon: <FiCreditCard />, text: 'طرق الدفع', href: './Payment' },
            { icon: <FiClock />, text: 'الاشتراكات', href: '#' },
            { icon: <FiDollarSign />, text: 'رصيد', href: '#' },
            { icon: <FiCreditCard />, text: 'سجل الشراء', href: '#' },
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <a
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg transition-all group"
                style={{ 
                  color: colors.black,
                  backgroundColor: colors.white,
                  marginBottom: '0.25rem'
                }}
                onClick={onClose}
              >
                {React.cloneElement(item.icon, {
                  style: { color: colors.blue }
                })}
                <span>{item.text}</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* قسم اللغة */}
        <motion.div 
          className="flex justify-between items-center p-3 rounded-lg mb-3"
          style={{ backgroundColor: colors.blue + '20' }}
          variants={itemVariants}
        >
          <div className="flex items-center gap-2">
            {React.cloneElement(<FiGlobe />, {
              style: { color: colors.blue }
            })}
            <span style={{ color: colors.black }}>اللغة</span>
          </div>
          <span style={{ color: colors.blue }}>العربية</span>
        </motion.div>

        {/* قسم الملف الشخصي */}
        <div className="mb-3">
          {[
            { icon: <FiUser />, text: 'الملف الشخصي العام', href: './ProfileSettings' },
            { icon: <FiEdit />, text: 'تعديل الملف الشخصي', href: './ProfileSettings' },
          ].map((item, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <a
                href={item.href}
                className="flex items-center gap-3 p-3 rounded-lg transition-all group"
                style={{ 
                  color: colors.black,
                  backgroundColor: colors.white,
                  marginBottom: '0.25rem'
                }}
                onClick={onClose}
              >
                {React.cloneElement(item.icon, {
                  style: { color: colors.blue }
                })}
                <span>{item.text}</span>
              </a>
            </motion.div>
          ))}
        </div>

        {/* قسم المساعدة */}
        <motion.div variants={itemVariants} className="mb-3">
          <a
            href="./Help"
            className="flex items-center gap-3 p-3 rounded-lg transition-all group"
            style={{ 
              color: colors.black,
              backgroundColor: colors.white,
            }}
            onClick={onClose}
          >
            {React.cloneElement(<FiHelpCircle />, {
              style: { color: colors.blue }
            })}
            <span>المساعدة والدعم</span>
          </a>
        </motion.div>

        {/* تسجيل الخروج */}
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 p-3 rounded-lg transition-all group mb-3"
          style={{ 
            color: colors.red,
            backgroundColor: colors.white,
          }}
          variants={itemVariants}
        >
          {React.cloneElement(<FiLogOut />, {
            style: { color: colors.red }
          })}
          <span>تسجيل الخروج</span>
        </motion.button>

        {/* قسم الأعمال */}
        <motion.div 
          className="p-3 rounded-lg"
          style={{ 
            background: `linear-gradient(135deg, ${colors.blue}, ${colors.yellow})`,
          }}
          variants={itemVariants}
        >
          <div className="flex items-center gap-3 text-white">
            {React.cloneElement(<FiBriefcase />, {
              className: 'text-xl'
            })}
            <div>
              <h4 className="font-bold text-sm">الاعتماد العربي للأعمال</h4>
              <p className="text-xs opacity-90 mt-1">جلب التعلم إلى شركتك</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

// المكون الرئيسي للشريط الجانبي
export default function FixedSidebar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileButtonRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // عناصر القائمة
  const menuItems = [
    {
      name: "الدورات التدريبية",
      icon: <FiBookOpen size={22} />,
      link: "/DashBoardTraier/Courses",
      badge: 3
    },
    {
      name: "المراسلات",
      icon: <FiMessageCircle size={22} />,
      link: "./Massage",
      badge: 12
    },
    {
      name: "الموارد العلمية",
      icon: <FiFolder size={22} />,
      link: "./Materials"
    },
    {
      name: "التقييم الذاتي",
      icon: <FiBarChart2 size={22} />,
      link: "/DashBoardTraier/components/Self-Assessment"
    },
    {
      name: "كوبونات الدعوة",
      icon: <FiGift size={22} />,
      link: "/DashBoardTraier/components/copon"
    },
    {
      name: "الإعلانات",
      icon: <FiBell size={22} />,
      link: "./ads"
    },
    {
      name: "وسائل التواصل",
      icon: <FiShare2 size={22} />,
      link: "./Social"
    },
    {
      name: "المالية",
      icon: <FiDollarSign size={22} />,
      link: "/DashBoardTraier/components/Finance"
    },
    {
      name: "الشهادات",
      icon: <FiAward size={22} />,
      link: "/DashBoardTraier/components/Certificate"
    },
    {
      name: "فريق تسويقي",
      icon: <FiUsers size={22} />,
      link: "/DashBoardTraier/components/Marketer"
    },
  ];

  // تأثيرات الحركة
  const sidebarVariants = {
    collapsed: { width: 80 },
    expanded: { width: 280 }
  };

  // تغيير حالة الشريط الجانبي
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showProfileMenu && !event.target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  return (
    <>
      <motion.div
        initial="collapsed"
        animate={isCollapsed ? "collapsed" : isHovered ? "expanded" : "collapsed"}
        variants={sidebarVariants}
        onMouseEnter={() => !isCollapsed && setIsHovered(true)}
        onMouseLeave={() => !isCollapsed && setIsHovered(false)}
        style={{
          backgroundColor: COLORS.blue,
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 1000
        }}
        className="shadow-xl border-r border-blue-800 flex flex-col"
      >
        {/* رأس الشريط الجانبي */}
        <div className="p-4 border-b border-blue-700 h-20 flex items-center justify-between">
          <AnimatePresence>
            {isHovered || isCollapsed ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-3"
              >
                <Image
                  src="/الاعتماد العربي.png"
                  alt="شعار الاعتماد العربي"
                  width={160}
                  height={40}
                  className="filter brightness-0 invert"
                />
              </motion.div>
            ) : (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-2xl font-bold text-white"
              >
                اع
              </motion.span>
            )}
          </AnimatePresence>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleSidebar}
            className="p-1 rounded-full bg-blue-700 text-white"
          >
            <FiChevronLeft 
              className={`transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
              size={20} 
            />
          </motion.button>
        </div>

        {/* معلومات المستخدم */}
        <div 
          className="p-4 border-b border-blue-700 flex items-center gap-3 cursor-pointer relative profile-menu"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          ref={profileButtonRef}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-xl font-bold text-white">م</span>
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-blue-800"></div>
          </div>
          
          <AnimatePresence>
            {(isHovered && !isCollapsed) && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="text-white"
              >
                <p className="font-bold">{user?.username || "المستخدم"}</p>
                <p className="text-xs opacity-80">طالب</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* قائمة المستخدم - هنا يتم دمج مكون القائمة */}
          <AnimatePresence>
            {showProfileMenu && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute left-full top-0 ml-3 z-50 w-72 rounded-xl overflow-hidden shadow-2xl"
                style={{ 
                  backgroundColor: COLORS.white,
                  border: `1px solid ${COLORS.gray}30`,
                  boxShadow: `0 12px 32px ${COLORS.black}10`
                }}
              >
                <UserList 
                  colors={COLORS} 
                  onClose={() => setShowProfileMenu(false)} 
                  user={user}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* عناصر القائمة */}
        <nav className="flex-1 p-3 space-y-1 mt-4 overflow-y-auto">
          {menuItems.map((item, index) => (
            <motion.a
              key={index}
              href={item.link}
              className="relative flex items-center p-3 rounded-lg group"
              style={{
                backgroundColor: activeItem === index ? '#0077B5' : 'transparent',
              }}
              onClick={() => setActiveItem(index)}
              whileHover={{ backgroundColor: '#0077B5' }}
            >
              <span className="shrink-0 text-white relative">
                {item.icon}
                {item.badge && (
                  <span 
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                    style={{ backgroundColor: COLORS.red, color: COLORS.white }}
                  >
                    {item.badge}
                  </span>
                )}
              </span>

              <AnimatePresence>
                {(isHovered && !isCollapsed) && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="pr-3 text-sm font-medium flex-1 text-white"
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>

              {activeItem === index && !isCollapsed && (
                <motion.div 
                  className="absolute -right-2 w-1 h-6 rounded-full bg-white"
                  layoutId="activeIndicator"
                />
              )}

              {isCollapsed && (
                <motion.div
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 rounded-lg shadow-lg z-50"
                  style={{ 
                    backgroundColor: COLORS.blue,
                    border: `1px solid ${COLORS.blue}`
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  <span className="text-xs font-medium text-white">{item.name}</span>
                  <div 
                    className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45"
                    style={{ backgroundColor: COLORS.blue }}
                  />
                </motion.div>
              )}
            </motion.a>
          ))}
        </nav>

        {/* الجزء السفلي - إجراءات إضافية */}
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center justify-between">
            <button className="p-2 rounded-full bg-blue-700 text-white">
              <FiSettings size={20} />
            </button>
            
            <AnimatePresence>
              {(isHovered && !isCollapsed) && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-white opacity-70 hover:opacity-100"
                >
                  الإعدادات
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* طبقة التعتيم للجوال */}
      {isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-30 z-900 md:hidden"
          onClick={() => setIsCollapsed(false)}
        />
      )}
    </>
  );
}