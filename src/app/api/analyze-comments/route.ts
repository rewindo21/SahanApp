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

    // Send each comment to AI server for analysis
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

        // Save the AI response to DB
        const { sentiment, accuracy } = response.data;
        await saveCommentAnalysis(id, sentiment, accuracy);
        console.log("✅ The comments analyzed successfully.");        
      } catch (err) {
        console.error("❌ Error analyzing comment:", text, err);
      }
    }


    // update doc sentiment counters
    await updateDocSentimentCounts(docId);
    return NextResponse.json({ success: true });
    console.log("✅ The document analyzed successfully.");
  } catch (err) {
    console.error("Error during analysis:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


// import { NextRequest, NextResponse } from "next/server";
// import {
//   getUserDocWithComments,
//   saveCommentAnalysis,
//   updateDocSentimentCounts,
// } from "@/actions/user/queries";
// import axios from "axios";

// export async function POST(req: NextRequest) {
//   try {
//     const { docId } = await req.json();

//     if (!docId) {
//       return NextResponse.json({ error: "Missing docId" }, { status: 400 });
//     }

//     const doc = await getUserDocWithComments(docId);
//     if (!doc || !doc.comments?.length) {
//       return NextResponse.json(
//         { error: "Document not found or has no comments" },
//         { status: 404 }
//       );
//     }

//     // Start background processing
//     (async () => {
//       const total = doc.comments.length;

//       for (let i = 0; i < total; i++) {
//         const { id, text } = doc.comments[i];

//         try {
//           const response = await axios.post(
//             "https://sahanai.liara.run/process-text/",
//             new URLSearchParams({ text }),
//             {
//               headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//               },
//               timeout: 300000,
//               proxy: false,
//             }
//           );

//           const { sentiment, accuracy } = response.data;
//           await saveCommentAnalysis(id, sentiment, accuracy);
//           console.log(`✅ Analyzed comment ${i + 1}/${total}`);
//         } catch (err) {
//           console.error(`❌ Error analyzing comment ${i + 1}/${total}:`, err);
//         }
//       }

//       try {
//         await updateDocSentimentCounts(docId);
//         console.log("✅ Sentiment counts updated");
//       } catch (err) {
//         console.error("❌ Failed to update sentiment counts:", err);
//       }
//     })();

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("❌ Error during analysis:", err);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }