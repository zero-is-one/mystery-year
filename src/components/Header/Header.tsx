import { useUser } from "hooks/useUser/useUser";
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from "hooks/useFirebase/useFirebase";
import { RiAccountCircleFill } from "react-icons/ri";
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
            <RiAccountCircleFill size={32} />
          </div>
        </div>
      </nav>
    </header>
  );
};
