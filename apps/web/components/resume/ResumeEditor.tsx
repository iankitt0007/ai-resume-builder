"use client";

import { useCallback } from "react";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SectionPanel } from "@/components/builder/SectionPanel";
import { PreviewPanel } from "@/components/builder/PreviewPanel";
import { ToolBar } from "@/components/builder/ToolBar";
import { useResumeStore } from "@/lib/stores/resumeStore";
import type { ResumeContent } from "@resume-builder/shared-types";

const SECTION_ORDER_KEY = "sectionOrder";

const DEFAULT_SECTION_ORDER = [
  "personal",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "languages",
  "custom_sections",
];

export function ResumeEditor() {
  const { content, setContent, customization, setCustomization } =
    useResumeStore();

  const sectionOrder =
    (customization?.[SECTION_ORDER_KEY] as string[]) || DEFAULT_SECTION_ORDER;

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = sectionOrder.indexOf(String(active.id));
      const newIndex = sectionOrder.indexOf(String(over.id));
      if (oldIndex === -1 || newIndex === -1) return;

      const newOrder = [...sectionOrder];
      const [removed] = newOrder.splice(oldIndex, 1);
      newOrder.splice(newIndex, 0, removed);
      setCustomization({ ...customization, [SECTION_ORDER_KEY]: newOrder });
    },
    [sectionOrder, customization, setCustomization]
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <ToolBar />
      <div className="flex flex-1 overflow-hidden">
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
          <SortableContext
            items={sectionOrder}
            strategy={verticalListSortingStrategy}
          >
            <SectionPanel
              content={content}
              onContentChange={setContent}
              sectionOrder={sectionOrder}
              customization={customization}
              onCustomizationChange={setCustomization}
            />
            <PreviewPanel content={content} customization={customization} />
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}
