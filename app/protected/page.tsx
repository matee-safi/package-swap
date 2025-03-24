import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { InfoIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProtectedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: posts, error } = await supabase
    .from("posts")
    .select()
    .eq("user_id", user.id);

  if (error) {
    console.error("Error fetching posts:", error.message);
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
      <div className="flex flex-col gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your Posts</h2>
        {posts && posts.length > 0 ? (
          posts.map((post: any) => (
            <div key={post.id} className="p-4 border rounded w-full">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-xl font-bold">Title: {post.title}</h3>
                  <p>Description: {post.description}</p>
                </div>

                <div className="flex gap-2 items-center">
                  <Link
                    href={`/posts/${post.id}/edit`}
                    className="rounded-md border p-2 hover:bg-gray-100"
                  >
                    <PencilIcon className="w-5" />
                  </Link>
                  <Link
                    href={`/posts/${post.id}/delete`}
                    className="rounded-md border p-2 hover:bg-rose-900"
                  >
                    <TrashIcon className="w-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You have no Posts.</p>
        )}
      </div>
      <Link href="/posts">
        <Button className="w-full">See all Posts</Button>
      </Link>
    </div>
  );
}
