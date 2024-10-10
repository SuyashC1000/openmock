import { confirm } from "@/app/_components/Confirmation";
import { db } from "@/db/db";
import { useRouter } from "next/navigation";

function useDelete() {
  const router = useRouter();

  async function deleteTestResponse(
    attemptId: string,
    redirectURL: string | undefined = undefined
  ) {
    const isConfirmed = await confirm(
      "Are you sure you want to delete this test attempt? This action cannot be undone."
    );
    if (isConfirmed) {
      await db.testResponses.delete(attemptId);

      if (redirectURL !== undefined) {
        router.push(redirectURL);
      }
    }
  }

  async function deleteTestPaper(
    testId: string,
    redirectURL: string | undefined = undefined
  ) {
    const isConfirmed = await confirm(
      "Are you sure you want to delete this test and all of its attempts? This action cannot be undone."
    );
    if (isConfirmed) {
      await db.testResponses.where("testId").equals(testId).delete();
      await db.testPapers.delete(testId);

      if (redirectURL !== undefined) {
        router.push(redirectURL);
      }
    }
    return isConfirmed;
  }

  async function deleteUserData(redirectURL: string | undefined = undefined) {
    const isConfirmed = await confirm(
      "Are you sure you want to delete your user data? THIS WILL DELETE ALL OF YOUR SAVED TEST PAPERS, ATTEMPTS \
      AND DRAFTS! THIS ACTION IS IRREVERSIBLE AND UTMOST PRECAUTION MUST BE TAKEN TO PROCEED!"
    );
    if (isConfirmed) {
      await db.delete();

      window.location.reload();
    }
  }

  return { deleteTestResponse, deleteTestPaper, deleteUserData };
}

export default useDelete;
