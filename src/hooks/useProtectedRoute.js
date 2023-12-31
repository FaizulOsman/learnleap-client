import { useEffect } from "react";
import { useRouter } from "next/router";

// A custom hook that checks the user's role and redirects them to the appropriate page
const useProtectedRoute = (role) => {
  // Get the router object from nextjs
  const router = useRouter();

  // Get the current path of the page
  const path = router.pathname;

  // Define the pages that each role can access
  const userPages = [
    "/bookmarks",
    "/random-question",
    "/be-a-premium-user",
    "/exam/[...segments]",
    "/exam-result/[...resultSegments]",
    "/dashboard",
    "/dashboard/my-profile",
    "/dashboard/results",
    "/dashboard/bookmarks",
  ];
  const adminPages = [
    "/bookmarks",
    "/random-question",
    "/be-a-premium-user",
    "/exam/[...segments]",
    "/exam-result/[...resultSegments]",
    "/dashboard",
    "/dashboard/users",
    "/dashboard/users/update/[userId]",
    "/dashboard/add-new-admin",
    "/dashboard/my-profile",
    "/dashboard/test",
    "/dashboard/test/create-test",
    "/dashboard/test/all-test",
    "/dashboard/exam",
    "/dashboard/exam/create-exam",
    "/dashboard/exam/all-exam",
    "/dashboard/results",
    "/dashboard/bookmarks",
    "/dashboard/feedbacks",
    "/dashboard/faq",
    "/dashboard/faq/create",
  ];
  const superAdminPages = [
    "/bookmarks",
    "/random-question",
    "/be-a-premium-user",
    "/exam/[...segments]",
    "/exam-result/[...resultSegments]",
    "/dashboard",
    "/dashboard/users",
    "/dashboard/users/update/[userId]",
    "/dashboard/add-new-admin",
    "/dashboard/my-profile",
    "/dashboard/test",
    "/dashboard/test/create-test",
    "/dashboard/test/all-test",
    "/dashboard/exam",
    "/dashboard/exam/create-exam",
    "/dashboard/exam/all-exam",
    "/dashboard/results",
    "/dashboard/bookmarks",
    "/dashboard/feedbacks",
    "/dashboard/faq",
    "/dashboard/faq/create",
  ];
  const guestPages = ["/"];

  // Define a function that redirects the user to the home page if they are not authorized
  const redirect = () => {
    router.push("/");
  };

  // Use the useEffect hook to run the logic when the component mounts or updates
  useEffect(() => {
    // Check if the user's role matches the required role for the current page
    if (role === "user" && !userPages.includes(path)) {
      // If not, redirect them to the home page
      redirect();
    } else if (role === "admin" && !adminPages.includes(path)) {
      // If not, redirect them to the home page
      redirect();
    } else if (role === "super_admin" && !superAdminPages.includes(path)) {
      // If not, redirect them to the home page
      redirect();
    } else if (role === "guest" && !guestPages.includes(path)) {
      // If not, redirect them to the home page
      router.push("/login");
    }
  }, [role, path]);
};

export default useProtectedRoute;
