import { uniqueId } from "@/app/_functions/randomGenerator";
import { TestPaper } from "@/app/_interface/testData";
import { ExportedUserData } from "@/app/_interface/userData";
import { db } from "@/db/db";

function useExport() {
  function exportTestPaper(testPaper: TestPaper) {
    const jsonData = new Blob([JSON.stringify(testPaper)], {
      type: "application/json",
    });
    const jsonURL = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.download = `Paper_${testPaper.id}_${uniqueId(5)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  async function exportUserData() {
    const testPapers = await db.testPapers.toArray();
    const testDrafts = await db.testDrafts.toArray();
    const testResponses = await db.testResponses.toArray();
    const [userData] = await db.userData.toArray();

    const ExportedUserData: ExportedUserData = {
      testPapers: testPapers,
      testDrafts: testDrafts,
      testResponses: testResponses,
      userData: userData,
    };

    const jsonData = new Blob([JSON.stringify(ExportedUserData)], {
      type: "application/json",
    });
    const jsonURL = URL.createObjectURL(jsonData);
    const link = document.createElement("a");
    link.href = jsonURL;
    link.download = `Complete_${userData.id}_${uniqueId(5)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return { exportTestPaper, exportUserData };
}

export default useExport;
