import { useState, useEffect, useCallback } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  MoreVertical,
  Trash2,
  Edit3,
  GripVertical,
  Sparkles,
  Mic,
  MicOff,
  LayoutTemplate,
  Users,
  User,
  Vote,
  Loader2,
  Check,
  Copy,
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

const PHASE_ICONS: Record<string, typeof User> = {
  individual: User,
  team: Users,
  voting: Vote,
  general: GripVertical,
};

const PRIORITY_COLORS: Record<string, string> = {
  high: "bg-red-500/10 text-red-600 dark:text-red-400",
  medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  low: "bg-green-500/10 text-green-600 dark:text-green-400",
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
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <Card className="mb-2 group" data-testid={`card-task-${card.id}`}>
        <CardContent className="p-3">
          <div className="flex items-start gap-2">
            <div {...listeners} className="cursor-grab mt-1 text-muted-foreground">
              <GripVertical className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <h4 className="font-medium text-sm truncate" data-testid={`text-card-title-${card.id}`}>{card.title}</h4>
                <div className="flex items-center gap-0.5 invisible group-hover:visible">
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onAiSuggest(card)} data-testid={`button-ai-suggest-${card.id}`}>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onVoice(card)} data-testid={`button-voice-${card.id}`}>
                    <Mic className="w-3.5 h-3.5 text-blue-500" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onEdit(card)} data-testid={`button-edit-card-${card.id}`}>
                    <Edit3 className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onDelete(card.id)} data-testid={`button-delete-card-${card.id}`}>
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
              {card.description && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{card.description}</p>
              )}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className={`text-[10px] ${PRIORITY_COLORS[card.priority]}`} data-testid={`badge-priority-${card.id}`}>
                  {card.priority}
                </Badge>
                {card.owner && (
                  <span className="text-[10px] text-muted-foreground truncate max-w-[100px]" data-testid={`text-owner-${card.id}`}>{card.owner}</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
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
    opacity: isDragging ? 0.5 : 1,
  };

  const PhaseIcon = PHASE_ICONS[lane.phaseType] || GripVertical;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="flex-shrink-0 w-72"
      data-testid={`lane-${lane.id}`}
    >
      <div className="bg-muted/50 rounded-lg p-3 h-full flex flex-col">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div {...listeners} className="cursor-grab text-muted-foreground">
              <GripVertical className="w-4 h-4" />
            </div>
            <PhaseIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <h3 className="font-semibold text-sm truncate" data-testid={`text-lane-title-${lane.id}`}>{lane.title}</h3>
            <Badge variant="secondary" className="text-[10px] flex-shrink-0">{lane.cards.length}</Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7 flex-shrink-0" data-testid={`button-lane-menu-${lane.id}`}>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onRenameLane(lane.id)} data-testid={`menu-rename-lane-${lane.id}`}>
                <Edit3 className="w-4 h-4 mr-2" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicateLane(lane.id)} data-testid={`menu-duplicate-lane-${lane.id}`}>
                <Copy className="w-4 h-4 mr-2" /> Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDeleteLane(lane.id)} className="text-destructive" data-testid={`menu-delete-lane-${lane.id}`}>
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex-1 min-h-[100px]">
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

        <Button variant="ghost" className="w-full mt-2 justify-start text-muted-foreground" onClick={() => onAddCard(lane.id)} data-testid={`button-add-card-${lane.id}`}>
          <Plus className="w-4 h-4 mr-2" /> Add Task
        </Button>
      </div>
    </div>
  );
}

