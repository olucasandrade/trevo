import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Github, Menu, X, Download } from "lucide-react";
import { IconClover } from "@tabler/icons-react";
import { useI18n } from "../contexts/i18n/i18nContext";
import { SupportedLocale, locales } from "../contexts/i18n/translations";

const TrevoNavbar: React.FC = () => {
  const location = useLocation();
  const { t, locale, setLocale } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value as SupportedLocale);
  };

  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between border-b border-white/10 relative z-20">
      <Link to="/" className="flex items-center space-x-2 text-2xl md:text-3xl font-semibold">
        <IconClover className="text-trevo-purple h-8 w-8 md:h-10 md:w-10 mr-1 md:mr-2" />
        Trevo
      </Link>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 text-white/80 hover:text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <Link
          to="/"
          className={`trevo-nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          {t('navbar.home')}
        </Link>
        <Link
          to="/about"
          className={`trevo-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
        >
          {t('navbar.about')}
        </Link>
        <Link
          to="/docs"
          className={`trevo-nav-link ${location.pathname === '/docs' ? 'active' : ''}`}
        >
          {t('navbar.docs')}
        </Link>
        <a
          href="https://github.com/olucasandrade/trevo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-white/80 hover:text-white transition-colors duration-300"
        >
          <Github className="h-5 w-5" />
          <span className="ml-1">{t('navbar.github')}</span>
        </a>
        <div className="relative">
          <select
            className="appearance-none bg-transparent text-white/80 hover:text-white pr-6 border-none outline-none cursor-pointer"
            value={locale}
            onChange={handleLanguageChange}
          >
            {Object.entries(locales).map(([code, name]) => (
              <option key={code} value={code} className="bg-trevo-dark text-white">
                {name}
              </option>
            ))}
          </select>
          <span className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L6 5L11 1" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-trevo-dark-navy border-b border-white/10 py-4 px-6 md:hidden flex flex-col space-y-4 z-30">
          <Link
            to="/"
            className={`trevo-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('navbar.home')}
          </Link>
          <Link
            to="/about"
            className={`trevo-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('navbar.about')}
          </Link>
          <Link
            to="/docs"
            className={`trevo-nav-link ${location.pathname === '/docs' ? 'active' : ''}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {t('navbar.docs')}
          </Link>
          <a
            href="https://github.com/olucasandrade/trevo"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white/80 hover:text-white transition-colors duration-300"
          >
            <Github className="h-5 w-5 mr-2" />
            {t('navbar.github')}
          </a>
          <select
            className="appearance-none bg-trevo-dark-navy text-white/80 py-2 border border-white/20 rounded px-3"
            value={locale}
            onChange={handleLanguageChange}
          >
            {Object.entries(locales).map(([code, name]) => (
              <option key={code} value={code} className="bg-trevo-dark text-white">
                {name}
              </option>
            ))}
          </select>
        </div>
      )}
    </nav>
  );
};

export default TrevoNavbar;
