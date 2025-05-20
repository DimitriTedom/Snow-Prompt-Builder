"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const pathName = usePathname();
  const { data: session } = useSession();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div
      className="bg-gradient-to-br from-[#1f1f1f] to-[#0d0d0d] border border-[#2d2d2d] rounded-2xl p-5 w-full max-w-md text-white shadow-lg backdrop-blur-sm transition-all hover:shadow-indigo-500/30 h-fit flex-1 break-inside-avoid hover:cursor-pointer"
      onClick={() => handleClick && handleClick(post.creator._id)}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full border border-indigo-500"
          />
          <div className="flex flex-col">
            <h3 className="font-semibold text-indigo-400">
              {post.creator.username}
            </h3>
            <p className="text-xs text-gray-400">{post.creator.email}</p>
          </div>
        </div>

        <button onClick={handleCopy} className="rounded-lg w-7 h-7">
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={40}
            height={40}
            alt="copy_icon"
          />
        </button>
      </div>

      <p className="my-4 text-sm text-gray-200">{post.prompt}</p>

      <p className="text-sm text-blue-400 hover:underline cursor-pointer">
        #{post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-4 flex gap-4 border-t border-gray-800 pt-3">
          <button
            onClick={handleEdit}
            className="text-sm text-green-400 hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-sm text-red-400 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
