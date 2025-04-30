"use client";

import { useState } from "react";

export default function CommentsList({
  comments,
}: {
  comments: {
    id: string;
    text: string;
    result: "positive" | "negative" | "neutral";
    accuracy: number[];
  }[];
}) {
  const [filter, setFilter] = useState<
    "all" | "positive" | "negative" | "neutral"
  >("all");
  const filtered =
    filter === "all" ? comments : comments.filter((c) => c.result === filter);

  return (
    <div>
      <h1 className="text-xl mb-4">لیست کامنتها</h1>

      <div className="mb-6 flex gap-2 text-sm">
        {["all", "positive", "negative", "neutral"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type as any)}
            className={`px-3 py-1 rounded border ${
              filter === type
                ? type === "positive"
                  ? "bg-white text-black"
                  : type === "negative"
                  ? "bg-white text-black"
                  : type === "neutral"
                  ? "bg-white text-black"
                  : "bg-white text-black"
                : "bg-[#333] text-white"
            }`}
          >
            {type === "all"
              ? "همه"
              : type === "positive"
              ? "مثبت"
              : type === "negative"
              ? "منفی"
              : "خنثی"}
          </button>
        ))}
      </div>

      <div className="h-[550px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#444] scrollbar-track-[#222]">
        <ul className="space-y-3">
          {filtered.map((c, i) => (
            <li key={c.id} className="bg-[#252525] p-4 rounded-lg shadow">
              <div className="text-sm mb-1 text-gray-300">کامنت {i + 1}</div>
              <div className="flex justify-between">
                <div className="text-base">{c.text}</div>
                <div className="text-sm text-gray-400 mt-2">
                  نتیجه: {c.result} | دقت: {c.accuracy?.join(" / ") || "-"}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
