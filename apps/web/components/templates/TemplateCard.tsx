"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Template } from "@resume-builder/shared-types";

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-[3/4] bg-muted flex items-center justify-center">
          {template.thumbnail_url ? (
            <img
              src={template.thumbnail_url}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-muted-foreground text-sm">{template.name}</span>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-3">
        <h3 className="font-medium">{template.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {template.description}
        </p>
        <Button asChild variant="secondary" size="sm" className="mt-2 w-full">
          <Link href={`/resumes/new?template=${template.slug}`}>
            Use Template
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
