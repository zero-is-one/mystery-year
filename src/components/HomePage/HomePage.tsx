import sample1 from "assets/images/sample1.jpg";
import sample2 from "assets/images/sample2.jpg";
import sample3 from "assets/images/sample3.jpg";
import sample4 from "assets/images/sample4.jpg";

const samples = [sample1, sample2, sample3, sample4];

export const HomePage = () => {
  return (
    <main>
      <section className="pt-5">
        <div className="container pt-md-5">
          <div className="row justify-content-center">
            <div className="col-md-11 col-10 col-xl-8">
              <h1 className="mb-2">
                Relive history one snap at a time -
                <br className="d-sm-none d-md-block" /> guess the year,
                challenge your mind!
              </h1>
              <p className="mb-lg-3" style={{ opacity: 0.5, fontWeight: 400 }}>
                'Mystery year' is a fun and educational game where players test
                their knowledge of history by guessing the year a photo was
                taken. Travel through time with every click.
              </p>
              <p className="d-md-flex mt-4 text-center">
                <a
                  href="#dd"
                  className="btn me-4 my-2 btn-lg btn-light"
                  style={{ minWidth: 260 }}
                >
                  Play The Game{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                    ></path>
                  </svg>
                </a>

                <a
                  href="#helo"
                  className="btn  me-4 my-2 btn-lg btn-secondary"
                  style={{ minWidth: 260 }}
                >
                  Daily Challenge
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="container my-4 my-md-5 ">
          <div className="row justify-content-end">
            <div className="col">
              <div className="d-flex justify-content-end">
                {samples.map((sample) => (
                  <div className="photo ">
                    <figure>
                      <img src={sample} alt="polaroid still" />
                    </figure>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr />
    </main>
  );
};
