import { useUser } from "hooks/useUser/useUser";
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "hooks/useFirebase/useFirebase";

export const Header = () => {
  const { authUser } = useUser();
  const auth = useFirebaseAuth();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-xl">
          <a className="navbar-brand d-flex align-items-center" href="/">
            <span className="">[[ Mystery Year ]]</span>
          </a>
          <div>
            {authUser && !authUser?.isAnonymous && (
              <span
                onClick={() => {
                  signOut(auth);
                }}
              >
                Welcom {authUser.uid}
              </span>
            )}
            {authUser && authUser?.isAnonymous && (
              <div>
                <a href="/signup">Sign Up</a>
                <a className="btn btn-secondary ms-3" href="/login">
                  Already have an account?
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
