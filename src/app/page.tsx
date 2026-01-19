import RoboticArm3D from '@/components/RoboticArm3D';
import ProfileLinks from '@/components/ProfileLinks';
import PostList from '@/components/PostList';
import { SITE_CONFIG } from '@/lib/constants';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12">
      {/* Animated 3D Robotic Arm */}
      <section className="flex justify-center">
        <RoboticArm3D />
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
