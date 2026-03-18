"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ResumeContent } from "@resume-builder/shared-types";

const personalSchema = z.object({
  name: z.string(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
  summary: z.string().optional(),
});

type PersonalFormData = z.infer<typeof personalSchema>;

export interface ResumeSectionFormProps {
  section: string;
  content: Partial<ResumeContent>;
  onSave: (data: Record<string, unknown>) => void;
  onCancel?: () => void;
}

export function ResumeSectionForm({
  section,
  content,
  onSave,
  onCancel,
}: ResumeSectionFormProps) {
  const personal = content.personal || {};

  const form = useForm<PersonalFormData>({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      name: personal.name || "",
      email: personal.email || "",
      phone: personal.phone || "",
      location: personal.location || "",
      linkedin: personal.linkedin || "",
      website: personal.website || "",
      summary: personal.summary || "",
    },
  });

  if (section !== "personal") {
    return (
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Section &quot;{section}&quot; uses dynamic fields. Edit in the builder.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit((data) => onSave({ personal: data }))}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...form.register("name")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...form.register("email")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...form.register("phone")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input id="location" {...form.register("location")} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <textarea
          id="summary"
          className="min-h-[100px] w-full rounded-md border px-3 py-2 text-sm"
          {...form.register("summary")}
        />
      </div>
      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
