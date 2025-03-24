import { createPost } from "@/lib/actions";
import { SubmitButton } from "@/components/submit-button";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Input } from "@/components/ui/input";
import Form from "next/form";

export default async function Page() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <div className="p-8">
        <h1 className="text-center text-5xl text-rose-900 font-black mb-8">
          Create Post
        </h1>
        <Form action={createPost} className="flex flex-col gap-4">
          <Input name="title" placeholder="Title" />
          <Input name="description" placeholder="Description" />
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </div>
    </>
  );
}
