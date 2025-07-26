"use client";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import ProfessionalSidebar from "./Sidebar";
import HomePage from "./HomePage";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/hooks";
import { motion, AnimatePresence } from "framer-motion";

// ألوان التصميم الرئيسية
const colors = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011',
};

function Page() {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [showWelcome, setShowWelcome] = useState(false);
  
  useEffect(() => {
    if (isAuthenticated) {
      setShowWelcome(true);
    }
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex flex-1">
        <ProfessionalSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          
          <AnimatePresence>
            {isAuthenticated && user && showWelcome && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative overflow-hidden"
              >
                <div 
                  className="relative py-6 px-4 md:px-8"
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.blue} 0%, ${colors.white} 100%)`,
                    boxShadow: `0 4px 15px ${colors.blue}20`
                  }}
                >
                  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <motion.div 
                      initial={{ x: -30 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex-1 text-center md:text-right"
                    >
                      <h1 className="text-2xl md:text-3xl font-bold text-white">
                        مرحبًا {user.username} 👋
                      </h1>
                      <p className="text-lg text-blue-50 mt-2">
                        يمكنك الآن البدء في استخدام المنصة والاستفادة من جميع الميزات
                      </p>
                      
                     
                    </motion.div>
                    
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="relative"
                    >
                      <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-white flex items-center justify-center">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-700 w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center">
                            <span className="text-2xl md:text-4xl font-bold text-white">
                              {user.username.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-green-400 border-2 border-white animate-pulse"></div>
                    </motion.div>
                  </div>
                  
                  {/* موجات زخرفية */}
                  <div className="absolute bottom-0 left-0 right-0 h-12">
                    <svg 
                      viewBox="0 0 1200 120" 
                      preserveAspectRatio="none"
                      className="absolute bottom-0 left-0 w-full h-full"
                    >
                      <path 
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
                        opacity=".25" 
                        fill={colors.white}
                      ></path>
                      <path 
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
                        opacity=".5" 
                        fill={colors.white}
                      ></path>
                      <path 
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
                        fill={colors.white}
                      ></path>
                    </svg>
                  </div>
                  
                  {/* زر الإغلاق */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 left-3 p-1 rounded-full"
                    style={{ backgroundColor: colors.white + '80' }}
                    onClick={() => setShowWelcome(false)}
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5" 
                      viewBox="0 0 20 20" 
                      fill={colors.blue}
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </motion.button>
                </div>
                
                {/* مؤشر التقدم */}
                <div className="h-1.5 w-full bg-blue-100 relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-600"
                  ></motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <HomePage />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;