"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import Form from "@components/Form";
import { useLoading } from "@components/LoadingContext";

const UpdatePrompt = () => {
  const router = useRouter();
  const { showLoading, hideLoading, isLoading } = useLoading();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });
  useEffect(() => {
    const getPromptDetails = async () => {
      showLoading();
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();
      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
      hideLoading();
    };

    if (promptId) getPromptDetails();
  }, [promptId]);
  const updatePrompt = async (e) => {
    e.preventDefault();
    showLoading();
    if (!promptId) return alert("Prompt ID not found");
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };
  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={isLoading}
      handleSubmit={updatePrompt}
    />
  );
};

// Exporting the UpdatePrompt function through this enables fix 'Missing Suspense boundary with useSearchParams ' error
const Final = () => {
  return (
    <Suspense>
      <UpdatePrompt />
    </Suspense>
  );
};

export default Final;
