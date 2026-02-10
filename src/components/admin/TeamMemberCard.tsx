"use client";


import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { TeamMember, updateTeamMember } from "@/app/actions/team";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, User } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMemberCardProps {
    member: TeamMember;
    totalRevenue: number;
}

export function TeamMemberCard({ member, totalRevenue }: TeamMemberCardProps) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(member.name);
    const [imageUrl, setImageUrl] = useState(member.image_url || "");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const calculatedRevenue = totalRevenue * (member.percentage / 100);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const fileExt = file.name.split('.').pop();
        const fileName = `${member.id}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        setUploading(true);

        try {
            // Upload file
            const { error: uploadError } = await supabase.storage
                .from('team-members')
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            // Get public URL
            const { data } = supabase.storage
                .from('team-members')
                .getPublicUrl(filePath);

            setImageUrl(data.publicUrl);
            toast.success("Image uploaded successfully");
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("Error uploading image");
        } finally {
            setUploading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const result = await updateTeamMember(member.id, {
                name,
                image_url: imageUrl,
            });

            if (result.success) {
                toast.success("Team member updated successfully");
                setOpen(false);
            } else {
                toast.error("Failed to update team member");
            }
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="relative overflow-hidden group">
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Team Member</DialogTitle>
                            <DialogDescription>
                                Update profile details for {member.role}.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-right">
                                    Profile Image
                                </Label>
                                <div className="col-span-3 space-y-2">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={imageUrl} />
                                            <AvatarFallback><User /></AvatarFallback>
                                        </Avatar>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            disabled={uploading}
                                        />
                                    </div>
                                    {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleSave} disabled={loading || uploading}>
                                {loading ? "Saving..." : "Save changes"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <CardHeader className="pb-2 flex flex-row items-center gap-4">
                <Avatar className="h-12 w-12">
                    <AvatarImage src={member.image_url} alt={member.name} />
                    <AvatarFallback><User /></AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                        {member.role}
                    </CardTitle>
                    <div className="text-lg font-bold">{member.name}</div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-end">
                    <div className="text-xl font-bold text-primary">
                        {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                        }).format(calculatedRevenue)}
                    </div>
                    <div className="text-sm font-bold text-muted-foreground">{member.percentage}%</div>
                </div>
            </CardContent>
        </Card>
    );
}
