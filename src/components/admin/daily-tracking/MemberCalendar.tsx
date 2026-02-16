"use client";

import { useState, useMemo } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isSameDay, startOfMonth, endOfMonth, differenceInDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDayDialog } from "./CalendarDayDialog";
import { EditWorkDialog } from "./EditWorkDialog";
import { useRouter } from "next/navigation";
import { Target, TrendingUp, Calendar as CalendarIcon, Video, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteDailyLog } from "@/actions/daily-tracking";
import { toast } from "sonner";

interface DailyLog {
  id: string;
  created_at: string;
  content_count: number;
  video_link?: string;
}

interface MemberCalendarProps {
  logs: DailyLog[];
  memberId: string;
  memberName: string;
}

export function MemberCalendar({ logs, memberId, memberName }: MemberCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editLog, setEditLog] = useState<DailyLog | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteLogId, setDeleteLogId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  // Calculate statistics
  const stats = useMemo(() => {
    const now = new Date();
    const monthStart = startOfMonth(now);
    const monthEnd = endOfMonth(now);
    const daysInMonth = differenceInDays(monthEnd, monthStart) + 1;

    const totalVideos = logs.reduce((sum, log) => sum + log.content_count, 0);
    const daysWorked = new Set(logs.map(log => format(new Date(log.created_at), 'yyyy-MM-dd'))).size;
    
    // Calculate current streak
    let streak = 0;
    const today = new Date();
    let checkDate = new Date(today);
    
    while (true) {
      const dateStr = format(checkDate, 'yyyy-MM-dd');
      const hasLog = logs.some(log => format(new Date(log.created_at), 'yyyy-MM-dd') === dateStr);
      
      if (hasLog) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    const avgPerDay = daysWorked > 0 ? (totalVideos / daysWorked).toFixed(1) : '0';
    const completionRate = ((daysWorked / daysInMonth) * 100).toFixed(0);

    return {
      totalVideos,
      daysWorked,
      daysInMonth,
      streak,
      avgPerDay,
      completionRate: parseInt(completionRate)
    };
  }, [logs]);

  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    setIsDialogOpen(true);
  };

  const handleEdit = (log: DailyLog) => {
    setEditLog(log);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (logId: string) => {
    setDeleteLogId(logId);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteLogId) return;
    
    setIsDeleting(true);
    try {
      await deleteDailyLog(deleteLogId, memberId);
      toast.success("Entry deleted successfully!");
      setDeleteLogId(null);
      // Force a hard refresh by navigating to the same page
      router.push(`/admin/daily-tracking/${memberId}`);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete entry. Please try again.");
      setIsDeleting(false);
    }
  };

  const modifiers = {
    hasLog: (date: Date) => {
      return logs.some((log) => isSameDay(new Date(log.created_at), date));
    },
  };

  const modifiersStyles = {
    hasLog: {
      fontWeight: "bold",
      color: "white",
      backgroundColor: "hsl(var(--primary))",
      borderRadius: "50%",
    },
  };

  return (
    <div className="space-y-6">
      {/* Performance Statistics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVideos}</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Days Worked</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.daysWorked}/{stats.daysInMonth}</div>
            <p className="text-xs text-muted-foreground">
              {stats.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak} days</div>
            <p className="text-xs text-muted-foreground">
              Consecutive work days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg per Day</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgPerDay}</div>
            <p className="text-xs text-muted-foreground">
              Videos per work day
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar and Work Log */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Calendar */}
        <Card>
          <CardHeader>
            <CardTitle>Work Calendar - {memberName}</CardTitle>
            <CardDescription>
              Click on any date to log work for that day
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onDayClick={handleDayClick}
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              disabled={{ before: new Date() }}
              className="p-3"
            />
          </CardContent>
        </Card>

        {/* Work History */}
        <Card>
          <CardHeader>
            <CardTitle>Work History</CardTitle>
            <CardDescription>
              Recent activity ({logs.length} entries)
            </CardDescription>
          </CardHeader>
          <CardContent>
            {logs.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground">No work logged yet for this month.</p>
                <p className="text-xs text-muted-foreground mt-2">Click on a calendar date to start logging.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {logs
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((log) => (
                    <div key={log.id} className="flex items-start justify-between gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="text-sm font-medium">
                            {format(new Date(log.created_at), "EEE, MMM d")}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {log.content_count} {log.content_count === 1 ? 'video' : 'videos'}
                          </Badge>
                        </div>
                        {log.video_link && (
                          <a
                            href={log.video_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-primary hover:underline flex items-center gap-1 mt-1 break-all"
                          >
                            View video <ExternalLink className="h-3 w-3 flex-shrink-0" />
                          </a>
                        )}
                      </div>
                      <div className="flex gap-1 flex-shrink-0">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEdit(log)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteClick(log.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <CalendarDayDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        date={selectedDate}
        memberId={memberId}
        onSuccess={() => {
          router.refresh();
        }}
      />

      <EditWorkDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        log={editLog}
        memberId={memberId}
        onSuccess={() => {
          router.refresh();
        }}
      />

      <AlertDialog open={!!deleteLogId} onOpenChange={(open: boolean) => !open && setDeleteLogId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this work entry.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
