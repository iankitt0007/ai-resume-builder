"use client";

import type { TemplateProps } from "@resume-builder/shared-types";

export function ClassicTemplate({ data, customization, isPdfMode }: TemplateProps) {
  const { personal, experience, education, skills, projects } = data;
  const primary = customization.primaryColor ?? "#1e3a5f";
  const font = customization.fontFamily ?? "Georgia, serif";

  return (
    <div
      className="classic-resume"
      style={{
        fontFamily: font,
        color: primary,
        maxWidth: isPdfMode ? "612pt" : "720px",
        margin: "0 auto",
        padding: isPdfMode ? "24pt" : "24px",
      }}
    >
      <header style={{ borderBottom: `2px solid ${primary}`, paddingBottom: 8, marginBottom: 16 }}>
        <h1 style={{ fontSize: 24, margin: 0 }}>{personal?.name}</h1>
        <p style={{ fontSize: 12, margin: "4px 0 0", opacity: 0.8 }}>
          {[personal?.email, personal?.phone, personal?.location].filter(Boolean).join(" • ")}
        </p>
        {personal?.summary && (
          <p style={{ fontSize: 11, marginTop: 8 }}>{personal.summary}</p>
        )}
      </header>

      {experience?.length ? (
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>
            Experience
          </h2>
          {experience.map((exp) => (
            <div key={exp.id} style={{ marginBottom: 12 }}>
              <strong>{exp.role}</strong> — {exp.company}
              <p style={{ fontSize: 11, margin: "2px 0", opacity: 0.9 }}>
                {exp.start} – {exp.current ? "Present" : exp.end}
              </p>
              {exp.description && <p style={{ fontSize: 11 }}>{exp.description}</p>}
              {exp.bullets?.length ? (
                <ul style={{ margin: "4px 0 0 16px", fontSize: 11 }}>
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
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>
            Education
          </h2>
          {education.map((ed) => (
            <div key={ed.id} style={{ marginBottom: 8 }}>
              <strong>{ed.degree}</strong> — {ed.institution}
              <p style={{ fontSize: 11, margin: 0 }}>{ed.start} – {ed.end}</p>
            </div>
          ))}
        </section>
      ) : null}

      {skills?.length ? (
        <section style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>Skills</h2>
          {skills.map((s) => (
            <p key={s.id} style={{ fontSize: 11, margin: "4px 0" }}>
              <strong>{s.category}:</strong> {s.items?.join(", ")}
            </p>
          ))}
        </section>
      ) : null}

      {projects?.length ? (
        <section>
          <h2 style={{ fontSize: 14, textTransform: "uppercase", letterSpacing: 1 }}>
            Projects
          </h2>
          {projects.map((p) => (
            <div key={p.id} style={{ marginBottom: 8 }}>
              <strong>{p.name}</strong> {p.url && <span>({p.url})</span>}
              {p.description && <p style={{ fontSize: 11 }}>{p.description}</p>}
            </div>
          ))}
        </section>
      ) : null}
    </div>
  );
}
