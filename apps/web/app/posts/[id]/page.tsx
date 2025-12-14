import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { getSupabaseServerClient } from '@kit/supabase/server-client';

interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  published_at: string;
}

interface PostPageProps {
  params: Promise<{ id: string }>;
}

// Enable ISR - revalidate every 60 seconds
export const revalidate = 60;

async function getPost(id: string): Promise<Post | null> {
  const supabase = getSupabaseServerClient();

  // Use any type since posts table is not in the generated types
  const { data, error } = await (supabase as any)
    .from('posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  return data as Post;
}

// Generate static params for the most recent posts
export async function generateStaticParams() {
  const supabase = getSupabaseServerClient();

  // Fetch the most recent 20 posts to pre-render
  // Use any type since posts table is not in the generated types
  const { data: posts } = await (supabase as any)
    .from('posts')
    .select('id')
    .order('published_at', { ascending: false })
    .limit(20);

  if (!posts) {
    return [];
  }

  return posts.map((post: { id: string }) => ({
    id: post.id,
  }));
}

export default async function PostDetailPage({ params }: PostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              asChild
              className="mb-4"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Post Card */}
          <Card className="border border-border bg-card">
            <CardContent className="p-8">
              {/* Title */}
              <h1 className="text-4xl font-bold mb-6 text-foreground leading-tight tracking-tight">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8 pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="font-medium text-base">{post.author || 'Anonymous'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <time dateTime={post.published_at} className="text-base">
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </div>
              </div>

              {/* Body Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div className="text-black dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {post.body}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

