import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import type { UxMethodOption } from "@/lib/ux-method-options";

interface MethodSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle: string;
  methods: UxMethodOption[];
  onSelect: (method: UxMethodOption) => void;
  accentColor?: string;
}

export function MethodSelectorModal({
  open,
  onOpenChange,
  title,
  subtitle,
  methods,
  onSelect,
}: MethodSelectorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            {title}
          </DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-2 mt-2">
          {methods.map((method) => (
            <div
              key={method.label}
              className="flex items-start gap-3 p-3 rounded-lg border border-border/60 cursor-pointer transition-colors hover:bg-muted/50"
              onClick={() => onSelect(method)}
              data-testid={`method-option-${method.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Badge variant="outline" className="mt-0.5 shrink-0 text-[10px] px-1.5 py-0 h-[18px] text-primary border-primary/30">
                AI
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{method.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
