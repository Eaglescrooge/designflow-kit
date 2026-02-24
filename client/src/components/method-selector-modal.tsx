import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArrowRight } from "lucide-react";
import type { UxMethodOption } from "@/lib/ux-method-options";
import type { LucideIcon } from "lucide-react";

interface MethodSelectorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle: string;
  methods: UxMethodOption[];
  onSelect: (method: UxMethodOption) => void;
  icon?: LucideIcon;
}

export function MethodSelectorModal({
  open,
  onOpenChange,
  title,
  subtitle,
  methods,
  onSelect,
  icon: Icon,
}: MethodSelectorModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-sm">{subtitle}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {methods.map((method) => (
            <div
              key={method.label}
              className="group flex flex-col gap-3 p-5 rounded-xl border border-border/60 cursor-pointer transition-all hover:border-primary/20 hover:shadow-sm"
              onClick={() => onSelect(method)}
              data-testid={`method-option-${method.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {Icon && (
                <Icon className="w-6 h-6 text-muted-foreground/60" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight">{method.label}</p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{method.description}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1 group-hover:text-primary transition-colors">
                  <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  Select
                </span>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
