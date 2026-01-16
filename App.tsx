
import React, { useEffect, Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Loader2 } from 'lucide-react';

// 1. IMPORT TRỰC TIẾP TRANG CHỦ
import HomePage from './pages/HomePage';

// 2. LAZY LOAD CÁC TRANG CON
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const CustomPathPage = lazy(() => import('./pages/CustomPathPage'));
const ShopPage = lazy(() => import('./pages/ShopPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const MyNewProject = lazy(() => import('./pages/MyNewProject'));
const DesignBriefPage = lazy(() => import('./pages/DesignBriefPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const AiStudioPage = lazy(() => import('./pages/AiStudioPage')); // NEW IMPORT

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// 3. TỐI ƯU LOADER
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center space-y-4 animate-in fade-in duration-300">
      <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
      <p className="text-slate-400 font-black text-xs uppercase tracking-widest animate-pulse">Đang tải trải nghiệm...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      {/* 
         Logic ẩn Navbar/Footer cho trang AI Studio để có trải nghiệm Fullscreen Immersive.
         Tuy nhiên, vì Router nằm trong App, ta cần check location bên trong một component con hoặc chấp nhận hiển thị Navbar.
         Ở đây, với yêu cầu "Liên kết đến nút AI Studio ở Header", ta vẫn giữ Navbar nhưng có thể trong AiStudioPage ta sẽ dùng CSS fixed đè lên hoặc ẩn đi.
         Trong thiết kế AiStudioPage bên trên, tôi đã dùng "fixed inset-0 z-[200]" để nó phủ lên toàn bộ, nên không cần sửa App structure nhiều.
      */}
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/:courseId" element={<CourseDetailPage />} />
              <Route path="/custom-path" element={<CustomPathPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/my-new-project" element={<MyNewProject />} />
              <Route path="/design-brief" element={<DesignBriefPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/ai-studio" element={<AiStudioPage />} /> {/* NEW ROUTE */}
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
