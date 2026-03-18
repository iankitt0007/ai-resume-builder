"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { apiClient } from "@/lib/api-client";
import toast from "react-hot-toast";

interface ExportButtonProps {
  resumeId: string;
  disabled?: boolean;
}

export function ExportButton({ resumeId, disabled }: ExportButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    try {
      const res = await apiClient.exportResume(resumeId, "pdf");
      if (res?.url) {
        window.open(res.url, "_blank");
        toast.success("Export ready! Opening download...");
      } else {
        toast.error("Export failed. Try again.");
      }
    } catch {
      toast.error("Export failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={disabled || loading}
      variant="outline"
      size="sm"
    >
      <Download className="mr-2 h-4 w-4" />
      {loading ? "Exporting..." : "Export PDF"}
    </Button>
  );
}
