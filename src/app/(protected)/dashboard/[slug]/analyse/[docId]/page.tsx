export const dynamic = "force-dynamic";

import { getUserDocWithComments } from "@/actions/user/queries";
import { notFound } from "next/navigation";
// <-- NEW
import CommentsList from "@/components/global/documents-single-page/comments-list";
import DoughnutCharts from "@/components/global/documents-single-page/doughnut-chart";
import BarChart from "@/components/global/documents-single-page/bar-chart";

export default async function AnalysePage({
  params,
}: {
  params: { docId: string };
}) {
  const doc = await getUserDocWithComments(params.docId);
  if (!doc) return notFound();

  // for ChartJS
  const sentimentCounts = {
    positive: 0,
    negative: 0,
    neutral: 0,
  };

  doc.comments.forEach((c) => {
    sentimentCounts[c.result] += 1;
  });

  const DoughnutData = {
    labels: ["مثبت", "منفی", "خنثی"],
    datasets: [
      {
        label: "تعداد نظرات",
        data: [
          sentimentCounts.positive,
          sentimentCounts.negative,
          sentimentCounts.neutral,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };
  const BarData = {
    labels: ["مثبت", "منفی", "خنثی"],
    datasets: [
      {
        label: "تعداد نطرات",
        data: [
          sentimentCounts.positive,
          sentimentCounts.negative,
          sentimentCounts.neutral,
        ],
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-6 text-white flex-col space-y-10">
      <div>
        <h2 className="text-2xl mb-4">نام فایل آنالیز شده: {doc.filePath}</h2>
        {/* pie & bar chartJS */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="w-full max-w-xs">
            <DoughnutCharts chartData={DoughnutData} />
          </div>
          <div className="flex-1">
            <BarChart chartData={BarData} />
          </div>
        </div>
      </div>
      <div>
        <CommentsList comments={doc.comments} />
      </div>
    </div>
  );
}
