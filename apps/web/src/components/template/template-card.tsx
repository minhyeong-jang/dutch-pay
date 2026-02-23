"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";

import type { LocalTemplate } from "~/lib/store";
import { formatKRW } from "~/lib/format";
import { formatRelativeDate } from "~/lib/format";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";

interface TemplateCardProps {
  template: LocalTemplate;
  onDelete: (id: string) => void;
}

export function TemplateCard({ template, onDelete }: TemplateCardProps) {
  const totalAmount = template.payments.reduce((sum, p) => sum + p.amount, 0);
  const participantCount = template.participants.length;
  const paymentCount = template.payments.length;

  return (
    <Card className="group relative transition-shadow hover:shadow-md">
      <Link
        href={`/template/${template.id}`}
        className="absolute inset-0 z-10"
      >
        <span className="sr-only">{template.name} 상세 보기</span>
      </Link>

      <CardHeader>
        <CardTitle className="text-lg">{template.name}</CardTitle>
        <CardDescription>
          {formatRelativeDate(template.updatedAt)} · {participantCount}명
        </CardDescription>
        <CardAction>
          <Button
            variant="ghost"
            size="icon-xs"
            className="relative z-20 text-muted-foreground opacity-0 transition-opacity hover:text-destructive group-hover:opacity-100"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onDelete(template.id);
            }}
          >
            <Trash2 className="size-3.5" />
            <span className="sr-only">삭제</span>
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="flex items-center justify-between gap-2">
        <span className="text-lg font-semibold tabular-nums">
          {totalAmount > 0 ? formatKRW(totalAmount) : "0원"}
        </span>

        <div className="flex items-center gap-1.5">
          {paymentCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {paymentCount}건
            </Badge>
          )}
        </div>
      </CardContent>

      {participantCount > 0 && (
        <CardContent className="flex items-center gap-1 pt-0">
          {template.participants.slice(0, 6).map((p) => (
            <span
              key={p.id}
              className="size-5 rounded-full"
              style={{ backgroundColor: p.tagColor }}
              title={p.name}
            />
          ))}
          {participantCount > 6 && (
            <span className="text-xs text-muted-foreground">
              +{participantCount - 6}
            </span>
          )}
        </CardContent>
      )}
    </Card>
  );
}
