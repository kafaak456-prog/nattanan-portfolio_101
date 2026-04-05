"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Home() {
  const [text, setText] = useState("");
  const [activeSection, setActiveSection] = useState("home");
  const [barsAnimated, setBarsAnimated] = useState(false);
  const fullText = "Initializing Nattanan's Website... Access Verified... Completed.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (activeSection === "skills" && !barsAnimated) {
      setTimeout(() => setBarsAnimated(true), 100);
    }
  }, [activeSection, barsAnimated]);

  const skills = [
  { name: "Controls & Dynamic Systems", pct: 95 },
  { name: "Mechanical Design & CAD", pct: 92 },
  { name: "Heat Transfer & Thermodynamics", pct: 90 },
  { name: "Stress Analysis & FEM", pct: 91 },
  { name: "MATLAB", pct: 95 },
  { name: "Fluid Mechanics", pct: 91 },
  { name: "Aerospace Systems", pct: 92 },
  { name: "Nuclear Engineering", pct: 90 },
];

  return (
    <main className="min-h-screen bg-[#060d1a] text-white font-mono selection:bg-blue-500/50 overflow-x-hidden">

      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 z-0 opacity-15"
        style={{
          backgroundImage: `linear-gradient(#0c1a3a 1px, transparent 1px), linear-gradient(90deg, #0c1a3a 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Blue ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.12) 0%, transparent 70%)' }} />

      {/* NAV */}
      <nav className="relative z-10 p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-blue-900/50 backdrop-blur-md">
        <div className="group cursor-crosshair">
          <span className="text-blue-400 font-black tracking-tighter text-2xl group-hover:hidden">NW</span>
          <span className="hidden group-hover:inline text-blue-300 font-black tracking-tighter text-2xl">NATTANAN_WEERAPONG</span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex gap-1 text-[11px]">
          {["home", "about", "skills", "experience", "contact"].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSection(s)}
              className={`px-4 py-2 uppercase tracking-widest transition-all ${
                activeSection === s
                  ? "text-blue-300 bg-blue-900/40 border border-blue-700/50"
                  : "text-blue-500/60 hover:text-blue-300 hover:bg-blue-900/20 border border-transparent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="text-[10px] text-blue-500/70 animate-pulse">SYSTEM_STATUS: OPTIMAL</div>
      </nav>

      {/* Mobile nav */}
      <div className="relative z-10 md:hidden flex gap-1 px-6 pt-4 overflow-x-auto pb-2">
        {["home", "about", "skills", "experience", "contact"].map((s) => (
          <button
            key={s}
            onClick={() => setActiveSection(s)}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${
              activeSection === s
                ? "text-blue-300 bg-blue-900/40 border-blue-700/50"
                : "text-blue-600/60 border-transparent"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">

        {/* ── HOME ── */}
        {activeSection === "home" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-10">
              <section>
                <div className="text-blue-400 text-xs mb-8">
                  {'>'} {text}<span className="animate-ping">_</span>
                </div>

                {/* Photo */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8 border border-zinc-800 p-2 group hover:border-blue-500/50 transition-colors">
                  <div className="w-full h-full relative overflow-hidden bg-zinc-950">
                    <Image
                      src="/Nattanan_Weerapong_Profile.jpg"
                      alt="Nattanan Weerapong Profile"
                      fill
                      className="object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-blue-500"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-blue-500"></div>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-none mt-6">
                  Mech{' '}
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px #3b82f6' }}>Eng</span>
                  <br />
                  <span className="text-blue-400 italic">Student</span>
                </h1>

                <p className="mt-8 text-zinc-400 text-lg max-w-xl leading-relaxed">
                  International student from Thailand pursuing a B.S. in Mechanical Engineering at Virginia Military Institute.
                  Focused on applying AI and Mathematics to solve complex engineering problems.
                </p>
              </section>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/Nattanan_Weerapong_Resume.pdf"
                  download="Nattanan_Weerapong_Resume.pdf"
                  className="relative px-10 py-4 bg-blue-700 hover:bg-blue-500 text-white font-bold uppercase transition-all hover:shadow-[0_0_30px_#3b82f6] active:scale-95 text-center"
                >
                  Download Resume.pdf
                </a>
                <a
                  href="mailto:weerapongn27@vmi.edu"
                  className="px-10 py-4 border border-blue-900 hover:border-blue-400 text-blue-400 font-bold uppercase transition-all backdrop-blur-sm text-center"
                >
                  Contact
                </a>
              </div>
            </div>

            {/* Right: DataPads */}
            <div className="lg:col-span-5 space-y-4">
              <DataPad label="Academic Performance" value="GPA 3.989" sub="Institute Honors Scholar" />
              <DataPad label="Primary Language" value="Thai / English" sub="Bilingual Proficiency" />
              <DataPad label="Certification" value="Data Science" sub="Issued by Coursera (May 2023)" />
              <DataPad
                label="Work Experience"
                value="Tutor · Library Assistant · Student Assistant"
                sub="VMI (Present) · VMI (Present) · CU Boulder (2022)"
              />
            </div>
          </div>
        )}

        {/* ── ABOUT ── */}
        {activeSection === "about" && (
          <div className="space-y-8 max-w-4xl">
            <SectionHeader tag="01" title="About Me" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InfoCard title="// profile">
                <InfoRow k="Origin" v="Thailand" />
                <InfoRow k="Institution" v="Virginia Military Institute" />
                <InfoRow k="Degree" v="B.S. Mechanical Engineering" />
                <InfoRow k="GPA" v="3.989 — Institute Honors" highlight />
                <InfoRow k="Languages" v="Thai · English" />
              </InfoCard>
              <InfoCard title="// concentrations & minors">
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Nuclear Engineering", "Aerospace Engineering", "Mathematics (minor)", "Physics (minor)"].map(t => (
                    <span key={t} className="px-3 py-1 text-[11px] uppercase tracking-wider border border-blue-800/60 text-blue-300 bg-blue-950/40">{t}</span>
                  ))}
                </div>
              </InfoCard>
              <InfoCard title="// honor societies">
                <InfoRow k="Tau Beta Pi" v="Engineering Honor Society" highlight />
                <InfoRow k="Pi Tau Sigma" v="Mechanical Eng. Honor Society" highlight />
              </InfoCard>
              <InfoCard title="// activities">
                <div className="flex flex-wrap gap-2 mt-1">
                  {["Aviation Club", "Heat Transfer Research", "FEM / FDM Methods", "AI in Engineering"].map(t => (
                    <span key={t} className="px-3 py-1 text-[11px] uppercase tracking-wider border border-zinc-700/60 text-zinc-400 bg-zinc-900/40">{t}</span>
                  ))}
                </div>
              </InfoCard>
            </div>
          </div>
        )}

        {/* ── SKILLS ── */}
        {activeSection === "skills" && (
          <div className="space-y-8 max-w-4xl">
            <SectionHeader tag="02" title="Skills" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((s) => (
                <div key={s.name} className="space-y-2">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-zinc-300">{s.name}</span>
                    <span className="text-blue-400 font-mono">{s.pct}%</span>
                  </div>
                  <div className="h-[3px] bg-zinc-800 w-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-700 to-blue-400 transition-all duration-1000 ease-out"
                      style={{ width: barsAnimated ? `${s.pct}%` : '0%' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <div className="text-[10px] text-blue-500/70 uppercase tracking-widest mb-4">// tools & software</div>
              <div className="flex flex-wrap gap-2">
                {["MATLAB", "Python", "SolidWorks", "Git", "Next.js", "Microsoft Office"].map(t => (
                  <span key={t} className="px-3 py-1.5 text-[11px] uppercase tracking-wider border border-blue-800/50 text-blue-300 bg-blue-950/30 hover:border-blue-400 transition-colors cursor-default">{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── EXPERIENCE ── */}
        {activeSection === "experience" && (
          <div className="space-y-8 max-w-4xl">
            <SectionHeader tag="03" title="Experience" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-[10px] text-blue-500/70 uppercase tracking-widest mb-6">// work history</div>
                <div className="space-y-6 border-l border-blue-900/60 pl-6">
                  <TimelineItem
                    active
                    role="Math, Physics & Chemistry Tutor"
                    org="Virginia Military Institute"
                    time="Present"
                    desc="Supporting cadets with core STEM subjects across the engineering curriculum."
                  />
                  <TimelineItem
                    active
                    role="Library Assistant"
                    org="Virginia Military Institute"
                    time="Present"
                    desc="Assisting with library operations and academic resources management."
                  />
                  <TimelineItem
                    role="Student Assistant"
                    org="University of Colorado Boulder"
                    time="2022"
                    desc="Provided academic and operational support in a university setting."
                  />
                </div>
              </div>
              <div>
                <div className="text-[10px] text-blue-500/70 uppercase tracking-widest mb-6">// certifications & honors</div>
                <div className="space-y-3">
                  {[
                    { name: "Data Science Professional", issuer: "Coursera", date: "May 2023" },
                    { name: "Institute Honors Scholar", issuer: "VMI", date: "Present" },
                    { name: "Tau Beta Pi", issuer: "Engineering Honor Society", date: "Active" },
                    { name: "Pi Tau Sigma", issuer: "Mech. Eng. Honor Society", date: "Active" },
                  ].map((c) => (
                    <div key={c.name} className="p-4 border border-zinc-800 bg-zinc-950/50 hover:border-blue-700/50 transition-colors group">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-bold text-zinc-100 group-hover:text-blue-300 transition-colors">{c.name}</div>
                          <div className="text-[11px] text-zinc-500 mt-1">{c.issuer}</div>
                        </div>
                        <div className="text-[10px] text-blue-500 font-mono">{c.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── CONTACT ── */}
        {activeSection === "contact" && (
          <div className="space-y-8 max-w-2xl">
            <SectionHeader tag="04" title="Contact" />
            <p className="text-zinc-400 text-sm leading-relaxed">
              Open to research opportunities, internships, and collaborations in engineering and applied mathematics.
            </p>
            <div className="space-y-3">
              <a href="mailto:weerapongn27@vmi.edu"
                className="flex items-center gap-4 p-5 border border-zinc-800 hover:border-blue-600/60 bg-zinc-950/50 transition-all group">
                <div className="text-blue-400 text-xl w-8">✉</div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Email</div>
                  <div className="text-sm text-zinc-100 group-hover:text-blue-300 transition-colors">weerapongn27@vmi.edu</div>
                </div>
              </a>
              <a href="https://linkedin.com/in/nattanan-weerapong-b900a0275" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 border border-zinc-800 hover:border-blue-600/60 bg-zinc-950/50 transition-all group">
                <div className="text-blue-400 text-xl w-8">in</div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">LinkedIn</div>
                  <div className="text-sm text-zinc-100 group-hover:text-blue-300 transition-colors">linkedin.com/in/nattanan-weerapong-b900a0275</div>
                </div>
              </a>
              <a href="/Nattanan_Weerapong_Resume.pdf" download
                className="flex items-center gap-4 p-5 border border-blue-900 hover:border-blue-500 bg-blue-950/20 transition-all group">
                <div className="text-blue-400 text-xl w-8">↓</div>
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Resume</div>
                  <div className="text-sm text-zinc-100 group-hover:text-blue-300 transition-colors">Download PDF</div>
                </div>
              </a>
            </div>
          </div>
        )}

      </div>

      {/* Ticker */}
      <div className="relative z-10 border-y border-blue-900/40 bg-blue-950/10 py-3 overflow-hidden mt-16">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex space-x-12 px-6 text-blue-700/50 text-[10px] font-bold tracking-widest uppercase">
              <span>Mechanical Engineering</span>
              <span>·</span>
              <span>Nuclear &amp; Aerospace</span>
              <span>·</span>
              <span>VMI Institute Honors</span>
              <span>·</span>
              <span>Tau Beta Pi</span>
              <span>·</span>
              <span>Pi Tau Sigma</span>
              <span>·</span>
              <span>AI &amp; Mathematics</span>
              <span>·</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

// ── Sub-components ──

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-2">
      <span className="text-[10px] text-blue-500 font-mono">{tag}</span>
      <h2 className="text-2xl font-black uppercase tracking-tight text-zinc-100">{title}</h2>
      <div className="flex-1 h-px bg-blue-900/50" />
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 border border-zinc-800 bg-zinc-950/50 hover:border-blue-800/50 transition-colors space-y-3">
      <div className="text-[10px] text-blue-500/70 uppercase tracking-widest">{title}</div>
      {children}
    </div>
  );
}

function InfoRow({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-zinc-800/60 last:border-0 text-sm">
      <span className="text-zinc-500">{k}</span>
      <span className={highlight ? "text-blue-400 font-bold" : "text-zinc-200"}>{v}</span>
    </div>
  );
}

function TimelineItem({ role, org, time, desc, active }: {
  role: string; org: string; time: string; desc: string; active?: boolean;
}) {
  return (
    <div className="relative">
      <div className={`absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full border-2 ${active ? "bg-blue-500 border-blue-500" : "bg-transparent border-blue-800"}`} />
      <div className="text-sm font-bold text-zinc-100">{role}</div>
      <div className="text-[11px] text-blue-400 font-mono mt-0.5">{org}</div>
      <div className="text-[10px] text-zinc-600 mt-0.5 mb-2">{time}</div>
      <div className="text-xs text-zinc-400 leading-relaxed">{desc}</div>
    </div>
  );
}

type DataPadProps = {
  label: string;
  value: string;
  sub?: string;
};

function DataPad({ label, value, sub }: DataPadProps) {
  return (
    <div className="group p-6 border border-zinc-800 bg-zinc-950/50 hover:border-blue-500/50 transition-all cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-blue-900 group-hover:bg-blue-500 transition-colors"></div>
      <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-xl font-bold text-zinc-100 group-hover:text-blue-300 transition-colors">{value}</div>
      {sub && <div className="text-xs text-zinc-600 mt-2">{sub}</div>}
    </div>
  );
}
