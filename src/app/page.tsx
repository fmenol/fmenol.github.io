import AsciiArt from '@/components/AsciiArt';
import ProfileLinks from '@/components/ProfileLinks';
import PostList from '@/components/PostList';
import { SITE_CONFIG } from '@/lib/constants';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      {/* ASCII Art */}
      <section className="flex justify-center">
        <AsciiArt />
      </section>

      {/* Tagline */}
      <section className="text-center">
        <p className="text-muted">{SITE_CONFIG.tagline}</p>
      </section>

      {/* Profile Links */}
      <section className="flex justify-center">
        <ProfileLinks />
      </section>

      {/* Posts */}
      <section className="mt-16">
        <h2 className="text-xs uppercase tracking-wide text-muted mb-6">posts</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
