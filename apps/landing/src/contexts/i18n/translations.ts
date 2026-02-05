export type SupportedLocale = 'en' | 'pt-br';

export interface Translations {
  navbar: {
    home: string;
    about: string;
    github: string;
    language: string;
    docs: string;
    download: string;
  };
  hero: {
    tagline: string;
    title: string;
    description: string;
    tryWeb: string;
    downloadDesktop: string;
    viewOnGithub: string;
  };
  apps: {
    title: string;
    subtitle: string;
    web: {
      title: string;
      description: string;
      badge: string;
      features: string[];
      cta: string;
    };
    desktop: {
      title: string;
      description: string;
      badge: string;
      features: string[];
      cta: string;
    };
  };
  features: {
    title: string;
    subtitle: string;
    workflow: {
      title: string;
      description: string;
    };
    history: {
      title: string;
      description: string;
    };
    syntax: {
      title: string;
      description: string;
    };
    corsProxy: {
      title: string;
      description: string;
    };
    collections: {
      title: string;
      description: string;
    };
    websockets: {
      title: string;
      description: string;
    };
    environments: {
      title: string;
      description: string;
    };
    chains: {
      title: string;
      description: string;
    };
    sharing: {
      title: string;
      description: string;
    };
    noCors: {
      title: string;
      description: string;
    };
  };
  cta: {
    title: string;
    description: string;
    learnMore: string;
    tryWeb: string;
    downloadDesktop: string;
  };
  footer: {
    copyright: string;
    privacyPolicy: string;
    termsOfService: string;
    contact: string;
  };
  notFound: {
    title: string;
    description: string;
    returnHome: string;
  };
  about: {
    title: string;
    subtitle: string;
    intro1: string;
    intro2: string;
    intro3: string;
    webFeatures: string;
    desktopFeatures: string;
    comingSoon: string;
    viewHistory: string;
    copyCurl: string;
    copyResponse: string;
    toggleTheme: string;
    saveCollections: string;
    websockets: string;
    exportImport: string;
    customizeEnv: string;
    requestChains: string;
    noCorsRestrictions: string;
    teamCollaboration: string;
    cloudSync: string;
    enjoy: string;
  };
  docs: {
    title: string;
    subtitle: string;
    corsProxy: {
      title: string;
      description: string;
      endpoint: string;
      parameters: string;
      paramUrl: string;
      paramMethod: string;
      paramParams: string;
      usage: string;
      response: string;
      errors: string;
      example: string;
      tryIt: string;
      copyCode: string;
      copied: string;
    };
  };
}

export const locales: Record<SupportedLocale, string> = {
  'en': 'English',
  'pt-br': 'Português (BR)'
};

