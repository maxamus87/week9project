import { useState } from "react";

const emptyForm = {
  title: "",
  organization: "",
  description: "",
  location: "",
  date: "",
  category: "",
};

// Controlled form for creating a new opportunity
export default function AddOpportunityForm({ onAdd }) {
  const [form, setForm] = useState(emptyForm);
  const [collapsed, setCollapsed] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleDateChange(e) {
    let digits = e.target.value.replace(/\D/g, "");
    if (digits.length > 2) digits = digits.slice(0, 2) + "/" + digits.slice(2);
    if (digits.length > 5) digits = digits.slice(0, 5) + "/" + digits.slice(5);
    setForm({ ...form, date: digits.slice(0, 10) });
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAdd({
      id: `user-${Date.now()}`,
      title: form.title,
      organization: form.organization,
      description: form.description,
      location: form.location,
      date: form.date,
      category: form.category,
      remote: false,
      isUserCreated: true,
    });

    setForm(emptyForm); // clear the form after submitting
  }

  const inputStyle = { border: "none", borderBottom: "1px solid var(--input-border)", borderRadius: 0 };

  return (
    <section>
      <h6
        className={collapsed ? "mb-1" : "mb-3"}
        onClick={() => setCollapsed(!collapsed)}
        style={{ color: "var(--surface)", textTransform: "uppercase", letterSpacing: ".2em", cursor: "pointer", userSelect: "none" }}
      >
        Add an Opportunity <span style={{ fontSize: "0.7em", opacity: 0.6 }}>{collapsed ? "▸" : "▾"}</span>
      </h6>

      {!collapsed && <form
        onSubmit={handleSubmit}
        className="card dark-card p-5"
        style={{ backgroundColor: "var(--surface)", borderTop: "none", borderLeft: "none", borderBottom: "1px solid var(--input-border)", borderRight: "1px solid var(--input-border)" }}
      >
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" style={{ color: "var(--ink)" }}>Title</label>
            <input
              className="form-control" style={inputStyle}
              name="title" value={form.title} onChange={handleChange} required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label" style={{ color: "var(--ink)" }}>Organization</label>
            <input
              className="form-control" style={inputStyle}
              name="organization" value={form.organization} onChange={handleChange} required
            />
          </div>
          <div className="col-12">
            <label className="form-label" style={{ color: "var(--ink)" }}>Description</label>
            <textarea
              className="form-control" style={inputStyle} rows="3"
              name="description" value={form.description} onChange={handleChange} required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" style={{ color: "var(--ink)" }}>Location</label>
            <input
              className="form-control" style={inputStyle}
              name="location" value={form.location} onChange={handleChange} required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" style={{ color: "var(--ink)" }}>Date</label>
            <input
              type="text" className="form-control" style={inputStyle}
              placeholder="MM/DD/YYYY"
              name="date" value={form.date} onChange={handleDateChange} required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label" style={{ color: "var(--ink)" }}>Category</label>
            <input
              className="form-control" style={inputStyle}
              name="category" value={form.category} onChange={handleChange} required
            />
          </div>
        </div>

        <div className="mt-5">
          <button type="submit" className="btn add-btn">
            Add Opportunity
          </button>
        </div>
      </form>}
    </section>
  );
}
