"use client";

import type { TemplateProps } from "@resume-builder/shared-types";

export function ModernTemplate({ data, customization, isPdfMode }: TemplateProps) {
  const { personal, experience, education, skills } = data;
  const primary = customization.primaryColor ?? "#2563eb";

  return (
    <div
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        color: "#1e293b",
        maxWidth: isPdfMode ? "612pt" : "720px",
        margin: "0 auto",
        padding: isPdfMode ? "32pt" : "32px",
      }}
    >
      <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 28, color: primary, margin: 0 }}>{personal?.name}</h1>
          <p style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
            {personal?.email} • {personal?.phone}
          </p>
          {personal?.summary && (
            <p style={{ fontSize: 12, marginTop: 12, lineHeight: 1.5 }}>{personal.summary}</p>
          )}
        </div>
      </div>

      {experience?.length ? (
        <section style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontSize: 14,
              color: primary,
              borderBottom: `2px solid ${primary}`,
              paddingBottom: 4,
            }}
          >
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginTop: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                <strong>{exp.role}</strong>
                <span style={{ fontSize: 11, color: "#64748b" }}>
                  {exp.start} – {exp.current ? "Present" : exp.end}
                </span>
              </div>
              <p style={{ fontSize: 12, color: "#64748b", margin: "2px 0 8px" }}>{exp.company}</p>
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
          <h2
            style={{
              fontSize: 14,
              color: primary,
              borderBottom: `2px solid ${primary}`,
              paddingBottom: 4,
            }}
          >
            Education
          </h2>
          {education.map((ed) => (
            <div key={ed.id} style={{ marginTop: 12 }}>
              <strong>{ed.degree}</strong> — {ed.institution}
              <p style={{ fontSize: 11, margin: 0 }}>{ed.start} – {ed.end}</p>
            </div>
          ))}
        </section>
      ) : null}

      {skills?.length ? (
        <section>
          <h2
            style={{
              fontSize: 14,
              color: primary,
              borderBottom: `2px solid ${primary}`,
              paddingBottom: 4,
            }}
          >
            Skills
          </h2>
          <p style={{ fontSize: 11, marginTop: 12 }}>
            {skills.map((s) => s.items?.join(", ")).join(" • ")}
          </p>
        </section>
      ) : null}
    </div>
  );
}
