"use client";

import type { TemplateProps } from "@resume-builder/shared-types";

export function CreativeTemplate({ data, customization, isPdfMode }: TemplateProps) {
  const { personal, experience, education, skills, projects } = data;
  const primary = customization.primaryColor ?? "#7c3aed";
  const secondary = customization.secondaryColor ?? "#a78bfa";

  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        color: "#1e293b",
        maxWidth: isPdfMode ? "612pt" : "720px",
        margin: "0 auto",
        padding: isPdfMode ? "28pt" : "28px",
        border: `4px solid ${primary}`,
      }}
    >
      <header style={{ textAlign: "center", marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 32,
            color: primary,
            margin: 0,
            fontFamily: "Georgia, serif",
          }}
        >
          {personal?.name}
        </h1>
        <p style={{ fontSize: 12, color: secondary, marginTop: 8 }}>
          {[personal?.email, personal?.phone, personal?.location].filter(Boolean).join("  ◆  ")}
        </p>
        {personal?.summary && (
          <p style={{ fontSize: 12, marginTop: 12, lineHeight: 1.6, maxWidth: 560, margin: "12px auto 0" }}>
            {personal.summary}
          </p>
        )}
      </header>

      {experience?.length ? (
        <section style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontSize: 14,
              color: secondary,
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 16 }}>
              <strong>{exp.role}</strong>
              <span style={{ color: primary }}> @ {exp.company}</span>
              <p style={{ fontSize: 11, margin: "2px 0 6px", color: "#64748b" }}>
                {exp.start} – {exp.current ? "Present" : exp.end}
              </p>
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
        <section style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontSize: 14,
              color: secondary,
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            Education
          </h2>
          {education.map((ed) => (
            <div key={ed.id} style={{ marginBottom: 12 }}>
              <strong>{ed.degree}</strong> — {ed.institution}
              <p style={{ fontSize: 11, margin: 0 }}>{ed.start} – {ed.end}</p>
            </div>
          ))}
        </section>
      ) : null}

      {skills?.length ? (
        <section style={{ marginBottom: 20 }}>
          <h2
            style={{
              fontSize: 14,
              color: secondary,
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            Skills
          </h2>
          {skills.map((s) => (
            <span
              key={s.id}
              style={{
                display: "inline-block",
                padding: "4px 10px",
                margin: "4px 4px 4px 0",
                background: secondary,
                color: "white",
                fontSize: 10,
                borderRadius: 4,
              }}
            >
              {s.category}: {s.items?.slice(0, 3).join(", ")}
            </span>
          ))}
        </section>
      ) : null}

      {projects?.length ? (
        <section>
          <h2
            style={{
              fontSize: 14,
              color: secondary,
              textTransform: "uppercase",
              letterSpacing: 3,
              marginBottom: 12,
            }}
          >
            Projects
          </h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 12 }}>
              <strong>{p.name}</strong>
              {p.description && <p style={{ fontSize: 11, margin: "2px 0 0" }}>{p.description}</p>}
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
