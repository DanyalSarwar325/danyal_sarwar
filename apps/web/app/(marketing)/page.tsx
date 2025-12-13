"use client";

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react/hooks';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent } from '@kit/ui/card';
import { Button } from '@kit/ui/button';

const POSTS_PER_PAGE = 5;

const GET_PAGINATED_POSTS = gql`
  query GetPaginatedPosts($limit: Int!, $offset: Int!) {
    postsCollection(orderBy: { published_at: Desc }, first: $limit, offset: $offset) {
      edges {
        node {
          id
          title
          body
          published_at
          author {
            full_name
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`;

export default function HomePage() {
  const [page, setPage] = useState(0);

  const { data, loading, error } = useQuery(GET_PAGINATED_POSTS, {
    variables: {
      limit: POSTS_PER_PAGE,
      offset: page * POSTS_PER_PAGE,
    },
  });

  if (loading) return <p className="p-6">Loading posts...</p>;
  if (error) return <p className="p-6 text-red-500">Failed to load posts</p>;

  const posts = data?.postsCollection?.edges ?? [];
  const hasNextPage = data?.postsCollection?.pageInfo?.hasNextPage;

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="grid gap-6">
        {posts.map(({ node }: any) => (
          <Card key={node.id} className="rounded-2xl">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/posts/${node.id}`} className="hover:underline">
                  {node.title}
                </Link>
              </h2>

              <p className="text-sm text-muted-foreground mb-2">
                By {node.author?.full_name ?? 'Unknown'} ·{' '}
                {new Date(node.published_at).toLocaleDateString()}
              </p>

              <p className="text-gray-700">
                {node.body.slice(0, 200)}...
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-10">
        <Button
          variant="outline"
          disabled={page === 0}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>

        <Button
          variant="outline"
          disabled={!hasNextPage}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>
    </main>
  );
}
