export const SITE_CONFIG = {
  name: 'Filippo Menolascina',
  title: 'Filippo Menolascina',
  tagline: 'cybergenetics research. by filippo menolascina.',
  description: 'Personal website of Filippo Menolascina - cybergenetics research, synthetic biology, and computational approaches to biological systems.',
  url: 'https://fmenol.github.io',
  github: 'fmenol',
} as const;

export const SOCIAL_LINKS = [
  {
    name: 'Email',
    url: 'mailto:filippo.menolascina@ed.ac.uk',
    icon: 'email',
  },
  {
    name: 'Google Scholar',
    url: 'https://scholar.google.com/citations?user=YOUR_SCHOLAR_ID',
    icon: 'scholar',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/fmenol',
    icon: 'github',
  },
  {
    name: 'X',
    url: 'https://x.com/fmenolascina',
    icon: 'x',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/filippomenolascina/',
    icon: 'linkedin',
  },
] as const;

export const NAV_LINKS = [
  { name: 'home', href: '/' },
  { name: 'about', href: '/about' },
] as const;
