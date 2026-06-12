import OpportunityCard from "./OpportunityCard";

// Grid of opportunity cards with a section heading
export default function OpportunityList({ title, opportunities, onDelete, emptyMessage }) {
  return (
    <section>
      <h6
        className="mb-3"
        style={{ color: "var(--surface)", textTransform: "uppercase", letterSpacing: ".06em" }}
      >
        {title}
      </h6>

      {opportunities.length === 0 ? (
        <p style={{ color: "var(--surface)" }}>{emptyMessage ?? "No opportunities to show."}</p>
      ) : (
        <div className="row g-3">
          {opportunities.map((opp) => (
            <div className="col-md-6 col-lg-4 d-flex" key={opp.id}>
              <OpportunityCard opportunity={opp} onDelete={onDelete} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
