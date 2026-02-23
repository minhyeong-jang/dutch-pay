"use client";

import { useRef, useState } from "react";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

interface AddParticipantFormProps {
  onAdd: (name: string) => void;
}

export function AddParticipantForm({ onAdd }: AddParticipantFormProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit() {
    const trimmed = name.trim();

    if (!trimmed) {
      setError("이름을 입력해 주세요");
      inputRef.current?.focus();
      return;
    }

    const result = onAdd(trimmed);

    // onAdd가 undefined를 반환하면 중복이거나 실패
    if (result === undefined) {
      toast.error("이미 같은 이름이 있어요");
      inputRef.current?.focus();
      return;
    }

    setName("");
    setError("");
    inputRef.current?.focus();
  }

  return (
    <div className="flex shrink-0 items-center gap-1">
      <div className="flex flex-col">
        <Input
          ref={inputRef}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="이름"
          className="h-8 w-20 text-sm"
          aria-invalid={!!error}
        />
        {error && (
          <p className="text-destructive mt-0.5 text-xs">{error}</p>
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleSubmit}
        className="h-8 shrink-0"
      >
        <PlusIcon className="size-3.5" />
        추가
      </Button>
    </div>
  );
}
