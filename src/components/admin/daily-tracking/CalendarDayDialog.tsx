"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { submitDailyLog } from "@/actions/daily-tracking";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const formSchema = z.object({
  content_count: z.coerce.number().min(1, "Must be at least 1"),
  video_link: z.string().url("Must be a valid URL"),
});

interface CalendarDayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date | undefined;
  memberId: string;
  onSuccess: () => void;
}

export function CalendarDayDialog({
  open,
  onOpenChange,
  date,
  memberId,
  onSuccess,
}: CalendarDayDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      content_count: 0,
      video_link: "",
    },
  });

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!date) return;
    
    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      toast.error("Cannot log work for past dates. Please select today or a future date.");
      return;
    }
    
    if (!memberId) {
        toast.error("Error: Member ID is missing. Please refresh the page.");
        console.error("CalendarDayDialog: memberId is missing");
        return;
    }

    try {
      console.log("Submitting log with memberId:", memberId);
      await submitDailyLog({
        ...values,
        member_id: memberId,
        date: date,
      });
      toast.success("Work logged successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to log work. Please try again.");
    }
  }

  if (!date) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Log Work for {format(date, "PPP")}</DialogTitle>
          <DialogDescription>
            Enter your content count and video link for this day.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="content_count"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content Count</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="video_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Video Link</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
