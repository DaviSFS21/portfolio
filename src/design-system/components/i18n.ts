// Default copy in both languages, taken from the live site (pt-br.html and index.html).
export type Lang = 'pt' | 'en';

export const COPY = {
  pt: {
    languageHint: 'idioma: pt-br',
    languageGroup: 'Idioma',
    lightTheme: 'Tema claro',
    aboutMe: 'Sobre mim',
    projects: 'Projetos',
    resume: 'Veja o meu currículo',
    resumeLink: 'aqui',
    socials: 'Me encontre nas redes sociais!',
    emailCallout: 'Ou contate-me pelo email:',
    designedBy: 'Projetado e codificado por',
    rights: 'Todos os direitos reservados.',
    madeIn: 'Feito no Brasil',
    brazil: 'Brasil',
    backToTop: 'Voltar ao topo',
    newTab: '(abre em nova aba)',
    project: 'Projeto',
    factSheet: 'Ficha técnica',
    nextProject: 'Próximo projeto'
  },
  en: {
    languageHint: 'language: en',
    languageGroup: 'Language',
    lightTheme: 'Light theme',
    aboutMe: 'About me',
    projects: 'Projects',
    resume: 'Take a look at my curriculum',
    resumeLink: 'here',
    socials: 'Find me on social networks!',
    emailCallout: 'Or get in touch with me through my email:',
    designedBy: 'Designed and coded by',
    rights: 'All Rights Reserved.',
    madeIn: 'Made in Brazil',
    brazil: 'Brazil',
    backToTop: 'Back to top',
    newTab: '(opens in a new tab)',
    project: 'Project',
    factSheet: 'Fact sheet',
    nextProject: 'Next project'
  }
} as const;
