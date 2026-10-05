import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LiveChat from './components/LiveChat';
import PageTransition from './components/PageTransition';
import HomePage from './pages/HomePage';
import BoatsPage from './pages/BoatsPage';
import BlogPage from './pages/BlogPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/boats" element={<PageTransition><BoatsPage /></PageTransition>} />
        <Route path="/blog" element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><DashboardPage /></PageTransition>} />
        <Route path="/about" element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-lightGray dark:bg-darkBg transition-colors duration-300 flex flex-col">
        <Header />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
        <ScrollToTop />
        <LiveChat />
      </div>
    </BrowserRouter>
  );
}

export default App;