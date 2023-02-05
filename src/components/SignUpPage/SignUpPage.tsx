import img from "assets/images/merrygoround.jpg";
//import { BsFacebook, BsGoogle } from "react-icons/bs";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useFirebaseAuth } from "hooks/useFirebase/useFirebase";

export const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors: formErrors },
  } = useForm();
  const [createUserWithEmailAndPassword, user, loading, firebaseError] =
    useCreateUserWithEmailAndPassword(useFirebaseAuth());

  console.log(formErrors);

  const onSubmit = (data: any) => {
    createUserWithEmailAndPassword(data.email, data.password);
  };

  return (
    <main>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100 flex-row-reverse">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <img
              src={img}
              className="img-fluid gradient-border"
              alt="Merry go round"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1 my-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <label className="form-label mb-2" htmlFor="email">
                Email address
              </label>
              <input
                {...register("email")}
                type="email"
                id="email"
                className="form-control form-control-lg mb-2"
              />

              <label className="form-label mb-2" htmlFor="password">
                Password
              </label>
              <input
                {...register("password", { required: true })}
                type="password"
                id="password"
                className="form-control form-control-lg mb-2"
              />

              <label className="form-label mb-1" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                {...register("confirmPassword", {
                  validate: (value) => {
                    const { password } = getValues();
                    return password === value || "Passwords should match!";
                  },
                })}
                type="password"
                id="confirmPassword"
                className="form-control form-control-lg mb-4"
              />

              <p
                className="text-danger"
                style={{ opacity: formErrors?.confirmPassword ? 1 : 0 }}
              >
                {(formErrors?.confirmPassword?.message as string) || ""}
              </p>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 mb-3"
              >
                Sign Up
              </button>

              <p
                className="text-danger"
                style={{ opacity: firebaseError ? 1 : 0 }}
              >
                {messages[firebaseError?.code || ""] ||
                  `Failed with error code: ${firebaseError?.code}`}
              </p>

              {/* <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <div className="d-grid gap-2">
                <a
                  className="btn btn-outline-primary btn-lg btn-block"
                  href="#!"
                  role="button"
                >
                  <BsFacebook className="me-2" />
                  Continue with Facebook
                </a>
                <a
                  className="btn btn-outline-primary btn-lg btn-block"
                  href="#!"
                  role="button"
                >
                  <BsGoogle className="me-2" />
                  Continue with Google
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

const messages: { [key: string]: string } = {
  "auth/email-already-in-use": "User already exists, try logging in",
  "auth/invalid-email": "Invalid email address",
  "auth/operation-not-allowed": "Operation not allowed",
  "auth/weak-password": "Weak password",
  success: "user created",
};
