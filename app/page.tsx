import Link from "next/link";

import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const supabase = await createClient();
  const { data: posts } = await supabase.from("posts").select().limit(10);
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <div className="p-8">
          <h1 className="text-center text-5xl text-rose-900 font-black mb-8">
            Latest Posts
          </h1>
          <ul className="my-5">
            {posts &&
              posts!.map((post: any) => (
                <li key={post.id} className="m-4">
                  {post.id + ": " + post.title}
                </li>
              ))}
          </ul>
          <Link href="/posts/create">
            <Button className="w-full">Create Post</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
