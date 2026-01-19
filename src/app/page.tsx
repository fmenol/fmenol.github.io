import RoboticArm3D from '@/components/RoboticArm3D';
import ProfileLinks from '@/components/ProfileLinks';
import PostList from '@/components/PostList';
import { getAllPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8">
      {/* Animated 3D Robotic Arm */}
      <section className="flex justify-center">
        <RoboticArm3D />
      </section>

      <hr className="border-border" />

      {/* Profile Links */}
      <section className="flex justify-center">
        <ProfileLinks />
      </section>

      <hr className="border-border" />

      {/* Posts */}
      <section>
        <h2 className="text-xs uppercase tracking-wide text-muted mb-6">posts</h2>
        <PostList posts={posts} />
      </section>
    </div>
  );
}
