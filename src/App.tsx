import { useState, useEffect } from 'react';
import { AppProvider, useApp } from '@/store/AppContext';
import { I18nProvider } from '@/i18n/I18nContext';
import { Header } from '@/components/layout/Header';
import { SmartSearch } from '@/components/search/SmartSearch';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AIAssistant } from '@/components/ai/AIAssistant';
import { CustomCursor, PortalLoader } from '@/components/atelier/AtelierCore';

import { HomePage } from '@/pages/HomePage';
import { ProductsPage } from '@/pages/ProductsPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';
import { CategoriesPage, CategoryPage } from '@/pages/CategoriesPage';
import { ServicesPage, ServiceDetailsPage } from '@/pages/ServicesPage';
import { PricingPage } from '@/pages/PricingPage';
import { AboutPage } from '@/pages/AboutPage';
import { BlogPage, BlogArticlePage } from '@/pages/BlogPage';
import { ContactPage } from '@/pages/ContactPage';
import { SupportPage, FAQPage } from '@/pages/SupportPage';
import { PrivacyPage, TermsPage } from '@/pages/LegalPages';
import { AuthPage } from '@/pages/AuthPage';
import {
  DashboardPage, ProfilePage, OrdersPage, DownloadsPage,
  SettingsPage, WishlistPage,
} from '@/pages/DashboardPages';
import { AdminPage } from '@/pages/AdminPage';
import { AssistantPage } from '@/pages/AssistantPage';
import { ExitPortal } from '@/components/atelier/AtelierSections';

function Router() {
  const { route } = useApp();

  if (route === '/') return <HomePage />;
  if (route === '/products') return <ProductsPage />;
  if (route.startsWith('/product/')) return <ProductDetailsPage productId={route.replace('/product/', '')} />;
  if (route === '/categories') return <CategoriesPage />;
  if (route.startsWith('/category/')) return <CategoryPage categoryId={route.replace('/category/', '')} />;
  if (route === '/services') return <ServicesPage />;
  if (route.startsWith('/service/')) return <ServiceDetailsPage serviceId={route.replace('/service/', '')} />;
  if (route === '/pricing') return <PricingPage />;
  if (route === '/about') return <AboutPage />;
  if (route === '/blog') return <BlogPage />;
  if (route.startsWith('/blog/')) return <BlogArticlePage postId={route.replace('/blog/', '')} />;
  if (route === '/contact') return <ContactPage />;
  if (route === '/support') return <SupportPage />;
  if (route === '/faq') return <FAQPage />;
  if (route === '/privacy') return <PrivacyPage />;
  if (route === '/terms') return <TermsPage />;
  if (route === '/login') return <AuthPage mode="login" />;
  if (route === '/signup') return <AuthPage mode="signup" />;
  if (route === '/assistant') return <AssistantPage />;
  if (route === '/dashboard') return <DashboardPage />;
  if (route === '/profile') return <ProfilePage />;
  if (route === '/orders') return <OrdersPage />;
  if (route === '/downloads') return <DownloadsPage />;
  if (route === '/settings') return <SettingsPage />;
  if (route === '/wishlist') return <WishlistPage />;
  if (route === '/admin') return <AdminPage />;

  return <HomePage />;
}

function AppContent() {
  const { route } = useApp();
  const isAuthPage = route === '/login' || route === '/signup';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-atelier-void">
      {loading && <PortalLoader onComplete={() => setLoading(false)} />}
      <div className="film-grain" />
      <CustomCursor />
      {!isAuthPage && <Header />}
      <main>
        <Router />
      </main>
      {!isAuthPage && route === '/' && <ExitPortal />}
      {!isAuthPage && route !== '/' && <ExitPortal />}
      {/* Global overlays */}
      <SmartSearch />
      <CartDrawer />
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </I18nProvider>
  );
}
