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
import { updateDailyLog } from "@/actions/daily-tracking";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

const formSchema = z.object({
  content_count: z.coerce.number().min(1, "Must be at least 1"),
  video_link: z.string().url("Must be a valid URL"),
});

interface EditWorkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  log: {
    id: string;
    created_at: string;
    content_count: number;
    video_link?: string;
  } | null;
  memberId: string;
  onSuccess: () => void;
}

export function EditWorkDialog({
  open,
  onOpenChange,
  log,
  memberId,
  onSuccess,
}: EditWorkDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      content_count: 0,
      video_link: "",
    },
  });

  // Update form when log changes
  useEffect(() => {
    if (log) {
      form.reset({
        content_count: log.content_count,
        video_link: log.video_link || "",
      });
    }
  }, [log, form]);

  const isLoading = form.formState.isSubmitting;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!log) return;
    
    try {
      await updateDailyLog({
        id: log.id,
        member_id: memberId,
        content_count: values.content_count,
        video_link: values.video_link,
        date: new Date(log.created_at),
      });
      toast.success("Work entry updated successfully!");
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast.error("Failed to update entry. Please try again.");
    }
  }

  if (!log) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Work Entry</DialogTitle>
          <DialogDescription>
            {format(new Date(log.created_at), "EEEE, MMMM d, yyyy")}
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
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
