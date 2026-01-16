
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Use service role key for uploads

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const BUCKET_NAME = 'releases';

async function uploadFile(filePath: string, destinationName: string) {
    try {
        const fileBuffer = fs.readFileSync(filePath);

        // Upsert the file (overwrite if exists)
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(destinationName, fileBuffer, {
                upsert: true,
                contentType: destinationName.endsWith('.dmg') ? 'application/x-apple-diskimage' : 'application/vnd.microsoft.portable-executable'
            });

        if (error) {
            throw error;
        }

        console.log(`✅ Successfully uploaded ${destinationName}`);
    } catch (error) {
        console.error(`❌ Error uploading ${destinationName}:`, error);
    }
}

async function main() {
    // Define source paths - adjust these to match your actual build output directory
    // Assuming 'dist' or 'out' directory
    const buildDir = path.resolve(process.cwd(), 'dist');

    // You might need to adjust logic to find the *actual* latest file if version numbers are in filenames
    // For now, we expect you to pass the path or we look for common patterns

    const args = process.argv.slice(2);
    if (args.length < 2) {
        console.log("Usage: npx tsx scripts/upload-release.ts <platform> <filepath>");
        console.log("Platforms: mac-arm64, mac-intel, win64");
        process.exit(0);
    }

    const platform = args[0];
    const filePath = args[1];

    let destinationName = '';
    if (platform === 'mac-arm64') {
        destinationName = 'Clipiee-latest-mac-arm64.dmg';
    } else if (platform === 'mac-intel') {
        destinationName = 'Clipiee-latest-mac-intel.dmg';
    } else if (platform === 'win64') {
        destinationName = 'Clipiee-latest-win64.exe';
    } else {
        console.error("Unknown platform. Use: mac-arm64, mac-intel, win64");
        process.exit(1);
    }

    if (!fs.existsSync(filePath)) {
        console.error(`File not found: ${filePath}`);
        process.exit(1);
    }

    await uploadFile(filePath, destinationName);
}

main();
