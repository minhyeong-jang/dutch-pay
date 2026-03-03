"use client";

import { XIcon } from "lucide-react";

import type { Participant } from "~/lib/types";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { AddParticipantForm } from "~/components/participant/add-participant-form";

interface ParticipantListProps {
  participants: Participant[];
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
}

export function ParticipantList({
  participants,
  onAdd,
  onRemove,
}: ParticipantListProps) {
  return (
    <ScrollArea className="w-full">
      <div className="flex items-center gap-2 pb-2">
        {participants.map((p) => (
          <div
            key={p.id}
            className="border-border bg-background flex shrink-0 items-center gap-1.5 rounded-full border py-1 pr-1.5 pl-2.5 text-sm"
          >
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: p.tagColor }}
            />
            <span className="whitespace-nowrap">{p.name}</span>
            <button
              type="button"
              onClick={() => onRemove(p.id)}
              className="text-muted-foreground hover:text-foreground -mr-0.5 rounded-full p-0.5 transition-colors"
              aria-label={`${p.name} 삭제`}
            >
              <XIcon className="size-3" />
            </button>
          </div>
        ))}

        <AddParticipantForm onAdd={onAdd} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
