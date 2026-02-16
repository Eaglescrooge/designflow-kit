import { useState, useCallback, useRef } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DndContext,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  type DragOverEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowLeft,
  Plus,
  MoreHorizontal,
  Trash2,
  Pencil,
  GripVertical,
  Sparkles,
  Mic,
  MicOff,
  LayoutTemplate,
  Loader2,
  Check,
  Copy,
  Columns3,
} from "lucide-react";
import {
  type SprintBoard as SprintBoardType,
  type SprintLane,
  type SprintCard,
  type SprintTemplate,
  loadBoard,
  saveBoard,
  createEmptyBoard,
  createCard,
  generateId,
  sprintTemplates,
  applyTemplate,
} from "@/lib/sprint-board-data";

const PRIORITY_DOT: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-amber-400",
  low: "bg-emerald-500",
};

function SortableCard({
  card,
  onEdit,
  onDelete,
  onAiSuggest,
  onVoice,
}: {
  card: SprintCard;
  onEdit: (card: SprintCard) => void;
  onDelete: (cardId: string) => void;
  onAiSuggest: (card: SprintCard) => void;
  onVoice: (card: SprintCard) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
    data: { type: "card", card },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        className="mb-1.5 p-3 rounded-md bg-background border border-border/60 group cursor-grab active:cursor-grabbing"
        {...listeners}
        data-testid={`card-task-${card.id}`}
      >
        <p className="text-sm font-medium leading-snug" data-testid={`text-card-title-${card.id}`}>{card.title}</p>
        {card.description && (
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{card.description}</p>
        )}
        <div className="flex items-center justify-between gap-2 mt-2">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${PRIORITY_DOT[card.priority]}`} />
            <span className="text-[11px] text-muted-foreground capitalize">{card.priority}</span>
            {card.owner && (
              <>
                <span className="text-muted-foreground/40 text-[11px]">·</span>
                <span className="text-[11px] text-muted-foreground truncate max-w-[80px]" data-testid={`text-owner-${card.id}`}>{card.owner}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-0.5 invisible group-hover:visible flex-shrink-0">
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onAiSuggest(card); }} data-testid={`button-ai-suggest-${card.id}`}>
              <Sparkles className="w-3 h-3 text-amber-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onVoice(card); }} data-testid={`button-voice-${card.id}`}>
              <Mic className="w-3 h-3 text-blue-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onEdit(card); }} data-testid={`button-edit-card-${card.id}`}>
              <Pencil className="w-3 h-3" />
            </Button>
            <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); onDelete(card.id); }} data-testid={`button-delete-card-${card.id}`}>
              <Trash2 className="w-3 h-3 text-destructive" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SortableLane({
  lane,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onRenameLane,
  onDeleteLane,
  onDuplicateLane,
  onAiSuggest,
  onVoice,
}: {
  lane: SprintLane;
  onAddCard: (laneId: string) => void;
  onEditCard: (card: SprintCard) => void;
  onDeleteCard: (cardId: string) => void;
  onRenameLane: (laneId: string) => void;
  onDeleteLane: (laneId: string) => void;
  onDuplicateLane: (laneId: string) => void;
  onAiSuggest: (card: SprintCard) => void;
  onVoice: (card: SprintCard) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: lane.id,
    data: { type: "lane", lane },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex-shrink-0 w-[280px]"
      data-testid={`lane-${lane.id}`}
    >
      <div className="rounded-lg h-full flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div {...listeners} className="cursor-grab text-muted-foreground/50">
              <GripVertical className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground truncate" data-testid={`text-lane-title-${lane.id}`}>{lane.title}</h3>
            <span className="text-[10px] text-muted-foreground/60 tabular-nums">{lane.cards.length}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" data-testid={`button-lane-menu-${lane.id}`}>
                <MoreHorizontal className="w-3.5 h-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onRenameLane(lane.id)} data-testid={`menu-rename-lane-${lane.id}`}>
                <Pencil className="w-3.5 h-3.5 mr-2" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicateLane(lane.id)} data-testid={`menu-duplicate-lane-${lane.id}`}>
                <Copy className="w-3.5 h-3.5 mr-2" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteLane(lane.id)} className="text-destructive" data-testid={`menu-delete-lane-${lane.id}`}>
                <Trash2 className="w-3.5 h-3.5 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 min-h-[80px]">
          <SortableContext items={lane.cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
            {lane.cards.map((card) => (
              <SortableCard
                key={card.id}
                card={card}
                onEdit={onEditCard}
                onDelete={onDeleteCard}
                onAiSuggest={onAiSuggest}
                onVoice={onVoice}
              />
            ))}
          </SortableContext>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onAddCard(lane.id)}
          className="w-full mt-1 text-muted-foreground/60"
          data-testid={`button-add-card-${lane.id}`}
        >
          <Plus className="w-3 h-3 mr-1" /> Add
        </Button>
      </div>
    </div>
  );
}

export default function SprintBoardPage() {
  const [board, setBoard] = useState<SprintBoardType>(() => loadBoard() || createEmptyBoard());
  const boardRef = useRef(board);
  boardRef.current = board;

  const [editCardDialog, setEditCardDialog] = useState(false);
  const [editingCard, setEditingCard] = useState<SprintCard | null>(null);
  const [renameLaneDialog, setRenameLaneDialog] = useState(false);
  const [renamingLaneId, setRenamingLaneId] = useState<string | null>(null);
  const [renameLaneValue, setRenameLaneValue] = useState("");
  const [templateDialog, setTemplateDialog] = useState(false);
  const [aiDialog, setAiDialog] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTargetCard, setAiTargetCard] = useState<SprintCard | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [boardNameEditing, setBoardNameEditing] = useState(false);
  const [boardNameValue, setBoardNameValue] = useState(board.name);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const persist = useCallback((updatedBoard: SprintBoardType) => {
    setBoard(updatedBoard);
    saveBoard(updatedBoard);
  }, []);

  const persistFn = useCallback((updater: (prev: SprintBoardType) => SprintBoardType) => {
    setBoard((prev) => {
      const updated = updater(prev);
      saveBoard(updated);
      return updated;
    });
  }, []);

  const addLane = () => {
    persistFn((prev) => ({
      ...prev,
      lanes: [...prev.lanes, {
        id: generateId(),
        title: `Lane ${prev.lanes.length + 1}`,
        phaseType: "general",
        order: prev.lanes.length,
        cards: [],
      }],
    }));
  };

  const renameLane = (laneId: string) => {
    const lane = board.lanes.find((l) => l.id === laneId);
    if (lane) {
      setRenamingLaneId(laneId);
      setRenameLaneValue(lane.title);
      setRenameLaneDialog(true);
    }
  };

  const confirmRenameLane = () => {
    if (!renamingLaneId) return;
    persistFn((prev) => ({
      ...prev,
      lanes: prev.lanes.map((l) => (l.id === renamingLaneId ? { ...l, title: renameLaneValue } : l)),
    }));
    setRenameLaneDialog(false);
  };

  const deleteLane = (laneId: string) => {
    persistFn((prev) => ({ ...prev, lanes: prev.lanes.filter((l) => l.id !== laneId) }));
  };

  const duplicateLane = (laneId: string) => {
    persistFn((prev) => {
      const lane = prev.lanes.find((l) => l.id === laneId);
      if (!lane) return prev;
      const newLane: SprintLane = {
        ...JSON.parse(JSON.stringify(lane)),
        id: generateId(),
        title: `${lane.title} (Copy)`,
        order: prev.lanes.length,
        cards: lane.cards.map((c: SprintCard) => ({ ...c, id: generateId() })),
      };
      return { ...prev, lanes: [...prev.lanes, newLane] };
    });
  };

  const addCard = (laneId: string) => {
    const card = createCard();
    persistFn((prev) => ({
      ...prev,
      lanes: prev.lanes.map((l) =>
        l.id === laneId ? { ...l, cards: [...l.cards, { ...card, order: l.cards.length }] } : l
      ),
    }));
    setEditingCard(card);
    setEditCardDialog(true);
  };

  const openEditCard = (card: SprintCard) => {
    setEditingCard({ ...card });
    setEditCardDialog(true);
  };

  const saveEditCard = () => {
    if (!editingCard) return;
    persistFn((prev) => ({
      ...prev,
      lanes: prev.lanes.map((l) => ({
        ...l,
        cards: l.cards.map((c) => (c.id === editingCard.id ? editingCard : c)),
      })),
    }));
    setEditCardDialog(false);
  };

  const deleteCard = (cardId: string) => {
    persistFn((prev) => ({
      ...prev,
      lanes: prev.lanes.map((l) => ({ ...l, cards: l.cards.filter((c) => c.id !== cardId) })),
    }));
  };

  const handleAiSuggest = async (card: SprintCard) => {
    setAiTargetCard(card);
    setAiSuggestions([]);
    setAiLoading(true);
    setAiDialog(true);

    const currentBoard = boardRef.current;
    const lane = currentBoard.lanes.find((l) => l.cards.some((c) => c.id === card.id));
    const laneContext = lane ? ` This task is in the "${lane.title}" phase.` : "";

    try {
      const response = await fetch("/api/ux-automation/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "workshops",
          messages: [
            {
              role: "user",
              content: `Generate exactly 3 concise user story variations for a task titled "${card.title}".${laneContext} Each story should follow the format "As a [user], I want to [action] so that [benefit]." Return ONLY the 3 stories, one per line, numbered 1-3. No other text.`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("Failed");
      const reader = response.body?.getReader();
      if (!reader) throw new Error("No body");
      const decoder = new TextDecoder();
      let buffer = "";
      let fullText = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.content) fullText += data.content;
          } catch {}
        }
      }

      const suggestions = fullText
        .split("\n")
        .map((s) => s.replace(/^\d+[\.\)]\s*/, "").trim())
        .filter((s) => s.length > 10);
      setAiSuggestions(suggestions.slice(0, 3));
    } catch (error) {
      console.error("AI suggestion error:", error);
      setAiSuggestions(["Failed to generate suggestions. Please try again."]);
    } finally {
      setAiLoading(false);
    }
  };

  const applyAiSuggestion = (suggestion: string) => {
    if (!aiTargetCard) return;
    persistFn((prev) => ({
      ...prev,
      lanes: prev.lanes.map((l) => ({
        ...l,
        cards: l.cards.map((c) => (c.id === aiTargetCard.id ? { ...c, description: suggestion } : c)),
      })),
    }));
    if (editingCard && editingCard.id === aiTargetCard.id) {
      setEditingCard({ ...editingCard, description: suggestion });
    }
    setAiDialog(false);
  };

  const handleVoice = (card: SprintCard) => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser. Try Chrome or Edge.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      persistFn((prev) => ({
        ...prev,
        lanes: prev.lanes.map((l) => ({
          ...l,
          cards: l.cards.map((c) =>
            c.id === card.id
              ? { ...c, description: c.description ? `${c.description}\n${transcript}` : transcript }
              : c
          ),
        })),
      }));
      setEditingCard((prev) => {
        if (prev && prev.id === card.id) {
          return { ...prev, description: prev.description ? `${prev.description}\n${transcript}` : transcript };
        }
        return prev;
      });
    };

    recognition.onerror = () => setIsRecording(false);
    recognition.start();
  };

  const selectTemplate = (template: SprintTemplate) => {
    const newBoard = applyTemplate(template);
    persist(newBoard);
    setBoardNameValue(newBoard.name);
    setTemplateDialog(false);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeType = active.data.current?.type;
    if (activeType !== "card") return;

    setBoard((prev) => {
      const activeContainerId = (() => {
        for (const l of prev.lanes) {
          if (l.cards.some((c) => c.id === active.id)) return l.id;
        }
        return null;
      })();

      const overContainerId = (() => {
        if (prev.lanes.find((l) => l.id === over.id)) return over.id as string;
        for (const l of prev.lanes) {
          if (l.cards.some((c) => c.id === over.id)) return l.id;
        }
        return null;
      })();

      if (!activeContainerId || !overContainerId || activeContainerId === overContainerId) return prev;

      const activeLane = prev.lanes.find((l) => l.id === activeContainerId);
      if (!activeLane) return prev;
      const activeCard = activeLane.cards.find((c) => c.id === active.id);
      if (!activeCard) return prev;

      return {
        ...prev,
        lanes: prev.lanes.map((l) => {
          if (l.id === activeContainerId) {
            return { ...l, cards: l.cards.filter((c) => c.id !== active.id) };
          }
          if (l.id === overContainerId) {
            const overIndex = l.cards.findIndex((c) => c.id === over.id);
            const insertIndex = overIndex >= 0 ? overIndex : l.cards.length;
            const newCards = [...l.cards];
            newCards.splice(insertIndex, 0, activeCard);
            return { ...l, cards: newCards };
          }
          return l;
        }),
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over) {
      setBoard((cur) => { saveBoard(cur); return cur; });
      return;
    }

    const activeType = active.data.current?.type;

    setBoard((currentBoard) => {
      if (activeType === "lane") {
        const oldIndex = currentBoard.lanes.findIndex((l) => l.id === active.id);
        const newIndex = currentBoard.lanes.findIndex((l) => l.id === over.id);
        if (oldIndex !== newIndex) {
          const updated = { ...currentBoard, lanes: arrayMove(currentBoard.lanes, oldIndex, newIndex) };
          saveBoard(updated);
          return updated;
        }
        saveBoard(currentBoard);
        return currentBoard;
      }

      const activeContainer = (() => {
        for (const l of currentBoard.lanes) {
          if (l.cards.some((c) => c.id === active.id)) return l.id;
        }
        return null;
      })();

      const overContainer = (() => {
        if (currentBoard.lanes.find((l) => l.id === over.id)) return over.id as string;
        for (const l of currentBoard.lanes) {
          if (l.cards.some((c) => c.id === over.id)) return l.id;
        }
        return null;
      })();

      if (!activeContainer || !overContainer) {
        saveBoard(currentBoard);
        return currentBoard;
      }

      if (activeContainer === overContainer) {
        const lane = currentBoard.lanes.find((l) => l.id === activeContainer);
        if (!lane) { saveBoard(currentBoard); return currentBoard; }
        const oldIndex = lane.cards.findIndex((c) => c.id === active.id);
        const newIndex = lane.cards.findIndex((c) => c.id === over.id);
        if (oldIndex !== newIndex) {
          const updated = {
            ...currentBoard,
            lanes: currentBoard.lanes.map((l) =>
              l.id === activeContainer ? { ...l, cards: arrayMove(l.cards, oldIndex, newIndex) } : l
            ),
          };
          saveBoard(updated);
          return updated;
        }
      }

      saveBoard(currentBoard);
      return currentBoard;
    });
  };

  const saveBoardName = () => {
    persist({ ...board, name: boardNameValue });
    setBoardNameEditing(false);
  };

  const activeCard = activeId
    ? board.lanes.flatMap((l) => l.cards).find((c) => c.id === activeId)
    : null;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background border-b border-border/50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-14">
            <div className="flex items-center gap-3 min-w-0">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back-home">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              {boardNameEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={boardNameValue}
                    onChange={(e) => setBoardNameValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveBoardName(); if (e.key === "Escape") setBoardNameEditing(false); }}
                    className="w-52 h-8 text-sm"
                    autoFocus
                    data-testid="input-board-name"
                  />
                  <Button size="icon" variant="ghost" onClick={saveBoardName} data-testid="button-save-board-name">
                    <Check className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ) : (
                <h1
                  className="text-sm font-semibold cursor-pointer truncate"
                  onClick={() => { setBoardNameEditing(true); setBoardNameValue(board.name); }}
                  data-testid="text-board-name"
                >
                  {board.name}
                </h1>
              )}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {isRecording && (
                <Badge variant="destructive" className="animate-pulse gap-1" data-testid="badge-recording">
                  <MicOff className="w-3 h-3" /> Recording
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={() => setTemplateDialog(true)} data-testid="button-templates">
                <LayoutTemplate className="w-3.5 h-3.5 mr-1.5" /> Templates
              </Button>
              <Button size="sm" onClick={addLane} data-testid="button-add-lane">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> Lane
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto px-4 sm:px-6 lg:px-8 py-5">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={board.lanes.map((l) => l.id)} strategy={horizontalListSortingStrategy}>
            <div className="flex gap-5 items-start min-h-[calc(100vh-7rem)]">
              {board.lanes.map((lane) => (
                <SortableLane
                  key={lane.id}
                  lane={lane}
                  onAddCard={addCard}
                  onEditCard={openEditCard}
                  onDeleteCard={deleteCard}
                  onRenameLane={renameLane}
                  onDeleteLane={deleteLane}
                  onDuplicateLane={duplicateLane}
                  onAiSuggest={handleAiSuggest}
                  onVoice={handleVoice}
                />
              ))}
              {board.lanes.length === 0 && (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-24">
                  <Columns3 className="w-10 h-10 text-muted-foreground/30 mb-4" />
                  <h2 className="text-base font-semibold mb-1">Start your sprint</h2>
                  <p className="text-sm text-muted-foreground mb-5 max-w-xs">Add lanes to organize your workflow, or pick a template to get started quickly.</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setTemplateDialog(true)} data-testid="button-templates-empty">
                      <LayoutTemplate className="w-3.5 h-3.5 mr-1.5" /> Template
                    </Button>
                    <Button size="sm" onClick={addLane} data-testid="button-add-lane-empty">
                      <Plus className="w-3.5 h-3.5 mr-1.5" /> Add Lane
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SortableContext>
          <DragOverlay>
            {activeCard ? (
              <div className="p-3 rounded-md bg-background border border-border shadow-lg w-[260px] opacity-90">
                <p className="text-sm font-medium">{activeCard.title}</p>
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      <Dialog open={editCardDialog} onOpenChange={setEditCardDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Edit Task</DialogTitle>
            <DialogDescription>Update the task details</DialogDescription>
          </DialogHeader>
          {editingCard && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Title</label>
                <Input
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  data-testid="input-card-title"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-medium text-muted-foreground">Description</label>
                  <div className="flex gap-0.5">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAiSuggest(editingCard)}
                      data-testid="button-ai-suggest-dialog"
                    >
                      <Sparkles className="w-3 h-3 mr-1" /> AI
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVoice(editingCard)}
                      data-testid="button-voice-dialog"
                    >
                      <Mic className="w-3 h-3 mr-1" /> Voice
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={editingCard.description}
                  onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  rows={3}
                  placeholder="Describe this task..."
                  data-testid="input-card-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Priority</label>
                  <Select
                    value={editingCard.priority}
                    onValueChange={(val) => setEditingCard({ ...editingCard, priority: val as any })}
                  >
                    <SelectTrigger data-testid="select-priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Owner</label>
                  <Input
                    value={editingCard.owner}
                    onChange={(e) => setEditingCard({ ...editingCard, owner: e.target.value })}
                    placeholder="Assign to..."
                    data-testid="input-card-owner"
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setEditCardDialog(false)} data-testid="button-cancel-edit">Cancel</Button>
            <Button size="sm" onClick={saveEditCard} data-testid="button-save-card">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={renameLaneDialog} onOpenChange={setRenameLaneDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Rename Lane</DialogTitle>
            <DialogDescription>Enter a new name for this lane</DialogDescription>
          </DialogHeader>
          <Input
            value={renameLaneValue}
            onChange={(e) => setRenameLaneValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") confirmRenameLane(); }}
            autoFocus
            data-testid="input-rename-lane"
          />
          <DialogFooter>
            <Button variant="ghost" size="sm" onClick={() => setRenameLaneDialog(false)}>Cancel</Button>
            <Button size="sm" onClick={confirmRenameLane} data-testid="button-confirm-rename">Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={templateDialog} onOpenChange={setTemplateDialog}>
        <DialogContent className="max-w-xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-base">Sprint Templates</DialogTitle>
            <DialogDescription>Choose a template to set up your board. This replaces existing lanes.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sprintTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-md border border-border/60 hover-elevate cursor-pointer"
                onClick={() => selectTemplate(template)}
                data-testid={`card-template-${template.id}`}
              >
                <h3 className="text-sm font-semibold mb-1">{template.name}</h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{template.description}</p>
                <div className="flex flex-wrap gap-1">
                  {template.lanes.map((lane, i) => (
                    <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{lane.title}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={aiDialog} onOpenChange={setAiDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" /> AI Suggestions
            </DialogTitle>
            <DialogDescription>
              {aiTargetCard ? `For "${aiTargetCard.title}"` : "Generating..."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            {aiLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                <span className="ml-2 text-sm text-muted-foreground">Generating...</span>
              </div>
            ) : (
              aiSuggestions.map((suggestion, i) => (
                <div
                  key={i}
                  className="p-3 rounded-md border border-border/60 hover-elevate cursor-pointer"
                  onClick={() => applyAiSuggestion(suggestion)}
                  data-testid={`card-ai-suggestion-${i}`}
                >
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
