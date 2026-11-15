// Home content in both languages, taken from the current site (index.html and pt-br.html).
import type { ImageMetadata } from 'astro';
import type { Lang } from '../design-system/components/i18n';
import type { TechName } from '../design-system/components/techPaths';
import daviSoares from '../assets/projects/davi-soares.svg';
import ctBravus from '../assets/projects/ct-bravus.png';
import sqlutions from '../assets/projects/sqlutions.png';

type Localized<T> = Record<Lang, T>;

export const TECHNOLOGIES: TechName[] = ['java', 'spring', 'postgresql', 'mysql', 'rails', 'react', 'typescript', 'docker', 'git'];

export const ABOUT: Localized<{ text: string; technologiesIntro: string; cta: string; photoAlt: string }> = {
  pt: {
    text: 'Sou um entusiasta de carros, apreciador da boa música e da culinária italiana, e atualmente estou cursando Banco de Dados. Gosto de solucionar problemas, de códigos organizados, gosto de acompanhar tendências e de aprender coisas novas.',
    technologiesIntro: 'Algumas das tecnologias que domino/estudo:',
    cta: 'Mais informações',
    photoAlt: 'Foto de Davi Soares',
  },
  en: {
    text: "I'm a car enthusiast, lover of good music and the Italian cuisine, and I'm currently studying Database. I enjoy solving problems, working with clean codes, staying up to date with trends, and learning new things.",
    technologiesIntro: 'Here are some of the technologies that I study and specialize in:',
    cta: 'More info',
    photoAlt: 'Photo of Davi Soares',
  },
};

export const CONTACTS = {
  resume: { pt: '/assets/Curriculo Davi Soares.pdf', en: '/assets/Curriculum Davi Soares.pdf' } satisfies Localized<string>,
  email: 'davisfs2110@gmail.com',
  socials: [
    { type: 'linkedin', label: 'Davi Soares', href: 'https://www.linkedin.com/in/dsf21/' },
    { type: 'github', label: 'DaviSFS21', href: 'https://github.com/DaviSFS21' },
  ] as const,
};

export interface HomeProject {
  slug: string;
  title: string;
  variant: 'wide' | 'half';
  image: ImageMetadata;
  /** Image width inside the card. Default: 80%. */
  imageWidth?: string;
  alt: Localized<string>;
  description: Localized<string[]>;
  /** Live site, opened in a new tab. Without it the card goes to the project page (stage 3). */
  external?: string;
}

export const PROJECTS: HomeProject[] = [
  {
    slug: 'ct-bravus',
    title: 'CT Bravus',
    variant: 'wide',
    image: ctBravus,
    alt: { pt: 'Página inicial do site da CT Bravus', en: 'Home page of the CT Bravus website' },
    description: {
      pt: [
        'Projeto freelance. Uma landing page desenvolvida para promover uma academia local.',
        '"CT Bravus" é uma academia focada em crosstraining que visa promover uma experiência de treino acessível e eficiente.',
        'Desenvolvido com React.',
      ],
      en: [
        'Freelance project. A landing page to promote a local gym.',
        '"CT Bravus" is a recent crosstraining gym that aims to provide an accessible but efficient training experience.',
        'Developed with React.',
      ],
    },
  },
  {
    slug: 'davi-soares',
    title: 'Davi Soares - Branding',
    variant: 'half',
    image: daviSoares,
    alt: { pt: 'Assinatura DAVI', en: 'DAVI signature' },
    description: {
      pt: ['Projeto em constante melhoria e desenvolvimento, com o intuito de promoção pessoal e o de causar uma boa primeira impressão com uma identidade visual marcante.'],
      en: ['Project in constant improvement and development, with the intention of personal promotion and of causing a good first impression with a striking visual identity.'],
    },
  },
  {
    slug: 'sqlutions',
    title: 'sqlutions - Branding',
    variant: 'half',
    image: sqlutions,
    alt: { pt: 'Logo sqlutions', en: 'sqlutions logo' },
    description: {
      pt: ['Essa marca foi criada para ser a cara dos projetos desenvolvidos pelo grupo "sqlutions" durante a Graduação em Tecnólogo de Banco de Dados na FATEC. Foi feita pensando em usufruir do trocadilho no nome do grupo.'],
      en: ['This brand was created to be the identity of the projects developed by the "sqlutions" group during the Database Technologist Graduation at FATEC. It was made aiming to take advantage of the pun made with the group\'s name.'],
    },
  },
];
