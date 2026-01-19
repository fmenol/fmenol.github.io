import Link from 'next/link';
import { NAV_LINKS, SITE_CONFIG } from '@/lib/constants';

export default function Header() {
  return (
    <header className="mb-12">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-foreground hover:text-link transition-colors font-medium">
          {SITE_CONFIG.title}
        </Link>
        <div className="flex gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted hover:text-foreground transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </nav>
      <hr className="mt-8 border-border" />
    </header>
  );
}
