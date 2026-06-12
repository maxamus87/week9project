import OpportunityList from "./OpportunityList";

// User-created opportunities — same list layout, but cards get a Delete button
export default function MyOpportunities({ opportunities, onDelete }) {
  return (
    <OpportunityList
      title="My Opportunities"
      opportunities={opportunities}
      onDelete={onDelete}
      emptyMessage="You haven't created any opportunities yet. Use the form above to add one!"
    />
  );
}
