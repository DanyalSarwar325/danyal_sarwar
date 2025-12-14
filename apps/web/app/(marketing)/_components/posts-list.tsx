'use client';

import Link from 'next/link';
import { Card, CardContent } from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import { Calendar, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '~/lib/createClient';

interface Post {
  id: string;
  title: string;
  body: string;
  author: string;
  published_at: string;
}

interface PostsListProps {
  initialPosts: Post[];
  initialTotalPosts: number;
  initialPage: number;
  postsPerPage: number;
}

export function PostsList({
  initialPosts,
  initialTotalPosts,
  initialPage,
  postsPerPage,
}: PostsListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [totalPosts, setTotalPosts] = useState(initialTotalPosts);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Update when searchParams change
  useEffect(() => {
    const page = parseInt(searchParams.get('page') || '1', 10);
    if (page !== currentPage) {
      setCurrentPage(page);
      fetchPosts(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, currentPage]);

  const fetchPosts = async (page: number) => {
    setLoading(true);
    setError(null);

    try {
      const from = (page - 1) * postsPerPage;
      const to = from + postsPerPage - 1;

      const { data: postsData, error: postsError, count } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .order('published_at', { ascending: false })
        .range(from, to);

      if (postsError) throw postsError;

      setPosts(postsData || []);
      setTotalPosts(count || 0);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage.toString());
      router.push(`/?${params.toString()}#blog-posts`);
      
      // Scroll to top of posts section
      setTimeout(() => {
        const blogSection = document.getElementById('blog-posts');
        if (blogSection) {
          blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-destructive">Error: {error}</div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-muted-foreground">No posts found.</div>
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 grid-cols-1 max-w-4xl">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block"
          >
            <Card className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:shadow-md hover:border-foreground/20 cursor-pointer">
              <CardContent className="relative p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-3 text-foreground leading-tight tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {post.title}
                </h2>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{post.author || 'Anonymous'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </div>
                </div>

                {/* Body Preview */}
                <p className="text-black dark:text-gray-200 leading-relaxed line-clamp-3">
                  {post.body.slice(0, 150)}...
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border-blue-600 disabled:bg-muted disabled:text-muted-foreground disabled:border-border"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          {/* Page Numbers */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    disabled={loading}
                    className={`min-w-[40px] ${
                      currentPage === page
                        ? 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600'
                        : 'bg-white dark:bg-card text-foreground border-border hover:bg-blue-50 dark:hover:bg-blue-950/20 hover:border-blue-600'
                    }`}
                  >
                    {page}
                  </Button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return (
                  <span key={page} className="text-muted-foreground">
                    ...
                  </span>
                );
              }
              return null;
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 bg-white dark:bg-card text-gray-500 dark:text-gray-400 border-border hover:bg-gray-50 dark:hover:bg-gray-800 disabled:bg-muted disabled:text-muted-foreground disabled:border-border"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      )}

      {/* Page Info */}
      {totalPosts > 0 && (
        <div className="text-center mt-4 text-sm text-muted-foreground">
          Showing {((currentPage - 1) * postsPerPage) + 1} to {Math.min(currentPage * postsPerPage, totalPosts)} of {totalPosts} posts
        </div>
      )}
    </>
  );
}

