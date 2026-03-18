"use client";

import { UseFormReturn } from "react-hook-form";
import { ResumeContent } from "@resume-builder/shared-types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface SectionPanelProps {
  form: UseFormReturn<ResumeContent>;
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SECTIONS = [
  { id: "personal", label: "Personal Info" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "languages", label: "Languages" },
];

export function SectionPanel({ form, activeSection, onSectionChange }: SectionPanelProps) {
  const { register, watch, setValue } = form;
  const personal = watch("personal");

  return (
    <div className="flex flex-col h-full overflow-auto">
      <div className="flex gap-1 p-2 border-b overflow-x-auto">
        {SECTIONS.map((s) => (
          <Button
            key={s.id}
            variant={activeSection === s.id ? "default" : "ghost"}
            size="sm"
            onClick={() => onSectionChange(s.id)}
          >
            {s.label}
          </Button>
        ))}
      </div>
      <div className="flex-1 p-4 overflow-auto">
        {activeSection === "personal" && (
          <Card>
            <CardHeader>Personal Information</CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input {...register("personal.name")} placeholder="Full name" />
              </div>
              <div>
                <Label>Email</Label>
                <Input {...register("personal.email")} type="email" placeholder="email@example.com" />
              </div>
              <div>
                <Label>Phone</Label>
                <Input {...register("personal.phone")} placeholder="+1 234 567 8900" />
              </div>
              <div>
                <Label>Location</Label>
                <Input {...register("personal.location")} placeholder="City, Country" />
              </div>
              <div>
                <Label>LinkedIn</Label>
                <Input {...register("personal.linkedin")} placeholder="linkedin.com/in/username" />
              </div>
              <div>
                <Label>Website</Label>
                <Input {...register("personal.website")} placeholder="https://yoursite.com" />
              </div>
              <div>
                <Label>Summary</Label>
                <textarea
                  {...register("personal.summary")}
                  className="w-full min-h-[100px] rounded-md border px-3 py-2"
                  placeholder="Professional summary..."
                />
              </div>
            </CardContent>
          </Card>
        )}
        {activeSection !== "personal" && (
          <Card>
            <CardHeader>{SECTIONS.find((s) => s.id === activeSection)?.label}</CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Section editor for {activeSection}. Add items via the main form.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
