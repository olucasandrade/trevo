import React from "react";
import { Link } from "react-router-dom";
import TrevoLayout from "../components/TrevoLayout";
import SEO from "../components/SEO";
import { useI18n } from "../contexts/i18n/i18nContext";
import { Home } from "lucide-react";
import { IconClover } from "@tabler/icons-react";

const NotFound = () => {
  const { t } = useI18n();

  return (
    <TrevoLayout>
      <SEO
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist."
        noIndex
      />

      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-trevo-purple/20 to-trevo-light-purple/20 flex items-center justify-center p-1">
                <div className="w-full h-full rounded-full bg-trevo-dark-navy flex items-center justify-center">
                  <IconClover className="w-16 h-16 text-trevo-purple opacity-50" />
                </div>
              </div>
              <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-trevo-purple/10 to-trevo-light-purple/10 rounded-full -z-10 blur-xl"></div>
            </div>
          </div>

          <h1 className="text-8xl font-bold trevo-gradient-text mb-4">
            {t('notFound.title')}
          </h1>
          <p className="text-2xl text-white/70 mb-8">
            {t('notFound.description')}
          </p>

          <Link
            to="/"
            className="trevo-button inline-flex items-center hover:scale-105 transition-transform"
          >
            <Home className="mr-2 h-4 w-4" />
            {t('notFound.returnHome')}
          </Link>
        </div>
      </section>
    </TrevoLayout>
  );
};

export default NotFound;
