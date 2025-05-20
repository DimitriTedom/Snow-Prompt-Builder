"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { useLoading } from "@components/LoadingContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const PromptCardList = ({ data, handleClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleClick={handleClick} />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);
  const [searchResults,setSearchResults] = useState([])
  const [searchTimout,setSearchTimeout] = useState(null);
  const { showLoading, hideLoading } = useLoading();
  const { data: session } = useSession();
  const router = useRouter();

  const filterPosts = () =>{
    const regex = new RegExp(searchText,"i") // regular expression instace with i flag(for case-insensitive search)
    return post.filter((post)=> regex.test(post.creator.username) || regex.test(post.tag) || regex.test(post.prompt) || regex.test(post.creator.email))
  }
  const handleSearchChange = (e) => {
    clearTimeout(searchTimout)
    setSearchText(e.target.value)
//this is my debounce method for search
    setSearchTimeout(
      setTimeout(()=>{
        const searchResult = filterPosts(e.target.value);
        setSearchResults(searchResult);
      },600)
    )
  };

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
      {session?.user ? (
        <>
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
          {searchText ? (
            <PromptCardList
            data={searchResults}
            handleClick={(id) => {
              session?.user.id != id
                ? router.push(`/profile/get?id=${id}`)
                : router.push(`/profile`);
            }}
          />
          ): (

          <PromptCardList
            data={post}
            handleClick={(id) => {
              console.log(session?.user.id);
              session?.user.id != id
                ? router.push(`/profile/get?id=${id}`)
                : router.push(`/profile`);
            }}
          />
          )}
        </>
      ) : (
        <h1 className="head_text">Please sign-in first !</h1>
      )}
    </section>
  );
};

export default Feed;
