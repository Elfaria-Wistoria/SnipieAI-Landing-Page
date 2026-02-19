"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { addTeamMember } from "@/actions/daily-tracking";
import { toast } from "sonner";

export function AddMemberDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      await addTeamMember(formData);
      toast.success("Team member added successfully");
      setOpen(false);
      setAvatarPreview(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to add team member");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-900 border-2 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-none transition-colors">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight text-black dark:text-white">Add New Member</DialogTitle>
          <DialogDescription className="text-gray-500 dark:text-gray-400">
            Add a new team member to track their daily progress.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-bold text-black dark:text-white">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              className="col-span-3 border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none focus-visible:ring-0 focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-none transition-all"
              required
            />
          </div>
          
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right font-bold text-black dark:text-white">
              Role
            </Label>
            <div className="col-span-3">
                <Input 
                    list="roles" 
                    id="role" 
                    name="role" 
                    placeholder="Select or type a role..."
                    className="border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none focus-visible:ring-0 focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-none transition-all"
                    required 
                />
                <datalist id="roles">
                    <option value="Video Editor" />
                    <option value="Script Writer" />
                    <option value="Content Strategist" />
                    <option value="Manager" />
                    <option value="CEO" />
                    <option value="Engineer" />
                </datalist>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right font-bold text-black dark:text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="col-span-3 border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none focus-visible:ring-0 focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-none transition-all"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="percentage" className="text-right font-bold text-black dark:text-white">
              Share (%)
            </Label>
            <Input
              id="percentage"
              name="percentage"
              type="number"
              min="0"
              max="100"
              defaultValue="0"
              className="col-span-3 border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none focus-visible:ring-0 focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-none transition-all"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="avatar" className="text-right font-bold text-black dark:text-white pt-2">
              Avatar
            </Label>
            <div className="col-span-3 space-y-2">
                <Input
                id="avatar"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer file:cursor-pointer file:text-white file:bg-black file:dark:bg-white file:dark:text-black file:rounded-md file:border-0 file:mr-4 file:px-2 file:text-sm file:font-bold border-2 border-black dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none focus-visible:ring-0 focus-visible:translate-x-[1px] focus-visible:translate-y-[1px] focus-visible:shadow-none transition-all"
                />
                {avatarPreview && (
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] mx-auto mt-2">
                        <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                    </div>
                )}
                <p className="text-xs text-muted-foreground dark:text-gray-400">
                    Upload an image (max 2MB). If left empty, a default avatar will be generated.
                </p>
            </div>
          </div>

          <DialogFooter>
            <Button 
                type="submit" 
                disabled={loading}
                className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all w-full sm:w-auto"
            >
              {loading ? "Adding..." : "Add Member"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
