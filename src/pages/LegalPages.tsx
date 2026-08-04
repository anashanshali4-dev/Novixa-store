import { PageHeader } from '@/components/shared/SectionHeading';

const PRIVACY_SECTIONS = [
  { title: 'Information We Collect', content: 'We collect information you provide directly to us, such as your name, email address, and payment information when you create an account or make a purchase. We also automatically collect certain information about your device and usage patterns.' },
  { title: 'How We Use Your Information', content: 'We use your information to process transactions, provide customer support, improve our services, send important notifications, and personalize your experience on Novixa.' },
  { title: 'Data Security', content: 'We implement industry-standard security measures including encryption, secure data transmission, and regular security audits. Your payment information is processed through certified payment processors and is never stored on our servers.' },
  { title: 'Data Retention', content: 'We retain your personal information for as long as your account is active or as needed to provide our services. You can request deletion of your account and associated data at any time.' },
  { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information. You can also opt out of marketing communications and request a copy of your data.' },
  { title: 'Contact Us', content: 'If you have questions about this privacy policy, please contact us at privacy@novixa.com.' },
];

const TERMS_SECTIONS = [
  { title: 'Acceptance of Terms', content: 'By accessing and using Novixa, you accept and agree to be bound by these Terms of Service. If you do not agree, please do not use our services.' },
  { title: 'Use of Services', content: 'You may use Novixa only for lawful purposes and in accordance with these Terms. You agree not to use the service in any way that could damage, disable, or impair the platform.' },
  { title: 'Product Licensing', content: 'Products purchased on Novixa are licensed, not sold. Each product comes with its own license terms specified by the creator. You may not resell, redistribute, or sublicense products unless explicitly permitted.' },
  { title: 'Creator Responsibilities', content: 'Creators are responsible for ensuring their products do not infringe on intellectual property rights. Creators retain ownership of their products while granting Novixa a license to display and sell them.' },
  { title: 'Refund Policy', content: 'All purchases are backed by our 14-day money-back guarantee. If you are not satisfied with a product, contact support within 14 days of purchase for a full refund.' },
  { title: 'Limitation of Liability', content: 'Novixa is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from the use of our services.' },
];

export function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Privacy Policy" subtitle="Last updated: August 2026" breadcrumb={['Home', 'Privacy Policy']} />
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 pb-20 space-y-6">
        {PRIVACY_SECTIONS.map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <h2 className="text-base font-semibold text-novixa-white mb-2">{s.title}</h2>
            <p className="text-sm text-novixa-muted font-light leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="min-h-screen">
      <PageHeader title="Terms of Service" subtitle="Last updated: August 2026" breadcrumb={['Home', 'Terms']} />
      <div className="max-w-[800px] mx-auto px-4 lg:px-6 pb-20 space-y-6">
        {TERMS_SECTIONS.map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <h2 className="text-base font-semibold text-novixa-white mb-2">{s.title}</h2>
            <p className="text-sm text-novixa-muted font-light leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
