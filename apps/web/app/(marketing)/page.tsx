// import { getSupabaseServerClient } from '@kit/supabase/server-client';
import {supabase} from '../lib/createClient';
import { HomepageHero } from './_components/homepage-hero';
import { PostsList } from './_components/posts-list';

interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  published_at: string;
}

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

// Enable ISR - revalidate every 60 seconds
// export const revalidate = 60;

async function getPosts(page: number = 1, postsPerPage: number = 5) {
  
  
  
  const from = (page - 1) * postsPerPage;
  const to = from + postsPerPage - 1;

  // Use any type since posts table is not in the generated types
  const { data: postsData, error: postsError, count } = await (supabase as any)
    .from('posts')
    .select('*', { count: 'exact' })
    .order('published_at', { ascending: false })
    .range(from, to);

  if (postsError) {
    console.error('Error fetching posts:', postsError);
    return { posts: [], totalPosts: 0 };
  }

  return {
    posts: (postsData || []) as Post[],
    totalPosts: count || 0,
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const postsPerPage = 5;

  const { posts, totalPosts } = await getPosts(currentPage, postsPerPage);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <HomepageHero />

      {/* Blog Posts Section */}
      <section id="blog-posts" className="relative max-w-5xl mx-auto px-6 pb-16 pt-16">
        <div className="flex items-center justify-center mb-10">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
            <p className="text-muted-foreground">Explore our most recent blog posts</p>
          </div>
        </div>

        {/* Posts List with Client-side Pagination */}
        <PostsList
          initialPosts={posts}
          initialTotalPosts={totalPosts}
          initialPage={currentPage}
          postsPerPage={postsPerPage}
        />
      </section>
    </main>
  );
}
