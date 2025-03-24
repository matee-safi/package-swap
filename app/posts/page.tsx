import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";

export default async function Posts() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: posts } = await supabase.from("posts").select();

  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="p-8">
          <h1 className="text-center text-5xl text-rose-900 font-black mb-8">
            Posts
          </h1>
          <div className="my-5">
            {posts &&
              posts!.map((post: any) => (
                <Link
                  href={`/posts/${post.id}`}
                  key={post.id}
                  className="m-4 flex gap-4"
                >
                  <h2>Title: {post.title}</h2>
                  <p>Description: {post.description}</p>
                  <p>Status: {post.status.toString()}</p>
                </Link>
              ))}
          </div>
          <Link href="/posts/create">
            <Button className="w-full">Create Post</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
