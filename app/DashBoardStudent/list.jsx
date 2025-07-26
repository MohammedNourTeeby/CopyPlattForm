"use client";
import React, { useRef , useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  FiShoppingCart, FiHeart, FiBell, FiMessageSquare, FiSettings, 
  FiCreditCard, FiClock, FiDollarSign, FiGlobe, FiUser, 
  FiEdit, FiHelpCircle, FiLogOut, FiBriefcase 
} from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { logout ,checkAuth} from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
// نظام الألوان الجديد
const colors = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

// النصوص العربية مباشرة
const arabicText = {
  profile: {
    title: 'الملف الشخصي',
    public_profile: 'الملف الشخصي العام',
    edit_profile: 'تعديل الملف الشخصي'
  },
  menu: {
    education: 'التعليم',
    cart: 'عربة التسوق',
    wishlist: 'المفضلة',
    trainer_dashboard: 'لوحة المدرب',
    notifications: 'الإشعارات',
    messages: 'الرسائل',
    help_support: 'المساعدة والدعم',
    logout: 'تسجيل الخروج'
  },
  sections: {
    notifications: 'الإشعارات'
  },
  settings: {
    account: 'إعدادات الحساب',
    payment_methods: 'طرق الدفع',
    subscriptions: 'الاشتراكات',
    balance: 'رصيد',
    purchase_history: 'سجل الشراء',
    language: 'اللغة'
  },
  language: {
    arabic: 'العربية',
    english: 'الإنجليزية'
  },
  business: {
    title: 'الاعتماد العربي للأعمال',
    subtitle: 'جلب التعلم إلى شركتك'
  },
  buttons: {
    discover_more: 'اكتشف المزيد'
  }
};


const List = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth);
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const shadowOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 0.2]);

  const handleLogout = () => {
    dispatch(logout());
  };
