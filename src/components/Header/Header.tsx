import { useUser } from "hooks/useUser/useUser";
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "hooks/useFirebase/useFirebase";
import { RiAccountCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export const Header = () => {
  const { authUser } = useUser();

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container-xl">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span className="">[[ Mystery Year ]]</span>
          </Link>
          <div className="d-flex align-items-center">
            {authUser?.isAnonymous && (
              <>
                <Link to={"/login"}>
                  <span className="d-none d-md-inline">
                    Already have an account?
                  </span>
                  <span className="d-inline d-md-none">Login</span>
                </Link>
                <span className="mx-3"> |</span>
              </>
            )}

            <Link className="" to={"/account"}>
              <RiAccountCircleFill size={32} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
