import Link from 'next/link';
import { PostMeta, formatPostTitle, formatPostDate } from '@/lib/posts';

interface PostListProps {
  posts: PostMeta[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-muted">no posts yet.</p>
    );
  }

  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li key={post.slug} className="group">
          <Link
            href={`/posts/${post.slug}`}
            className="flex items-baseline gap-4 text-muted hover:text-foreground transition-colors"
          >
            <span className="text-xs tabular-nums">
              {formatPostDate(post.date)}
            </span>
            <span className="group-hover:text-accent transition-colors">
              {formatPostTitle(post.title)}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
