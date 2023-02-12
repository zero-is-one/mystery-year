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
          <a className="navbar-brand d-flex align-items-center" href="/">
            <span className="">[[ Mystery Year ]]</span>
          </a>
          <div className="d-flex align-items-center">
            <Link className="me-3" to={"/login"}>
              Login
            </Link>
            <Link className="btn btn-outline-secondary btn-sm" to={"/account"}>
              <RiAccountCircleFill size={32} />
              <span className="mx-2">Profile</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
