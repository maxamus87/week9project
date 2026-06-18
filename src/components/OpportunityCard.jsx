import { truncate } from "../lib/opportunityUtils";

// One opportunity. Shows a Delete button only when onDelete is provided
// (user-created opportunities pass it in; API opportunities don't).
export default function OpportunityCard({ opportunity, onDelete }) {
  return (
    <div className="card opportunity-card h-100 p-4 w-100" style={{ backgroundColor: "var(--surface)", border: "1px solid var(--surface)" }}>
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2">
        <span
          className="badge"
          style={{ backgroundColor: "transparent", color: "var(--ink)", border: "1px solid var(--ink)", maxWidth: "100%", wordBreak: "break-word", whiteSpace: "normal", fontWeight: 300 }}
        >
          {opportunity.category}
        </span>
        {opportunity.remote && (
          <span
            className="badge"
            style={{ backgroundColor: "transparent", color: "var(--ink)", border: "1px solid var(--ink)" }}
          >
            Remote / Online
          </span>
        )}
      </div>

      <h5 className="mt-4 mb-1" style={{ color: "var(--ink)" }}>{opportunity.title}</h5>
      <div style={{ color: "var(--ink-muted)", fontSize: ".9rem" }}>{opportunity.organization}</div>

      <p className="mt-2 mb-3" style={{ color: "var(--ink)", fontSize: ".9rem" }}>
        {truncate(opportunity.description)}
      </p>

      <div className="mt-auto card-date" style={{ fontSize: ".85rem", color: "var(--ink-muted)" }}>
        <div>{opportunity.date}</div>
        {opportunity.location && <div>{opportunity.location}</div>}
      </div>

      {onDelete && (
        <button
          type="button"
          className="btn btn-sm mt-3 delete-btn"
          onClick={() => onDelete(opportunity.id)}
        >
          Delete
        </button>
      )}
    </div>
  );
}
