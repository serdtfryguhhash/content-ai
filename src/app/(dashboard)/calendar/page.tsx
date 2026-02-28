"use client";

import React, { useState, useMemo } from "react";

import { Calendar as CalendarIcon, Plus, ChevronLeft, ChevronRight, Clock, Sparkles, Trash2, Edit2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import PageHeader from "@/components/shared/PageHeader";
import { useApp } from "@/context/AppContext";
import { PLATFORMS } from "@/lib/constants";
import { getPlatformColor, getPlatformIcon } from "@/lib/utils";
import { Platform, CalendarEntry } from "@/types";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const AI_TIME_SUGGESTIONS: Record<Platform, string> = {
  youtube: "14:00 - 16:00 (Best for YouTube engagement)",
  tiktok: "19:00 - 21:00 (Peak TikTok activity)",
  instagram: "11:00 - 13:00 (Lunch break scrolling)",
  twitter: "08:00 - 09:00 (Morning commute)",
  linkedin: "09:00 - 10:00 (Business hours start)",
  podcast: "05:00 - 07:00 (Morning commute listeners)",
  blog: "10:00 - 11:00 (Mid-morning reading)",
  newsletter: "07:00 - 08:00 (Before work check-in)",
};

export default function CalendarPage() {
  const { calendarEntries, addCalendarEntry, updateCalendarEntry, removeCalendarEntry, addNotification } = useApp();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1)); // March 2026
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingEntry, setEditingEntry] = useState<CalendarEntry | null>(null);
  const [draggedEntry, setDraggedEntry] = useState<string | null>(null);
  const [dragOverDate, setDragOverDate] = useState<string | null>(null);

  // New entry form state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPlatform, setNewPlatform] = useState<Platform>("youtube");
  const [newTime, setNewTime] = useState("12:00");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const days: { date: Date; isCurrentMonth: boolean }[] = [];
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month - 1, daysInPrevMonth - i), isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({ date: new Date(year, month + 1, i), isCurrentMonth: false });
    }
    return days;
  }, [year, month]);

  const getEntriesForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return calendarEntries.filter((e) => e.scheduled_date === dateStr);
  };

  const formatDateStr = (date: Date) => date.toISOString().split("T")[0];

  const handleAddEntry = () => {
    if (!newTitle.trim() || !selectedDate) return;
    const entry: CalendarEntry = {
      id: `cal-${Date.now()}`,
      user_id: "demo-user-1",
      content_package_id: null,
      title: newTitle,
      description: newDescription,
      platform: newPlatform,
      scheduled_date: selectedDate,
      scheduled_time: newTime,
      status: "draft",
      color: getPlatformColor(newPlatform),
      ai_suggested_time: AI_TIME_SUGGESTIONS[newPlatform]?.split(" ")[0] || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    addCalendarEntry(entry);
    setShowAddDialog(false);
    resetForm();
    addNotification({ id: Date.now().toString(), type: "success", title: "Entry Added", message: `"${newTitle}" added to calendar.` });
  };

  const handleUpdateEntry = () => {
    if (!editingEntry || !newTitle.trim()) return;
    updateCalendarEntry(editingEntry.id, {
      title: newTitle,
      description: newDescription,
      platform: newPlatform,
      scheduled_time: newTime,
      color: getPlatformColor(newPlatform),
      updated_at: new Date().toISOString(),
    });
    setEditingEntry(null);
    resetForm();
  };

  const handleDeleteEntry = (id: string) => {
    removeCalendarEntry(id);
    addNotification({ id: Date.now().toString(), type: "info", title: "Entry Removed", message: "Calendar entry has been deleted." });
  };

  const resetForm = () => {
    setNewTitle("");
    setNewDescription("");
    setNewPlatform("youtube");
    setNewTime("12:00");
  };

  const openAddDialog = (dateStr: string) => {
    setSelectedDate(dateStr);
    resetForm();
    setShowAddDialog(true);
  };

  const openEditDialog = (entry: CalendarEntry) => {
    setEditingEntry(entry);
    setNewTitle(entry.title);
    setNewDescription(entry.description);
    setNewPlatform(entry.platform);
    setNewTime(entry.scheduled_time);
  };

  // Drag and drop handlers
  const handleDragStart = (entryId: string) => {
    setDraggedEntry(entryId);
  };

  const handleDragOver = (e: React.DragEvent, dateStr: string) => {
    e.preventDefault();
    setDragOverDate(dateStr);
  };

  const handleDrop = (e: React.DragEvent, dateStr: string) => {
    e.preventDefault();
    if (draggedEntry) {
      updateCalendarEntry(draggedEntry, {
        scheduled_date: dateStr,
        updated_at: new Date().toISOString(),
      });
      addNotification({ id: Date.now().toString(), type: "info", title: "Entry Moved", message: "Calendar entry has been rescheduled." });
    }
    setDraggedEntry(null);
    setDragOverDate(null);
  };

  const handleDragEnd = () => {
    setDraggedEntry(null);
    setDragOverDate(null);
  };

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const today = new Date();

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader icon={CalendarIcon} title="Content Calendar" description="Plan, schedule, and organize your content across all platforms">
        <Button variant="gradient" size="sm" onClick={() => openAddDialog(formatDateStr(today))}>
          <Plus className="w-4 h-4 mr-1" /> New Entry
        </Button>
      </PageHeader>

      {/* Calendar Header */}
      <Card className="mb-6">
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={prevMonth}><ChevronLeft className="w-5 h-5" /></Button>
              <h2 className="font-display text-xl font-bold">{MONTHS[month]} {year}</h2>
              <Button variant="ghost" size="icon" onClick={nextMonth}><ChevronRight className="w-5 h-5" /></Button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="w-3 h-3 text-primary" />
                AI suggests optimal posting times
              </div>
              <div className="hidden md:flex items-center gap-2 ml-4">
                {PLATFORMS.slice(0, 6).map((p) => (
                  <div key={p.value} className="flex items-center gap-1 text-xs">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-muted-foreground">{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b">
          {DAYS.map((day) => (
            <div key={day} className="py-3 text-center text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, i) => {
            const dateStr = formatDateStr(day.date);
            const entries = getEntriesForDate(day.date);
            const isToday = dateStr === formatDateStr(today);
            const isDragOver = dragOverDate === dateStr;

            return (
              <div
                key={i}
                className={`min-h-[120px] border-b border-r p-2 transition-colors ${
                  !day.isCurrentMonth ? "bg-gray-50/50" : "bg-white"
                } ${isDragOver ? "bg-primary/5 ring-2 ring-primary/30 ring-inset" : ""}`}
                onDragOver={(e) => handleDragOver(e, dateStr)}
                onDrop={(e) => handleDrop(e, dateStr)}
                onClick={() => entries.length === 0 && openAddDialog(dateStr)}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-sm font-medium ${
                      !day.isCurrentMonth ? "text-muted-foreground/50" : isToday
                        ? "w-7 h-7 rounded-full gradient-bg text-white flex items-center justify-center text-xs"
                        : "text-foreground"
                    }`}
                  >
                    {day.date.getDate()}
                  </span>
                  {day.isCurrentMonth && (
                    <button
                      onClick={(e) => { e.stopPropagation(); openAddDialog(dateStr); }}
                      className="w-5 h-5 rounded-full hover:bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity"
                    >
                      <Plus className="w-3 h-3 text-primary" />
                    </button>
                  )}
                </div>

                <div className="space-y-1">
                  {entries.slice(0, 3).map((entry) => (
                    <div
                      key={entry.id}
                      draggable
                      onDragStart={() => handleDragStart(entry.id)}
                      onDragEnd={handleDragEnd}
                      onClick={(e) => { e.stopPropagation(); openEditDialog(entry); }}
                      className={`calendar-drag-item group/entry flex items-center gap-1 px-1.5 py-0.5 rounded text-xs cursor-grab active:cursor-grabbing ${
                        draggedEntry === entry.id ? "opacity-50" : ""
                      }`}
                      style={{ backgroundColor: `${entry.color}15`, borderLeft: `3px solid ${entry.color}` }}
                    >
                      <GripVertical className="w-2.5 h-2.5 opacity-0 group-hover/entry:opacity-50 shrink-0" />
                      <span className="truncate font-medium" style={{ color: entry.color }}>
                        {getPlatformIcon(entry.platform)} {entry.title}
                      </span>
                    </div>
                  ))}
                  {entries.length > 3 && (
                    <p className="text-[10px] text-muted-foreground text-center">+{entries.length - 3} more</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upcoming entries sidebar */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Upcoming Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {calendarEntries
                .sort((a, b) => new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime())
                .slice(0, 5)
                .map((entry) => (
                  <div key={entry.id} className="flex items-center gap-4 p-3 rounded-xl border hover:border-primary/30 transition-colors">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center text-lg" style={{ backgroundColor: `${entry.color}15` }}>
                      {getPlatformIcon(entry.platform)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{entry.title}</p>
                      <p className="text-xs text-muted-foreground">{entry.scheduled_date} at {entry.scheduled_time}</p>
                    </div>
                    <Badge variant={entry.status === "scheduled" ? "default" : "outline"} className="text-xs">
                      {entry.status}
                    </Badge>
                    <div className="flex gap-1">
                      <button onClick={() => openEditDialog(entry)} className="p-1 rounded hover:bg-muted"><Edit2 className="w-3.5 h-3.5 text-muted-foreground" /></button>
                      <button onClick={() => handleDeleteEntry(entry.id)} className="p-1 rounded hover:bg-muted"><Trash2 className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              AI Posting Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(AI_TIME_SUGGESTIONS).slice(0, 5).map(([platform, suggestion]) => (
                <div key={platform} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0" style={{ backgroundColor: `${getPlatformColor(platform)}15` }}>
                    {getPlatformIcon(platform)}
                  </div>
                  <div>
                    <p className="text-xs font-medium capitalize">{platform}</p>
                    <p className="text-[11px] text-muted-foreground">{suggestion}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog || !!editingEntry} onOpenChange={(open) => { if (!open) { setShowAddDialog(false); setEditingEntry(null); resetForm(); } }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEntry ? "Edit Entry" : "Add Calendar Entry"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Content title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea placeholder="Brief description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Platform</label>
                <Select value={newPlatform} onValueChange={(v) => setNewPlatform(v as Platform)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((p) => (<SelectItem key={p.value} value={p.value}>{p.icon} {p.label}</SelectItem>))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} />
              </div>
            </div>
            {AI_TIME_SUGGESTIONS[newPlatform] && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 text-sm">
                <Sparkles className="w-4 h-4 text-primary shrink-0" />
                <span className="text-muted-foreground">AI suggests: <strong className="text-primary">{AI_TIME_SUGGESTIONS[newPlatform]}</strong></span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowAddDialog(false); setEditingEntry(null); resetForm(); }}>Cancel</Button>
            <Button variant="gradient" onClick={editingEntry ? handleUpdateEntry : handleAddEntry}>{editingEntry ? "Update" : "Add to Calendar"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
