import { SOCIAL_LINKS } from '@/lib/constants';

const icons: Record<string, string> = {
  scholar: '[scholar]',
  github: '[github]',
  x: '[x]',
  linkedin: '[linkedin]',
};

export default function ProfileLinks() {
  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted hover:text-foreground transition-colors"
        >
          {icons[link.icon]} {link.name.toLowerCase()}
        </a>
      ))}
    </div>
  );
}
