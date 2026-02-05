import React from "react";
import { useI18n } from "../contexts/i18n/i18nContext";
import { IconClover } from "@tabler/icons-react";
import { Github } from "lucide-react";

const TrevoFooter: React.FC = () => {
  const { t } = useI18n();

  return (
    <footer className="w-full py-8 px-6 md:px-12 border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <IconClover className="text-trevo-purple h-6 w-6" />
            <span className="text-sm text-white/60">
              {t('footer.copyright')}
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/olucasandrade/trevo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-white/60 hover:text-white transition-colors duration-300"
            >
              <Github className="h-5 w-5 mr-1" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors duration-300"
            >
              {t('footer.privacyPolicy')}
            </a>
            <a
              href="#"
              className="text-sm text-white/60 hover:text-white transition-colors duration-300"
            >
              {t('footer.termsOfService')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default TrevoFooter;
