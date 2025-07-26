"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FiArrowLeft, FiArrowRight, FiSettings, FiCheckCircle, FiUsers, FiClock, FiBookOpen, FiX, FiChevronRight, FiUser, FiStar, FiVideo, FiBookmark } from "react-icons/fi";
import {checkAuth} from '@/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

// نظام الألوان مع النسب المطلوبة
const colors = {
  blue: '#008DCB',    // 10% من الصفحة
  black: '#0D1012',   // 5% من الصفحة
  gray: '#999999',    // 20% من الصفحة
  red: '#E2101E',     // 7% من الصفحة
  white: '#FFFFFF',   // 50% من الصفحة
  yellow: '#F9D011'   // 8% من الصفحة
};

const WelcomeMessage = () => {
  const dispatch = useDispatch();
    const { user, isLoading } = useSelector((state) => state.auth);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const [showFeatures, setShowFeatures] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const containerRef = useRef(null);
useEffect(() => {
  dispatch(checkAuth());
}, [dispatch]);
  // بيانات الشرائح
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      alt: "طلاب يتعلمون",
      title: "انطلق في رحلة التعلم الخاصة بك",
      description: "اكتشف آلاف الدورات التدريبية من أفضل المدربين في العالم. ابدأ رحلتك التعليمية اليوم وارتق بمهاراتك إلى المستوى التالي.",
      cta: "اكتشف الدورات",
      icon: <FiUsers style={{ color: colors.blue }} className="ml-2" />
    },
    {
      image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      alt: "طالب يذاكر",
      title: "تعلم في أي وقت ومن أي مكان",
      description: "لديك الحرية الكاملة للتعلم وفقًا لجدولك الزمني. الوصول إلى جميع المواد التعليمية عبر الأجهزة المحمولة وأجهزة الكمبيوتر.",
      cta: "ابدأ التعلم",
      icon: <FiBookOpen style={{ color: colors.blue }} className="ml-2" />
    },
  ];

  // بيانات الميزات
  const features = [
    {
      icon: <FiUsers style={{ color: colors.blue }} className="w-12 h-12 mb-4" />,
      title: "مجتمع تعليمي نشط",
      description: "انضم إلى مجتمع من أكثر من مليون متعلم، شارك الأفكار، واطرح الأسئلة، وتعاون مع أقرانك من جميع أنحاء العالم."
    },
    {
      icon: <FiCheckCircle style={{ color: colors.red }} className="w-12 h-12 mb-4" />,
      title: "شهادات معتمدة",
      description: "احصل على شهادات معترف بها عالميًا بعد إكمال كل دورة تدريبية، مما يعزز سيرتك الذاتية وآفاقك المهنية."
    },
    {
      icon: <FiClock style={{ color: colors.yellow }} className="w-12 h-12 mb-4" />,
      title: "جدول زمني مرن",
      description: "تعلم بالسرعة التي تناسبك. يمكنك الوصول إلى المحتوى في أي وقت ومن أي مكان، وفقًا لجدولك الزمني."
    },
    {
      icon: <FiSettings style={{ color: colors.gray }} className="w-12 h-12 mb-4" />,
      title: "تجربة مخصصة",
      description: "احصل على توصيات مخصصة بناءً على اهتماماتك وأهدافك التعليمية، مما يضمن حصولك على أفضل تجربة تعليمية."
    }
  ];

  // بيانات الدورات التدريبية
  const courses = [
    {
      title: "تطوير تطبيقات الويب",
      instructor: "أحمد محمد",
      rating: 4.8,
      students: 12500,
      duration: "12 ساعة",
      price: "249 ر.س",
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "التسويق الرقمي المتقدم",
      instructor: "سارة عبد الله",
      rating: 4.7,
      students: 8900,
      duration: "8 ساعات",
      price: "199 ر.س",
      thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1415&q=80"
    },
    {
      title: "تحليل البيانات باستخدام Python",
      instructor: "خالد سليمان",
      rating: 4.9,
      students: 15600,
      duration: "15 ساعة",
      price: "299 ر.س",
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80"
    }
  ];

  const nextSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <div 
      className="flex flex-col w-full max-w-7xl mx-auto px-4 py-8 min-h-screen relative overflow-hidden"
      style={{ 
        backgroundColor: colors.white,
        direction: 'rtl'
      }}
      ref={containerRef}
    >
      {/* شريط التنقل العلوي */}
      <motion.div 
        className="w-full flex justify-between items-center py-4 mb-8 sticky top-0 z-50"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold px-4 py-2 rounded-xl">
            اعتماد
          </div>
          
          <div className="hidden md:flex gap-6">
            {['الرئيسية', 'الدورات', 'المدربون', 'المؤتمرات', 'المسارات'].map((item, index) => (
              <motion.button
                key={index}
                className={`px-3 py-1 rounded-lg font-medium ${activeTab === item ? 'text-white' : 'text-gray-700'}`}
                style={{ 
                  backgroundColor: activeTab === item ? colors.blue : 'transparent',
                  color: activeTab === item ? colors.white : colors.black
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.button 
            className="p-2 rounded-full hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiBookmark style={{ color: colors.blue }} className="w-6 h-6" />
          </motion.button>
          
          <motion.button 
            className="relative p-2 rounded-full hover:bg-gray-100"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiVideo style={{ color: colors.blue }} className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>
          
          <motion.div 
            className="relative cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold">
              م
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </motion.div>
        </div>
      </motion.div>

      {/* رسالة الترحيب */}
      <div className="flex flex-col lg:flex-row gap-8 items-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full lg:w-2/5"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.black }}>
  {isLoading ? "جاري التحميل..." : user?.username ? `${user.username} مرحباً` : "المستخدم مرحباً"}
</h1>
          
          <p className="text-xl mb-8" style={{ color: colors.gray }}>
            استعد لرحلة تعليمية استثنائية. اكتشف دورات جديدة، تابع تقدمك، وارتقِ بمهاراتك إلى المستوى التالي.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl text-white font-medium flex items-center"
              style={{ backgroundColor: colors.blue }}
            >
              تصفح الدورات
              <FiChevronRight className="ml-2" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-xl font-medium border flex items-center"
              style={{ color: colors.blue, borderColor: colors.blue }}
            >
              استكشف المسارات
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          className="w-full lg:w-3/5 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video">
            <Image
              src="https://media.istockphoto.com/id/1446806057/es/foto/joven-estudiante-feliz-usando-computadora-port%C3%A1til-viendo-webinar-escribiendo-en-casa.jpg?s=612x612&w=0&k=20&c=eAEreJw-5Uerr2vDkFTQLgPGacbdZZDq7xpqrSTJ71A="
              alt="طلاب يتعلمون"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.black }}>
                  انضم إلى ورشة العمل القادمة
                </h3>
                <p className="mb-4" style={{ color: colors.gray }}>
                  تعلم تقنيات الذكاء الاصطناعي من الخبراء في جلسة مباشرة يوم الأربعاء القادم
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 rounded-lg font-medium"
                  style={{ backgroundColor: colors.yellow, color: colors.black }}
                >
                  سجل الآن
                </motion.button>
              </div>
            </div>
          </div>
          
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-400 rounded-full opacity-20 z-0"></div>
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-400 rounded-full opacity-20 z-0"></div>
        </motion.div>
      </div>

      {/* شريط التقدم والإحصائيات */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {[
          { title: "الدورات المكتملة", value: "8", color: colors.blue },
          { title: "الساعات التعليمية", value: "42", color: colors.red },
          { title: "الشهادات المحصل عليها", value: "6", color: colors.yellow },
          { title: "المسارات النشطة", value: "3", color: colors.gray }
        ].map((item, index) => (
          <div 
            key={index} 
            className="rounded-2xl p-6 shadow-lg border border-gray-100"
            style={{ backgroundColor: colors.white }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium" style={{ color: colors.gray }}>
                {item.title}
              </h3>
              <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: `${item.color}20` }}>
                <span className="font-bold" style={{ color: item.color }}>{item.value}</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ 
                    width: `${(index + 1) * 25}%`, 
                    backgroundColor: item.color 
                  }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-sm">
                <span style={{ color: colors.gray }}>0%</span>
                <span style={{ color: colors.gray }}>100%</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* شرائح العروض */}
      <div className="relative w-full group mb-16">
        <motion.button
          onClick={prevSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300"
          style={{ backgroundColor: colors.white }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowRight className="w-8 h-8" style={{ color: colors.blue }} />
        </motion.button>

        <motion.button
          onClick={nextSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full shadow-xl hover:shadow-2xl transform transition-all duration-300"
          style={{ backgroundColor: colors.white }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowLeft className="w-8 h-8" style={{ color: colors.blue }} />
        </motion.button>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -direction * 100 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <div className="flex flex-col md:flex-row items-center rounded-3xl overflow-hidden border"
                 style={{ 
                   background: `linear-gradient(to bottom right, ${colors.white}, ${colors.blue}10)`,
                   borderColor: colors.blue + '20'
                 }}>
              <div className="relative w-full md:w-1/2 h-80 md:h-96">
                <Image
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].alt}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
                <motion.div>
                  <div className="inline-flex items-center gap-2 mb-4">
                    {slides[currentSlide].icon}
                    <span className="text-sm font-semibold" style={{ color: colors.blue }}>
                      جديد
                    </span>
                  </div>
                  <h3 className="text-3xl font-bold leading-tight" style={{ color: colors.black }}>
                    {slides[currentSlide].title}
                  </h3>
                </motion.div>

                <motion.p
                  className="text-lg leading-relaxed"
                  style={{ color: colors.gray }}
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-8 py-4 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 text-lg"
                  style={{ background: colors.blue }}
                  onClick={() => setShowFeatures(true)}
                >
                  {slides[currentSlide].icon}
                  {slides[currentSlide].cta}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ease-out ${
                currentSlide === index 
                  ? "w-8 bg-gradient-to-r from-blue-500 to-yellow-500"
                  : "w-4 bg-gray-200 hover:bg-gray-300"
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* الدورات الموصى بها */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold" style={{ color: colors.black }}>
            الدورات الموصى بها لك
          </h2>
          <button className="flex items-center text-blue-600 font-medium">
            عرض الكل
            <FiChevronRight className="mr-2" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg border border-gray-100"
              style={{ backgroundColor: colors.white }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-48">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-yellow-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  جديد
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.black }}>
                  {course.title}
                </h3>
                <p className="text-gray-600 mb-4" style={{ color: colors.gray }}>
                  بواسطة {course.instructor}
                </p>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <FiStar style={{ color: colors.yellow }} className="mr-1" />
                    <span>{course.rating}</span>
                    <span className="mx-2">|</span>
                    <FiUser style={{ color: colors.gray }} className="mr-1" />
                    <span>{course.students.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <FiClock style={{ color: colors.gray }} className="mr-1" />
                    <span>{course.duration}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold" style={{ color: colors.blue }}>
                    {course.price}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 rounded-lg font-medium"
                    style={{ backgroundColor: colors.blue, color: colors.white }}
                  >
                    ابدأ الآن
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* نافذة الميزات */}
      <AnimatePresence>
        {showFeatures && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-lg z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative"
              style={{ backgroundColor: colors.white }}
            >
              <button
                onClick={() => setShowFeatures(false)}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <FiX className="w-6 h-6" style={{ color: colors.gray }} />
              </button>

              <h3 className="text-3xl font-bold text-center mb-8" style={{ color: colors.black }}>
                لماذا تختار منصة اعتماد؟
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="rounded-xl p-6 transition-colors border hover:border-blue-200"
                    style={{ 
                      backgroundColor: colors.white,
                      borderColor: colors.blue + '20',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                  >
                    <div className="flex flex-col items-center text-center">
                      {feature.icon}
                      <h4 className="text-xl font-semibold mb-2" style={{ color: colors.black }}>
                        {feature.title}
                      </h4>
                      <p className="text-gray-600" style={{ color: colors.gray }}>
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-lg transition-colors font-medium"
                  style={{ 
                    backgroundColor: colors.yellow,
                    color: colors.black
                  }}
                  onClick={() => setShowFeatures(false)}
                >
                  ابدأ رحلتك التعليمية الآن
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

          </div>
  );
};

export default WelcomeMessage;