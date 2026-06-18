import { useState } from "react";
import OpportunityCard from "./OpportunityCard";

// Grid of opportunity cards with a section heading
export default function OpportunityList({ title, opportunities, onDelete, emptyMessage }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <section>
      <h6
        className={collapsed ? "mb-1" : "mb-3"}
        onClick={() => setCollapsed(!collapsed)}
        style={{ color: "var(--surface)", textTransform: "uppercase", letterSpacing: ".2em", fontWeight: 300, cursor: "pointer", userSelect: "none" }}
      >
        {title} <span style={{ fontSize: "0.7em", opacity: 0.6 }}>{collapsed ? "▸" : "▾"}</span>
      </h6>

      {!collapsed && (opportunities.length === 0 ? (
        <p style={{ color: "var(--surface)" }}>{emptyMessage ?? "No opportunities to show."}</p>
      ) : (
        <div className="row g-5">
          {opportunities.map((opp) => (
            <div className="col-md-6 col-lg-4 d-flex align-items-stretch" key={opp.id}>
              <OpportunityCard opportunity={opp} onDelete={onDelete} />
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}
