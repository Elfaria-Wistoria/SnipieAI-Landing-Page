"use client";

import { updateDownloadLinks } from "@/app/actions/settings";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Save } from "lucide-react";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button disabled={pending} type="submit">
            {pending ? (
                <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                </>
            ) : (
                <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                </>
            )}
        </Button>
    );
}

type SettingsFormProps = {
    initialMacUrl: string;
    initialWinUrl: string;
    initialLicenseKeyword: string;
};

const initialState = {
    success: false,
    message: "",
};

export default function SettingsForm({ initialMacUrl, initialWinUrl, initialLicenseKeyword }: SettingsFormProps) {
    const [state, formAction] = useActionState(updateDownloadLinks, initialState);

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message);
            } else {
                toast.error(state.message);
            }
        }
    }, [state]);

    return (
        <form action={formAction}>
            <Card>
                <CardHeader>
                    <CardTitle>Download Links</CardTitle>
                    <CardDescription>
                        Update the download URLs for the desktop applications.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="mac_download_url">macOS Download URL</Label>
                        <Input
                            id="mac_download_url"
                            name="mac_download_url"
                            defaultValue={initialMacUrl}
                            placeholder="https://..."
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="win_download_url">Windows Download URL</Label>
                        <Input
                            id="win_download_url"
                            name="win_download_url"
                            defaultValue={initialWinUrl}
                            placeholder="https://..."
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="license_product_keyword">License Product Keyword</Label>
                        <Input
                            id="license_product_keyword"
                            name="license_product_keyword"
                            defaultValue={initialLicenseKeyword}
                            placeholder="clipiee"
                            required
                        />
                        <p className="text-sm text-muted-foreground">
                            Product names must contain this keyword for license activation (case-insensitive)
                        </p>
                    </div>
                    <SubmitButton />
                </CardContent>
            </Card>
        </form>
    );
}
