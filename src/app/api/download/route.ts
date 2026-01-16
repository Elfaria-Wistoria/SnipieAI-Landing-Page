
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(request: NextRequest) {
    const { userId } = await auth();

    if (!userId) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const platform = searchParams.get('platform');

    if (!platform) {
        return new NextResponse('Platform parameter is required', { status: 400 });
    }

    // Define the mapping from platform param to filename
    // These should match the filenames uploaded to the 'releases' bucket
    const filenameMap: Record<string, string> = {
        'mac-arm64': 'Clipiee-latest-mac-arm64.dmg',
        'mac-intel': 'Clipiee-latest-mac-intel.dmg',
        'win64': 'Clipiee-latest-win64.exe',
    };

    const filename = filenameMap[platform];

    if (!filename) {
        return new NextResponse('Invalid platform', { status: 400 });
    }

    const projectId = process.env.NEXT_PUBLIC_SUPABASE_URL?.split('.')[0].split('https://')[1];

    if (!projectId) {
        console.error("NEXT_PUBLIC_SUPABASE_URL not correctly set");
        // Fallback or error if env is missing, but usually it should be there.
        // Trying to construct from the URL directly if possible.
    }

    // Construct the public URL for the file in the 'releases' bucket
    // Format: https://[project-ref].supabase.co/storage/v1/object/public/[bucket]/[filename]
    const downloadUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/releases/${filename}`;

    // Redirect to the direct download URL
    return NextResponse.redirect(downloadUrl);
}
