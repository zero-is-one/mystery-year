import { useUser } from "hooks/useUser/useUser";
import { Matches } from "./Matches";
import { Link } from "react-router-dom";
import { useFirebaseAuth } from "hooks/useFirebase/useFirebase";
import { getAuth, signOut } from "firebase/auth";

export const AccountPage = () => {
  const { authUser } = useUser();
  const auth = useFirebaseAuth();

  return (
    <div className="container">
      {authUser?.isAnonymous && (
        <div className="alert alert-warning" role="alert">
          <h4>Create an account to save your progress!</h4>
          <p className="m-1">Protect your streak and sign up today.</p>
          <Link to="/signup">
            <p className="m-0">Click here to get started...</p>
          </Link>
        </div>
      )}

      <Matches />

      <hr />

      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-secondary ms-auto btn-sm px-3"
          onClick={() => {
            signOut(auth);
          }}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};
