"use client";
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const SECTIONS = ["home", "about", "skills", "experience", "contact"] as const;
type SectionId = typeof SECTIONS[number];

export default function Home() {
  const [text, setText] = useState("");
  const [activeSection, setActiveSection] = useState<SectionId>("home");
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

  // Track which section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: SectionId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const proficient = [
    "MATLAB",
    "Mechanical Design & CAD",
    "Heat Transfer & Thermodynamics",
    "Stress Analysis & FEM",
    "Controls & Dynamic Systems",
    "Fluid Mechanics",
  ];

  const familiar = [
    "Aerospace Systems",
    "Nuclear Engineering",
  ];

  return (
    <main className="min-h-screen bg-[#1c1d22] text-stone-200 font-mono selection:bg-amber-400/25 overflow-x-hidden">

      {/* Animated Grid Background */}
      <div
        className="fixed inset-0 z-0 opacity-[0.08]"
        style={{
          backgroundImage: `linear-gradient(#2a2418 1px, transparent 1px), linear-gradient(90deg, #2a2418 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Blue ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(217,182,98,0.07) 0%, transparent 70%)' }} />

      {/* NAV */}
      <nav className="sticky top-0 z-20 p-6 flex justify-between items-center max-w-7xl mx-auto border-b border-amber-900/40 backdrop-blur-md bg-[#1c1d22]/80">
        <button onClick={() => scrollTo("home")} className="group cursor-pointer text-left">
          <span className="text-amber-400 font-black tracking-tighter text-2xl group-hover:hidden">NW</span>
          <span className="hidden group-hover:inline text-amber-300 font-black tracking-tighter text-2xl">NATTANAN_WEERAPONG</span>
        </button>

        {/* Nav links */}
        <div className="hidden md:flex gap-1 text-[11px]">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`px-4 py-2 uppercase tracking-widest transition-all ${
                activeSection === s
                  ? "text-amber-300 bg-amber-900/40 border border-amber-700/50"
                  : "text-amber-500/60 hover:text-amber-300 hover:bg-amber-900/20 border border-transparent"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="text-[10px] text-amber-500/70 animate-pulse hidden sm:block">SYSTEM_STATUS: OPTIMAL</div>
      </nav>

      {/* Mobile nav */}
      <div className="sticky top-[88px] z-20 md:hidden flex gap-1 px-6 pt-3 pb-2 overflow-x-auto bg-[#1c1d22]/80 backdrop-blur-md border-b border-amber-900/30">
        {SECTIONS.map((s) => (
          <button
            key={s}
            onClick={() => scrollTo(s)}
            className={`px-3 py-1.5 text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border ${
              activeSection === s
                ? "text-amber-300 bg-amber-900/40 border-amber-700/50"
                : "text-amber-600/60 border-transparent"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 space-y-32">

        {/* ── HOME ── */}
        <section id="home" className="scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-10">
              <div>
                <div className="text-amber-400 text-xs mb-8 break-words">
                  {'>'} {text}<span className="animate-ping">_</span>
                </div>

                {/* Photo */}
                <div className="relative w-56 sm:w-64 md:w-72 aspect-[3/4] mb-8 border border-stone-800 p-2 group hover:border-amber-500/50 transition-colors">
                  <div className="w-full h-full relative overflow-hidden bg-stone-950">
                    <Image
                      src="/Profile.PNG"
                      alt="Nattanan Weerapong, VMI Cadet"
                      fill
                      sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                      className="object-cover object-top transition-all duration-700 ease-in-out group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-amber-500"></div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-amber-500"></div>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-none mt-6">
                  Mech{' '}
                  <span className="text-transparent" style={{ WebkitTextStroke: '1px #d4a657' }}>Eng</span>
                  <br />
                  <span className="text-amber-400 italic">Student</span>
                </h1>

                <p className="mt-8 text-stone-400 text-base sm:text-lg max-w-xl leading-relaxed">
                  International student from Thailand pursuing a B.S. in Mechanical Engineering at Virginia Military Institute.
                  Focused on applying AI and Mathematics to solve complex engineering problems.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a
                  href="/Nattanan_Weerapong_Resume.pdf"
                  download="Nattanan_Weerapong_Resume.pdf"
                  className="relative px-8 sm:px-10 py-4 bg-amber-600/90 hover:bg-amber-500/90 text-stone-50 font-bold uppercase transition-all hover:shadow-[0_0_24px_rgba(217,182,98,0.4)] active:scale-95 text-center text-sm sm:text-base"
                >
                  Download Resume.pdf
                </a>
                <button
                  onClick={() => scrollTo("contact")}
                  className="px-8 sm:px-10 py-4 border border-amber-900 hover:border-amber-400 text-amber-400 font-bold uppercase transition-all backdrop-blur-sm text-center text-sm sm:text-base"
                >
                  Contact
                </button>
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
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="scroll-mt-32 space-y-8 max-w-4xl">
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
                  <span key={t} className="px-3 py-1 text-[11px] uppercase tracking-wider border border-amber-800/60 text-amber-300 bg-amber-950/40">{t}</span>
                ))}
              </div>
            </InfoCard>
            <InfoCard title="// honor societies">
              <InfoRow k="Tau Beta Pi" v="Engineering Honor Society" highlight />
              <InfoRow k="Pi Tau Sigma" v="Mechanical Eng. Honor Society" highlight />
            </InfoCard>
            <InfoCard title="// activities">
              <div className="flex flex-wrap gap-2 mt-1">
                {["Aviation Club", "Cyber Club"].map(t => (
                  <span key={t} className="px-3 py-1 text-[11px] uppercase tracking-wider border border-stone-700/60 text-stone-400 bg-stone-900/40">{t}</span>
                ))}
              </div>
            </InfoCard>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="scroll-mt-32 space-y-8 max-w-4xl">
          <SectionHeader tag="02" title="Skills" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SkillColumn label="// proficient" items={proficient} accent />
            <SkillColumn label="// familiar" items={familiar} />
          </div>
          <div className="mt-8">
            <div className="text-[10px] text-amber-500/70 uppercase tracking-widest mb-4">// tools & software</div>
            <div className="flex flex-wrap gap-2">
              {["MATLAB", "Python", "SolidWorks", "Git", "Next.js", "Microsoft Office"].map(t => (
                <span key={t} className="px-3 py-1.5 text-[11px] uppercase tracking-wider border border-amber-800/50 text-amber-300 bg-amber-950/30 hover:border-amber-400 transition-colors cursor-default">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="scroll-mt-32 space-y-8 max-w-4xl">
          <SectionHeader tag="03" title="Experience" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] text-amber-500/70 uppercase tracking-widest mb-6">// work history</div>
              <div className="space-y-6 border-l border-amber-900/60 pl-6">
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
              <div className="text-[10px] text-amber-500/70 uppercase tracking-widest mb-6">// certifications & honors</div>
              <div className="space-y-3">
                {[
                  { name: "Data Science Professional", issuer: "Coursera", date: "May 2023" },
                  { name: "Institute Honors Scholar", issuer: "VMI", date: "Present" },
                  { name: "Tau Beta Pi", issuer: "Engineering Honor Society", date: "Active" },
                  { name: "Pi Tau Sigma", issuer: "Mech. Eng. Honor Society", date: "Active" },
                ].map((c) => (
                  <div key={c.name} className="p-4 border border-stone-800 bg-stone-950/50 hover:border-amber-700/50 transition-colors group">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-bold text-stone-100 group-hover:text-amber-300 transition-colors">{c.name}</div>
                        <div className="text-[11px] text-stone-500 mt-1">{c.issuer}</div>
                      </div>
                      <div className="text-[10px] text-amber-500 font-mono">{c.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="scroll-mt-32 space-y-8 max-w-2xl">
          <SectionHeader tag="04" title="Contact" />
          <p className="text-stone-400 text-sm leading-relaxed">
            Open to research opportunities, internships, and collaborations in engineering and applied mathematics.
          </p>
          <div className="space-y-3">
            <a href="mailto:weerapongn27@vmi.edu"
              className="flex items-center gap-4 p-5 border border-stone-800 hover:border-amber-600/60 bg-stone-950/50 transition-all group">
              <div className="text-amber-400 text-xl w-8">✉</div>
              <div className="min-w-0">
                <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-1">Email</div>
                <div className="text-sm text-stone-100 group-hover:text-amber-300 transition-colors break-all">weerapongn27@vmi.edu</div>
              </div>
            </a>
            <a href="https://linkedin.com/in/nattanan-weerapong-b900a0275" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 border border-stone-800 hover:border-amber-600/60 bg-stone-950/50 transition-all group">
              <div className="text-amber-400 text-xl w-8 font-bold">in</div>
              <div className="min-w-0">
                <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-1">LinkedIn</div>
                <div className="text-sm text-stone-100 group-hover:text-amber-300 transition-colors break-all">linkedin.com/in/nattanan-weerapong-b900a0275</div>
              </div>
            </a>
            <a href="https://github.com/kafaak456-prog" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 border border-stone-800 hover:border-amber-600/60 bg-stone-950/50 transition-all group">
              <div className="text-amber-400 text-xl w-8 font-bold">{'{ }'}</div>
              <div className="min-w-0">
                <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-1">GitHub</div>
                <div className="text-sm text-stone-100 group-hover:text-amber-300 transition-colors break-all">github.com/kafaak456-prog</div>
              </div>
            </a>
            <a href="/Nattanan_Weerapong_Resume.pdf" download
              className="flex items-center gap-4 p-5 border border-amber-900 hover:border-amber-500 bg-amber-950/20 transition-all group">
              <div className="text-amber-400 text-xl w-8">↓</div>
              <div className="min-w-0">
                <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-1">Resume</div>
                <div className="text-sm text-stone-100 group-hover:text-amber-300 transition-colors">Download PDF</div>
              </div>
            </a>
          </div>
        </section>

      </div>

      {/* Ticker */}
      <div className="relative z-10 border-y border-amber-900/40 bg-amber-950/10 py-3 overflow-hidden mt-16">
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex space-x-12 px-6 text-amber-700/50 text-[10px] font-bold tracking-widest uppercase">
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
      <span className="text-[10px] text-amber-500 font-mono">{tag}</span>
      <h2 className="text-2xl font-black uppercase tracking-tight text-stone-100">{title}</h2>
      <div className="flex-1 h-px bg-amber-900/50" />
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="p-5 border border-stone-800 bg-stone-950/50 hover:border-amber-800/50 transition-colors space-y-3">
      <div className="text-[10px] text-amber-500/70 uppercase tracking-widest">{title}</div>
      {children}
    </div>
  );
}

function InfoRow({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-stone-800/60 last:border-0 text-sm gap-3">
      <span className="text-stone-500 shrink-0">{k}</span>
      <span className={`text-right ${highlight ? "text-amber-400 font-bold" : "text-stone-200"}`}>{v}</span>
    </div>
  );
}

function TimelineItem({ role, org, time, desc, active }: {
  role: string; org: string; time: string; desc: string; active?: boolean;
}) {
  return (
    <div className="relative">
      <div className={`absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full border-2 ${active ? "bg-amber-500 border-amber-500" : "bg-transparent border-amber-800"}`} />
      <div className="text-sm font-bold text-stone-100">{role}</div>
      <div className="text-[11px] text-amber-400 font-mono mt-0.5">{org}</div>
      <div className="text-[10px] text-stone-600 mt-0.5 mb-2">{time}</div>
      <div className="text-xs text-stone-400 leading-relaxed">{desc}</div>
    </div>
  );
}

function SkillColumn({ label, items, accent }: { label: string; items: string[]; accent?: boolean }) {
  return (
    <div className="p-5 border border-stone-800 bg-stone-950/50 hover:border-amber-800/50 transition-colors">
      <div className={`text-[10px] uppercase tracking-widest mb-4 ${accent ? "text-amber-400" : "text-amber-500/70"}`}>{label}</div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-3 text-sm text-stone-200">
            <span className={`w-1.5 h-1.5 ${accent ? "bg-amber-400" : "bg-amber-700"}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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
    <div className="group p-6 border border-stone-800 bg-stone-950/50 hover:border-amber-500/50 transition-all cursor-pointer relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-amber-900 group-hover:bg-amber-500 transition-colors"></div>
      <div className="text-[10px] text-stone-500 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors">{value}</div>
      {sub && <div className="text-xs text-stone-600 mt-2">{sub}</div>}
    </div>
  );
}
