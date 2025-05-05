// import { NextRequest, NextResponse } from "next/server";
// import Papa from "papaparse";
// import {
//   saveDocAndComments,
//   saveCommentAnalysis,
//   updateDocSentimentCounts,
// } from "@/actions/user/queries";
// import { onUserInfo } from "@/actions/user";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   try {
//     const { filename, originalName, content } = await req.json();

//     if (!filename || !originalName || !content) {
//       return NextResponse.json({ error: "Invalid input" }, { status: 400 });
//     }

//     // Converting CSV to TEXT
//     const parsed = Papa.parse<string[]>(content, {
//       skipEmptyLines: true,
//     });
//     const comments = parsed.data
//       .flat()
//       .map((c) => c.trim())
//       .filter((text) => text && isNaN(Number(text))); // exclude numbers
//     if (comments.length === 0) {
//       return NextResponse.json(
//         { error: "CSV contains no comments" },
//         { status: 400 }
//       );
//     }

//     console.log("✅ The document converted successfully.");

//     const userResponse = await onUserInfo();
//     const user = userResponse.data;
//     if (!user || !user.id) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // SAVE to DB Query
//     const doc = await saveDocAndComments(
//       originalName,
//       filename,
//       comments,
//       user.id
//     );

//     console.log("✅ The document saved successfully.");

//     // <-- NEW
//     const savedComments: { id: string; text: string }[] = doc.comments;
//     // Send each comment to AI server for analysis
//     const analysisResults = await Promise.all(
//       savedComments.map(async ({ id, text }) => {
//         try {
//           const response = await axios.post(
//             `https://sahanai.liara.run/process-text/`,
//             new URLSearchParams({ text }),
//             {
//               headers: { "Content-Type": "application/x-www-form-urlencoded" },
//               proxy: false,
//             }
//           );

//           const { sentiment, accuracy } = response.data;

//           // Save the AI response to DB
//           await saveCommentAnalysis(id, sentiment, accuracy);

//           return { id, text, sentiment, accuracy };
//         } catch (error) {
//           console.error("AI error for comment:", text, error);
//           return null;
//         }
//       })
//     );

//     console.log("✅ The comments analyzed successfully.");

//     // update doc sentiment counters
//     await updateDocSentimentCounts(doc.id);
//     console.log("✅ The document analyzed successfully.");

//     return NextResponse.json({
//       success: true,
//       docId: doc.id,
//       analysis: analysisResults.filter(Boolean),
//     });
//   } catch (err) {
//     console.error("Error analyzing comments:", err);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import {
  getUserDocWithComments,
  saveCommentAnalysis,
  updateDocSentimentCounts,
} from "@/actions/user/queries";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const { docId } = await req.json();

    if (!docId) {
      return NextResponse.json({ error: "Missing docId" }, { status: 400 });
    }

    const doc = await getUserDocWithComments(docId);
    if (!doc || !doc.comments?.length) {
      return NextResponse.json(
        { error: "Document not found or has no comments" },
        { status: 404 }
      );
    }

    for (const { id, text } of doc.comments) {
      try {
        const response = await axios.post(
          "https://sahanai.liara.run/process-text/",
          new URLSearchParams({ text }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            timeout: 300000,
            proxy: false,
          }
        );

        const { sentiment, accuracy } = response.data;
        await saveCommentAnalysis(id, sentiment, accuracy);
      } catch (err) {
        console.error("❌ Error analyzing comment:", text, err);
      }
    }

    await updateDocSentimentCounts(docId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error during analysis:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
