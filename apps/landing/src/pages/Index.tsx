import React, { useEffect } from "react";
import TrevoLayout from "../components/TrevoLayout";
import FeatureCard from "../components/FeatureCard";
import SEO from "../components/SEO";
import { useI18n } from "../contexts/i18n/i18nContext";
import {
  ArrowRight,
  Zap,
  History,
  Code,
  Link2,
  Save,
  Wifi,
  Globe,
  Monitor,
  GitBranch,
  Settings,
  GitMerge,
  Shield,
  Check,
} from "lucide-react";
import { IconClover } from "@tabler/icons-react";

const Index = () => {
  const { t, tArray } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Trevo",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web, macOS, Windows, Linux",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": t('hero.description'),
  };

  return (
    <TrevoLayout>
      <SEO
        title="Beautiful API Testing Tool"
        description={t('hero.description')}
        canonicalUrl="/"
        keywords={[
          'API testing',
          'REST client',
          'WebSocket testing',
          'API collections',
          'developer tools',
          'API client',
          'CORS proxy',
          'desktop app',
          'environment variables',
          'request chaining'
        ]}
        structuredData={structuredData}
      />

      {/* Hero Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="inline-block px-3 py-1 rounded-full bg-trevo-purple/20 border border-trevo-purple/30 text-sm font-medium">
              {t('hero.tagline')}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t('hero.title').split(' ').slice(0, 2).join(' ')}{' '}
              <span className="trevo-gradient-text">
                {t('hero.title').split(' ').slice(2, 4).join(' ')}
              </span>{' '}
              {t('hero.title').split(' ').slice(4).join(' ')}
            </h1>
            <p className="text-lg text-white/70 max-w-lg">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://app.trevo.rest"
                className="trevo-button flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Globe className="mr-2 h-4 w-4" />
                {t('hero.tryWeb')}
              </a>
              <a
                href="https://github.com/olucasandrade/trevo/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="trevo-button-outline flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Monitor className="mr-2 h-4 w-4" />
                {t('hero.downloadDesktop')}
              </a>
            </div>
            <a
              href="https://github.com/olucasandrade/trevo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-white/60 hover:text-white transition-colors text-sm"
            >
              <GitBranch className="mr-2 h-4 w-4" />
              {t('hero.viewOnGithub')}
            </a>
          </div>

          <div className="opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="relative hover:scale-105 transition-transform duration-500">
              <div className="glass-panel rounded-xl overflow-hidden shadow-2xl border border-trevo-purple/20">
                <div className="bg-trevo-dark-navy p-3 border-b border-trevo-purple/20 flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <div className="ml-2 bg-black/30 rounded text-xs py-1 px-3 text-white/70 flex-grow">
                    trevo.rest
                  </div>
                </div>
                <div className="p-6 overflow-hidden">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center flex-grow">
                      <span className="px-3 py-1 bg-trevo-button-purple text-white rounded text-sm">GET</span>
                      <div className="ml-2 px-3 py-1 bg-black/30 rounded text-sm text-white/80 flex-grow">
                        https://api.example.com/users
                      </div>
                    </div>
                    <button className="ml-2 px-3 py-1 bg-trevo-purple/20 hover:bg-trevo-purple/30 rounded text-white/90 transition-colors">
                      Send
                    </button>
                  </div>
                  <div className="bg-black/20 p-4 rounded-lg text-white/80 font-mono text-sm animate-pulse-slow">
                    <div className="flex">
                      <span className="text-trevo-purple">{`{`}</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-blue-300">"users"</span>
                      <span className="text-white">: [</span>
                    </div>
                    <div className="ml-8">
                      <span className="text-white">{`{`}</span>
                    </div>
                    <div className="ml-12">
                      <span className="text-blue-300">"id"</span>
                      <span className="text-white">: </span>
                      <span className="text-green-300">1</span>,
                    </div>
                    <div className="ml-12">
                      <span className="text-blue-300">"name"</span>
                      <span className="text-white">: </span>
                      <span className="text-amber-300">"John Doe"</span>
                    </div>
                    <div className="ml-8">
                      <span className="text-white">{`}`}</span>
                    </div>
                    <div className="ml-4">
                      <span className="text-white">]</span>
                    </div>
                    <div>
                      <span className="text-trevo-purple">{`}`}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-trevo-purple/20 to-trevo-light-purple/20 rounded-xl -z-10 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Comparison Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-12 opacity-0 animate-fade-in" style={{ animationDelay: "500ms" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('apps.title')}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            {t('apps.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Web App Card */}
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "600ms" }}>
            <div className="glass-panel p-8 rounded-2xl h-full hover:border-trevo-purple/40 transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-trevo-purple to-trevo-dark-purple rounded-full w-14 h-14 flex items-center justify-center">
                    <Globe className="h-7 w-7 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold">{t('apps.web.title')}</h3>
                    <span className="text-xs px-2 py-1 bg-trevo-purple/20 text-trevo-light-purple rounded-full">
                      {t('apps.web.badge')}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-white/70 mb-6">
                {t('apps.web.description')}
              </p>
              <ul className="space-y-3 mb-8">
                {tArray('apps.web.features').map((feature, index) => (
                  <li key={index} className="flex items-center text-white/80">
                    <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://app.trevo.rest"
                className="trevo-button w-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {t('apps.web.cta')} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Desktop App Card */}
          <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
            <div className="glass-panel p-8 rounded-2xl h-full border-trevo-purple/30 hover:border-trevo-purple/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-trevo-purple to-trevo-light-purple"></div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="bg-gradient-to-br from-trevo-purple to-trevo-dark-purple rounded-full w-14 h-14 flex items-center justify-center">
                    <Monitor className="h-7 w-7 text-white" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-2xl font-bold">{t('apps.desktop.title')}</h3>
                    <span className="text-xs px-2 py-1 bg-trevo-purple/30 text-white rounded-full">
                      {t('apps.desktop.badge')}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-white/70 mb-6">
                {t('apps.desktop.description')}
              </p>
              <ul className="space-y-3 mb-8">
                {tArray('apps.desktop.features').map((feature, index) => (
                  <li key={index} className="flex items-center text-white/80">
                    <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="https://github.com/olucasandrade/trevo/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="trevo-button w-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {t('apps.desktop.cta')} <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 opacity-0 animate-fade-in" style={{ animationDelay: "800ms" }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('features.title').split(' ').slice(0, 2).join(' ')}{' '}
            <span className="trevo-gradient-text">{t('features.title').split(' ').slice(2).join(' ')}</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={Zap}
            title={t('features.workflow.title')}
            description={t('features.workflow.description')}
            delay={900}
          />
          <FeatureCard
            icon={History}
            title={t('features.history.title')}
            description={t('features.history.description')}
            delay={950}
          />
          <FeatureCard
            icon={Link2}
            title={t('features.corsProxy.title')}
            description={t('features.corsProxy.description')}
            delay={1000}
            badge="Web"
          />
          <FeatureCard
            icon={Shield}
            title={t('features.noCors.title')}
            description={t('features.noCors.description')}
            delay={1050}
            badge="Desktop"
          />
          <FeatureCard
            icon={Settings}
            title={t('features.environments.title')}
            description={t('features.environments.description')}
            delay={1100}
            badge="Desktop"
          />
          <FeatureCard
            icon={GitMerge}
            title={t('features.chains.title')}
            description={t('features.chains.description')}
            delay={1150}
            badge="Desktop"
          />
          <FeatureCard
            icon={Save}
            title={t('features.collections.title')}
            description={t('features.collections.description')}
            delay={1200}
          />
          <FeatureCard
            icon={Wifi}
            title={t('features.websockets.title')}
            description={t('features.websockets.description')}
            delay={1250}
          />
          <FeatureCard
            icon={Code}
            title={t('features.sharing.title')}
            description={t('features.sharing.description')}
            delay={1300}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="glass-panel p-10 rounded-2xl relative overflow-hidden hover:scale-[1.02] transition-transform duration-500">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-trevo-purple to-trevo-light-purple"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">
                {t('cta.title')}
              </h2>
              <p className="text-white/70">
                {t('cta.description')}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://app.trevo.rest"
                  className="trevo-button flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Globe className="mr-2 h-4 w-4" /> {t('cta.tryWeb')}
                </a>
                <a
                  href="https://github.com/olucasandrade/trevo/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="trevo-button-outline flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Monitor className="mr-2 h-4 w-4" /> {t('cta.downloadDesktop')}
                </a>
              </div>
            </div>
            <div className="hidden lg:flex justify-end">
              <div className="relative hover:rotate-[360deg] transition-all duration-[7000ms] ease-in-out">
                <div className="w-64 h-64 rounded-full bg-gradient-to-r from-trevo-purple/20 to-trevo-light-purple/20 flex items-center justify-center p-1">
                  <div className="w-full h-full rounded-full bg-trevo-dark-navy flex items-center justify-center">
                    <IconClover className="w-24 h-24 text-trevo-purple" />
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 -right-4 -bottom-4 bg-gradient-to-r from-trevo-purple/20 to-trevo-light-purple/20 rounded-full -z-10 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </TrevoLayout>
  );
};

export default Index;
