'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@kit/ui/card';
import { Button } from '@kit/ui/button';
import { useRouter } from 'next/navigation';
import { useUser } from '@kit/supabase/hooks/use-user';
import { Plus, Calendar, User, ArrowRight, Sparkles, BookOpen, ImageIcon } from 'lucide-react';

const samplePosts = [
  {
    id: '1',
    title: 'How to Learn Next.js Quickly',
    body: 'Next.js is a React framework that enables server-side rendering and static site generation. In this post, we explore...',
    author: { full_name: 'John Doe' },
    published_at: '2025-12-13T10:00:00Z',
    category: 'Development',
    gradient: 'from-blue-500/10 via-purple-500/10 to-pink-500/10',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-500',
    badgeClass: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    shadowClass: 'hover:shadow-blue-500/20',
  },
  {
    id: '2',
    title: 'Understanding Supabase for Beginners',
    body: `Supabase is an open-source Firebase alternative. It provides auth, database, and storage out-of-the-box. Let's see how to set it up...`,
    author: { full_name: 'Jane Smith' },
    published_at: '2025-12-12T14:30:00Z',
    category: 'Backend',
    gradient: 'from-emerald-500/10 via-teal-500/10 to-cyan-500/10',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    iconColor: 'text-emerald-500',
    badgeClass: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    shadowClass: 'hover:shadow-emerald-500/20',
  },
  // ... other posts
];

export default function HomePage() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const [imageError, setImageError] = useState(false);

  const handleAddBlog = () => {
    if (isLoading) {
      return; // Wait for authentication check to complete
    }

    if (user) {
      // User is authenticated, redirect to add-post page
      router.push('/add-post');
    } else {
      // User is not authenticated, show message
      alert('Please log in');
    }
  };

  const handleViewBlogs = () => {
    // Scroll to the blog posts section
    const blogSection = document.getElementById('blog-posts');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full py-8 lg:py-12">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Section - Text Content */}
            <div className="space-y-5">
              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                Build something
                <br />
                beautiful.
              </h1>

              {/* Sub-headline */}
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
                TechBlog helps you and your team share knowledge, learn new skills, and connect with a community of passionate writers.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  onClick={handleViewBlogs}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 text-base font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  View Blogs
                </Button>
                <Button
                  onClick={handleAddBlog}
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-6 py-5 text-base font-medium rounded-lg transition-colors duration-200"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Blog
                </Button>
              </div>
            </div>

            {/* Right Section - Image Container */}
            <div className="relative w-full flex items-center justify-center">
              {!imageError ? (
                <div className="relative w-full max-w-md lg:max-w-lg aspect-square bg-background rounded-2xl p-8 flex items-center justify-center">
                  <Image
                    src="/images/hero.png"
                    alt="TechBlog Hero Illustration"
                    width={500}
                    height={500}
                    className="object-contain w-full h-full"
                    onError={() => setImageError(true)}
                    priority
                  />
                </div>
              ) : (
                <div className="relative w-full max-w-md lg:max-w-lg aspect-square bg-muted/30 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-24 h-24 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Add your hero illustration to<br />
                      <code className="text-xs bg-muted px-2 py-1 rounded mt-2 inline-block">
                        /public/img1
                      </code>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section id="blog-posts" className="relative max-w-5xl mx-auto px-6 pb-16 pt-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Articles</h2>
            <p className="text-muted-foreground">Explore our most recent blog posts</p>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-6 grid-cols-1 max-w-4xl">
          {samplePosts.map((post, index) => (
            <Card
              key={post.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all duration-200 hover:shadow-md hover:border-foreground/20"
            >
              <CardContent className="relative p-6">
                {/* Title */}
                <h2 className="text-2xl font-bold mb-3 text-foreground leading-tight tracking-tight">
                  <Link 
                    href={`/posts/${post.id}`} 
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {post.title}
                  </Link>
                </h2>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1.5">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{post.author.full_name}</span>
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
                <p className="text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                  {post.body.slice(0, 150)}...
                </p>

                {/* Read More Link */}
                <Link
                  href={`/posts/${post.id}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-3 transition-all duration-200"
                >
                  Read more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <Button
            variant="outline"
            size="lg"
            disabled
            className="px-8 py-6 rounded-xl border-2 hover:bg-muted/50 transition-colors"
          >
            Load More Articles
          </Button>
        </div>
      </section>
    </main>
  );
}
