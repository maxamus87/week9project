 

// Top banner for the app — title and subtitle
export default function Header() {
  

  return (
    <header style={{ backgroundColor: "var(--surface)", padding: "2.5rem 0 2rem" }}>
      <div className="container text-center">
        <div style={{ display: "inline-block", border: "1px solid var(--ink)", padding: "1rem 2rem" }}>
          <h1 className="fw-normal mb-0" style={{ color: "var(--ink)", fontFamily: "'Caveat', cursive" }}>How Can I Help?</h1>
          <hr style={{ borderTop: "1px solid var(--ink)", opacity: 1, margin: "0.5rem 0" }} />
          <p className="mb-0 mt-1" style={{ color: "var(--ink)" }}>
            Discover volunteer opportunities or create your own
          </p>
        </div>
      </div>
    </header>
  );
}
