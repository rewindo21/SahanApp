// "use client";

// import React, { useState } from "react";
// import { Label } from "@/components/ui/label";
// import { v4 as uuidv4 } from "uuid";
// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useParams } from "next/navigation";
// import { Trash } from "lucide-react"; // <-- NEW

// const Page = () => {
//   const [fileName, setFileName] = useState("فایلی انتخاب نشده");
//   const [file, setFile] = useState<File | null>(null);
//   const [deletingDocId, setDeletingDocId] = useState<string | null>(null); // <-- NEW
//   const queryClient = useQueryClient();
//   const { slug } = useParams();

//   const uploadMutation = useMutation({
//     mutationFn: async (file: File) => {
//       const uniqueName = `${uuidv4()}.csv`;
//       // Save metadata + file text to Prisma via API route
//       const content = await file.text();

//       const response = await fetch("/api/analyze-comments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           filename: uniqueName,
//           originalName: file.name,
//           content,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("خطا در ذخیره فایل در سرور");
//       }

//       return response.json();
//     },
//     // runs after file is successfully uploaded, Refreshes the list of documents, Clears the upload form.
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["userDocs"] });
//       setFile(null);
//       setFileName("فایلی انتخاب نشده");
//     },
//   });

//   // <-- NEW - For deleting docs
//   const deleteMutation = useMutation({
//     mutationFn: async (docId: string) => {
//       setDeletingDocId(docId);
//       const response = await fetch(`/api/user-docs/${docId}`, {
//         method: "DELETE",
//       });
//       if (!response.ok) {
//         throw new Error("خطا در حذف فایل");
//       }
//       return response.json();
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["userDocs"] });
//       setDeletingDocId(null); // reset only after success
//     },
//     onError: () => {
//       setDeletingDocId(null); // reset on error too
//     },
//   });

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files.length > 0) {
//       const selectedFile = event.target.files[0];

//       if (
//         selectedFile.type !== "text/csv" &&
//         !selectedFile.name.endsWith(".csv")
//       ) {
//         alert("فقط فایل های با پسوند CSV مجاز هستند");
//         return;
//       }

//       setFile(selectedFile);
//       setFileName(selectedFile.name);
//     } else {
//       setFile(null);
//       setFileName("فایلی انتخاب نشده");
//     }
//   };

//   const handleSubmit = () => {
//     if (!file) return;
//     uploadMutation.mutate(file);
//   };

//   // loads the user's previously uploaded documents, Uses React Query to cache + auto-refresh.
//   const { data, isLoading } = useQuery({
//     queryKey: ["userDocs"], // cache + deduping based on key
//     queryFn: async () => {
//       const res = await fetch("/api/user-docs");
//       if (!res.ok) throw new Error("خطا در دریافت اسناد");
//       return res.json(); // parse and return response
//     },
//   });

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <Label htmlFor="file-upload" className="text-white">
//         فایل CSV خود را وارد کنید
//       </Label>

//       <div className="relative w-64">
//         <input
//           id="file-upload"
//           type="file"
//           accept=".csv"
//           className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//           onChange={handleFileChange}
//         />

//         <div className="flex items-center justify-between bg-[#252525] text-white px-2 py-2 rounded-lg">
//           <span className="text-sm px-1 overflow-hidden text-ellipsis">
//             {fileName}
//           </span>
//           <button className="bg-[#229987] px-3 py-1 rounded-md text-white">
//             انتخاب فایل
//           </button>
//         </div>
//       </div>

//       {file && (
//         <button
//           onClick={handleSubmit}
//           className="bg-[#228578] px-4 py-2 text-white rounded disabled:opacity-50"
//           disabled={uploadMutation.isPending}
//         >
//           {uploadMutation.isPending ? "در حال آنالیز..." : "آپلود فایل"}
//         </button>
//       )}

//       {/* User's Uploaded Documents */}
//       <div className="w-full max-w-3xl mt-8">
//         <h2 className="text-xl text-white mb-4">فایل‌های آپلود شده</h2>
//         {isLoading ? (
//           <p className="text-white">در حال بارگذاری...</p>
//         ) : (
//           <ul className="space-y-2">
//             {data?.docs.map((doc: any) => (
//               <li
//                 key={doc.id}
//                 className="bg-[#252525]  p-4 rounded-lg shadow flex justify-between items-center"
//               >
//                 <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-4 md:gap-8">
//                   <a
//                     href={`/dashboard/${slug}/analyse/${doc.id}`}
//                     className="text-sm border border-[#229987] px-3 py-2 rounded-md text-[#229987] hover:text-white hover:bg-[#229987] duration-100"
//                   >
//                     جزئیات آنالیز
//                   </a>
//                   <div className="text-sm text-gray-300">
//                     مثبت: {doc.positiveResults} | منفی: {doc.negativeResults} |
//                     خنثی: {doc.neutralResults}
//                   </div>
//                 </div>
//                 <div className="text-left md:text-left flex gap-4">
//                   <div>
//                     <div className="truncate text-lg font-bold">
//                       {doc.filePath}
//                     </div>
//                     <div className="text-sm text-gray-400 mb-1">
//                       {new Date(doc.createdAt).toLocaleString("fa-IR")}
//                     </div>
//                   </div>
//                   {/* NEW - for deleting user docs */}
//                   <button
//                     onClick={() => deleteMutation.mutate(doc.id)}
//                     disabled={deletingDocId === doc.id}
//                     className="text-red-500 hover:text-red-800 transition px-2 py-2 rounded-md border"
//                   >
//                     <Trash
//                       size={18}
//                       className={`transition-transform duration-300 ${
//                         deletingDocId === doc.id ? "animate-spin" : ""
//                       }`}
//                     />
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { v4 as uuidv4 } from "uuid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Trash } from "lucide-react";

const Page = () => {
  const [fileName, setFileName] = useState("فایلی انتخاب نشده");
  const [file, setFile] = useState<File | null>(null);
  const [deletingDocId, setDeletingDocId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { slug } = useParams();

  const uploadAndAnalyzeMutation = useMutation({
    mutationFn: async (file: File) => {
      const uniqueName = `${uuidv4()}.csv`;
      const content = await file.text();

      const uploadRes = await fetch("/api/upload-document", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: uniqueName,
          originalName: file.name,
          content,
        }),
      });

      if (!uploadRes.ok) {
        throw new Error("خطا در آپلود فایل");
      }

      const { docId } = await uploadRes.json();

      const analyzeRes = await fetch("/api/analyze-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docId }),
      });

      if (!analyzeRes.ok) {
        throw new Error("خطا در آنالیز فایل");
      }

      return await analyzeRes.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDocs"] });
      setFile(null);
      setFileName("فایلی انتخاب نشده");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (docId: string) => {
      setDeletingDocId(docId);
      const response = await fetch(`/api/user-docs/${docId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("خطا در حذف فایل");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userDocs"] });
      setDeletingDocId(null);
    },
    onError: () => setDeletingDocId(null),
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (
        selectedFile.type !== "text/csv" &&
        !selectedFile.name.endsWith(".csv")
      ) {
        alert("فقط فایل های با پسوند CSV مجاز هستند");
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      setFile(null);
      setFileName("فایلی انتخاب نشده");
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    uploadAndAnalyzeMutation.mutate(file);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["userDocs"],
    queryFn: async () => {
      const res = await fetch("/api/user-docs");
      if (!res.ok) throw new Error("خطا در دریافت اسناد");
      return res.json();
    },
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <Label htmlFor="file-upload" className="text-white">
        فایل CSV خود را وارد کنید
      </Label>

      <div className="relative w-64">
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />

        <div className="flex items-center justify-between bg-[#252525] text-white px-2 py-2 rounded-lg">
          <span className="text-sm px-1 overflow-hidden text-ellipsis">
            {fileName}
          </span>
          <button className="bg-[#229987] px-3 py-1 rounded-md text-white">
            انتخاب فایل
          </button>
        </div>
      </div>

      {file && (
        <button
          onClick={handleSubmit}
          className="bg-[#228578] px-4 py-2 text-white rounded disabled:opacity-50"
          disabled={uploadAndAnalyzeMutation.isPending}
        >
          {uploadAndAnalyzeMutation.isPending
            ? "در حال آنالیز..."
            : "آپلود فایل"}
        </button>
      )}

      <div className="w-full max-w-3xl mt-8">
        <h2 className="text-xl text-white mb-4">فایل‌های آپلود شده</h2>
        {isLoading ? (
          <p className="text-white">در حال بارگذاری...</p>
        ) : (
          <ul className="space-y-2">
            {data?.docs.map((doc: any) => (
              <li
                key={doc.id}
                className="bg-[#252525] p-4 rounded-lg shadow flex justify-between items-center"
              >
                <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-4 md:gap-8">
                  <a
                    href={`/dashboard/${slug}/analyse/${doc.id}`}
                    className="text-sm border border-[#229987] px-3 py-3 rounded-md text-[#229987] hover:text-white hover:bg-[#229987] duration-100"
                  >
                    جزئیات آنالیز
                  </a>
                  <div className="text-sm text-gray-300">
                    مثبت: {doc.positiveResults} | منفی: {doc.negativeResults} |
                    خنثی: {doc.neutralResults}
                  </div>
                </div>
                <div className="text-left md:text-left flex gap-4">
                  <div>
                    <div className="truncate text-lg font-bold">
                      {doc.filePath}
                    </div>
                    <div className="text-sm text-gray-400 mb-1">
                      {new Date(doc.createdAt).toLocaleString("fa-IR")}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteMutation.mutate(doc.id)}
                    disabled={deletingDocId === doc.id}
                    className="text-red-500 hover:text-red-800 transition px-2  rounded-md border"
                  >
                    <Trash
                      size={18}
                      className={`transition-transform duration-300 ${
                        deletingDocId === doc.id ? "animate-spin" : ""
                      }`}
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
