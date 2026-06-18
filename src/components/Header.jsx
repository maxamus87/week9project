import { useState, useEffect } from "react";

const FULL_TEXT = "Discover volunteer opportunities or create your own";

// Top banner for the app — title and subtitle
export default function Header() {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(FULL_TEXT.slice(0, i + 1));
      i++;
      if (i >= FULL_TEXT.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <header style={{ backgroundColor: "var(--surface)", padding: "2.5rem 0", position: "sticky", top: 0, zIndex: 1000 }}>
      <div className="container text-center">
        <div style={{ display: "inline-flex", alignItems: "center", gap: "1.5rem" }}>
          <h1 className="fw-normal mb-0" style={{ color: "var(--ink)", fontFamily: "'Caveat', cursive", fontWeight: 400, fontSize: "3rem" }}>How Can I Help?</h1>
          <div style={{ borderLeft: "0.5px solid var(--ink)", height: "3rem", opacity: 1 }} />
          <p className="mb-0" style={{ color: "var(--ink)", fontWeight: 300, textAlign: "left" }}>
            {displayed}
          </p>
        </div>
      </div>
    </header>
  );
}
