"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useLoading } from "@app/LoadingContext";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  const handleSearchChange = (e) => {};
  useEffect(() => {
    showLoading();
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
      hideLoading();
    };
    fetchPosts();
  }, []);
  return (
    <section className="feed">
      <form className="relative w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search for prompts"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="w-full max-w-xl bg-[#101010] text-sm text-gray-200 px-5 py-3 rounded-xl border border-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-0 shadow-md placeholder-gray-500 transition"
        />
      </form>

      <PromptCardList data={post} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