useEffect(() => {
  dispatch(checkAuth());
}, [dispatch]);
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
    <div className="relative w-80 h-[75vh] flex flex-col" dir="rtl">
      {/* ظلال التمرير الديناميكية */}
      <motion.div
        style={{ opacity: shadowOpacity }}
        className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none"
      />
      
      {/* المحتوى الرئيسي */}
      <motion.div 
        className="flex-1 shadow-xl rounded-xl overflow-hidden"
        style={{
          backgroundColor: colors.white,
          border: `1px solid ${colors.gray}30`,
          boxShadow: `0 12px 32px ${colors.black}10`
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={menuVariants}
      >
        <div
          ref={scrollRef}
          className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent h-full"
        >
         {isLoading ? (
  <div>جاري التحميل...</div>
) : user ? (
  <>
    <h3 
      className="font-bold text-2xl"
      style={{ color: colors.black }}
    >
      {user.username || 'المستخدم'}
    </h3>
    <p 
      className="text-sm mt-1"
      style={{ color: colors.gray }}
    >
      {user.email || 'example@example.com'}
    </p>
  </>
) : (
  <p>لم يتم تسجيل الدخول</p>
)}

          {/* محتوى القائمة */}
          <motion.div 
            className="p-4 space-y-2"
            variants={menuVariants}
          >
            {/* القسم التعليمي */}
            <motion.div variants={itemVariants}>
              <Link 
                href="./Courses" 
                className="flex items-center gap-3 p-3 rounded-lg transition-all group flex-row-reverse justify-end"
                style={{ 
                  color: colors.black,
                  hover: { backgroundColor: colors.blue + '10' }
                }}
              >
                <span className="font-medium">{arabicText.menu.education}</span>
                <div className="p-2 rounded-lg group-hover:bg-blue-100">
                  <FiShoppingCart className="text-xl" style={{ color: colors.blue }} />
                </div>
              </Link>
            </motion.div>

            {/* عناصر القائمة */}
            {[
              { href: "#", text: arabicText.menu.cart, icon: <FiShoppingCart /> },
              { href: "./FavoritesPage", text: arabicText.menu.wishlist, icon: <FiHeart />, badge: 2 },
              { href: "./DashBoardTraier", text: arabicText.menu.trainer_dashboard, icon: <FiBriefcase /> },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link 
                  href={item.href} 
                  className="flex items-center gap-3 p-3 rounded-lg transition-all group flex-row-reverse justify-end"
                  style={{ 
                    color: colors.black,
                    hover: { backgroundColor: colors.blue + '10' }
                  }}
                >
                  <span className="flex-1">{item.text}</span>
                  <div className="relative">
                    <div className="p-2 rounded-lg group-hover:bg-blue-100">
                      {React.cloneElement(item.icon, { 
                        className: "text-xl",
                        style: { color: colors.blue }
                      })}
                    </div>
                    {item.badge && (
                      <span 
                        className="absolute -top-2 -right-2 w-5 h-5 text-xs text-white rounded-full flex items-center justify-center shadow-sm"
                        style={{ backgroundColor: colors.red }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* فاصل الإشعارات */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t" style={{ borderColor: colors.gray + '20' }}></div>
              </div>
              <div className="relative flex justify-center">
                <span 
                  className="px-4 bg-white text-sm"
                  style={{ color: colors.blue }}
                >
                  {arabicText.sections.notifications}
                </span>
              </div>
            </div>

            {/* الإشعارات والرسائل */}
            {[
              { href: "./Navigation", text: arabicText.menu.notifications, icon: <FiBell />, notification: true },
              { href: "./MassageChatStudent", text: arabicText.menu.messages, icon: <FiMessageSquare /> },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link 
                  href={item.href} 
                  className="flex items-center gap-3 p-3 rounded-lg transition-all group flex-row-reverse justify-end"
                  style={{ 
                    color: colors.black,
                    hover: { backgroundColor: colors.blue + '10' }
                  }}
                >
                  <span>{item.text}</span>
                  <div className="relative">
                    {React.cloneElement(item.icon, { 
                      className: "text-xl",
                      style: { color: colors.blue }
                    })}
                    {item.notification && (
                      <span 
                        className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border border-white"
                        style={{ backgroundColor: colors.red }}
                      ></span>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}

            {/* قسم الإعدادات */}
            <motion.div 
              variants={itemVariants} 
              className="mt-4 p-4 rounded-xl"
              style={{ backgroundColor: colors.blue + '08' }}
            >
              {[
                { href: "./AccountSettings", text: arabicText.settings.account, icon: <FiSettings /> },
                { href: "./Payment", text: arabicText.settings.payment_methods, icon: <FiCreditCard /> },
                { href: "./Subscription", text: arabicText.settings.subscriptions, icon: <FiClock /> },
                { href: "#", text: arabicText.settings.balance, icon: <FiDollarSign /> },
                { href: "#", text: arabicText.settings.purchase_history, icon: <FiCreditCard /> },
              ].map((item, index) => (
                <Link 
                  key={index} 
                  href={item.href} 
                  className="flex items-center gap-3 p-3 rounded-lg transition-all group flex-row-reverse justify-end"
                  style={{ 
                    color: colors.black,
                    hover: { backgroundColor: colors.blue + '10' }
                  }}
                >
                  <span>{item.text}</span>
                  {React.cloneElement(item.icon, { 
                    className: "text-xl",
                    style: { color: colors.blue }
                  })}
                </Link>
              ))}
            </motion.div>

            {/* إعدادات اللغة */}
            <motion.div 
              variants={itemVariants} 
              className="mt-4 flex justify-between items-center p-3 rounded-lg"
              style={{ backgroundColor: colors.blue + '08' }}
            >
              <div className="flex items-center gap-3 flex-row-reverse">
                <FiGlobe className="text-xl" style={{ color: colors.blue }} />
                <span style={{ color: colors.black }}>{arabicText.settings.language}</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-lg shadow-sm">
                <span className="text-purple-700" style={{ color: colors.blue }}>
                  {arabicText.language.arabic}
                </span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.blue }}></div>
              </div>
            </motion.div>

            {/* الملف الشخصي */}
            {[
              { href: "./ProfileSettings", text: arabicText.profile.public_profile, icon: <FiUser /> },
              { href: "./ProfileSettings", text: arabicText.profile.edit_profile, icon: <FiEdit /> },
            ].map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link 
                  href={item.href} 
                  className="flex items-center gap-3 p-3 rounded-lg transition-all group flex-row-reverse justify-end"
                  style={{ 
                    color: colors.black,
                    hover: { backgroundColor: colors.blue + '10' }
                  }}
                >
                  <span>{item.text}</span>
                  {React.cloneElement(item.icon, { 
                    className: "text-xl",
                    style: { color: colors.blue }
                  })}
                </Link>
              </motion.div>
            ))}

            {/* الدعم وتسجيل الخروج */}
            <motion.div variants={itemVariants} className="mt-4 space-y-2">
              <Link 
                href="./Help" 
                className="flex items-center gap-3 p-3 rounded-lg transition-all group flex-row-reverse justify-end"
                style={{ 
                  color: colors.black,
                  hover: { backgroundColor: colors.red + '10' }
                }}
              >
                <span>{arabicText.menu.help_support}</span>
                <FiHelpCircle className="text-xl" style={{ color: colors.red }} />
              </Link>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-3 rounded-lg transition-all flex-row-reverse justify-end"
                style={{ 
                  color: colors.red,
                  hover: { backgroundColor: colors.red + '10' }
                }}
              >
                <span className="font-medium">{arabicText.menu.logout}</span>
                <FiLogOut className="text-xl" style={{ color: colors.red }} />
              </motion.button>
            </motion.div>

            {/* قسم الأعمال */}
            <motion.div 
              variants={itemVariants}
              className="mt-6 p-5 rounded-xl"
              style={{ 
                background: `linear-gradient(135deg, ${colors.blue}, ${colors.yellow})`,
                boxShadow: `0 4px 16px ${colors.blue}20`
              }}
            >
              <div className="flex items-center gap-3 text-white">
                <FiBriefcase className="text-xl" />
                <div>
                  <h4 className="font-bold text-lg">{arabicText.business.title}</h4>
                  <p className="text-sm opacity-90 mt-1">{arabicText.business.subtitle}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="mt-4 w-full py-2 bg-white/10 text-white rounded-lg backdrop-blur-sm"
              >
                {arabicText.buttons.discover_more}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* مؤشر التمرير المخصص */}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 h-40 w-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            style={{ scaleY: scrollYProgress, backgroundColor: colors.blue }}
            className="w-full h-full origin-top"
          />
        </div>
      </motion.div>

      {/* ظال سفلي ثابت */}
      <motion.div
        style={{ opacity: shadowOpacity }}
        className="sticky bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"
      />
    </div>
  );
};

export default List;