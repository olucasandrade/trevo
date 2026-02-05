import React, { useEffect } from "react";
import TrevoLayout from "../components/TrevoLayout";
import SEO from "../components/SEO";
import { useI18n } from "../contexts/i18n/i18nContext";
import {
  Check,
  Clock,
  Globe,
  Monitor,
} from "lucide-react";

const About = () => {
  const { t } = useI18n();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <TrevoLayout>
      <SEO
        title="About"
        description="Learn more about Trevo, an elegant open-source API testing tool for web and desktop."
        canonicalUrl="/about"
      />

      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-white/70 mb-8">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="space-y-6 opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <p className="text-white/80 leading-relaxed">
            {t('about.intro1')}
          </p>
          <p className="text-white/80 leading-relaxed">
            {t('about.intro2')}
          </p>
          <p className="text-white/80 leading-relaxed">
            {t('about.intro3')}
          </p>
        </div>

        {/* Web Features */}
        <div className="mt-12 opacity-0 animate-fade-in" style={{ animationDelay: "600ms" }}>
          <div className="flex items-center mb-6">
            <Globe className="h-6 w-6 text-trevo-purple mr-3" />
            <h2 className="text-2xl font-bold">{t('about.webFeatures')}</h2>
          </div>
          <div className="glass-panel p-6 rounded-xl">
            <ul className="space-y-3">
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.viewHistory')}
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.copyCurl')}
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.copyResponse')}
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.toggleTheme')}
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.saveCollections')}
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.websockets')}
              </li>
            </ul>
          </div>
        </div>

        {/* Desktop Features */}
        <div className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "700ms" }}>
          <div className="flex items-center mb-6">
            <Monitor className="h-6 w-6 text-trevo-purple mr-3" />
            <h2 className="text-2xl font-bold">{t('about.desktopFeatures')}</h2>
          </div>
          <div className="glass-panel p-6 rounded-xl border-trevo-purple/30">
            <ul className="space-y-3">
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.noCorsRestrictions')}
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.customizeEnv')}
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.requestChains')}
              </li>
              <li className="flex items-center text-white/80">
                <Check className="h-5 w-5 text-trevo-purple mr-3 flex-shrink-0" />
                {t('about.exportImport')}
              </li>
            </ul>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="mt-8 opacity-0 animate-fade-in" style={{ animationDelay: "800ms" }}>
          <div className="flex items-center mb-6">
            <Clock className="h-6 w-6 text-trevo-purple mr-3" />
            <h2 className="text-2xl font-bold">{t('about.comingSoon')}</h2>
          </div>
          <div className="glass-panel p-6 rounded-xl border-dashed border-trevo-purple/20">
            <ul className="space-y-3">
              <li className="flex items-center text-white/60">
                <Check className="h-5 w-5 text-white/40 mr-3 flex-shrink-0" />
                {t('about.teamCollaboration')}
              </li>
              <li className="flex items-center text-white/60">
                <Check className="h-5 w-5 text-white/40 mr-3 flex-shrink-0" />
                {t('about.cloudSync')}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center opacity-0 animate-fade-in" style={{ animationDelay: "900ms" }}>
          <p className="text-2xl font-bold trevo-gradient-text">
            {t('about.enjoy')}
          </p>
        </div>
      </section>
    </TrevoLayout>
  );
};

export default About;
