'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@kit/ui/button';
import { Input } from '@kit/ui/input';
import { Textarea } from '@kit/ui/textarea';
import { Label } from '@kit/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@kit/ui/card';
import { useUser } from '@kit/supabase/hooks/use-user';
import { supabase } from '~/lib/createClient';

export default function AddPostPage() {
  const { data: user, isLoading } = useUser();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoading) {
      return;
    }

    if (!user) {
      alert('Please sign in to add a blog');
      router.push('/auth/sign-in');
      return;
    }

    if (!title || !body) {
      setError('Title and Body are required.');
      return;
    }

    setLoading(true);
    try {
      // Get author name from user_metadata (full_name or name)
      // Fallback to email if name is not available
      const userMetadata = (user as any)?.user_metadata;
      const authorName = 
        userMetadata?.full_name || 
        userMetadata?.name || 
        user.email || 
        "Anonymous";

      // Insert into posts table with required fields
      // id will be auto-generated as UUID by Supabase
      const { error: supabaseError } = await supabase
        .from('posts')
        .insert([
          {
            title: title,
            body: body,
            author: authorName,
            published_at: new Date().toISOString(),
          },
        ]);

      if (supabaseError) throw supabaseError;

      setLoading(false);
      router.push('/');
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
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
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <p className="text-sm text-destructive font-medium">{error}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold">
                    Title
                  </Label>
                  <Input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter blog title"
                    className="w-full"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="body" className="text-sm font-semibold">
                    Content
                  </Label>
                  <Textarea
                    id="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Enter blog content"
                    className="w-full min-h-[120px] resize-none"
                    required
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 text-base font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                    disabled={loading || isLoading}
                  >
                    {loading ? 'Creating...' : 'Create Blog'}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => router.push('/')}
                    className="border-2 border-border text-foreground hover:bg-muted px-6 py-5 text-base font-medium rounded-lg transition-colors duration-200"
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
