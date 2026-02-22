"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // <--- We brought in Next.js Image component here!

export default function Home() {
  const [text, setText] = useState("");
  const fullText = "Initializing Nattanan's Website... Access Verified... Completed.";

  // Typing effect for the "System Log"
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-mono selection:bg-cyan-500/50 overflow-x-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20" 
           style={{ backgroundImage: `linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      {/* Interactive Header */}
      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-cyan-900/50 backdrop-blur-md">
        <div className="group cursor-crosshair">
          <span className="text-cyan-500 font-black tracking-tighter text-2xl group-hover:hidden">NW</span>
          <span className="hidden group-hover:inline text-cyan-400 font-black tracking-tighter text-2xl">NATTANAN_WEERAPONG</span>
        </div>
        <div className="text-[10px] text-cyan-500/70 animate-pulse">SYSTEM_STATUS: OPTIMAL</div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Profile & Mission */}
        <div className="lg:col-span-7 space-y-12">
          <section>
            <div className="text-cyan-500 text-xs mb-8">{'>'} {text}<span className="animate-ping">_</span></div>
            
            {/* THIS IS THE NEW FUTURISTIC PHOTO FRAME */}
            <div className="relative w-40 h-40 md:w-48 md:h-48 mb-8 border border-zinc-800 p-2 group hover:border-cyan-500/50 transition-colors">
              <div className="w-full h-full relative overflow-hidden bg-zinc-950">
                <Image
                  src="/Nattanan_Weerapong_Profile.jpg" 
                  alt="Nattanan Weerapong Profile"
                  fill
                  className="object-cover transition-all duration-700 ease-in-out"
                />
              </div>
              {/* Cyber-corners styling */}
              <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-cyan-500"></div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-cyan-500"></div>
            </div>

            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mt-6">
              Mech <span className="text-transparent stroke-cyan-500" style={{ WebkitTextStroke: '1px #06b6d4' }}>Eng</span><br />
              <span className="text-cyan-500 italic">Student</span>
            </h1>
            <p className="mt-8 text-zinc-400 text-lg max-w-xl leading-relaxed">
              I am an international student from Thailand pursuing a Bachelor of Science in Mechanical Engineering at Virginia Military Institute. 
              My focus is applying AI and Mathematics to solve complex engineering problems.
            </p>
          </section>

          {/* Interactive Buttons */}
          <div className="flex flex-wrap gap-6">
            <a 
              href="/Nattanan_Weerapong_Resume.pdf"
              download="Nattanan_Weerapong_Resume.pdf"
              className="relative px-10 py-4 bg-cyan-600 hover:bg-cyan-400 text-black font-bold uppercase transition-all hover:shadow-[0_0_30px_#06b6d4] active:scale-95 text-center"
            >
              Download Resume.pdf
            </a>
            <a href="mailto:weerapongn27@vmi.edu"
               className="px-10 py-4 border border-cyan-900 hover:border-cyan-400 text-cyan-400 font-bold uppercase transition-all backdrop-blur-sm text-center">
              Contact
            </a>
          </div>
        </div>

        {/* Right Column: Dynamic Data Pads */}
        <div className="lg:col-span-5 space-y-4">
          <DataPad label="Academic Performance" value="GPA 3.989" sub="Institute Honors Scholar" />
          <DataPad label="Primary Language" value="Thai / English" sub="Bilingual Proficiency" />
          <DataPad label="Certification" value="Data Science" sub="Issued by Coursera (May 2023)" />
          <DataPad label="Work Experience" value="Peer Tutor @ VMI (Feb 2025 - Present), Math Tutor (Aug 2024), Student Assistant @ CU Boulder (2022)" sub={undefined} />
        </div>
      </div>

      {/* Scrolling Experience Ticker */}
      <div className="relative z-10 border-y border-cyan-900 bg-cyan-950/10 py-4 overflow-hidden mt-12">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1,2,3].map((i) => (
            <div key={i} className="flex space-x-12 px-6">
              <span className="text-cyan-500/50 font-bold tracking-widest uppercase">
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

type DataPadProps = {
  label: string
  value: string
  sub?: string
}

function DataPad({ label, value, sub }: DataPadProps) {
  return (
    <div className="group p-6 border border-zinc-800 bg-zinc-950/50 hover:border-cyan-500/50 transition-all cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-cyan-900 group-hover:bg-cyan-500 transition-colors"></div>
      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-2xl font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors">{value}</div>
      <div className="text-xs text-zinc-600 mt-2">{sub}</div>
    </div>
  );
}


