import img from "assets/images/police.jpg";
import { BsFacebook, BsGoogle } from "react-icons/bs";

export const LoginPage = () => {
  return (
    <main>
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-6 col-lg-5 col-xl-4">
            <img
              src={img}
              className="img-fluid gradient-border"
              alt="Merry go round"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 my-2">
            <form>
              <div className="form-outline mb-4">
                {" "}
                <label className="form-label mb-1" htmlFor="form1Example13">
                  Email address
                </label>
                <input
                  type="email"
                  id="form1Example13"
                  className="form-control form-control-lg"
                />
              </div>

              <div className="form-outline mb-4">
                {" "}
                <label className="form-label mb-1" htmlFor="form1Example23">
                  Password
                </label>
                <input
                  type="password"
                  id="form1Example23"
                  className="form-control form-control-lg"
                />
              </div>

              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form1Example3"
                    checked
                  />
                  <label className="form-check-label" htmlFor="form1Example3">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
                <a href="#!">Forgot password?</a>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-100">
                Sign in
              </button>

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
