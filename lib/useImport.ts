import { TestPaper } from "@/app/_interface/testData";
import { ExportedUserData } from "@/app/_interface/userData";
import { db } from "@/db/db";
import { File } from "buffer";

function useImport() {
  function importTestPaper() {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      const { files } = e.target as HTMLInputElement;

      const reader = new FileReader();

      if (files !== null) {
        reader.readAsText(files[0], "UTF-8");
        reader.onload = (e) => {
          if (e.target !== null) {
            const content = e.target.result as string;
            const fetchedTestPaper: TestPaper = JSON.parse(content);
            db.testPapers.add(fetchedTestPaper);
          }
        };
      } else {
      }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }

  function importUserData() {
    const input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      const { files } = e.target as HTMLInputElement;

      const reader = new FileReader();

      if (files !== null) {
        reader.readAsText(files[0], "UTF-8");
        reader.onload = (e) => {
          if (e.target !== null) {
            const content = e.target.result as string;
            const importedUserData: ExportedUserData = JSON.parse(content);
            db.userData.add(importedUserData.userData);
            db.testPapers.bulkAdd(importedUserData.testPapers);
            db.testDrafts.bulkAdd(importedUserData.testDrafts);
            db.testResponses.bulkAdd(importedUserData.testResponses);
          }
        };
      } else {
      }
    };

    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  }
  return { importTestPaper, importUserData };
}

export default useImport;