export default function SprintBoardPage() {
  const [board, setBoard] = useState<SprintBoardType>(() => loadBoard() || createEmptyBoard());
  const [editCardDialog, setEditCardDialog] = useState(false);
  const [editingCard, setEditingCard] = useState<SprintCard | null>(null);
  const [editingCardLaneId, setEditingCardLaneId] = useState<string | null>(null);
  const [renameLaneDialog, setRenameLaneDialog] = useState(false);
  const [renamingLaneId, setRenamingLaneId] = useState<string | null>(null);
  const [renameLaneValue, setRenameLaneValue] = useState("");
  const [templateDialog, setTemplateDialog] = useState(false);
  const [aiDialog, setAiDialog] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiTargetCard, setAiTargetCard] = useState<SprintCard | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTargetCard, setVoiceTargetCard] = useState<SprintCard | null>(null);
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

  const addLane = () => {
    const newLane: SprintLane = {
      id: generateId(),
      title: `Lane ${board.lanes.length + 1}`,
      phaseType: "general",
      order: board.lanes.length,
      cards: [],
    };
    persist({ ...board, lanes: [...board.lanes, newLane] });
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
    persist({
      ...board,
      lanes: board.lanes.map((l) => (l.id === renamingLaneId ? { ...l, title: renameLaneValue } : l)),
    });
    setRenameLaneDialog(false);
  };

  const deleteLane = (laneId: string) => {
    persist({ ...board, lanes: board.lanes.filter((l) => l.id !== laneId) });
  };

  const duplicateLane = (laneId: string) => {
    const lane = board.lanes.find((l) => l.id === laneId);
    if (!lane) return;
    const newLane: SprintLane = {
      ...JSON.parse(JSON.stringify(lane)),
      id: generateId(),
      title: `${lane.title} (Copy)`,
      order: board.lanes.length,
      cards: lane.cards.map((c: SprintCard) => ({ ...c, id: generateId() })),
    };
    persist({ ...board, lanes: [...board.lanes, newLane] });
  };

  const addCard = (laneId: string) => {
    const card = createCard();
    card.order = board.lanes.find((l) => l.id === laneId)?.cards.length || 0;
    persist({
      ...board,
      lanes: board.lanes.map((l) => (l.id === laneId ? { ...l, cards: [...l.cards, card] } : l)),
    });
    setEditingCard(card);
    setEditingCardLaneId(laneId);
    setEditCardDialog(true);
  };

  const openEditCard = (card: SprintCard) => {
    const lane = board.lanes.find((l) => l.cards.some((c) => c.id === card.id));
    setEditingCard({ ...card });
    setEditingCardLaneId(lane?.id || null);
    setEditCardDialog(true);
  };

  const saveEditCard = () => {
    if (!editingCard) return;
    persist({
      ...board,
      lanes: board.lanes.map((l) => ({
        ...l,
        cards: l.cards.map((c) => (c.id === editingCard.id ? editingCard : c)),
      })),
    });
    setEditCardDialog(false);
  };

  const deleteCard = (cardId: string) => {
    persist({
      ...board,
      lanes: board.lanes.map((l) => ({ ...l, cards: l.cards.filter((c) => c.id !== cardId) })),
    });
  };

  const handleAiSuggest = async (card: SprintCard) => {
    setAiTargetCard(card);
    setAiSuggestions([]);
    setAiLoading(true);
    setAiDialog(true);

    const lane = board.lanes.find((l) => l.cards.some((c) => c.id === card.id));
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
    persist({
      ...board,
      lanes: board.lanes.map((l) => ({
        ...l,
        cards: l.cards.map((c) => (c.id === aiTargetCard.id ? { ...c, description: suggestion } : c)),
      })),
    });
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

    setVoiceTargetCard(card);
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      persist({
        ...board,
        lanes: board.lanes.map((l) => ({
          ...l,
          cards: l.cards.map((c) =>
            c.id === card.id ? { ...c, description: c.description ? `${c.description}\n${transcript}` : transcript } : c
          ),
        })),
      });
      if (editingCard && editingCard.id === card.id) {
        setEditingCard({
          ...editingCard,
          description: editingCard.description ? `${editingCard.description}\n${transcript}` : transcript,
        });
      }
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

  const findContainer = (id: string): string | null => {
    const lane = board.lanes.find((l) => l.id === id);
    if (lane) return lane.id;
    for (const l of board.lanes) {
      if (l.cards.some((c) => c.id === id)) return l.id;
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeType = active.data.current?.type;
    if (activeType !== "card") return;

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setBoard((prev) => {
      const activeLane = prev.lanes.find((l) => l.id === activeContainer);
      const overLane = prev.lanes.find((l) => l.id === overContainer);
      if (!activeLane || !overLane) return prev;

      const activeCard = activeLane.cards.find((c) => c.id === active.id);
      if (!activeCard) return prev;

      return {
        ...prev,
        lanes: prev.lanes.map((l) => {
          if (l.id === activeContainer) {
            return { ...l, cards: l.cards.filter((c) => c.id !== active.id) };
          }
          if (l.id === overContainer) {
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
    if (!over) return;

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
        return currentBoard;
      }

      const activeContainer = (() => {
        const lane = currentBoard.lanes.find((l) => l.id === (active.id as string));
        if (lane) return lane.id;
        for (const l of currentBoard.lanes) {
          if (l.cards.some((c) => c.id === active.id)) return l.id;
        }
        return null;
      })();

      const overContainer = (() => {
        const lane = currentBoard.lanes.find((l) => l.id === (over.id as string));
        if (lane) return lane.id;
        for (const l of currentBoard.lanes) {
          if (l.cards.some((c) => c.id === over.id)) return l.id;
        }
        return null;
      })();

      if (!activeContainer || !overContainer) return currentBoard;

      if (activeContainer === overContainer) {
        const lane = currentBoard.lanes.find((l) => l.id === activeContainer);
        if (!lane) return currentBoard;
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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" data-testid="button-back-home">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              {boardNameEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={boardNameValue}
                    onChange={(e) => setBoardNameValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") saveBoardName(); }}
                    className="w-60"
                    autoFocus
                    data-testid="input-board-name"
                  />
                  <Button size="icon" variant="ghost" onClick={saveBoardName}>
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <h1
                  className="font-serif font-bold text-lg cursor-pointer"
                  onClick={() => { setBoardNameEditing(true); setBoardNameValue(board.name); }}
                  data-testid="text-board-name"
                >
                  {board.name}
                </h1>
              )}
            </div>
            <div className="flex items-center gap-2">
              {isRecording && (
                <Badge variant="destructive" className="animate-pulse gap-1">
                  <MicOff className="w-3 h-3" /> Recording...
                </Badge>
              )}
              <Button variant="outline" onClick={() => setTemplateDialog(true)} data-testid="button-templates">
                <LayoutTemplate className="w-4 h-4 mr-2" /> Templates
              </Button>
              <Button onClick={addLane} data-testid="button-add-lane">
                <Plus className="w-4 h-4 mr-2" /> Add Lane
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-x-auto p-4 sm:p-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={board.lanes.map((l) => l.id)} strategy={horizontalListSortingStrategy}>
            <div className="flex gap-4 items-start min-h-[calc(100vh-8rem)]">
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
                <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
                  <LayoutTemplate className="w-16 h-16 text-muted-foreground mb-4" />
                  <h2 className="font-serif text-xl font-bold mb-2">No lanes yet</h2>
                  <p className="text-muted-foreground mb-4">Start by adding a lane or selecting a template</p>
                  <div className="flex gap-3">
                    <Button variant="outline" onClick={() => setTemplateDialog(true)} data-testid="button-templates-empty">
                      <LayoutTemplate className="w-4 h-4 mr-2" /> Use Template
                    </Button>
                    <Button onClick={addLane} data-testid="button-add-lane-empty">
                      <Plus className="w-4 h-4 mr-2" /> Add Lane
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </SortableContext>
          <DragOverlay>{activeId ? <div className="opacity-70 bg-card rounded-lg shadow-lg p-4 w-60">Moving...</div> : null}</DragOverlay>
        </DndContext>
      </main>

      <Dialog open={editCardDialog} onOpenChange={setEditCardDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
            <DialogDescription>Update the task details below</DialogDescription>
          </DialogHeader>
          {editingCard && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input
                  value={editingCard.title}
                  onChange={(e) => setEditingCard({ ...editingCard, title: e.target.value })}
                  data-testid="input-card-title"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium">Description</label>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleAiSuggest(editingCard)}
                      data-testid="button-ai-suggest-dialog"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1" /> AI Suggest
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleVoice(editingCard)}
                      data-testid="button-voice-dialog"
                    >
                      <Mic className="w-3.5 h-3.5 text-blue-500 mr-1" /> Voice
                    </Button>
                  </div>
                </div>
                <Textarea
                  value={editingCard.description}
                  onChange={(e) => setEditingCard({ ...editingCard, description: e.target.value })}
                  rows={4}
                  placeholder="Describe this task..."
                  data-testid="input-card-description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Priority</label>
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
                  <label className="text-sm font-medium mb-1 block">Owner</label>
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
            <Button variant="outline" onClick={() => setEditCardDialog(false)}>Cancel</Button>
            <Button onClick={saveEditCard} data-testid="button-save-card">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={renameLaneDialog} onOpenChange={setRenameLaneDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Lane</DialogTitle>
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
            <Button variant="outline" onClick={() => setRenameLaneDialog(false)}>Cancel</Button>
            <Button onClick={confirmRenameLane} data-testid="button-confirm-rename">Rename</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={templateDialog} onOpenChange={setTemplateDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Sprint Templates</DialogTitle>
            <DialogDescription>Select a template to initialize your board. This will replace current lanes.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sprintTemplates.map((template) => (
              <Card
                key={template.id}
                className="hover-elevate cursor-pointer"
                onClick={() => selectTemplate(template)}
                data-testid={`card-template-${template.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <LayoutTemplate className="w-5 h-5 text-primary" />
                    <h3 className="font-semibold text-sm">{template.name}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{template.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {template.lanes.map((lane, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px]">{lane.title}</Badge>
                    ))}
                  </div>
                  <Badge variant="outline" className="mt-2 text-[10px]">{template.category}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={aiDialog} onOpenChange={setAiDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" /> AI Suggestions
            </DialogTitle>
            <DialogDescription>
              {aiTargetCard ? `Suggestions for "${aiTargetCard.title}"` : "Generating..."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            {aiLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Generating suggestions...</span>
              </div>
            ) : (
              aiSuggestions.map((suggestion, i) => (
                <Card
                  key={i}
                  className="hover-elevate cursor-pointer"
                  onClick={() => applyAiSuggestion(suggestion)}
                  data-testid={`card-ai-suggestion-${i}`}
                >
                  <CardContent className="p-3 flex items-start gap-3">
                    <Badge variant="secondary" className="flex-shrink-0 mt-0.5">{i + 1}</Badge>
                    <p className="text-sm">{suggestion}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
