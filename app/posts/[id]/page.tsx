import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { getPost } from "@/lib/actions";

export default async function Post({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    return (
      <p className="text-red-500">Error loading user: {userError.message}</p>
    );
  }

  const isAuthor = user && post.user_id === user.id;

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="p-8">
          <h1 className="text-center text-5xl text-rose-900 font-black mb-8">
            Post Details
          </h1>
          <div className="my-5">
            <p className="text-lg">{post.title}</p>
            <p>{post.description}</p>
            <p>
              Status: <input type="checkbox" checked={post.status} />
            </p>
          </div>
          {isAuthor && (
            <div className="flex gap-4 mb-4">
              <Link href={`/posts/${post.id}/edit`}>
                <Button variant="outline">Edit</Button>
              </Link>
              <Link href={`/posts/${post.id}/delete`}>
                <Button variant="destructive">Delete</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
