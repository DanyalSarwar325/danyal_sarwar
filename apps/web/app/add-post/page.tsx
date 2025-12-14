'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';
import { Label } from '@kit/ui/label';
import { Card, CardContent } from '@kit/ui/card';
import { useUser } from '@kit/supabase/hooks/use-user';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '~/lib/createClient';
import { createPostSchema, type CreatePostInput } from './schema';
import toast from 'react-hot-toast';

export default function AddPostPage() {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
    mode: 'onChange', // Validate on change for real-time feedback
    defaultValues: {
      title: '',
      body: '',
    },
  });

  const onSubmit = async (data: CreatePostInput) => {
    if (isLoading) {
      return;
    }

    if (!user) {
      toast.error('Please login to add Post');
      setTimeout(() => {
        router.push('/auth/sign-in');
      }, 1000);
      return;
    }

    try {
      // Get author name from user_metadata (full_name or name)
      // Fallback to email if name is not available
      const userMetadata = (user as any)?.user_metadata;
      const authorName =
        userMetadata?.full_name ||
        userMetadata?.name ||
        user.email ||
        'Anonymous';

      // Insert into posts table with required fields
      const { error: supabaseError } = await supabase.from('posts').insert([
        {
          title: data.title,
          body: data.body,
          author: authorName,
          published_at: new Date().toISOString(),
        },
      ]);

      if (supabaseError) {
        toast.error(supabaseError.message || 'Failed to create post. Please try again.');
        setError('root', {
          message: supabaseError.message || 'Failed to create post. Please try again.',
        });
        return;
      }

      // Success toast - display for 1 second
      toast.success('Blog added successfully', {
        duration: 1000,
      });

      // Redirect to homepage after a short delay to show the toast
      setTimeout(() => {
        router.push('/');
      }, 1000);
    } catch (err: any) {
      toast.error(err.message || 'An unexpected error occurred. Please try again.');
      setError('root', {
        message: err.message || 'An unexpected error occurred. Please try again.',
      });
    }
  };

  return (
    
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.push('/')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          {/* Header */}
          <div className="mb-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight tracking-tight mb-2">
              Create a Blog
            </h1>
            <p className="text-lg text-muted-foreground">
              Share your knowledge and stories with the community.
            </p>
          </div>

          {/* Form Card */}
          <Card className="border border-border bg-card">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Root Error */}
                {errors.root && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive font-medium">
                      {errors.root.message}
                    </p>
                  </div>
                )}

                {/* Title Field */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold">
                    Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="Enter blog title"
                    className={`w-full ${errors.title ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...register('title')}
                    aria-invalid={errors.title ? 'true' : 'false'}
                    aria-describedby={errors.title ? 'title-error' : undefined}
                  />
                  {errors.title && (
                    <p
                      id="title-error"
                      className="text-sm text-destructive font-medium"
                      role="alert"
                    >
                      {errors.title.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {3}-{200} characters
                  </p>
                </div>

                {/* Body Field */}
                <div className="space-y-2">
                  <Label htmlFor="body" className="text-sm font-semibold">
                    Content <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="body"
                    placeholder="Enter blog content"
                    className={`w-full min-h-[120px] resize-none ${errors.body ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...register('body')}
                    aria-invalid={errors.body ? 'true' : 'false'}
                    aria-describedby={errors.body ? 'body-error' : undefined}
                  />
                  {errors.body && (
                    <p
                      id="body-error"
                      className="text-sm text-destructive font-medium"
                      role="alert"
                    >
                      {errors.body.message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {10}-{10000} characters
                  </p>
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center gap-4 pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 text-base font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    disabled={isSubmitting || isLoading}
                  >
                    {isSubmitting ? 'Creating...' : 'Create Blog'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => router.push('/')}
                    className="border-2 border-border text-foreground hover:bg-muted px-6 py-5 text-base font-medium rounded-lg transition-colors duration-200"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
