import React, { useState } from 'react';
import { Shield, ChevronRight, FileText, AlertTriangle, Globe, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// 1. The Dictionary (Add more languages here easily)
const translations = {
  en: {
    greeting: "Hello, Dhiren 👋",
    welcome: "Welcome to your Policy Wallet",
    activePolicy: "Active Policy",
    validTill: "Valid Till",
    fileClaim: "File a New Claim",
    claimSub: "For accidents & damages",
    recent: "Recent Activity",
    settled: "Settled",
    activeStatus: "Active"
  },
  hi: {
    greeting: "नमस्ते, धीरेन 👋",
    welcome: "आपके पॉलिसी वॉलेट में स्वागत है",
    activePolicy: "सक्रिय पॉलिसी",
    validTill: "वैधता तिथि",
    fileClaim: "नया क्लेम दर्ज करें",
    claimSub: "दुर्घटनाओं और नुकसान के लिए",
    recent: "हाल की गतिविधि",
    settled: "निपटारा हुआ",
    activeStatus: "सक्रिय"
  },
  mr: {
    greeting: "नमस्कार, धीरेन 👋",
    welcome: "आपल्या पॉलिसी वॉलेटमध्ये स्वागत आहे",
    activePolicy: "सक्रिय पॉलिसी",
    validTill: "वैधता तारीख",
    fileClaim: "नवीन क्लेम करा",
    claimSub: "अपघात आणि नुकसानीसाठी",
    recent: "अलीकडील क्रियाकलाप",
    settled: "पूर्ण झाले",
    activeStatus: "सक्रिय"
  }
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // 2. Language State (Default is English 'en')
  const [lang, setLang] = useState<'en' | 'hi' | 'mr'>('en');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = translations[lang]; // 't' stands for current translation

  return (
    // CENTERED MOBILE LAYOUT
    <div className="min-h-screen bg-gray-100 flex justify-center">
      <div className="w-full max-w-md bg-white min-h-screen relative shadow-2xl overflow-hidden">
        
        <div className="p-5 space-y-6 animate-in fade-in duration-500">
          
          {/* 3. Header with Language Dropdown */}
          <div className="flex justify-between items-start mt-2">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{t.greeting}</h1>
              <p className="text-sm text-gray-500">{t.welcome}</p>
            </div>

            {/* Language Switcher Button */}
            <div className="relative">
              <button 
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                <Globe size={14} />
                {lang === 'en' ? 'English' : lang === 'hi' ? 'हिंदी' : 'मराठी'}
                <ChevronDown size={14} />
              </button>

              {/* The Dropdown Menu */}
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <button onClick={() => {setLang('en'); setShowLangMenu(false)}} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700">English</button>
                  <button onClick={() => {setLang('hi'); setShowLangMenu(false)}} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700">हिंदी</button>
                  <button onClick={() => {setLang('mr'); setShowLangMenu(false)}} className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 text-gray-700">मराठी</button>
                </div>
              )}
            </div>
          </div>

          {/* 4. Active Policy Card (Dynamic Text) */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider">{t.activePolicy}</p>
                <h2 className="text-3xl font-bold mt-1">Hyundai Creta</h2>
                <p className="text-blue-200 text-sm mt-1 font-mono tracking-wide">MH 12 AB 1234</p>
              </div>
              <span className="bg-green-400/20 text-green-300 border border-green-400/30 text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
                ● {t.activeStatus}
              </span>
            </div>

            <div className="mt-8 flex justify-between items-end relative z-10">
              <div>
                <p className="text-xs text-blue-300 uppercase">{t.validTill}</p>
                <p className="font-semibold text-lg">Oct 12, 2026</p>
              </div>
              <div className="w-20 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                 <Shield size={20} className="opacity-50" />
              </div>
            </div>
          </div>

          {/* 5. Start Claim Button */}
          <button 
            onClick={() => navigate('/incident')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-xl shadow-lg shadow-orange-500/20 flex items-center justify-between group transition-all active:scale-[0.98]"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <AlertTriangle size={24} className="text-white" />
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">{t.fileClaim}</p>
                <p className="text-orange-100 text-xs">{t.claimSub}</p>
              </div>
            </div>
            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* 6. Past Claims List */}
          <div>
            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-4">{t.recent}</h3>
            <div className="space-y-3">
              <div className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm flex justify-between items-center hover:border-blue-200 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="bg-green-50 p-2 rounded-full">
                    <FileText size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">Claim #9921</p>
                    <p className="text-xs text-gray-400">12 Jan 2025 • {t.settled}</p>
                  </div>
                </div>
                <span className="text-green-600 font-bold text-sm">₹8,500</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;