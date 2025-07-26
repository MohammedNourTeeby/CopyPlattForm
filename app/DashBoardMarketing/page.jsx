// app/dashboard/agent/page.jsx
"use client";
import React, { useState } from "react"; // <-- يجب استيراد useState
import CampaignStatistics from "./components/CampaignStats";
import Sidebar from './components/Sidebar'; // <-- تصحيح اسم المكون
import CampaignList from './components/CampaignList';
import SalesReports from './components/SalesReports';
import LeadsManager from './components/LeadsManager';
import AffiliateDashboard from './components/Affiliate/AffiliateDashboard';
import AutomationDashboard from './components/AutomationBuilder/page';
import AutomationSystem from './components/automation/page';
import StudentMarketingDashboard from './components/Emails/page';
import AdsManagerDashboard from '@/app/ads/page';
import RefundDashboard from './components/promotion/page';
import SosialDashboard from '@/app/Social/page';
function Page() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sections={{
          dashboard: 'إحصاءات سريعة',
          campaigns: 'الحملات التسويقية',
          reports: 'التقارير المالية',

          affiliate: '    التسويق بالعمولة ',
            automation: ' إدارة حملات التسويق ',
            funnel: 'إدارة المبيعات  ',
            conniction: 'إدارة التواصل مع العملاء  ',
            maitychannel: ' ادارة التواصل الموحد  ',

      
        }}
      />
      <main className="flex-1 mr-64 p-8"> {/* تصحيح الهوامش */}
      <div className="bg-white  p-6 rounded-lg shadow-sm"> {/* إضافة h-full */}
      {activeSection === 'dashboard' && <CampaignStatistics />}
      {activeSection === 'campaigns' && <CampaignList />}
      {activeSection === 'reports' && <SalesReports />}
      {activeSection === 'leads' && <LeadsManager />}
      {activeSection === 'Affiliate' && <AffiliateDashboard   />}
 {/* content Section */}
                    {activeSection === 'Automation' && (
                      <div className="bg-white p-6 rounded-lg shadow-sm">
                    {activeSection === 'Automation' && <AutomationSystem />}
                    </div>
                    )}
      {activeSection === 'conniction' && <AutumationyyyDashboard   />}
      {activeSection === 'maitychannel' && <DashboardPage   />}
      {activeSection === 'Emails' && < StudentMarketingDashboard/>}
      {activeSection === 'Ads' && < AdsManagerDashboard/>}
                               {activeSection === 'promotion' && <RefundDashboard   />}
              
                {activeSection === 'Social' && <SosialDashboard />}

        </div>
      </main>
    </div>
  );
}

export default Page;