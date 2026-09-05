export type Lang = 'en' | 'ar';

export interface Translation {
  // Nav
  navGallery: string;
  navWings: string;
  navServices: string;
  navPricing: string;
  navAbout: string;
  navBlog: string;
  navSupport: string;
  navLogin: string;
  navSignup: string;
  navDashboard: string;
  navSearch: string;
  navAI: string;
  navWishlist: string;

  // Hero
  heroHeadline1: string;
  heroHeadline2: string;
  heroSub: string;
  heroCtaEnter: string;
  heroCtaBrowse: string;
  scroll: string;

  // Wings
  wingsLabel: string;
  wingAssets: string;
  wing01Name: string;
  wing01Desc: string;
  wing02Name: string;
  wing02Desc: string;
  wing03Name: string;
  wing03Desc: string;
  wing04Name: string;
  wing04Desc: string;
  wing05Name: string;
  wing05Desc: string;
  wing06Name: string;
  wing06Desc: string;

  // Gallery
  galleryLabel: string;
  galleryTitle1: string;
  galleryTitle2: string;
  gallerySub: string;
  bestseller: string;
  view: string;
  add: string;

  // Shop teaser
  shopLabel: string;
  shopTitle1: string;
  shopTitle2: string;
  shopCta: string;

  // Light path
  pathLabel: string;
  pathTitle1: string;
  pathTitle2: string;
  step01Title: string;
  step01Desc: string;
  step02Title: string;
  step02Desc: string;
  step03Title: string;
  step03Desc: string;
  step04Title: string;
  step04Desc: string;
  step: string;

  // Testimonials
  voicesLabel: string;
  voicesTitle: string;

  // Pricing
  vaultsLabel: string;
  vaultsTitle1: string;
  vaultsTitle2: string;
  tierStarter: string;
  tierCreator: string;
  tierStudio: string;
  tierEnterprise: string;
  tierPopular: string;
  tierForever: string;
  tierMonth: string;
  tierCustom: string;
  tierContact: string;
  tierGetStarted: string;
  featBrowse: string;
  feat3Free: string;
  featCommunity: string;
  featUnlimited: string;
  featAllCat: string;
  featCommercial: string;
  featPriority: string;
  featCreatorPlus: string;
  feat5Seats: string;
  featCustomReq: string;
  featEarly: string;
  featStudioPlus: string;
  featUnlimitedSeats: string;
  featManager: string;
  featCustomLic: string;

  // Final CTA
  finalTitle1: string;
  finalTitle2: string;
  finalSub: string;
  finalCta: string;

  // Footer
  footerJoin: string;
  footerJoinTitle: string;
  footerSub: string;
  footerPlaceholder: string;
  footerSubscribe: string;
  footerExplore: string;
  footerCompany: string;
  footerSupport: string;
  footerAccount: string;
  footerProducts: string;
  footerCategories: string;
  footerServices: string;
  footerPricing: string;
  footerAbout: string;
  footerBlog: string;
  footerContact: string;
  footerCareers: string;
  footerHelp: string;
  footerFaq: string;
  footerPrivacy: string;
  footerTerms: string;
  footerLogin: string;
  footerSignup: string;
  footerDashboard: string;
  footerWishlist: string;
  footerRights: string;

  // Loader
  loaderText: string;

  // Common
  enterGallery: string;
}

