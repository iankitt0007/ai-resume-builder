"use client";

import type { TemplateProps } from "@resume-builder/shared-types";

export function ExecutiveTemplate({ data, customization, isPdfMode }: TemplateProps) {
  const { personal, experience, education, skills } = data;
  const primary = customization.primaryColor ?? "#0c4a6e";

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        color: "#0f172a",
        maxWidth: isPdfMode ? "612pt" : "720px",
        margin: "0 auto",
        padding: isPdfMode ? "32pt" : "32px",
      }}
    >
      <header
        style={{
          background: primary,
          color: "white",
          padding: 24,
          margin: "-32px -32px 24px -32px",
          ...(isPdfMode && { margin: "-32pt -32pt 24pt -32pt", padding: "24pt" }),
        }}
      >
        <h1 style={{ fontSize: 28, margin: 0 }}>{personal?.name}</h1>
        <p style={{ fontSize: 13, marginTop: 8, opacity: 0.95 }}>
          {[personal?.email, personal?.phone, personal?.location].filter(Boolean).join("  |  ")}
        </p>
        {personal?.summary && (
          <p style={{ fontSize: 12, marginTop: 12, lineHeight: 1.5 }}>{personal.summary}</p>
        )}
      </header>

      {experience?.length ? (
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: primary, borderBottom: `3px solid ${primary}`, paddingBottom: 6 }}>
            Professional Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <strong style={{ fontSize: 14 }}>{exp.role}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>
                  {exp.start} – {exp.current ? "Present" : exp.end}
                </span>
              </div>
              <p style={{ fontSize: 12, color: primary, margin: "2px 0 8px" }}>{exp.company}</p>
              {exp.bullets?.length ? (
                <ul style={{ margin: 0, paddingLeft: 18, fontSize: 11 }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i} style={{ marginBottom: 4 }}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {education?.length ? (
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, color: primary, borderBottom: `3px solid ${primary}`, paddingBottom: 6 }}>
            Education
          </h2>
          {education.map((ed) => (
            <div key={ed.id} style={{ marginTop: 16 }}>
              <strong>{ed.degree}</strong> — {ed.institution}
              <p style={{ fontSize: 11, margin: 0 }}>{ed.start} – {ed.end}</p>
            </div>
          ))}
        </section>
      ) : null}

      {skills?.length ? (
        <section>
          <h2 style={{ fontSize: 16, color: primary, borderBottom: `3px solid ${primary}`, paddingBottom: 6 }}>
            Key Competencies
          </h2>
          <p style={{ fontSize: 11, marginTop: 16 }}>{skills.map((s) => s.items?.join(", ")).join("  |  ")}</p>
        </section>
      ) : null}
    </div>
  );
}
