import { MDXComponents } from 'mdx/types';

function CodeBlock({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <pre className={className}>
      <code>{children}</code>
    </pre>
  );
}

function Blockquote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-l-2 border-border pl-4 my-4 text-muted italic">
      {children}
    </blockquote>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-[#e6e5da] px-1.5 py-0.5 rounded text-sm">
      {children}
    </code>
  );
}

function Anchor({ href, children }: { href?: string; children: React.ReactNode }) {
  const isExternal = href?.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="text-link underline underline-offset-2 hover:text-foreground"
    >
      {children}
    </a>
  );
}

function Heading1({ children }: { children: React.ReactNode }) {
  return <h1 className="text-xl text-foreground mt-8 mb-4">{children}</h1>;
}

function Heading2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-lg text-foreground mt-6 mb-3">{children}</h2>;
}

function Heading3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base text-foreground mt-4 mb-2">{children}</h3>;
}

function Paragraph({ children }: { children: React.ReactNode }) {
  return <p className="my-4 leading-relaxed">{children}</p>;
}

function UnorderedList({ children }: { children: React.ReactNode }) {
  return <ul className="my-4 ml-4 space-y-2 list-disc list-inside">{children}</ul>;
}

function OrderedList({ children }: { children: React.ReactNode }) {
  return <ol className="my-4 ml-4 space-y-2 list-decimal list-inside">{children}</ol>;
}

function ListItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>;
}

function HorizontalRule() {
  return <hr className="my-8 border-border" />;
}

export const mdxComponents: MDXComponents = {
  h1: Heading1,
  h2: Heading2,
  h3: Heading3,
  p: Paragraph,
  a: Anchor,
  code: InlineCode,
  pre: CodeBlock,
  blockquote: Blockquote,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  hr: HorizontalRule,
};