export const translations: Record<Lang, Translation> = {
  en: {
    navGallery: 'Gallery',
    navWings: 'Wings',
    navServices: 'Services',
    navPricing: 'Pricing',
    navAbout: 'About',
    navBlog: 'Blog',
    navSupport: 'Support',
    navLogin: 'Login',
    navSignup: 'Sign Up',
    navDashboard: 'Dashboard',
    navSearch: 'Search',
    navAI: 'AI Assistant',
    navWishlist: 'Wishlist',

    heroHeadline1: 'Where Digital Craft',
    heroHeadline2: 'Becomes Art',
    heroSub: 'A living digital atelier where premium creative assets are curated, crafted, and delivered — not just sold.',
    heroCtaEnter: 'Enter the Gallery',
    heroCtaBrowse: 'Browse Categories',
    scroll: 'Scroll',

    wingsLabel: 'The Wings',
    wingAssets: 'assets',
    wing01Name: 'UI/UX & Figma',
    wing01Desc: 'Component libraries, design systems, and Figma files crafted for production-grade interfaces.',
    wing02Name: 'Canva & Social',
    wing02Desc: 'Social media templates, presentation decks, and brand-ready Canva assets for every platform.',
    wing03Name: 'Branding & Mockups',
    wing03Desc: 'Brand identity kits, logo systems, and photorealistic mockups for every surface and screen.',
    wing04Name: 'Courses & Ebooks',
    wing04Desc: 'Expert-led courses and in-depth ebooks on design, development, and creative business.',
    wing05Name: 'Icons, Fonts & Graphics',
    wing05Desc: 'Pixel-perfect icon sets, typefaces, and graphic packs for every creative discipline.',
    wing06Name: 'Presentations',
    wing06Desc: 'Cinematic presentation templates for pitches, decks, and keynote-level storytelling.',

    galleryLabel: 'Featured Artifacts',
    galleryTitle1: 'Curated pieces,',
    galleryTitle2: 'floating in space',
    gallerySub: 'Not a grid. A gallery. Each artifact floats at its own depth, lit like a museum piece.',
    bestseller: 'Bestseller',
    view: 'View',
    add: 'Add',

    shopLabel: 'The Full Collection',
    shopTitle1: 'Browse',
    shopTitle2: '500+ digital assets',
    shopCta: 'Explore All Assets',

    pathLabel: 'How It Works',
    pathTitle1: 'Follow the',
    pathTitle2: 'light path',
    step01Title: 'Browse',
    step01Desc: 'Explore curated wings of premium digital assets',
    step02Title: 'Purchase',
    step02Desc: 'Secure checkout with instant processing',
    step03Title: 'Instant Download',
    step03Desc: 'Access your files immediately after purchase',
    step04Title: 'Use & Create',
    step04Desc: 'Deploy in your projects and start creating',
    step: 'Step',

    voicesLabel: 'Voices from the Gallery',
    voicesTitle: 'What creators say',

    vaultsLabel: 'Membership Vaults',
    vaultsTitle1: 'Choose your',
    vaultsTitle2: 'vault',
    tierStarter: 'Starter',
    tierCreator: 'Creator',
    tierStudio: 'Studio',
    tierEnterprise: 'Enterprise',
    tierPopular: 'Most Popular',
    tierForever: 'forever',
    tierMonth: '/month',
    tierCustom: 'Custom',
    tierContact: 'Contact Sales',
    tierGetStarted: 'Get Started',
    featBrowse: 'Browse all assets',
    feat3Free: '3 free downloads / month',
    featCommunity: 'Community access',
    featUnlimited: 'Unlimited downloads',
    featAllCat: 'All categories unlocked',
    featCommercial: 'Commercial license',
    featPriority: 'Priority support',
    featCreatorPlus: 'Everything in Creator',
    feat5Seats: '5 team seats',
    featCustomReq: 'Custom requests',
    featEarly: 'Early access assets',
    featStudioPlus: 'Everything in Studio',
    featUnlimitedSeats: 'Unlimited seats',
    featManager: 'Dedicated manager',
    featCustomLic: 'Custom licensing',

    finalTitle1: 'Your journey',
    finalTitle2: 'starts here',
    finalSub: 'Step through the portal. The atelier is open.',
    finalCta: 'Enter the Gallery',

    footerJoin: 'Join the',
    footerJoinTitle: 'atelier',
    footerSub: 'Get notified when new artifacts arrive. No noise, just craft.',
    footerPlaceholder: 'your@email.com',
    footerSubscribe: 'Subscribe',
    footerExplore: 'Explore',
    footerCompany: 'Company',
    footerSupport: 'Support',
    footerAccount: 'Account',
    footerProducts: 'All Products',
    footerCategories: 'Categories',
    footerServices: 'Services',
    footerPricing: 'Pricing',
    footerAbout: 'About',
    footerBlog: 'Blog',
    footerContact: 'Contact',
    footerCareers: 'Careers',
    footerHelp: 'Help Center',
    footerFaq: 'FAQ',
    footerPrivacy: 'Privacy',
    footerTerms: 'Terms',
    footerLogin: 'Login',
    footerSignup: 'Sign Up',
    footerDashboard: 'Dashboard',
    footerWishlist: 'Wishlist',
    footerRights: '© 2026 The Infinite Atelier',

    loaderText: 'Entering Atelier',

    enterGallery: 'Enter the Gallery',
  },

  ar: {
    navGallery: 'المعرض',
    navWings: 'الأجنحة',
    navServices: 'الخدمات',
    navPricing: 'الأسعار',
    navAbout: 'عن نوفكسا',
    navBlog: 'المدونة',
    navSupport: 'الدعم',
    navLogin: 'تسجيل الدخول',
    navSignup: 'إنشاء حساب',
    navDashboard: 'لوحة التحكم',
    navSearch: 'بحث',
    navAI: 'مساعد الذكاء',
    navWishlist: 'المفضلة',

    heroHeadline1: 'حيث يتحول الإبداع الرقمي',
    heroHeadline2: 'إلى فن',
    heroSub: 'مرسم رقمي حي حيث تُنتقى وتُصنع وتُسلّم الأصول الإبداعية الفاخرة — لا تُباع فحسب.',
    heroCtaEnter: 'ادخل المعرض',
    heroCtaBrowse: 'تصفح الفئات',
    scroll: 'مرر',

    wingsLabel: 'الأجنحة',
    wingAssets: 'أصل',
    wing01Name: 'واجهات وفيغما',
    wing01Desc: 'مكتبات مكونات وأنظمة تصميم وملفات فيغما مصممة لواجهات بمستوى الإنتاج.',
    wing02Name: 'كانفا ووسائل التواصل',
    wing02Desc: 'قوالب وسائل التواصل وعروض تقديمية وأصول كانفا جاهزة للعلامة التجارية لكل منصة.',
    wing03Name: 'الهوية والنماذج',
    wing03Desc: 'حزم هوية العلامة التجارية وأنظمة الشعارات ونماذج واقعية لكل سطح وشاشة.',
    wing04Name: 'دورات وكتب',
    wing04Desc: 'دورات بقيادة خبراء وكتب متعمقة في التصميم والتطوير والأعمال الإبداعية.',
    wing05Name: 'أيقونات وخطوط ورسوم',
    wing05Desc: 'مجموعات أيقونات دقيقة البكسل وخطوط وحزم رسومية لكل تخصص إبداعي.',
    wing06Name: 'العروض التقديمية',
    wing06Desc: 'قوالب عروض تقديمية سينمائية للعروض والمنصات وسرد على مستوى العروض الرئيسية.',

    galleryLabel: 'قطع مميزة',
    galleryTitle1: 'قطع منتقاة،',
    galleryTitle2: 'تطفو في الفضاء',
    gallerySub: 'ليست شبكة. بل معرض. كل قطعة تطفو على عمقها الخاص، مضاءة كقطعة متحفية.',
    bestseller: 'الأكثر مبيعاً',
    view: 'عرض',
    add: 'أضف',

    shopLabel: 'المجموعة الكاملة',
    shopTitle1: 'تصفح',
    shopTitle2: 'أكثر من 500 أصل رقمي',
    shopCta: 'استكشف كل الأصول',

    pathLabel: 'كيف يعمل',
    pathTitle1: 'اتبع',
    pathTitle2: 'مسار الضوء',
    step01Title: 'تصفح',
    step01Desc: 'استكشف الأجنحة المنتقاة من الأصول الرقمية الفاخرة',
    step02Title: 'اشترِ',
    step02Desc: 'دفع آمن مع معالجة فورية',
    step03Title: 'تحميل فوري',
    step03Desc: 'ادخل إلى ملفاتك فوراً بعد الشراء',
    step04Title: 'استخدم وابدع',
    step04Desc: 'انشرها في مشاريعك وابدأ الإبداع',
    step: 'خطوة',

    voicesLabel: 'أصوات من المعرض',
    voicesTitle: 'ماذا يقول المبدعون',

    vaultsLabel: 'خزائن العضوية',
    vaultsTitle1: 'اختر',
    vaultsTitle2: 'خزنتك',
    tierStarter: 'المبتدئ',
    tierCreator: 'المبدع',
    tierStudio: 'الاستوديو',
    tierEnterprise: 'المؤسسات',
    tierPopular: 'الأكثر شعبية',
    tierForever: 'للأبد',
    tierMonth: '/شهرياً',
    tierCustom: 'مخصص',
    tierContact: 'تواصل مع المبيعات',
    tierGetStarted: 'ابدأ الآن',
    featBrowse: 'تصفح جميع الأصول',
    feat3Free: '3 تحميلات مجانية / شهر',
    featCommunity: 'وصول للمجتمع',
    featUnlimited: 'تحميلات غير محدودة',
    featAllCat: 'جميع الفئات مفتوحة',
    featCommercial: 'رخصة تجارية',
    featPriority: 'دعم ذو أولوية',
    featCreatorPlus: 'كل ما في المبدع',
    feat5Seats: '5 مقاعد للفريق',
    featCustomReq: 'طلبات مخصصة',
    featEarly: 'وصول مبكر للأصول',
    featStudioPlus: 'كل ما في الاستوديو',
    featUnlimitedSeats: 'مقاعد غير محدودة',
    featManager: 'مدير مخصص',
    featCustomLic: 'ترخيص مخصص',

    finalTitle1: 'رحلتك',
    finalTitle2: 'تبدأ هنا',
    finalSub: 'اعبر البوابة. المرسم مفتوح.',
    finalCta: 'ادخل المعرض',

    footerJoin: 'انضم إلى',
    footerJoinTitle: 'المرسم',
    footerSub: 'احصل على إشعار عند وصول قطع جديدة. لا ضجيج، فقط حرفية.',
    footerPlaceholder: 'بريدك@الإلكتروني.com',
    footerSubscribe: 'اشترك',
    footerExplore: 'استكشف',
    footerCompany: 'الشركة',
    footerSupport: 'الدعم',
    footerAccount: 'الحساب',
    footerProducts: 'كل المنتجات',
    footerCategories: 'الفئات',
    footerServices: 'الخدمات',
    footerPricing: 'الأسعار',
    footerAbout: 'عن نوفكسا',
    footerBlog: 'المدونة',
    footerContact: 'تواصل',
    footerCareers: 'الوظائف',
    footerHelp: 'مركز المساعدة',
    footerFaq: 'الأسئلة الشائعة',
    footerPrivacy: 'الخصوصية',
    footerTerms: 'الشروط',
    footerLogin: 'تسجيل الدخول',
    footerSignup: 'إنشاء حساب',
    footerDashboard: 'لوحة التحكم',
    footerWishlist: 'المفضلة',
    footerRights: '© 2026 المرسم اللانهائي',

    loaderText: 'دخول المرسم',

    enterGallery: 'ادخل المعرض',
  },
};
