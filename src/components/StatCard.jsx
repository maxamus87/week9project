// Small summary card for the stats row at the top of the dashboard
export default function StatCard({ label, value }) {
  return (
    <div className="card opportunity-card h-100 p-4" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--surface)" }}>
      <div className="stat-label" style={{ color: "var(--ink)", textTransform: "uppercase", letterSpacing: ".08em", fontWeight: 300 }}>
        {label}
      </div>
      <div className="mt-auto" style={{ borderTop: "1px solid var(--ink)", paddingTop: "0.5rem", color: "var(--ink)", fontSize: "2.2rem" }}>{value}</div>

    </div>
  );
}
