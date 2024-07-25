import { MayHaveLabel } from "@nivo/pie";
import { ScoreData } from "./calculateScoreData";

export function formatPieChartData(
  scoreData: ScoreData,
  type: "marks" | "questions"
) {
  if (type === "marks") {
    const pieChartData = [
      {
        id: "Marks scored",
        label: "Marks scored",
        value: Math.abs(scoreData.marks.total),
        color: Math.sign(scoreData.marks.total) === 1 ? "#38bdf8" : "#fb923c",
      },
      {
        id: "Marks missed",
        label: "Marks missed",
        value: scoreData.marks.max - Math.abs(scoreData.marks.total),
        color: "#e5e5e5",
      },
    ];
    return pieChartData;
  } else {
    let pieChartData = [];
    if (scoreData.questions.correct > 0)
      pieChartData.push({
        id: "Correct",
        label: "Correct",
        value: scoreData.questions.correct,
        color: "#4ade80",
      });
    if (scoreData.questions.incorrect > 0)
      pieChartData.push({
        id: "Incorrect",
        label: "Incorrect",
        value: scoreData.questions.incorrect,
        color: "#f87171",
      });
    if (scoreData.questions.unattempted > 0)
      pieChartData.push({
        id: "Unattempted",
        label: "Unattempted",
        value: scoreData.questions.unattempted,
        color: "#a3a3a3",
      });
    if (scoreData.questions.partial > 0)
      pieChartData.push({
        id: "Partial",
        label: "Partial",
        value: scoreData.questions.partial,
        color: "#facc15",
      });
    return pieChartData;
  }
}
