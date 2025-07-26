import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUsers,
  faTasks,
  faChalkboardTeacher,
  faEnvelope,
  faUserGraduate,
  faCog,
  faChevronDown,
  faChevronUp,
  faBell,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons';

// تعريف الثيم والألوان
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

// تعريف الفئات مع الإيقونات المناسبة
const categories = [
  {
    title: 'الرئيسية',
    icon: faHome,
    items: [
      { key: 'dashboard', label: 'إحصاءات مختصرة', icon: faHome }
    ]
  },
  {
    title: 'إدارة المستخدمين',
    icon: faUsers,
    items: [
      { key: 'Employee', label: 'ادارة مستخدمي المنصة', icon: faUsers }
    ]
  },
  {
    title: 'إدارة المهام',
    icon: faTasks,
    items: [
      { key: 'tasks', label: 'المهام الموكلة', icon: faTasks }
    ]
  },
  {
    title: 'الدعم',
    icon: faCog,
    items: [
      { key: 'support', label: 'الدعم', icon: faEnvelope },
    ]
  }
];

const Sidebar = ({ activeSection, setActiveSection }) => {
  const [expandedCategories, setExpandedCategories] = useState(['الرئيسية']);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const progress = (scrollTop / (scrollHeight - clientHeight)) * 100;
    setScrollProgress(progress);
  };

  return (
    <aside 
      className="w-72 fixed right-0 top-0 h-screen flex flex-col z-10"
      style={{
        backgroundColor: theme.white,
        borderLeft: `1px solid ${alpha(theme.gray, 0.1)}`,
        boxShadow: `-2px 0 10px ${alpha(theme.gray, 0.1)}`
      }}
    >
      {/* الشعار مع تظليل خفيف */}
      <div 
        className="px-6 py-5 flex items-center justify-center"
        style={{
          backgroundColor: alpha(theme.blue, 0.03),
          borderBottom: `1px solid ${alpha(theme.blue, 0.1)}`
        }}
      >
        <img 
          src="/الاعتماد العربي.png" 
          alt="شعار المنصة"
          className="h-14 object-contain"
        />
      </div>

      {/* شريط التقدم مع تظليل وتصميم محسن */}
      <div 
        className="h-1.5 relative overflow-hidden"
        style={{ backgroundColor: alpha(theme.gray, 0.1) }}
      >
        <div 
          className="h-full absolute top-0 right-0 transition-all duration-300"
          style={{ 
            width: `${scrollProgress}%`,
            backgroundColor: theme.blue,
            boxShadow: `0 0 8px ${alpha(theme.blue, 0.3)}`
          }}
        />
      </div>

      {/* القائمة الرئيسية مع تظليل وتصميم محسن */}
      <nav 
        className="flex-1 overflow-y-auto py-4"
        onScroll={handleScroll}
      >
        <ul className="space-y-2 px-4">
          {categories.map((category) => (
            <li key={category.title}>
              <button
                onClick={() => setExpandedCategories(prev => 
                  prev.includes(category.title) 
                    ? prev.filter(t => t !== category.title) 
                    : [...prev, category.title]
                )}
                className={`
                  w-full flex justify-between items-center px-4 py-3
                  rounded-xl transition-all duration-300
                  ${expandedCategories.includes(category.title) 
                    ? 'bg-blue-50' 
                    : 'bg-white hover:bg-gray-50'
                  }
                `}
                style={{
                  border: `1px solid ${alpha(theme.gray, 0.1)}`,
                  boxShadow: expandedCategories.includes(category.title) 
                    ? `0 4px 6px ${alpha(theme.blue, 0.1)}`
                    : '0 1px 2px rgba(0,0,0,0.05)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2.5 rounded-lg flex items-center justify-center"
                    style={{
                      background: expandedCategories.includes(category.title)
                        ? alpha(theme.blue, 0.15)
                        : alpha(theme.gray, 0.07)
                    }}
                  >
                    <FontAwesomeIcon 
                      icon={category.icon} 
                      className="w-5 h-5 transition-colors"
                      style={{
                        color: expandedCategories.includes(category.title) 
                          ? theme.blue 
                          : theme.gray
                      }}
                    />
                  </div>
                  <span 
                    className="font-semibold text-sm transition-colors"
                    style={{
                      color: expandedCategories.includes(category.title) 
                        ? theme.blue 
                        : theme.black
                    }}
                  >
                    {category.title}
                  </span>
                </div>
                
                <FontAwesomeIcon 
                  icon={expandedCategories.includes(category.title) ? faChevronUp : faChevronDown}
                  className="w-4 h-4 transition-all duration-300"
                  style={{
                    color: expandedCategories.includes(category.title) ? theme.blue : theme.gray
                  }}
                />
              </button>

              {/* العناصر الفرعية مع تظليل وتصميم محسن */}
              <ul 
                className={`ml-10 space-y-2 overflow-hidden transition-all
                  ${expandedCategories.includes(category.title) 
                    ? 'max-h-96 opacity-100 mt-2' 
                    : 'max-h-0 opacity-0'
                  }`}
              >
                {category.items.map((item) => (
                  <li key={item.key}>
                    <button
                      onClick={() => setActiveSection(item.key)}
                      className={`
                        w-full text-right px-4 py-2.5 rounded-lg 
                        transition-all duration-300 flex items-center gap-3
                        ${activeSection === item.key 
                          ? 'bg-blue-100 border-blue-200' 
                          : 'bg-white hover:bg-gray-50 border-gray-100'
                        }
                      `}
                      style={{
                        border: `1px solid ${alpha(theme.gray, 0.1)}`,
                        boxShadow: activeSection === item.key 
                          ? `0 2px 4px ${alpha(theme.blue, 0.1)}`
                          : 'none'
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={item.icon} 
                        className="w-4 h-4 transition-colors"
                        style={{
                          color: activeSection === item.key 
                            ? theme.blue 
                            : theme.gray
                        }}
                      />
                      <span 
                        className="flex-1 text-sm font-medium pr-1 transition-colors"
                        style={{
                          color: activeSection === item.key 
                            ? theme.blue 
                            : theme.black
                        }}
                      >
                        {item.label}
                      </span>
                      
                      {item.key === 'support' && (
                        <span 
                          className="w-2.5 h-2.5 rounded-full animate-pulse"
                          style={{ 
                            backgroundColor: theme.red,
                            boxShadow: `0 0 4px ${alpha(theme.red, 0.4)}`
                          }}
                        />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* قسم الإشعارات مع تظليل وتصميم محسن */}
      <div 
        className="mx-4 mb-4 p-4 rounded-xl transition-all hover:scale-[1.01]"
        style={{
          backgroundColor: alpha(theme.yellow, 0.08),
          border: `1px solid ${alpha(theme.yellow, 0.2)}`,
          boxShadow: `0 4px 6px ${alpha(theme.yellow, 0.05)}`,
          backdropFilter: 'blur(2px)'
        }}
      >
        <div className="flex items-center gap-3">
          <div 
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors"
            style={{
              backgroundColor: alpha(theme.yellow, 0.15)
            }}
          >
            <FontAwesomeIcon 
              icon={faBell} 
              className="w-5 h-5"
              style={{ color: theme.yellow }}
            />
          </div>
          <div>
            <p 
              className="text-sm font-semibold transition-colors"
              style={{ 
                color: theme.black,
                textShadow: `0 1px 1px ${alpha(theme.white, 0.5)}`
              }}
            >
              3 تحديثات جديدة
            </p>
            <p 
              className="text-xs mt-1 transition-colors"
              style={{ 
                color: alpha(theme.black, 0.7),
                textShadow: `0 1px 1px ${alpha(theme.white, 0.5)}`
              }}
            >
              آخر تحديث: ٢٤ ساعة
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;