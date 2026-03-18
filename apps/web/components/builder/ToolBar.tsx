"use client";

import { Button } from "@/components/ui/button";
import { Save, Download, ExternalLink } from "lucide-react";

interface ToolBarProps {
  onSave: () => void;
  onExport: () => void;
  onPreview: () => void;
  isSaving?: boolean;
  hasChanges?: boolean;
}

export function ToolBar({
  onSave,
  onExport,
  onPreview,
  isSaving = false,
  hasChanges = false,
}: ToolBarProps) {
  return (
    <div className="flex items-center gap-2 border-b px-4 py-2 bg-background">
      <Button onClick={onSave} disabled={isSaving || !hasChanges} size="sm">
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? "Saving..." : "Save"}
      </Button>
      <Button variant="outline" onClick={onPreview} size="sm">
        <ExternalLink className="h-4 w-4 mr-2" />
        Preview
      </Button>
      <Button variant="outline" onClick={onExport} size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export PDF
      </Button>
    </div>
  );
}
