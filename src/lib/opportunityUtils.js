// ─── Business Logic for the Volunteer Dashboard ──────────────────────────────

// The API and user-created opportunities have different shapes, so we
// normalize API results into one common format the rest of the app can use.
export function normalizeApiOpportunity(result) {
  return {
    id: `api-${result.id}`,
    title: result.title,
    organization: result.organization?.name ?? "Unknown organization",
    description: stripHtml(result.description ?? ""),
    category: result.activities?.[0]?.category ?? "General",
    date: result.dates || "Ongoing",
    location: result.audience?.scope === "local" ? "Local" : result.audience?.scope ?? "",
    remote: result.remote_or_online === true,
    isUserCreated: false,
  };
}

// API descriptions contain HTML tags — this removes them for clean display
export function stripHtml(text) {
  return text.replace(/<[^>]*>/g, "").trim();
}

// Shortens long descriptions so the cards stay a readable size
export function truncate(text, maxLength = 160) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

// ─── Stats helpers ────────────────────────────────────────────────────────────

// Total number of opportunities (API + user-created)
export function getTotalCount(opportunities) {
  return opportunities.length;
}

// How many opportunities are remote/online
export function getRemoteCount(opportunities) {
  return opportunities.filter((opp) => opp.remote === true).length;
}

// ─── Search / filter ──────────────────────────────────────────────────────────

// Case-insensitive match against title, organization, or category
export function filterOpportunities(opportunities, searchTerm) {
  const term = searchTerm.trim().toLowerCase();
  if (term === "") return opportunities;

  return opportunities.filter(
    (opp) =>
      opp.title.toLowerCase().includes(term) ||
      opp.organization.toLowerCase().includes(term) ||
      opp.category.toLowerCase().includes(term)
  );
}

// ─── localStorage persistence ─────────────────────────────────────────────────

const STORAGE_KEY = "myOpportunities";

export function loadMyOpportunities() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveMyOpportunities(opportunities) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(opportunities));
}
