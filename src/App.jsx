import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import OpportunityList from "./components/OpportunityList";
import AddOpportunityForm from "./components/AddOpportunityForm";
import MyOpportunities from "./components/MyOpportunities";
import StatCard from "./components/StatCard";

import {
  normalizeApiOpportunity,
  getTotalCount,
  getRemoteCount,
  filterOpportunities,
  loadMyOpportunities,
  saveMyOpportunities,
} from "./lib/opportunityUtils";

const API_URL = "https://www.volunteerconnector.org/api/search/";

// Light border framing each major section, with space between frames
function SectionFrame({ children }) {
  return <div className="section-frame mb-5 p-4 pb-5">{children}</div>;
}

export default function App() {
  // API opportunities (read-only) and user-created opportunities (CRUD)
  const [apiOpportunities, setApiOpportunities] = useState([]);
  const [myOpportunities, setMyOpportunities] = useState(loadMyOpportunities);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch opportunities from the API once on page load
  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setApiOpportunities(data.results.map(normalizeApiOpportunity));
      } catch {
        setError("Unable to load volunteer opportunities");
      } finally {
        setIsLoading(false);
      }
    }
    fetchOpportunities();
  }, []);

  // Save user-created opportunities to localStorage whenever they change
  useEffect(() => {
    saveMyOpportunities(myOpportunities);
  }, [myOpportunities]);

  function handleAdd(newOpportunity) {
    setMyOpportunities([newOpportunity, ...myOpportunities]);
  }

  function handleDelete(id) {
    setMyOpportunities(myOpportunities.filter((opp) => opp.id !== id));
  }

  const allOpportunities = [...myOpportunities, ...apiOpportunities];
  const visibleApi = filterOpportunities(apiOpportunities, searchTerm);
  const visibleMine = filterOpportunities(myOpportunities, searchTerm);

  return (
    <div style={{ backgroundColor: "var(--page-bg)", minHeight: "100vh" }}>
      <Header />

      <main className="container py-4 mt-4 pb-5 px-5" style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>

        

        {/* Search */}
        <SectionFrame>
          <input
            type="search"
            className="form-control form-control-lg"
            style={{ border: "none", borderBottom: "1px solid var(--input-border)", borderRadius: 0, fontFamily: "inherit" }}
            placeholder="Search by title, organization, or category…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SectionFrame>

        {/* Stats from lib/ business logic */}
        <SectionFrame>
          <div className="row g-5">
            <div className="col-sm-4">
              <StatCard label="Total Opportunities" value={getTotalCount(allOpportunities)} />
            </div>
            <div className="col-sm-4">
              <StatCard label="Remote / Online" value={getRemoteCount(allOpportunities)} />
            </div>
            <div className="col-sm-4">
              <StatCard label="Created By Me" value={getTotalCount(myOpportunities)} />
            </div>
          </div>
        </SectionFrame>

        {/* API opportunities with loading / error states */}
        <SectionFrame>
          {isLoading ? (
            <p className="mb-0" style={{ color: "var(--surface)" }}>Loading Opportunities…</p>
          ) : error ? (
            <p className="mb-0" style={{ color: "var(--danger)" }}>{error}</p>
          ) : (
            <OpportunityList
              title="Volunteer Opportunities"
              opportunities={visibleApi}
              emptyMessage="No opportunities match your search."
            />
          )}
        </SectionFrame>

        <SectionFrame>
          <AddOpportunityForm onAdd={handleAdd} />
        </SectionFrame>

        <SectionFrame>
          <MyOpportunities opportunities={visibleMine} onDelete={handleDelete} />
        </SectionFrame>

        

      </main>

      <Footer />
    </div>
  );
}
