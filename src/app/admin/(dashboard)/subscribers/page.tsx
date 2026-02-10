"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { getLogger } from "@/lib/logger";
import { Button } from "@/components/ui/button";
import { Download, Trash2, Mail, Send, Loader2 } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
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
import { Textarea } from "@/components/ui/textarea";
import { sendEmailBlast } from "@/app/actions/newsletter";

const logger = getLogger("AdminSubscribers");

interface Subscriber {
    id: string;
    email: string;
    created_at: string;
}

export default function SubscribersPage() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [sending, setSending] = useState(false);
    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('newsletter_subscribers')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            logger.error({ err: error }, "Failed to fetch subscribers");
        } else {
            setSubscribers(data || []);
        }
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to remove this subscriber?")) return;

        try {
            const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
            if (error) throw error;

            setSubscribers(subscribers.filter(s => s.id !== id));
            logger.info({ id }, "Subscriber deleted");
        } catch (error) {
            logger.error({ err: error }, "Failed to delete subscriber");
            alert("Failed to delete subscriber");
        }
    };

    const handleExport = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "ID,Email,Date\n"
            + subscribers.map(s => `${s.id},${s.email},${s.created_at}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "subscribers.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSendBlast = async (formData: FormData) => {
        setSending(true);
        setMessage(null);

        try {
            // We can invoke the server action directly
            const result = await sendEmailBlast(null, formData);
            if (result.success) {
                setMessage({ text: result.message || "Emails sent!", type: 'success' });
                setTimeout(() => {
                    setOpen(false);
                    setMessage(null);
                }, 2000);
            } else {
                setMessage({ text: result.message || "Failed to send", type: 'error' });
            }
        } catch (e) {
            setMessage({ text: "An unexpected error occurred", type: 'error' });
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="container py-20">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-3xl font-bold">Subscribers</h1>
                <div className="flex gap-2">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Email Blast
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Send Email Blast</DialogTitle>
                                <DialogDescription>
                                    Send an email to all {subscribers.length} subscribers.
                                </DialogDescription>
                            </DialogHeader>
                            <form action={handleSendBlast} className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder="Weekly Update..."
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="content">Content</Label>
                                    <Textarea
                                        id="content"
                                        name="content"
                                        placeholder="Hello everyone..."
                                        className="h-32"
                                        required
                                    />
                                </div>

                                {message && (
                                    <div className={`text-sm ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                        {message.text}
                                    </div>
                                )}

                                <DialogFooter>
                                    <Button type="submit" disabled={sending}>
                                        {sending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Emails
                                                <Send className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    <Button onClick={handleExport} variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading subscribers...</div>
            ) : (
                <div className="rounded-md border bg-background/50 backdrop-blur">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Email</TableHead>
                                <TableHead>Date Subscribed</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {subscribers.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="text-center h-24 text-muted-foreground">
                                        No subscribers yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                subscribers.map((sub) => (
                                    <TableRow key={sub.id}>
                                        <TableCell>{sub.email}</TableCell>
                                        <TableCell>
                                            {format(new Date(sub.created_at), "PPP p")}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                                onClick={() => handleDelete(sub.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
