"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Download as DownloadIcon, Monitor, Command, ShieldCheck, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const VERSION = "1.0.5";
const RELEASE_DATE = "Feb 2026";
const WIN_FILENAME = `SnipieAIv${VERSION}.exe`;
const REPO_URL = "https://github.com/clipieeexplore/clipiee-releases/releases/download";
const WIN_DOWNLOAD_URL = `${REPO_URL}/SnipieAI/${WIN_FILENAME}`;

interface DownloadProps {
    winUrl?: string;
}

export default function Download({ winUrl }: DownloadProps) {
    const finalWinUrl = winUrl || WIN_DOWNLOAD_URL;
    const [os, setOs] = useState<"mac" | "windows" | "linux" | null>(null);

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.includes("mac")) setOs("mac");
        else if (userAgent.includes("win")) setOs("windows");
        else if (userAgent.includes("linux")) setOs("linux");
        else setOs("windows"); // Default to Windows
    }, []);

    return (
        <section id="download" className="py-24 md:py-32 relative overflow-hidden bg-white dark:bg-gray-950 min-h-screen flex items-center transition-colors duration-300">
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] dark:opacity-[0.1] dark:invert" 
                style={{backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px'}} 
            />

            <div className="container px-4 relative z-10">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-black dark:border-white bg-yellow-300 text-black text-sm font-bold font-mono mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <Terminal className="w-4 h-4" />
                        <span>v{VERSION}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-black" />
                        <span>STABLE</span>
                    </div>

                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black dark:text-white mb-6 uppercase">
                        Ready to Create <br/>
                        <span className="text-[#8B5CF6]">Viral Clips?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-medium max-w-xl mx-auto leading-relaxed">
                        Download SnipieAI for desktop. <br />
                        Runs locally. No cloud uploads. 100% Private.
                    </p>
                </div>

                {/* Primary Download Card */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative bg-white dark:bg-gray-900 rounded-[40px] border-4 border-black dark:border-gray-700 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                        
                        <div className="flex flex-col md:flex-row">
                            
                            {/* Left Side: Visual / Icon */}
                            <div className="w-full md:w-1/3 bg-[#8B5CF6] p-10 flex flex-col items-center justify-center relative border-b-4 md:border-b-0 md:border-r-4 border-black dark:border-gray-700">
                                <div className="absolute inset-0 opacity-10" 
                                    style={{backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px'}} 
                                />
                                
                                <div className="w-40 h-40 bg-white rounded-3xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center relative z-10 rotate-3 transform hover:rotate-6 transition-transform duration-300">
                                    <Command className="w-16 h-16 text-black" />
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <div className={cn("w-3 h-3 rounded-full border border-black", os === 'mac' ? "bg-white" : "bg-black/20")} />
                                    <div className={cn("w-3 h-3 rounded-full border border-black", os === 'windows' ? "bg-white" : "bg-black/20")} />
                                </div>
                            </div>

                            {/* Right Side: Content */}
                            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center bg-white dark:bg-gray-900 relative">
                                {/* Decorative shape */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-bl-full opacity-50 pointer-events-none" />

                                <div className="space-y-8 relative z-10">
                                    <div>
                                        <h3 className="text-3xl font-black text-black dark:text-white mb-3 uppercase tracking-tight">
                                            {os === 'mac' ? 'Download for macOS' : 'Download for Windows'}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-3 text-sm font-bold text-gray-500 dark:text-gray-400">
                                            <span className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md border border-black dark:border-gray-600">v{VERSION}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                                            <span>{os === 'mac' ? 'Apple Silicon & Intel' : '64-bit Installer'}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                                            <span>~140MB</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        {os === 'mac' ? (
                                            <Button size="lg" disabled className="h-16 px-8 text-xl font-bold bg-gray-100 text-gray-400 border-2 border-gray-200 rounded-2xl cursor-not-allowed w-full sm:w-auto">
                                                Coming Soon
                                            </Button>
                                        ) : (
                                            <Button 
                                                size="lg" 
                                                className="h-16 px-10 text-xl font-bold bg-[#22c55e] text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all rounded-2xl w-full sm:w-auto"
                                                onClick={() => { if (finalWinUrl) window.location.href = finalWinUrl; }}
                                            >
                                                <DownloadIcon className="w-6 h-6 mr-3 stroke-[3]" />
                                                Download Installer
                                            </Button>
                                        )}
                                        
                                        {os === 'mac' && (
                                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-xl border border-blue-200 text-xs font-bold text-blue-600">
                                                <Check className="w-4 h-4" />
                                                Native Apple Silicon
                                            </div>
                                        )}
                                    </div>
                                    
                                    <p className="text-xs font-medium text-gray-400 dark:text-gray-500">
                                        By downloading, you agree to our <Link href="#" className="underline hover:text-black dark:hover:text-white">Terms</Link> and <Link href="#" className="underline hover:text-black dark:hover:text-white">Privacy Policy</Link>.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Bar: Platform Switcher */}
                        <div className="bg-black text-white p-4 flex flex-wrap justify-center gap-8 md:gap-16 border-t-4 border-black dark:border-gray-700">
                            <button 
                                onClick={() => setOs('mac')}
                                className={cn("flex items-center gap-3 text-lg font-bold transition-all px-4 py-2 rounded-xl border-2 border-transparent", 
                                    os === 'mac' ? "bg-white text-black border-white shadow-[4px_4px_0px_0px_#8B5CF6]" : "text-gray-400 hover:text-white")}
                            >
                                <MacIcon className="w-5 h-5" /> macOS
                            </button>
                            <button 
                                onClick={() => setOs('windows')}
                                className={cn("flex items-center gap-3 text-lg font-bold transition-all px-4 py-2 rounded-xl border-2 border-transparent", 
                                    os === 'windows' ? "bg-white text-black border-white shadow-[4px_4px_0px_0px_#22c55e]" : "text-gray-400 hover:text-white")}
                            >
                                <WindowsIcon className="w-5 h-5" /> Windows
                            </button>
                        </div>
                    </div>
                </div>

                {/* Trust / Security */}
                <div className="mt-16 flex justify-center gap-8 md:gap-12 text-sm font-bold text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border border-black">
                             <ShieldCheck className="w-4 h-4 text-green-600" />
                        </div>
                        <span>Virus Checked</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border border-black">
                            <Check className="w-4 h-4 text-green-600" />
                        </div>
                        <span>Signed Code</span>
                    </div>
                </div>

            </div>
        </section>
    );
}

function MacIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 384 512" fill="currentColor" className={className}>
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"/>
        </svg>
    )
}

function WindowsIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 88 88" fill="currentColor" className={className}>
            <path d="M0 12.402l35.687-4.86.016 34.423-35.67.203L0 12.402zm35.67 33.529l.028 34.453L.028 75.462l-.028-29.28 35.67-.251zm52.326-38.64l.003 39.554-48.245.225-.015-39.048L87.996 7.29zM39.729 46.18l48.262.246V80.68l-48.247-6.578-.015-27.922z"/>
        </svg>
    )
}
