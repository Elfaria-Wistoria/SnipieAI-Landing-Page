'use client';

import { motion } from 'framer-motion';

const techStack = [
    {
        name: 'React',
        icon: (
            <svg viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#61DAFB]">
                <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
                <g stroke="currentColor" strokeWidth="1" fill="none">
                    <ellipse rx="10" ry="4.5"></ellipse>
                    <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
                    <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
                </g>
            </svg>
        ),
    },
    {
        name: 'Vite',
        icon: (
            <svg viewBox="0 0 410 404" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#646CFF]">
                <path d="M386.58 4.79327L404.755 36.9022C407.95 42.5463 405.071 49.6105 398.922 51.1394L208.791 98.4063L229.421 8.6046C230.138 5.48398 232.482 2.97864 235.586 1.83961L236.466 1.51658C241.053 -0.166986 246.079 2.50854 247.469 7.37894L266.073 72.5694L386.58 4.79327Z" fill="url(#vite_paint0_linear)" />
                <path d="M22.2496 36.9022L40.4246 4.79327L160.932 72.5694L179.535 7.37894C180.925 2.50854 185.952 -0.166986 190.538 1.51658L191.418 1.83961C194.522 2.97864 196.867 5.48398 197.584 8.6046L218.213 98.4063L28.0827 51.1394C21.9333 49.6105 19.054 42.5463 22.2496 36.9022Z" fill="url(#vite_paint1_linear)" />
                <path d="M205 403.042L18.4952 76.5413C17.068 74.043 18.0699 70.892 20.6548 69.65L205 0L389.352 69.6385C391.936 70.8808 392.937 74.0321 391.509 76.5306L205 403.042Z" fill="url(#vite_paint2_linear)" />
                <defs>
                    <linearGradient id="vite_paint0_linear" x1="216.52" y1="21.6095" x2="397.608" y2="21.6095" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#41D1FF" />
                        <stop offset="1" stopColor="#BD34FE" />
                    </linearGradient>
                    <linearGradient id="vite_paint1_linear" x1="193.684" y1="21.6095" x2="12.5962" y2="21.6095" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#41D1FF" />
                        <stop offset="1" stopColor="#BD34FE" />
                    </linearGradient>
                    <linearGradient id="vite_paint2_linear" x1="272.935" y1="36.5649" x2="151.78" y2="352.378" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFEA83" />
                        <stop offset="0.0833333" stopColor="#FFDD35" />
                        <stop offset="1" stopColor="#FFA800" />
                    </linearGradient>
                </defs>
            </svg>
        ),
    },
    {
        name: 'TypeScript',
        icon: (
            <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 rounded text-[#3178C6]">
                <rect width="128" height="128" rx="10" fill="currentColor" />
                <path d="M72.35 97H61.05L60.85 91.85C58.35 94.65 55.45 96.65 52.15 97.85C48.85 99.05 45.35 99.25 41.65 98.45C38.05 97.65 35.15 95.75 32.95 92.75C30.75 89.75 29.65 85.85 29.65 81.05V54.45H41.55V80.35C41.55 83.15 42.15 85.25 43.35 86.65C44.55 88.05 46.45 88.75 49.05 88.75C54.45 88.75 58.75 85.65 61.95 79.45V54.45H73.85V97H72.35ZM104.95 98.65C100.25 98.65 96.35 97.45 93.25 95.05C90.15 92.65 88.25 89.35 87.55 85.15H98.95C99.25 87.05 100.05 88.45 101.35 89.35C102.65 90.25 104.25 90.75 106.15 90.75C108.35 90.75 110.05 90.25 111.25 89.25C112.45 88.25 113.05 86.95 113.05 85.35C113.05 84.15 112.65 83.15 111.85 82.45C111.05 81.75 109.85 81.15 108.25 80.65L101.95 78.85C95.45 76.95 91.35 74.85 89.65 72.55C87.95 70.25 87.15 67.45 87.25 64.15C87.25 60.65 88.55 58.05 91.15 56.35C93.75 54.65 97.15 53.85 101.35 53.95C105.75 53.95 109.25 54.85 111.85 56.65C114.45 58.45 116.15 61.05 116.95 64.45H105.75C105.45 63.05 104.75 62.05 103.75 61.45C102.75 60.85 101.45 60.55 99.85 60.55C97.95 60.55 96.45 60.95 95.35 61.75C94.25 62.55 93.75 63.65 93.85 65.05C93.85 66.15 94.25 67.05 95.05 67.65C95.85 68.25 97.15 68.85 98.95 69.45L106.15 71.55C110.15 72.75 113.25 74.55 115.45 76.95C117.65 79.35 118.75 82.35 118.75 85.95C118.75 89.75 117.35 92.75 114.55 94.95C111.75 97.15 108.55 98.65 104.95 98.65Z" fill="white" />
            </svg>
        ),
    },
    {
        name: 'Tailwind CSS',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#38B2AC]">
                <path d="M12.0002 11.25C13.5002 11.25 14.2502 12 15.0002 12.75C15.7502 13.5 16.5002 14.25 18.0002 14.25C19.5002 14.25 20.2502 13.5 21.0002 12.75L21.7502 13.5C20.6252 14.625 19.5002 15.375 18.0002 15.375C16.5002 15.375 15.7502 14.625 15.0002 13.875C14.2502 13.125 13.5002 12.375 12.0002 12.375C10.5002 12.375 9.75023 13.125 9.00023 13.875C8.25023 14.625 7.50023 15.375 6.00023 15.375C4.50023 15.375 3.37523 14.625 2.25023 13.5L3.00023 12.75C3.75023 13.5 4.50023 14.25 6.00023 14.25C7.50023 14.25 8.25023 13.5 9.00023 12.75C9.75023 12 10.5002 11.25 12.0002 11.25ZM18.0002 8.625C19.5002 8.625 20.2502 9.375 21.0002 10.125L21.7502 9.375C20.6252 8.25 19.5002 7.5 18.0002 7.5C16.5002 7.5 15.7502 8.25 15.0002 9C14.2502 9.75 13.5002 10.5 12.0002 10.5C10.5002 10.5 9.75023 9.75 9.00023 9C8.25023 8.25 7.50023 7.5 6.00023 7.5C4.50023 7.5 3.37523 8.25 2.25023 9.375L3.00023 10.125C3.75023 9.375 4.50023 8.625 6.00023 8.625C7.50023 8.625 8.25023 9.375 9.00023 10.125C9.75023 10.875 10.5002 11.625 12.0002 11.625H12.0002V11.25H12.0002V8.625H18.0002Z" />
            </svg>
        ),
    },
    {
        name: 'Radix UI',
        icon: (
             <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-foreground/80">
                 <path d="M12.5 0C5.59644 0 0 5.59644 0 12.5C0 19.4036 5.59644 25 12.5 25C19.4036 25 25 19.4036 25 12.5C25 5.59644 19.4036 0 12.5 0ZM9.5 7.5H15.5V17.5H9.5V7.5Z" fill="currentColor" fillOpacity="0.5"/>
                <rect x="7.5" y="7.5" width="4" height="10" rx="1" fill="currentColor"/>
             </svg>
        ),
    },
    {
        name: 'Supabase',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#3ECF8E]">
                <path d="M13.3333 0L3.83325 10.9091H11.7221L10.6666 24L20.1666 13.0909H12.2777L13.3333 0Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        ),
    },
     {
        name: 'Electron',
        icon: (
           <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#9FEAF9]">
               <path d="M128 238.6C66.9 238.6 17.4 189.1 17.4 128C17.4 66.9 66.9 17.4 128 17.4C189.1 17.4 238.6 66.9 238.6 128C238.6 189.1 189.1 238.6 128 238.6ZM128 28.3C72.9 28.3 28.3 72.9 28.3 128C28.3 183.1 72.9 227.7 128 227.7C183.1 227.7 227.7 183.1 227.7 128C227.7 72.9 183.1 28.3 128 28.3Z" fill="currentColor"/>
               <path d="M228.6 116.8C225.1 82.2 195.9 55.4 160.7 55.4C156.4 55.4 152.2 55.9 148.1 56.8C145.7 57.3 144.1 59.8 144.7 62.1C145.3 64.5 147.7 66.1 150.1 65.5C153.6 64.8 157.1 64.4 160.7 64.4C190.9 64.4 216 87.5 219 117.2C219.2 119.6 221.4 121.4 223.8 121.1C226.2 120.9 228 118.7 227.7 116.3L228.6 116.8Z" fill="currentColor"/>
               <path d="M128 114.7C135.3 114.7 141.3 120.7 141.3 128C141.3 135.3 135.3 141.3 128 141.3C120.7 141.3 114.7 135.3 114.7 128C114.7 120.7 120.7 114.7 128 114.7ZM128 105.7C115.7 105.7 105.7 115.7 105.7 128C105.7 140.3 115.7 150.3 128 150.3C140.3 150.3 150.3 140.3 150.3 128C150.3 115.7 140.3 105.7 128 105.7Z" fill="currentColor"/>
               <path d="M26.4 139C29.9 173.6 59.1 200.4 94.3 200.4C98.6 200.4 102.8 199.9 106.9 199C109.3 198.5 110.9 196 110.3 193.7C109.7 191.3 107.3 189.7 104.9 190.3C101.4 191 97.9 191.4 94.3 191.4C64.1 191.4 39 168.3 36 138.6C35.8 136.2 33.6 134.4 31.2 134.7C28.8 134.9 27 137.1 27.3 139.5L26.4 139Z" fill="currentColor"/>
           </svg>
        ),
    },
    {
        name: 'Python',
        icon: (
           <svg viewBox="0 0 256 255" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#FFD43B]">
               <path d="M126.916 0.00268555C99.2882 0.00268555 86.2917 11.2727 75.4093 21.0844C73.918 22.4278 72.8447 23.3611 72.4827 23.6378C67.8863 26.3314 65.558 31.3916 63.9056 36.3117C62.0003 41.9772 61.6427 48.0163 61.2828 54.0954L128.452 54.0954L128.452 64.9124H44.1706C32.193 64.9124 20.2155 64.9124 8.23793 64.9124C4.3031 64.9124 2.80512 67.8732 2.37877 71.0768C0.5292 84.9961 0 100.916 0 115.367C0 134.502 0.825821 156.401 5.37882 173.238C6.18301 176.216 8.35853 177.309 11.3971 177.309H34.4172V148.337C34.4172 132.062 46.5165 117.844 62.7719 117.844H114.636C122.997 117.844 129.775 111.066 129.775 102.705V51.7779C129.775 35.8458 143.608 23.6738 159.508 23.6738H177.017C172.936 10.1581 154.542 0.00268555 126.916 0.00268555ZM93.9962 17.5855C98.4283 17.5855 102.022 21.1788 102.022 25.6108C102.022 30.0429 98.4283 33.6362 93.9962 33.6362C89.5642 33.6362 85.9708 30.0429 85.9708 25.6108C85.9708 21.1788 89.5642 17.5855 93.9962 17.5855Z" fill="#3776AB"/>
               <path d="M221.583 77.2021V106.174C221.583 122.449 209.483 136.668 193.228 136.668H141.364C133.003 136.668 126.225 143.446 126.225 151.807V202.734C126.225 218.666 112.392 230.838 96.4922 230.838H79.5218C83.8428 244.757 102.827 254.512 129.084 254.512C156.712 254.512 169.708 243.242 180.591 233.43C182.082 232.087 183.155 231.153 183.517 230.877C188.114 228.183 190.442 223.123 192.094 218.203C193.999 212.537 194.357 206.498 194.717 200.419L127.548 200.419L127.548 189.602H211.829C223.807 189.602 235.785 189.602 247.762 189.602C251.697 189.602 253.195 186.641 253.621 183.438C255.471 169.518 256 153.598 256 139.147C256 120.012 255.174 98.1132 250.621 81.2764C249.817 78.2981 247.641 77.2052 244.603 77.2052H221.583V77.2021ZM162.004 220.875C166.436 220.875 170.029 224.469 170.029 228.901C170.029 233.333 166.436 236.926 162.004 236.926C157.572 236.926 153.978 233.333 153.978 228.901C153.978 224.469 157.572 220.875 162.004 220.875Z" fill="currentColor"/>
           </svg>
        ),
    },
    {
        name: 'FastAPI',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#009688]">
               <path d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM12.75 18V13.5H16.5L11.25 6V10.5H7.5L12.75 18Z" />
            </svg>
        ),
    },
    {
        name: 'Antigravity',
        icon: (
            <div className="flex items-center justify-center p-1 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-md w-8 h-8 shadow-lg shadow-purple-500/20">
                <span className="font-black text-white text-xs tracking-tighter">AG</span>
            </div>
        )
    }
];

export default function TechStack() {
    return (
        <section className="py-12 bg-background relative overflow-hidden border-b border-border/40">
            <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-background to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-background to-transparent z-10" />
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
            
            <div className="container px-4 text-center mb-10">
                <h3 className="text-sm font-light uppercase tracking-widest text-muted-foreground">
                    Built with Modern Technologies
                </h3>
            </div>

            <div className="flex overflow-hidden">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-16 items-center px-4"
                >
                    {[...techStack, ...techStack].map((tech, index) => (
                        <div
                            key={`${tech.name}-${index}`}
                            className="flex items-center gap-3 min-w-max group opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 duration-500"
                        >
                            <div className="text-foreground text-3xl">
                                {tech.icon}
                            </div>
                            <span className="text-lg font-light tracking-tight text-foreground/80 group-hover:text-foreground">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
