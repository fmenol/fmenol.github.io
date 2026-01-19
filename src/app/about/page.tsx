import { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: `About ${SITE_CONFIG.name} - cybergenetics researcher`,
};

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-xl text-accent mb-6">about</h1>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>
            I&apos;m Filippo Menolascina, a researcher working at the intersection
            of synthetic biology, control theory, and computational methods.
          </p>
          <p>
            My work focuses on cybergenetics—using feedback control to program
            living cells in real-time. This involves developing mathematical models,
            control algorithms, and experimental platforms that enable precise
            manipulation of biological systems.
          </p>
          <p>
            I&apos;m interested in understanding how we can harness the complexity
            of cellular networks to build robust, programmable biological systems
            for applications in biotechnology and medicine.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-wide text-muted mb-6">recent projects</h2>
        <ul className="space-y-4">
          <li className="border-l border-border pl-4">
            <h3 className="text-foreground">Real-time control of gene expression</h3>
            <p className="text-sm text-muted mt-1">
              Developing closed-loop systems for precise control of protein levels
              in living cells using optogenetic actuators and fluorescent sensors.
            </p>
          </li>
          <li className="border-l border-border pl-4">
            <h3 className="text-foreground">Model-predictive control for synthetic circuits</h3>
            <p className="text-sm text-muted mt-1">
              Applying advanced control strategies to manage the dynamics of
              engineered genetic circuits in yeast and bacteria.
            </p>
          </li>
          <li className="border-l border-border pl-4">
            <h3 className="text-foreground">Computational tools for systems biology</h3>
            <p className="text-sm text-muted mt-1">
              Building open-source software for modeling, simulation, and analysis
              of biological networks.
            </p>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-wide text-muted mb-6">contact</h2>
        <p className="text-muted">
          Feel free to reach out via{' '}
          <a href="mailto:your.email@example.com" className="text-foreground hover:text-accent underline">
            email
          </a>{' '}
          or connect on{' '}
          <a
            href="https://github.com/fmenol"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent underline"
          >
            GitHub
          </a>.
        </p>
      </section>
    </div>
  );
}
