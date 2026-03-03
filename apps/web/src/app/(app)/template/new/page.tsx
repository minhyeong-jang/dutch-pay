"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CheckIcon, ChevronLeftIcon, XIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "~/lib/utils";
import { TAG_COLORS } from "~/lib/constants";
import { useTRPC } from "~/trpc/react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

// ─── Constants ────────────────────────────────────────

const SUGGESTION_CHIPS = ["회식", "여행", "MT", "생일", "동호회"] as const;
const MIN_PARTICIPANTS = 2;

// ─── Step Indicator ───────────────────────────────────

function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const labels = ["모임", "참가자", "완료"];

  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {Array.from({ length: total }, (_, i) => {
        const stepNum = i + 1;
        const isCompleted = stepNum < current;
        const isActive = stepNum === current;

        return (
          <div key={stepNum} className="flex items-center gap-2">
            {i > 0 && (
              <div
                className={cn(
                  "h-0.5 w-8 rounded-full transition-colors duration-300",
                  isCompleted || isActive ? "bg-primary" : "bg-border",
                )}
              />
            )}
            <div className="flex flex-col items-center gap-1">
              <div
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-xs font-medium transition-all duration-300",
                  isCompleted && "bg-primary text-primary-foreground",
                  isActive &&
                    "bg-primary text-primary-foreground ring-4 ring-primary/20",
                  !isCompleted &&
                    !isActive &&
                    "border border-border text-muted-foreground",
                )}
              >
                {isCompleted ? (
                  <CheckIcon className="size-3.5" />
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={cn(
                  "text-xs transition-colors duration-300",
                  isActive
                    ? "font-medium text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {labels[i]}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Participant Tag ──────────────────────────────────

interface TempParticipant {
  name: string;
  tagColor: string;
}

function ParticipantTag({
  participant,
  onRemove,
}: {
  participant: TempParticipant;
  onRemove: () => void;
}) {
  return (
    <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-background py-1 pr-1.5 pl-2.5 text-sm">
      <span
        className="size-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: participant.tagColor }}
      />
      <span className="whitespace-nowrap">{participant.name}</span>
      <button
        type="button"
        onClick={onRemove}
        className="-mr-0.5 rounded-full p-0.5 text-muted-foreground transition-colors hover:text-foreground"
        aria-label={`${participant.name} 삭제`}
      >
        <XIcon className="size-3" />
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────

export default function NewTemplatePage() {
  const router = useRouter();
  const trpc = useTRPC();
  const createMutation = useMutation(trpc.template.create.mutationOptions());
  const addParticipantMutation = useMutation(trpc.participant.create.mutationOptions());

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [participants, setParticipants] = useState<TempParticipant[]>([]);
  const [participantInput, setParticipantInput] = useState("");
  const [nameError, setNameError] = useState("");
  const [participantError, setParticipantError] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const participantInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // ─── Step 1: Name ──────────────────────────────────

  const isNameValid = name.trim().length > 0;

  function handleSuggestionChip(label: string) {
    setName(label);
    setNameError("");
  }

  function goToStep2() {
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError("모임 이름을 입력해 주세요");
      nameInputRef.current?.focus();
      return;
    }
    setNameError("");
    setStep(2);
    // Focus participant input after transition
    setTimeout(() => participantInputRef.current?.focus(), 100);
  }

  // ─── Step 2: Participants ──────────────────────────

  const addParticipantLocal = useCallback(() => {
    const trimmed = participantInput.trim();
    if (!trimmed) {
      setParticipantError("이름을 입력해 주세요");
      participantInputRef.current?.focus();
      return;
    }
    if (participants.some((p) => p.name === trimmed)) {
      toast.error("이미 같은 이름이 있어요");
      participantInputRef.current?.focus();
      return;
    }

    const colorIndex = participants.length % TAG_COLORS.length;
    const tagColor = TAG_COLORS[colorIndex] ?? "#0D9488";
    setParticipants((prev) => [
      ...prev,
      { name: trimmed, tagColor },
    ]);
    setParticipantInput("");
    setParticipantError("");
    participantInputRef.current?.focus();
  }, [participantInput, participants]);

  function removeParticipantLocal(index: number) {
    setParticipants((prev) => prev.filter((_, i) => i !== index));
  }

  function goToStep3() {
    if (participants.length < MIN_PARTICIPANTS) {
      setParticipantError(`최소 ${MIN_PARTICIPANTS}명이 필요해요`);
      participantInputRef.current?.focus();
      return;
    }
    setParticipantError("");
    setStep(3);
  }

  // ─── Step 3: Confirm & Create ──────────────────────

  async function handleCreate(redirectTo: "template" | "dashboard") {
    if (isCreating) return;
    setIsCreating(true);

    try {
      const [template] = await createMutation.mutateAsync({ name: name.trim() });

      if (template) {
        for (const p of participants) {
          await addParticipantMutation.mutateAsync({
            templateId: template.id,
            name: p.name,
            tagColor: p.tagColor,
          });
        }

        if (redirectTo === "dashboard") {
          router.push("/dashboard");
        } else {
          router.push(`/template/${template.id}`);
        }
      }
    } catch {
      toast.error("모임 생성에 실패했어요");
      setIsCreating(false);
    }
  }

  // ─── Back button ───────────────────────────────────

  function goBack() {
    if (step === 1) {
      router.back();
    } else {
      setStep((prev) => prev - 1);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-lg flex-col px-4 py-4">
      {/* Header */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={goBack}
          className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeftIcon className="size-4" />
          뒤로
        </button>
      </div>

      {/* Step Indicator */}
      <StepIndicator current={step} total={3} />

      {/* Step Content */}
      <div className="flex flex-1 flex-col">
        {/* ─── Step 1: 모임 이름 ─── */}
        {step === 1 && (
          <div className="flex flex-1 flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold">어떤 모임인가요?</h1>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="template-name">모임 이름</Label>
              <Input
                ref={nameInputRef}
                id="template-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    goToStep2();
                  }
                }}
                placeholder="예: 부산 여행"
                className="text-lg"
                autoFocus
                aria-invalid={!!nameError}
              />
              {nameError && (
                <p className="text-sm text-destructive">{nameError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">빠른 선택</span>
              <div className="flex flex-wrap gap-2">
                {SUGGESTION_CHIPS.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    onClick={() => handleSuggestionChip(chip)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm transition-colors",
                      name === chip
                        ? "border-primary bg-primary/10 font-medium text-primary"
                        : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                    )}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Sticky bottom button */}
            <div className="mt-auto pb-4 pt-8">
              <Button
                className="w-full"
                onClick={goToStep2}
                disabled={!isNameValid}
              >
                다음
              </Button>
            </div>
          </div>
        )}

        {/* ─── Step 2: 참가자 추가 ─── */}
        {step === 2 && (
          <div className="flex flex-1 flex-col gap-6">
            <div>
              <h1 className="text-2xl font-bold">누가 참여하나요?</h1>
            </div>

            {/* Input row */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="participant-name">참가자 이름</Label>
              <div className="flex items-center gap-2">
                <Input
                  ref={participantInputRef}
                  id="participant-name"
                  value={participantInput}
                  onChange={(e) => {
                    setParticipantInput(e.target.value);
                    if (participantError) setParticipantError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addParticipantLocal();
                    }
                  }}
                  placeholder="이름 입력"
                  autoFocus
                  aria-invalid={!!participantError}
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addParticipantLocal}
                  className="shrink-0"
                >
                  추가
                </Button>
              </div>
              {participantError && (
                <p className="text-sm text-destructive">{participantError}</p>
              )}
            </div>

            {/* Participant tags */}
            {participants.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {participants.map((p, i) => (
                  <ParticipantTag
                    key={p.name}
                    participant={p}
                    onRemove={() => removeParticipantLocal(i)}
                  />
                ))}
              </div>
            )}

            {participants.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-8 text-center">
                <p className="text-muted-foreground">
                  참가자를 추가해 주세요
                </p>
              </div>
            )}

            <p className="text-sm text-muted-foreground">
              나중에 추가할 수도 있어요
            </p>

            {/* Sticky bottom button */}
            <div className="mt-auto pb-4 pt-8">
              <Button
                className="w-full"
                onClick={goToStep3}
                disabled={participants.length < MIN_PARTICIPANTS}
              >
                다음
              </Button>
            </div>
          </div>
        )}

        {/* ─── Step 3: 확인 및 생성 ─── */}
        {step === 3 && (
          <div className="flex flex-1 flex-col items-center gap-6 pt-8">
            {/* Animated checkmark */}
            <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
              <CheckIcon className="size-8 text-primary" />
            </div>

            <div className="text-center">
              <h2 className="text-xl font-bold">{name.trim()}</h2>
              <p className="mt-1 text-muted-foreground">
                {participants.length}명 참여
              </p>
            </div>

            {/* Participant preview */}
            <div className="flex flex-wrap justify-center gap-2">
              {participants.map((p) => (
                <span
                  key={p.name}
                  className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-sm"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: p.tagColor }}
                  />
                  {p.name}
                </span>
              ))}
            </div>

            <p className="text-muted-foreground">
              이제 결제 내역을 추가해 보세요
            </p>

            {/* Action buttons */}
            <div className="mt-auto flex w-full flex-col gap-3 pb-4 pt-8">
              <Button
                className="w-full"
                onClick={() => handleCreate("template")}
                disabled={isCreating}
              >
                {isCreating ? "생성 중..." : "결제 추가하기"}
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => handleCreate("dashboard")}
                disabled={isCreating}
              >
                대시보드로 돌아가기
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
