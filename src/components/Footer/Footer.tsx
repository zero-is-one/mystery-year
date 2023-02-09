export const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <footer className="mt-5" style={{ borderTop: "1px solid #89908C" }}>
      <div className="container pt-4">
        <div className="row">
          {/* <div className="col">About Us</div> */}
          <div className="col ">
            <small className="text-muted ">© Mystery Year {year}</small>
          </div>
        </div>
      </div>
    </footer>
  );
};
