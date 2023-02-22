import { PlayGameButton } from "components/PlayGameButton/PlayGameButton";
import { BsArrowRightShort } from "react-icons/bs";
import slides from "assets/images/slides.jpg";
import africanamercans from "assets/images/africanamericans.jpg";
import newyork from "assets/images/nyc.jpg";
import worldwar from "assets/images/worldwar.jpg";
import ethnography from "assets/images/ethonography.jpg";

const categories = [
  { title: "New York", subject: "new york", image: newyork },
  {
    title: "African Americans",
    subject: "african americans",
    image: africanamercans,
  },
  { title: "World War", subject: "world war", image: worldwar },
  { title: "Ethnography", subject: "ethnography", image: ethnography },
];

export const Categories = () => {
  return (
    <section
      className="mb-3"
      style={{
        background: `url(${slides}) bottom center repeat-x`,
        paddingBottom: 280,
        imageRendering: "pixelated",
      }}
    >
      <div className="container">
        <div className="row ">
          <h3 className="text-underline mb-4">
            Try one of these photo categories...
          </h3>
          {categories.map((c) => (
            <div className="col col-6 col-xl-3 mb-4">
              <div className="card">
                <img
                  style={{ aspectRatio: "4/3", objectFit: "cover" }}
                  src={c.image}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body text-center">
                  <h5>{c.title}</h5>

                  <PlayGameButton
                    subject={c.subject}
                    className="btn btn-light"
                    style={{ width: 100 }}
                    Icon={BsArrowRightShort}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
