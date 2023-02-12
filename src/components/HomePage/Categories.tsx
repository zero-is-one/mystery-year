import sample5 from "assets/images/sample5.jpg";
import slides from "assets/images/slides.jpg";

const categories = [
  { title: "New York" },
  { title: "New York" },
  { title: "New York" },
  { title: "New York" },
  { title: "New York" },
];

export const Categories = () => {
  return (
    <section
      className="mb-3"
      style={{
        background: `url(${slides}) bottom center repeat-x`,
        paddingBottom: 220,
        imageRendering: "pixelated",
      }}
    >
      <div className="container">
        <div className="row mb-5">
          <h3 className="text-underline mb-4">
            Try one of these photo categories...
          </h3>
          {categories.map((c) => (
            <div className="col">
              <div className="card">
                <img src={sample5} className="card-img-top" alt="..." />
                <div className="card-body text-center">
                  <h5>{c.title}</h5>
                  <button className="btn btn-light" style={{ width: 100 }}>
                    Play
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
