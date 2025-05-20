"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Form from "@components/Form";
import { useLoading } from "@components/LoadingContext";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { showLoading, hideLoading, isLoading } = useLoading();

  const [type, setType] = useState("Create");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const generatedPrompt = sessionStorage.getItem("generatedPrompt");
    const generatedTags = sessionStorage.getItem("generatedTags");

    if (generatedPrompt && generatedTags) {
      setPost({
        prompt: generatedPrompt,
        tag: generatedTags,
      });
      setType("Save");
      sessionStorage.removeItem("generatedPrompt");
      sessionStorage.removeItem("generatedTags");
    }
  }, []);

  const createPrompt = async (e) => {
    e.preventDefault();
    showLoading();

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
      console.error("Prompt creation error:", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <Form
      type={type}
      post={post}
      setPost={setPost}
      submitting={isLoading}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;
