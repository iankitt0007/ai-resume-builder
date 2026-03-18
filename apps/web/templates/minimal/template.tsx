"use client";

import type { TemplateProps } from "@resume-builder/shared-types";

export function MinimalTemplate({ data, customization, isPdfMode }: TemplateProps) {
  const { personal, experience, education, skills } = data;
  const primary = customization.primaryColor ?? "#0f172a";

  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        color: primary,
        maxWidth: isPdfMode ? "612pt" : "640px",
        margin: "0 auto",
        padding: isPdfMode ? "40pt" : "40px",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 32 }}>
        <h1 style={{ fontSize: 22, fontWeight: 400, margin: 0 }}>{personal?.name}</h1>
        <p style={{ fontSize: 11, color: "#64748b", marginTop: 6 }}>
          {[personal?.email, personal?.phone, personal?.location].filter(Boolean).join(" · ")}
        </p>
      </header>

      {experience?.length ? (
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2 }}>
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginTop: 16 }}>
              <strong>{exp.role}</strong>, {exp.company}
              <p style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>
                {exp.start} – {exp.current ? "Present" : exp.end}
              </p>
              {exp.bullets?.length ? (
                <ul style={{ margin: "8px 0 0 16px", fontSize: 10, lineHeight: 1.6 }}>
                  {exp.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {education?.length ? (
        <section style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2 }}>
            Education
          </h2>
          {education.map((ed) => (
            <div key={ed.id} style={{ marginTop: 12 }}>
              <strong>{ed.degree}</strong>, {ed.institution}
              <p style={{ fontSize: 10, color: "#64748b", margin: 0 }}>{ed.start} – {ed.end}</p>
            </div>
          ))}
        </section>
      ) : null}

      {skills?.length ? (
        <section>
          <h2 style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: 2 }}>
            Skills
          </h2>
          <p style={{ fontSize: 10, marginTop: 12 }}>{skills.map((s) => s.items?.join(", ")).join(" · ")}</p>
        </section>
      ) : null}
    </div>
  );
}
