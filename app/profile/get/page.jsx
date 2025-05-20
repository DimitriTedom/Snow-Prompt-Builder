"use client";
import { useState,useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { useLoading } from "@components/LoadingContext";

const MyProfile = () => {
    const [posts,setPosts] = useState([])
    const {showLoading,hideLoading} = useLoading()
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
      useEffect(()=>{
        const fetchPosts = async () =>{
          showLoading()
          const response = await fetch(`/api/users/${userId}/posts`);
          const data = await response.json();
          setPosts(data);
          hideLoading()
        }
        if(userId) fetchPosts()
      },[])

  return (
    <Profile name={posts.length > 0 && posts[0].creator.username} desc="These are his posts" data={posts}/>
)
}

export default MyProfile