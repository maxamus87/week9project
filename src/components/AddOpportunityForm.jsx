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

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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

  const inputStyle = { backgroundColor: "var(--surface)", border: "1px solid var(--input-border)", color: "var(--ink)", borderRadius: 0 };

  return (
    <section>
      <h6
        className="mb-3"
        style={{ color: "var(--surface)", textTransform: "uppercase", letterSpacing: ".06em" }}
      >
        Add an Opportunity
      </h6>

      <form
        onSubmit={handleSubmit}
        className="card p-4"
        style={{ backgroundColor: "var(--surface)", border: "1px solid var(--surface)" }}
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
              type="date" className="form-control" style={inputStyle}
              name="date" value={form.date} onChange={handleChange} required
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

        <div className="mt-3">
          <button type="submit" className="btn add-btn">
            Add Opportunity
          </button>
        </div>
      </form>
    </section>
  );
}
