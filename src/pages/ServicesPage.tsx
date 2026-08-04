import { motion } from 'framer-motion';
import { Check, ArrowRight, Star } from 'lucide-react';
import { services, reviews } from '@/data/store';
import { PageHeader } from '@/components/shared/SectionHeading';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/store/AppContext';

export function ServicesPage() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Professional Services"
        subtitle="Work with our team of experts on custom digital projects"
        breadcrumb={['Home', 'Services']}
      />
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 pb-20 space-y-6">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-3xl p-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              <div className="lg:col-span-1">
                <div
                  className="w-14 h-14 rounded-2xl mb-4 flex items-center justify-center"
                  style={{ background: `${service.color}15`, border: `1px solid ${service.color}20` }}
                >
                  <Icon size={28} style={{ color: service.color }} />
                </div>
                <h3 className="text-xl font-bold text-novixa-white mb-2">{service.name}</h3>
                <p className="text-sm text-novixa-muted font-light mb-4">{service.description}</p>
                <p className="text-lg font-semibold" style={{ color: service.color }}>{service.price}</p>
              </div>
              <div className="lg:col-span-2">
                <h4 className="text-xs font-semibold uppercase tracking-ultra text-novixa-muted mb-3">What's Included</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-400" />
                      <span className="text-sm text-novixa-white">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button onClick={() => navigate(`/service/${service.id}`)} rightIcon={<ArrowRight size={16} />}>
                  Learn More
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function ServiceDetailsPage({ serviceId }: { serviceId: string }) {
  const { navigate } = useApp();
  const service = services.find((s) => s.id === serviceId);
  if (!service) return null;
  const Icon = service.icon;

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-[1000px] mx-auto px-4 lg:px-6 py-12">
        <div
          className="w-16 h-16 rounded-2xl mb-6 flex items-center justify-center"
          style={{ background: `${service.color}15`, border: `1px solid ${service.color}20` }}
        >
          <Icon size={32} style={{ color: service.color }} />
        </div>
        <h1 className="text-4xl font-bold tracking-tightest text-novixa-white mb-3">{service.name}</h1>
        <p className="text-sm text-novixa-muted font-light mb-6 max-w-xl">{service.description}</p>
        <p className="text-2xl font-bold mb-8" style={{ color: service.color }}>{service.price}</p>

        <div className="glass-card rounded-3xl p-8 mb-8">
          <h2 className="text-lg font-semibold text-novixa-white mb-4">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.features.map((feature) => (
              <div key={feature} className="flex items-center gap-2">
                <Check size={16} className="text-emerald-400" />
                <span className="text-sm text-novixa-white">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-3xl p-8 mb-8">
          <h2 className="text-lg font-semibold text-novixa-white mb-4">Process</h2>
          <div className="space-y-4">
            {[
              { step: '01', title: 'Discovery Call', desc: 'We discuss your project requirements and goals.' },
              { step: '02', title: 'Proposal & Quote', desc: 'Receive a detailed proposal with timeline and pricing.' },
              { step: '03', title: 'Design & Build', desc: 'Our team designs and builds your solution with regular updates.' },
              { step: '04', title: 'Delivery & Support', desc: 'Final delivery with documentation and ongoing support.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="text-lg font-bold text-novixa-blue/40">{item.step}</span>
                <div>
                  <p className="text-sm font-semibold text-novixa-white">{item.title}</p>
                  <p className="text-xs text-novixa-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button size="lg" onClick={() => navigate('/contact')}>Get Started</Button>
          <Button size="lg" variant="outline" onClick={() => navigate('/services')}>Back to Services</Button>
        </div>
      </div>
    </div>
  );
}
