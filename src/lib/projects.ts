export interface Project {
  name: string;
  description: string;
  url: string;
  icon: string;
  /** The project's own accent colour, a token in src/styles/global.css. */
  accent: 'binary' | 'euler' | 'ksp';
}

export const PROJECTS: Project[] = [
  {
    name: 'The Binary Game',
    description:
      'Play with binary numbers: flip the bits to match the target numbers, solo or with friends.',
    url: 'https://binary.loicviennois.com',
    icon: '/projects/binary.svg',
    accent: 'binary',
  },
  {
    name: 'Project Euler Solver',
    description:
      'Solutions to Project Euler problems, written in TypeScript and solved live in your browser.',
    url: 'https://euler.loicviennois.com',
    icon: '/projects/euler.svg',
    accent: 'euler',
  },
  {
    name: 'KSP Delta-V Planner',
    description:
      'Work out the Delta-V your rocket needs for interplanetary travel in Kerbal Space Program.',
    url: 'https://ksp.loicviennois.com',
    icon: '/projects/ksp.png',
    accent: 'ksp',
  },
];
