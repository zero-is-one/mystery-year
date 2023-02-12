import { useUser } from "hooks/useUser/useUser";
import { Matches } from "./Matches";

export const AccountPage = () => {
  const { authUser } = useUser();

  return (
    <div className="container">
      {authUser?.isAnonymous && (
        <div className="alert alert-warning" role="alert">
          <h4>Create an account to save your progress!</h4>
          <p className="m-0">Protect your streak and sign up today.</p>
        </div>
      )}

      <Matches />
    </div>
  );
};
