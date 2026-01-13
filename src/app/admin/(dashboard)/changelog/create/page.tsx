import ChangelogForm from "@/components/admin/ChangelogForm";

export default function CreateChangelogPage() {
    return (
        <div className="container max-w-2xl py-10 font-mono">
            <h1 className="text-3xl font-bold mb-8">Create Changelog Entry</h1>
            <ChangelogForm mode="create" />
        </div>
    );
}
