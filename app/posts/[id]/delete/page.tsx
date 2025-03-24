import { deletePost } from "@/lib/actions";

export default async function DeletePostPage({
  params,
}: {
  params: { id: string };
}) {
  await deletePost(params.id);
  // If deletePostAction doesn't throw, it will redirect
  return null;
}
