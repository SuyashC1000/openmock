import { TestPaper } from "@/app/_interface/testData";
import { db } from "@/db/db";
import { File } from "buffer";

function useImport() {
  function importTestPaper() {
    // Check if the file is an image.
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
            const fetchedTestPaper = JSON.parse(content);
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
  return { importTestPaper };
}

export default useImport;
