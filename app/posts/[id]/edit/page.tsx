import Form from "next/form";

import { getPost } from "@/lib/actions";
import { updatePost } from "@/lib/actions";
import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/submit-button";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);

  return (
    <Form action={updatePost}>
      {/* Include the post id as a hidden input */}
      <input type="hidden" name="postId" value={params.id} />

      <Label htmlFor="title">Title</Label>
      <Input id="title" name="title" defaultValue={post.title} required />

      <Label htmlFor="description">Description</Label>
      <Input
        id="description"
        name="description"
        defaultValue={post.description}
        required
      />

      <Label htmlFor="status">Status:</Label>
      <input type="checkbox" name="status" defaultChecked={post.status} />

      <SubmitButton pendingText="Updating..." className="w-full">
        Update Post
      </SubmitButton>
    </Form>
  );
}
