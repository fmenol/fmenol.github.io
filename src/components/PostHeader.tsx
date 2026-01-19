import { PostMeta } from '@/lib/posts';

interface PostHeaderProps {
  post: PostMeta;
}

export default function PostHeader({ post }: PostHeaderProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="mb-12 border-b border-border pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Metadata column */}
        <div className="space-y-4">
          <h1 className="text-xl text-foreground">{post.title}</h1>
          <div className="text-sm text-muted space-y-1">
            <p>{formattedDate}</p>
            {post.tags && post.tags.length > 0 && (
              <p className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-xs">
                    #{tag}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>

        {/* Abstract column */}
        {post.abstract && (
          <div className="text-sm text-muted leading-relaxed">
            <p className="text-xs uppercase tracking-wide mb-2 text-foreground">Abstract</p>
            <p>{post.abstract}</p>
          </div>
        )}
      </div>
    </header>
  );
}
