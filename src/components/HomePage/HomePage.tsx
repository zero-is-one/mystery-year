// import sample1 from "assets/images/sample1.jpg";
// import sample2 from "assets/images/sample2.jpg";
// import sample3 from "assets/images/sample3.jpg";
// import sample4 from "assets/images/sample4.jpg";
// import sample5 from "assets/images/sample5.jpg";
// import sample6 from "assets/images/sample6.jpg";
import swipe from "assets/images/swipe.jpg";
// const samples = [sample5, sample1, sample2, sample6, sample3, sample4, sample5];

import { FaMedal } from "react-icons/fa";
import { PlayGameButton } from "components/PlayGameButton/PlayGameButton";
import { Categories } from "./Categories";

export const HomePage = () => {
  return (
    <main>
      <section className="my-5">
        <div className="container">
          <div className="row ">
            <div className="col-12 col-xl-7 col-lg-10">
              <h1 className="mb-2">Relive history one snap at a time...</h1>
              <p className="mb-lg-3" style={{ opacity: 0.5, fontWeight: 400 }}>
                'Mystery Year' is a fun and educational game where players test
                their knowledge of history by guessing the year a photo was
                taken. Travel through time with every click.
              </p>
              <p className="d-md-flex mt-4 text-center">
                <PlayGameButton
                  label="Play The Game"
                  className="btn me-4 my-2 btn-lg btn-primary"
                  style={{ minWidth: 260 }}
                />
                <a
                  href="#helo"
                  className="btn  me-4 my-2 btn-lg btn-secondary"
                  style={{ minWidth: 260 }}
                >
                  Daily Challenge
                  <FaMedal className="ms-2" size={"1.2em"} />
                </a>
              </p>
            </div>
            <div className="d-none d-xl-block col-xl-5">
              <div
                style={{
                  background: `url(${swipe}) right center no-repeat`,
                  width: "100%",
                  height: "100%",
                }}
              ></div>
            </div>
          </div>
        </div>
        {/* <div className="container my-4 my-md-5 ">
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
        </div> */}
      </section>

      <Categories />

      <section className="mb-5">
        <div className="container pt-md-5">
          <div className="row justify-content-center">
            <div className="col">
              <h3
                className="mb-3 d-inline-block py-2 px-3 mb-3"
                style={{ background: "white", color: "black" }}
              >
                Frequently Asked Questions
              </h3>
              <h4 className="mb-1">How do I play the game?</h4>
              <p> Click on the play button to start the game.</p>
              <h4 className="mb-1">Can I add photos to the site?</h4>
              <p>Contact us at contact@mysteryyear.com</p>
              <h4 className="mb-1">
                Are there any age restrictions for playing the game?
              </h4>
              <p>
                There are no specific age restrictions for playing the game, but
                it is recommended for players who are 13 years of age or older.
              </p>
              <h4 className="mb-1">How can I contact you?</h4>
              <p>Contact us at contact@mysteryyear.com</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

//html bootstrap underline text code
