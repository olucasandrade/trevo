import React, { useEffect, useState } from "react";
import TrevoLayout from "../components/TrevoLayout";
import SEO from "../components/SEO";
import { useI18n } from "../contexts/i18n/i18nContext";
import { Copy, Check, ExternalLink } from "lucide-react";

const Documentation = () => {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const codeExample = `fetch('https://app.trevo.rest/api?url=https://api.example.com/data&method=GET')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <TrevoLayout>
      <SEO
        title="Documentation"
        description="Learn how to use Trevo's CORS proxy API and other developer tools."
        canonicalUrl="/docs"
        keywords={['CORS proxy', 'API documentation', 'developer tools', 'API proxy']}
      />

      <section className="py-16 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "200ms" }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('docs.title')}
          </h1>
          <p className="text-xl text-white/70 mb-12">
            {t('docs.subtitle')}
          </p>
        </div>

        {/* CORS Proxy Section */}
        <div className="opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
          <div className="glass-panel p-8 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">{t('docs.corsProxy.title')}</h2>
            <p className="text-white/70 mb-6">
              {t('docs.corsProxy.description')}
            </p>

            {/* Endpoint */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">{t('docs.corsProxy.endpoint')}</h3>
              <code className="bg-black/30 px-4 py-2 rounded-lg text-trevo-light-purple block">
                https://app.trevo.rest/api
              </code>
            </div>

            {/* Parameters */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">{t('docs.corsProxy.parameters')}</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <code className="bg-trevo-purple/20 px-2 py-1 rounded text-sm mr-3">url</code>
                  <span className="text-white/70">{t('docs.corsProxy.paramUrl')}</span>
                </li>
                <li className="flex items-start">
                  <code className="bg-trevo-purple/20 px-2 py-1 rounded text-sm mr-3">method</code>
                  <span className="text-white/70">{t('docs.corsProxy.paramMethod')}</span>
                </li>
                <li className="flex items-start">
                  <code className="bg-trevo-purple/20 px-2 py-1 rounded text-sm mr-3">params</code>
                  <span className="text-white/70">{t('docs.corsProxy.paramParams')}</span>
                </li>
              </ul>
            </div>

            {/* Code Example */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{t('docs.corsProxy.example')}</h3>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center text-sm text-white/60 hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      {t('docs.corsProxy.copied')}
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      {t('docs.corsProxy.copyCode')}
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm text-white/80">{codeExample}</code>
              </pre>
            </div>

            {/* Try It Button */}
            <a
              href="https://app.trevo.rest"
              target="_blank"
              rel="noopener noreferrer"
              className="trevo-button inline-flex items-center hover:scale-105 transition-transform"
            >
              {t('docs.corsProxy.tryIt')}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </TrevoLayout>
  );
};

export default Documentation;
