"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoading } from "@components/LoadingContext";
import Image from "next/image";

const GeneratePrompt = () => {
  const [description, setDescription] = useState("");
  const { isLoading, showLoading, hideLoading } = useLoading();
  const router = useRouter();

  const handleGenerate = async (e) => {
    e.preventDefault();
    showLoading();
    // append instructions to also get tags
    description;

    try {
      console.log(description);
      const res = await fetch("/api/generate-prompt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: description }),
      });
      const json = await res.json();
      console.log(json);
      if (!json) {
        sessionStorage.setItem("generatedPrompt", "An Error occured with LLM");
        sessionStorage.setItem("generatedTags", "An Error occured with LLM");
        return;
      }
      // store into sessionStorage so create‑prompt page can pick it up
      sessionStorage.setItem("generatedPrompt", json.prompt);
      sessionStorage.setItem("generatedTags", json.tags);

      router.push("/create-prompt");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Check console.");
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="max-w-xl mx-auto py-16">
      <h1 className="mb-4 head_text text-center">
        Generate Prompts with {"  "}
        <div className="flex-center gap-2">
        <Image
          src={"/assets/images/logo.svg"}
          alt="logo"
          width={48}
          height={48}
          className="object-contain"
        />
        <span className="gradient_text">SnowBrainAi</span>
        </div>
      </h1>
      <form onSubmit={handleGenerate} className="flex flex-col gap-4">
        <textarea
          className="bg-[#101010] text-gray-200 p-4 rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-0 shadow-md"
          rows={6}
          placeholder="E.g. “Write me a futuristic prompt for a linkedInGPT generator about Ai's Evolution vs Developpers”"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <span className="text-white">
          Our Large language model specialised in prompt Generation
        </span>
        <button
          type="submit"
          disabled={isLoading}
          className="self-end px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white transition disabled:opacity-50"
        >
          {isLoading ? "Generating…" : "Generate"}
        </button>
      </form>
    </div>
  );
};

export default GeneratePrompt;
