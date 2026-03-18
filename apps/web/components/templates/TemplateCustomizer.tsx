"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { TemplateCustomization } from "@resume-builder/shared-types";

interface TemplateCustomizerProps {
  customization: TemplateCustomization;
  onChange: (customization: TemplateCustomization) => void;
}

const FONTS = ["Inter", "Georgia", "Roboto", "Open Sans", "Lora"];

export function TemplateCustomizer({ customization, onChange }: TemplateCustomizerProps) {
  const update = (key: keyof TemplateCustomization, value: unknown) => {
    onChange({ ...customization, [key]: value });
  };

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Primary Color</Label>
          <Input
            type="color"
            value={customization.primaryColor || "#2563eb"}
            onChange={(e) => update("primaryColor", e.target.value)}
            className="h-10 w-full p-1 cursor-pointer"
          />
        </div>
        <div>
          <Label>Secondary Color</Label>
          <Input
            type="color"
            value={customization.secondaryColor || "#64748b"}
            onChange={(e) => update("secondaryColor", e.target.value)}
            className="h-10 w-full p-1 cursor-pointer"
          />
        </div>
      </div>
      <div>
        <Label>Font Family</Label>
        <Select
          value={customization.fontFamily || "Inter"}
          onValueChange={(v) => update("fontFamily", v)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FONTS.map((f) => (
              <SelectItem key={f} value={f}>
                {f}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Font Size: {customization.fontSize ?? 14}px</Label>
        <Slider
          value={[customization.fontSize ?? 14]}
          onValueChange={([v]) => update("fontSize", v)}
          min={10}
          max={18}
          step={1}
        />
      </div>
      <div>
        <Label>Section Spacing: {customization.sectionSpacing ?? 16}px</Label>
        <Slider
          value={[customization.sectionSpacing ?? 16]}
          onValueChange={([v]) => update("sectionSpacing", v)}
          min={8}
          max={32}
          step={1}
        />
      </div>
      <div className="flex items-center justify-between">
        <Label>Show Photo</Label>
        <Switch
          checked={customization.showPhoto ?? false}
          onCheckedChange={(v) => update("showPhoto", v)}
        />
      </div>
    </div>
  );
}
