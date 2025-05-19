import React from "react";
import Link from "next/link";
const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="gradient_text">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-6 bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e] border border-[#2c2c2c] p-8 rounded-2xl shadow-lg backdrop-blur-md"
      >
        <label className="flex flex-col gap-2">
          <span className="text-base font-semibold text-indigo-400">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="bg-[#101010] text-sm text-gray-200 p-4 rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none resize-none min-h-[120px]"
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-base font-semibold text-indigo-400">
            Tag{" "}
            <span className="font-normal text-sm text-gray-400 ml-1">
              (e.g. #product, #webdevelopment)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="bg-[#101010] text-sm text-gray-200 p-3 rounded-lg border border-gray-700 focus:border-indigo-500 focus:outline-none"
          />
        </label>

        <div className="flex justify-end items-center gap-4 mt-4">
          <Link
            href="/"
            className="text-sm text-indigo-500 hover:underline transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 rounded-full text-white transition-all"
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
