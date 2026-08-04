import { AppProvider, useApp } from '@/store/AppContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmartSearch } from '@/components/search/SmartSearch';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { AIAssistant } from '@/components/ai/AIAssistant';

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

function Router() {
  const { route } = useApp();

  // Parse route
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

  return (
    <div className="relative min-h-screen bg-novixa-bg">
      <div className="noise-overlay" />
      {!isAuthPage && <Header />}
      <main>
        <Router />
      </main>
      {!isAuthPage && <Footer />}
      {/* Global overlays */}
      <SmartSearch />
      <CartDrawer />
      <AIAssistant />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
