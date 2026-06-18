// Bottom bar with data credit
export default function Footer() {
  return (
    <footer style={{ backgroundColor: "transparent", borderTop: "1px solid var(--surface)", padding: "1.25rem 0" }}>
      <div className="container d-flex justify-content-between flex-wrap" style={{ color: "var(--surface)", fontSize: ".85rem" }}>
        <span>Week 9 Project — How Can I Help?</span>
        <span>
          Data from{" "}
          <a href="https://www.volunteerconnector.org" target="_blank" rel="noreferrer" style={{ color: "var(--surface)" }}>
            Volunteer Connector
          </a>
        </span>
      </div>
    </footer>
  );
}
