"use client";
import { Suspense } from "react";
import { useState, useEffect } from "react";
import Profile from "@components/Profile";
import { useLoading } from "@components/LoadingContext";
import { useSearchParams } from "next/navigation";
// import Loader from "@components/Loader";

const MyProfile = () => {
  const [posts, setPosts] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");
  useEffect(() => {
    const fetchPosts = async () => {
      showLoading();
      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();
      setPosts(data);
      hideLoading();
    };
    if (userId) fetchPosts();
  }, []);

  return (
    <Profile
      name={posts.length > 0 && posts[0].creator.username}
      desc="These are his posts"
      data={posts}
    />
  );
};
const Profiles = () => {
  return (
    <Suspense>
      <MyProfile />
    </Suspense>
  );
};
export default Profiles;
