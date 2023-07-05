import { useRouter } from "next/router";
import { auth } from "../firebase-config";

const useLogOut = () => {
  const router = useRouter();
  const logout = async () => {
    auth.signOut().then(
      function () {
        // Sign-out successful.
        router.push("/login");
      },
      function (error) {
        // An error happened.
      }
    );
  };

  return { logout };
};

export default useLogOut;
