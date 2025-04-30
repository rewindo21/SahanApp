"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default function BarChart({ chartData }: { chartData: any }) {
  return (
    <div>
      <Bar data={chartData} options={{ indexAxis: "y" }} />
    </div>
  );
}
