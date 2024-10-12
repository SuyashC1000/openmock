import { TestPaper } from "@/app/_interface/testData";

function useExport() {
  function exportTestPaper(testPaper: TestPaper) {
    const jsonData = new Blob([JSON.stringify(testPaper)], {
      type: "application/json",
    });
    const jsonURL = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.download = `Paper_${testPaper.id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return { exportTestPaper };
}

export default useExport;
