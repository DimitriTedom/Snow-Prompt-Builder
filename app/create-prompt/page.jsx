"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Form from "@components/Form";
import { useLoading } from "@app/LoadingContext";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {showLoading,hideLoading,isLoading} = useLoading()
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPrompt = async (e) => {
    e.preventDefault();
    showLoading()
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
        hideLoading()
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={isLoading}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