export const translations: Record<SupportedLocale, Translations> = {
  'en': {
    navbar: {
      home: 'Home',
      about: 'About',
      github: 'GitHub',
      language: 'Language',
      docs: 'CORS Proxy',
      download: 'Download',
    },
    hero: {
      tagline: 'Web & Desktop API Testing',
      title: 'Beautiful, powerful API testing for every developer',
      description: 'An elegant open-source tool for testing APIs. Use it in your browser with our CORS proxy, or download the desktop app for full native power with environments and request chaining.',
      tryWeb: 'Try Web App',
      downloadDesktop: 'Download Desktop',
      viewOnGithub: 'View on GitHub',
    },
    apps: {
      title: 'Choose Your Platform',
      subtitle: 'Trevo is available as a web app for quick testing and a powerful desktop app for advanced workflows.',
      web: {
        title: 'Trevo Web',
        description: 'Test APIs directly in your browser. Our built-in CORS proxy lets you make requests to any API without server-side setup.',
        badge: 'Browser-based',
        features: [
          'No installation required',
          'Built-in CORS proxy',
          'Request history',
          'Syntax highlighting',
          'Copy as cURL',
        ],
        cta: 'Open Web App',
      },
      desktop: {
        title: 'Trevo Desktop',
        description: 'A native app with full power. No CORS restrictions, environment variables, request chaining, and persistent collections.',
        badge: 'Native App',
        features: [
          'No CORS restrictions',
          'Environment variables',
          'Request chaining',
          'Persistent collections',
          'File system access',
        ],
        cta: 'Download for macOS',
      },
    },
    features: {
      title: 'Why Choose Trevo?',
      subtitle: 'Trevo combines elegant design with powerful features to make API testing a breeze.',
      workflow: {
        title: 'Faster Workflow',
        description: 'Eliminate unnecessary complexity and focus on what matters: building and testing your APIs efficiently.',
      },
      history: {
        title: 'Request History',
        description: 'Keep track of your previous API calls with a clean, accessible history that makes repeating tests simple.',
      },
      syntax: {
        title: 'Syntax Highlighting',
        description: 'Clearly visualize JSON and other response formats with beautiful syntax highlighting.',
      },
      corsProxy: {
        title: 'CORS Proxy',
        description: 'Web app includes a free CORS proxy so you can test any API directly from your browser.',
      },
      collections: {
        title: 'Persistent Collections',
        description: 'Save and organize your API requests into collections. Desktop app stores them as files for easy backup and sharing.',
      },
      websockets: {
        title: 'WebSocket Support',
        description: 'Test and monitor real-time WebSocket connections with our intuitive interface.',
      },
      environments: {
        title: 'Environment Variables',
        description: 'Define variables per environment (dev, staging, prod) and use {{variableName}} syntax in your requests.',
      },
      chains: {
        title: 'Request Chaining',
        description: 'Link requests in sequence, extract values from responses, and pass data between API calls automatically.',
      },
      sharing: {
        title: 'Easy Sharing',
        description: 'Generate cURL commands and share requests with your team in one click.',
      },
      noCors: {
        title: 'No CORS Issues',
        description: 'Desktop app makes direct requests without browser restrictions. Test any API without proxy workarounds.',
      },
    },
    cta: {
      title: 'Ready to transform your API testing experience?',
      description: 'Join developers who are building better software faster with Trevo\'s intuitive API testing tools.',
      learnMore: 'Learn More',
      tryWeb: 'Try Web App',
      downloadDesktop: 'Download Desktop',
    },
    footer: {
      copyright: '© {year} Trevo - An elegant API testing tool',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service',
      contact: 'Contact',
    },
    notFound: {
      title: '404',
      description: 'Oops! Page not found',
      returnHome: 'Return to Home',
    },
    about: {
      title: 'About Trevo',
      subtitle: 'Hi! 👋 Thanks for checking out Trevo! I\'m excited to share this project with you.',
      intro1: 'My name is Lucas Andrade, and I\'m a software engineer passionate about building tools that empower developers to work smarter and more efficiently.',
      intro2: 'Trevo started as a web-based API testing tool with a built-in CORS proxy. Now it\'s evolved into a complete platform with both a web app for quick testing and a native desktop app for advanced workflows.',
      intro3: 'With a focus on speed, usability, and developer experience, Trevo eliminates unnecessary complexity, allowing you to spend more time building and less time troubleshooting.',
      webFeatures: 'Web App Features:',
      desktopFeatures: 'Desktop App Features:',
      comingSoon: 'Coming Soon:',
      viewHistory: 'View and use request history',
      copyCurl: 'Copy your requests as cURL',
      copyResponse: 'Copy responses to the clipboard',
      toggleTheme: 'Toggle between light and dark mode',
      saveCollections: 'Save and manage collections of requests',
      websockets: 'Test WebSocket connections in real-time',
      exportImport: 'Export and import collections',
      customizeEnv: 'Environment variables with {{variable}} syntax',
      requestChains: 'Request chaining with data extraction',
      noCorsRestrictions: 'Direct API calls without CORS restrictions',
      teamCollaboration: 'Team collaboration features',
      cloudSync: 'Cloud synchronization',
      enjoy: '#enjoy',
    },
    docs: {
      title: 'API Documentation',
      subtitle: 'Learn how to use Trevo API utilities and tools',
      corsProxy: {
        title: 'CORS Proxy',
        description: 'The CORS proxy service allows you to bypass CORS restrictions when making API requests from your client-side application. This service acts as an intermediary between your client and the target API.',
        endpoint: 'Endpoint: ',
        parameters: 'Parameters',
        paramUrl: 'url (required): The target URL to fetch data from',
        paramMethod: 'method (required): The HTTP method to use (GET, POST, PUT, DELETE)',
        paramParams: 'params (optional): URL parameters to add to the target URL',
        usage: 'Usage',
        response: 'Response',
        errors: 'Errors',
        example: 'Example',
        tryIt: 'Try It',
        copyCode: 'Copy Code',
        copied: 'Copied!',
      }
    }
  },
  'pt-br': {
    navbar: {
      home: 'Início',
      about: 'Sobre',
      github: 'GitHub',
      language: 'Idioma',
      docs: 'CORS Proxy',
      download: 'Download',
    },
    hero: {
      tagline: 'Teste de API Web & Desktop',
      title: 'Teste de API bonito e poderoso para todo desenvolvedor',
      description: 'Uma ferramenta open-source elegante para testar APIs. Use no navegador com nosso CORS proxy, ou baixe o app desktop para poder nativo total com ambientes e encadeamento de requests.',
      tryWeb: 'Testar na Web',
      downloadDesktop: 'Baixar Desktop',
      viewOnGithub: 'Ver no GitHub',
    },
    apps: {
      title: 'Escolha Sua Plataforma',
      subtitle: 'Trevo está disponível como app web para testes rápidos e um poderoso app desktop para workflows avançados.',
      web: {
        title: 'Trevo Web',
        description: 'Teste APIs diretamente no seu navegador. Nosso CORS proxy integrado permite fazer requests para qualquer API sem configuração de servidor.',
        badge: 'No navegador',
        features: [
          'Sem instalação necessária',
          'CORS proxy integrado',
          'Histórico de requests',
          'Syntax highlighting',
          'Copiar como cURL',
        ],
        cta: 'Abrir App Web',
      },
      desktop: {
        title: 'Trevo Desktop',
        description: 'Um app nativo com poder total. Sem restrições de CORS, variáveis de ambiente, encadeamento de requests e coleções persistentes.',
        badge: 'App Nativo',
        features: [
          'Sem restrições de CORS',
          'Variáveis de ambiente',
          'Encadeamento de requests',
          'Coleções persistentes',
          'Acesso ao sistema de arquivos',
        ],
        cta: 'Baixar para macOS',
      },
    },
    features: {
      title: 'Por que escolher o Trevo?',
      subtitle: 'Trevo combina design elegante com features poderosas pra facilitar seus testes de API.',
      workflow: {
        title: 'Workflow Mais Rápido',
        description: 'Elimine complexidades desnecessárias e foque no que importa: construir e testar suas APIs de forma eficiente.',
      },
      history: {
        title: 'Histórico de Requests',
        description: 'Acompanhe suas chamadas de API anteriores com um histórico limpo que facilita repetir testes.',
      },
      syntax: {
        title: 'Syntax Highlighting',
        description: 'Visualize JSON e outros formatos de resposta com um destaque de sintaxe super bonito.',
      },
      corsProxy: {
        title: 'CORS Proxy',
        description: 'App web inclui um CORS proxy gratuito para você testar qualquer API direto do navegador.',
      },
      collections: {
        title: 'Coleções Persistentes',
        description: 'Salve e organize seus requests de API em coleções. O app desktop salva como arquivos para fácil backup e compartilhamento.',
      },
      websockets: {
        title: 'Suporte a WebSocket',
        description: 'Teste e monitore conexões WebSocket em tempo real com nossa interface intuitiva.',
      },
      environments: {
        title: 'Variáveis de Ambiente',
        description: 'Defina variáveis por ambiente (dev, staging, prod) e use sintaxe {{nomeVariavel}} nos seus requests.',
      },
      chains: {
        title: 'Encadeamento de Requests',
        description: 'Conecte requests em sequência, extraia valores das respostas e passe dados entre chamadas automaticamente.',
      },
      sharing: {
        title: 'Compartilhamento Fácil',
        description: 'Gere comandos cURL e compartilhe requests com sua equipe em um clique.',
      },
      noCors: {
        title: 'Sem Problemas de CORS',
        description: 'App desktop faz requests diretos sem restrições do navegador. Teste qualquer API sem workarounds.',
      },
    },
    cta: {
      title: 'Pronto pra transformar sua experiência de teste de API?',
      description: 'Junte-se aos devs que estão construindo software melhor e mais rápido com as ferramentas do Trevo.',
      learnMore: 'Saiba Mais',
      tryWeb: 'Testar na Web',
      downloadDesktop: 'Baixar Desktop',
    },
    footer: {
      copyright: '© {year} Trevo - Uma ferramenta elegante de teste de API',
      privacyPolicy: 'Política de Privacidade',
      termsOfService: 'Termos de Serviço',
      contact: 'Contato',
    },
    notFound: {
      title: '404',
      description: 'Ops! Página não encontrada',
      returnHome: 'Voltar pro Início',
    },
    about: {
      title: 'Sobre o Trevo',
      subtitle: 'Olá! 👋 Obrigado por conferir o Trevo! Estou animado para compartilhar este projeto com você.',
      intro1: 'Meu nome é Lucas Andrade, e sou um engenheiro de software apaixonado por construir ferramentas que capacitam desenvolvedores a trabalhar de forma mais inteligente e eficiente.',
      intro2: 'Trevo começou como uma ferramenta de teste de API web com CORS proxy integrado. Agora evoluiu para uma plataforma completa com app web para testes rápidos e app desktop nativo para workflows avançados.',
      intro3: 'Com foco em velocidade, usabilidade e experiência do desenvolvedor, o Trevo elimina complexidades desnecessárias, permitindo que você passe mais tempo construindo e menos tempo debugando.',
      webFeatures: 'Features do App Web:',
      desktopFeatures: 'Features do App Desktop:',
      comingSoon: 'Em breve:',
      viewHistory: 'Visualizar e usar histórico de requisições',
      copyCurl: 'Copiar suas requisições como cURL',
      copyResponse: 'Copiar respostas para a área de transferência',
      toggleTheme: 'Alternar entre modo claro e escuro',
      saveCollections: 'Salvar e gerenciar coleções de requisições',
      websockets: 'Testar conexões WebSocket em tempo real',
      exportImport: 'Exportar e importar coleções',
      customizeEnv: 'Variáveis de ambiente com sintaxe {{variavel}}',
      requestChains: 'Encadeamento de requests com extração de dados',
      noCorsRestrictions: 'Chamadas diretas de API sem restrições de CORS',
      teamCollaboration: 'Recursos de colaboração em equipe',
      cloudSync: 'Sincronização com a nuvem',
      enjoy: '#aproveite',
    },
    docs: {
      title: 'Documentação da API',
      subtitle: 'Aprenda a usar os utilitários e ferramentas da API do Trevo',
      corsProxy: {
        title: 'CORS Proxy',
        description: 'O serviço de CORS Proxy permite que você ignore as restrições de CORS ao fazer requisições de API do seu frontend. Este serviço atua como um intermediário entre seu client e a API de destino.',
        endpoint: 'Endpoint: ',
        parameters: 'Parâmetros',
        paramUrl: 'url (obrigatório): A URL de destino para buscar dados',
        paramMethod: 'method (obrigatório): O método HTTP a ser usado (GET, POST, PUT, DELETE)',
        paramParams: 'params (opcional): Parâmetros de URL para adicionar à URL de destino',
        usage: 'Como usar',
        response: 'Resposta',
        errors: 'Erros',
        example: 'Exemplo',
        tryIt: 'Testar agora',
        copyCode: 'Copiar código',
        copied: 'Copiado!',
      }
    }
  }
};
