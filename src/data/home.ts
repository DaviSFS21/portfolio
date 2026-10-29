// Home content in both languages, taken from the current site (index.html and pt-br.html).
import type { ImageMetadata } from 'astro';
import type { Lang } from '../design-system/components/i18n';
import type { TechName } from '../design-system/components/techPaths';
import newStartPro from '../assets/projects/new-start-pro.png';
import daviSoares from '../assets/projects/davi-soares.svg';
import somosTodosTi from '../assets/projects/somos-todos-ti.png';
import ctBravus from '../assets/projects/ct-bravus.png';
import sqlutions from '../assets/projects/sqlutions.png';
import gilbertoRibeiro from '../assets/projects/gilberto-ribeiro.png';

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
    slug: 'new-start-pro',
    title: 'New Start Pro',
    variant: 'wide',
    image: newStartPro,
    external: 'https://newstartp.com',
    alt: { pt: 'Página inicial do site da New Start Pro', en: 'Home page of the New Start Pro website' },
    description: {
      pt: [
        'Projeto feito em 3 semanas junto ao Matheus Schiavão. Após o desenvolvimento, foi oferecido o apoio referente à manutenção dos bancos de dados do site.',
        'New Start Pro é uma empresa norte-americana que visa o mais alto padrão na construção de mobílias e diferentes espaços para a casa.',
        'Foi desenvolvido com WordPress e Elementor. As tecnologias mantidas foram o PHP e o MySQL.',
      ],
      en: [
        "Project completed in 3 weeks alongside Matheus Schiavão. During the development, support was provided for the maintenance of the website's databases.",
        'New Start Pro is an American company that aims for the highest standard in furniture construction and various home spaces.',
        'It was developed with WordPress and Elementor. The maintained technologies were PHP and MySQL.',
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
    slug: 'somos-todos-ti',
    title: 'Somos Todos T.I. - Branding',
    variant: 'half',
    image: somosTodosTi,
    alt: { pt: 'Logo Somos Todos T.I.', en: 'Somos Todos T.I. logo' },
    description: {
      pt: ['Identidade visual para promoção pessoal, visando a modernização e a ressignificação da marca, representando a universalidade dos temas abordados pelo professor.'],
      en: ['Visual identity for professional promotion, aiming at the modernization and resignification of the brand, representing the universality of the themes addressed by the professor.'],
    },
  },
  {
    slug: 'ct-bravus',
    title: 'CT Bravus',
    variant: 'wide',
    image: ctBravus,
    external: 'https://ctbravus.com',
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
    slug: 'sqlutions',
    title: 'sqlutions - Branding',
    variant: 'half',
    image: sqlutions,
    imageWidth: '60%',
    alt: { pt: 'Logo sqlutions', en: 'sqlutions logo' },
    description: {
      pt: ['Essa marca foi criada para ser a cara dos projetos desenvolvidos pelo grupo "sqlutions" durante a Graduação em Tecnólogo de Banco de Dados na FATEC. Foi feita pensando em usufruir do trocadilho no nome do grupo.'],
      en: ['This brand was created to be the identity of the projects developed by the "sqlutions" group during the Database Technologist Graduation at FATEC. It was made aiming to take advantage of the pun made with the group\'s name.'],
    },
  },
  {
    slug: 'gilberto-ribeiro',
    title: 'Gilberto Ribeiro - Branding',
    variant: 'half',
    image: gilbertoRibeiro,
    imageWidth: '60%',
    alt: { pt: 'Logo Gilberto Ribeiro', en: 'Gilberto Ribeiro logo' },
    description: {
      pt: ['Essa identidade foi feita para um desenvolvedor frontend, com o objetivo de trazer originalidade para os projetos feitos pelo Gilberto.'],
      en: ['This identity was made for a frontend web developer, aiming to bring originality to the projects made by Gilberto.'],
    },
  },
];
