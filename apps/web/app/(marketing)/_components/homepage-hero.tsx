'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@kit/ui/button';
import { Plus, BookOpen, ImageIcon } from 'lucide-react';
import { useUser } from '@kit/supabase/hooks/use-user';
import { toast } from '@kit/ui/sonner';

export function HomepageHero() {
  const router = useRouter();
  const { data: user, isLoading } = useUser();
  const [imageError, setImageError] = useState(false);

  const handleAddBlog = () => {
    if (isLoading) {
      return;
    }

    if (user) {
      router.push('/add-post');
    } else {
      toast.error('Please log in');
      router.push('/auth/sign-in');
    }
  };

  const handleViewBlogs = () => {
    const blogSection = document.getElementById('blog-posts');
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative w-full py-8 lg:py-12">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Section - Text Content */}
          <div className="space-y-5">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
              Share your knowledge
              <br />
              with the world.
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
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-6 py-5 text-base font-medium rounded-lg transition-colors duration-200 cursor-pointer"
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
                  src="/images/img.png"
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
                   Image here<br />
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
  );
}

