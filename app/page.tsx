"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SECTIONS = ["home", "about", "studies", "experience", "contact"] as const;
type SectionId = typeof SECTIONS[number];

const SECTION_LABELS: Record<SectionId, string> = {
  home: "Home",
  about: "About",
  studies: "Skills",
  experience: "Experience",
  contact: "Contact",
};

function FadeIn({
  children,
  delay = 0,
  className = "",
  from = "bottom",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  from?: "bottom" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const translate = from === "left"
    ? (visible ? "translate-x-0" : "-translate-x-3")
    : (visible ? "translate-y-0" : "translate-y-4");

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? "opacity-100" : "opacity-0"} ${translate} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const [heroIn, setHeroIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const proficient = [
    "Mechanical Design & CAD",
    "Controls & Dynamic Systems",
    "Heat Transfer & Thermodynamics",
    "Stress Analysis & FEM",
    "Fluid Mechanics",
    "MATLAB",
  ];
  const familiar = ["Aerospace Systems", "Nuclear Engineering"];

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#1f1d18]">

      {/* NAV */}
      <nav className="sticky top-0 z-20 bg-[#f7f3ec]/90 backdrop-blur-md border-b border-[#ddd5c0]">
        <div className="max-w-4xl mx-auto px-6 sm:px-10 py-4 flex justify-between items-center">
          <button
            onClick={() => scrollTo("home")}
            className="font-[family-name:var(--font-display)] italic text-xl text-[#1f1d18] hover:text-[#8b6f3b] transition-colors duration-300"
          >
            Nattanan Weerapong
          </button>
          <div className="hidden md:flex items-center gap-1">
            {SECTIONS.map((s) => (
              <NavLink key={s} label={SECTION_LABELS[s]} active={activeSection === s} onClick={() => scrollTo(s)} />
            ))}
          </div>
        </div>
        <div className="md:hidden flex gap-1 px-4 pb-3 pt-2 overflow-x-auto">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`px-3 py-1 text-[10px] tracking-widest uppercase whitespace-nowrap transition-colors duration-200 ${
                activeSection === s ? "bg-[#1f1d18] text-[#f7f3ec]" : "text-[#6b6557] hover:text-[#1f1d18]"
              }`}
            >
              {SECTION_LABELS[s]}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 sm:px-10">

        {/* ── HOME ── */}
        <section id="home" className="scroll-mt-28 pt-20 sm:pt-28 pb-28 sm:pb-36">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">

            {/* Left: text */}
            <div className="md:col-span-7 order-2 md:order-1 space-y-8">
              <div
                className={`text-[10px] tracking-[0.3em] uppercase text-[#8b6f3b] transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                style={{ transitionDelay: "0ms" }}
              >
                Virginia Military Institute · Mechanical Engineering
              </div>

              <h1
                className={`font-[family-name:var(--font-display)] text-6xl sm:text-7xl md:text-[5.5rem] leading-[1.0] text-[#1f1d18] transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "110ms" }}
              >
                Nattanan<br />
                <span className="italic font-normal text-[#4a4438]">Weerapong</span>
              </h1>

              <p
                className={`text-base leading-[1.8] text-[#5a5346] max-w-md transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "220ms" }}
              >
                B.S. Mechanical Engineering student with concentrations in nuclear
                and aerospace engineering. GPA 3.99 · Institute Honors Scholar.
              </p>

              <div
                className={`flex flex-wrap gap-3 transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "330ms" }}
              >
                <a
                  href="/Nattanan_Weerapong_Resume.pdf"
                  download
                  className="px-6 py-2.5 bg-[#1f1d18] text-[#f7f3ec] text-[11px] tracking-[0.2em] uppercase hover:bg-[#8b6f3b] active:scale-95 transition-all duration-300"
                >
                  Resume
                </a>
                <button
                  onClick={() => scrollTo("contact")}
                  className="px-6 py-2.5 border border-[#c9b99a] text-[#5a5346] text-[11px] tracking-[0.2em] uppercase hover:border-[#1f1d18] hover:text-[#1f1d18] active:scale-95 transition-all duration-300"
                >
                  Get in touch
                </button>
              </div>
            </div>

            {/* Right: photo */}
            <div
              className={`md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end transition-all duration-1000 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              style={{ transitionDelay: "180ms" }}
            >
              <div className="relative w-52 sm:w-60 md:w-full max-w-[260px] aspect-[3/4] overflow-hidden group shadow-[0_20px_60px_-15px_rgba(31,29,24,0.2)]">
                <Image
                  src="/Profile.PNG"
                  alt="Nattanan Weerapong, VMI Cadet"
                  fill
                  sizes="(max-width: 768px) 240px, 260px"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1f1d18]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

          </div>
        </section>

        {/* ── ABOUT ── */}
        <Section id="about" title="About">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            <FadeIn delay={80}>
              <p className="text-[15px] leading-[1.85] text-[#5a5346]">
                I'm an international student from Thailand studying Mechanical
                Engineering at VMI on the Institute Honors track. My focus is on
                nuclear and aerospace systems, with a strong interest in the
                mathematics behind them. Outside class, I tutor STEM subjects and
                work in the Institute library. I'm actively looking for research
                roles and internships.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <dl className="space-y-0 divide-y divide-[#e5ddd0]">
                {[
                  ["Origin", "Thailand"],
                  ["Institution", "Virginia Military Institute"],
                  ["Degree", "B.S. Mechanical Engineering"],
                  ["Concentrations", "Nuclear · Aerospace"],
                  ["Minors", "Mathematics · Physics"],
                  ["Societies", "Tau Beta Pi · Pi Tau Sigma"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between items-baseline py-3 group cursor-default">
                    <dt className="text-[11px] tracking-widest uppercase text-[#9d8e7a] group-hover:text-[#8b6f3b] transition-colors duration-200">{k}</dt>
                    <dd className="text-[13px] text-[#1f1d18] text-right group-hover:text-[#4a4438] transition-colors duration-200">{v}</dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>
        </Section>

        {/* ── SKILLS ── */}
        <Section id="studies" title="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

            {/* Proficient */}
            <div>
              <FadeIn>
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-6">Proficient</p>
              </FadeIn>
              <ul className="divide-y divide-[#e5ddd0]">
                {proficient.map((item, i) => (
                  <FadeIn key={item} delay={i * 60}>
                    <li className="group flex items-center justify-between py-3.5 cursor-default">
                      <span className="text-[15px] text-[#1f1d18] group-hover:text-[#8b6f3b] group-hover:translate-x-1 transition-all duration-200">
                        {item}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-[#c9b99a] group-hover:bg-[#8b6f3b] transition-colors duration-200" />
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>

            {/* Familiar + Tools */}
            <div className="space-y-10">
              <div>
                <FadeIn delay={100}>
                  <p className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-6">Familiar</p>
                </FadeIn>
                <ul className="divide-y divide-[#e5ddd0]">
                  {familiar.map((item, i) => (
                    <FadeIn key={item} delay={100 + i * 60}>
                      <li className="group flex items-center justify-between py-3.5 cursor-default">
                        <span className="text-[15px] text-[#1f1d18] group-hover:text-[#8b6f3b] group-hover:translate-x-1 transition-all duration-200">
                          {item}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-[#c9b99a] group-hover:bg-[#8b6f3b] transition-colors duration-200" />
                      </li>
                    </FadeIn>
                  ))}
                </ul>
              </div>

              <FadeIn delay={200}>
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-4">Tools & Software</p>
                <div className="flex flex-wrap gap-2">
                  {["MATLAB", "Python", "SolidWorks", "Git", "Next.js", "MS Office"].map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1.5 text-[12px] border border-[#d8ceb8] text-[#5a5346] hover:border-[#8b6f3b] hover:text-[#1f1d18] transition-all duration-200 cursor-default"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

          </div>
        </Section>

        {/* ── EXPERIENCE ── */}
        <Section id="experience" title="Experience">
          <div className="space-y-px">
            {[
              {
                role: "Mathematics, Physics & Chemistry Tutor",
                org: "Virginia Military Institute",
                time: "Present",
                desc: "Supporting cadets with core STEM subjects across the engineering curriculum.",
              },
              {
                role: "Library Assistant",
                org: "Virginia Military Institute",
                time: "Present",
                desc: "Assisting with library operations and academic resource management.",
              },
              {
                role: "Student Assistant",
                org: "University of Colorado Boulder",
                time: "2022",
                desc: "Academic and operational support within a university setting.",
              },
            ].map((item, i) => (
              <FadeIn key={item.role} delay={i * 100}>
                <div className="group border border-transparent hover:border-[#ddd5c0] hover:bg-[#f0ebe0] p-5 -mx-5 transition-all duration-300 cursor-default">
                  <div className="flex items-start gap-4 sm:gap-6">
                    <span className="text-[10px] tracking-widest uppercase text-[#9d8e7a] mt-1 shrink-0 w-14 group-hover:text-[#8b6f3b] transition-colors duration-200">
                      {item.time}
                    </span>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-[#1f1d18] leading-snug">
                        {item.role}
                      </h3>
                      <p className="text-[12px] text-[#9d8e7a] mt-0.5 italic">{item.org}</p>
                      <p className="text-[13px] leading-relaxed text-[#5a5346] mt-2">{item.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={150} className="mt-14">
            <p className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-5">Honors & Certifications</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { title: "Institute Honors Scholar", sub: "Virginia Military Institute" },
                { title: "Tau Beta Pi", sub: "Engineering Honor Society" },
                { title: "Pi Tau Sigma", sub: "Mechanical Engineering Honor Society" },
                { title: "Data Science Professional", sub: "Coursera · May 2023" },
              ].map((c) => (
                <div key={c.title} className="p-4 border border-[#e5ddd0] hover:border-[#c9b99a] hover:bg-[#f0ebe0] transition-all duration-200 cursor-default group">
                  <p className="text-[14px] font-medium text-[#1f1d18] group-hover:text-[#4a4438] transition-colors">{c.title}</p>
                  <p className="text-[11px] text-[#9d8e7a] mt-0.5">{c.sub}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </Section>

        {/* ── CONTACT ── */}
        <Section id="contact" title="Contact">
          <div className="max-w-lg">
            <FadeIn>
              <p className="text-[15px] leading-[1.85] text-[#5a5346] mb-10">
                Open to internships, research roles, and engineering collaborations.
                Feel free to reach out.
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="space-y-px">
                {[
                  { label: "Email", value: "weerapongn27@vmi.edu", href: "mailto:weerapongn27@vmi.edu" },
                  { label: "LinkedIn", value: "linkedin.com/in/nattanan-weerapong-b900a0275", href: "https://linkedin.com/in/nattanan-weerapong-b900a0275", external: true },
                  { label: "GitHub", value: "github.com/kafaak456-prog", href: "https://github.com/kafaak456-prog", external: true },
                  { label: "Resume", value: "Download PDF", href: "/Nattanan_Weerapong_Resume.pdf", download: true },
                ].map((row) => (
                  <a
                    key={row.label}
                    href={row.href}
                    target={row.external ? "_blank" : undefined}
                    rel={row.external ? "noopener noreferrer" : undefined}
                    download={row.download}
                    className="group flex items-center justify-between py-4 border-b border-[#e5ddd0] hover:border-[#c9b99a] transition-colors duration-200"
                  >
                    <span className="text-[11px] tracking-widest uppercase text-[#9d8e7a] group-hover:text-[#8b6f3b] transition-colors duration-200">
                      {row.label}
                    </span>
                    <span className="flex items-center gap-1.5 text-[13px] text-[#1f1d18] group-hover:text-[#8b6f3b] transition-colors duration-200">
                      <span className="truncate max-w-[200px] sm:max-w-xs">{row.value}</span>
                      <span className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-[#8b6f3b]">→</span>
                    </span>
                  </a>
                ))}
              </div>
            </FadeIn>
          </div>
        </Section>

        <footer className="py-14 text-center border-t border-[#e5ddd0]">
          <p className="font-[family-name:var(--font-display)] italic text-[13px] text-[#9d8e7a]">
            Nattanan Weerapong · 2026
          </p>
        </footer>

      </div>
    </main>
  );
}

// ── Sub-components ──

function NavLink({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-[11px] tracking-[0.16em] uppercase transition-all duration-250 ease-out hover:-translate-y-px ${
        active
          ? "bg-[#1f1d18] text-[#f7f3ec]"
          : "text-[#6b6557] hover:bg-[#1f1d18]/8 hover:text-[#1f1d18]"
      }`}
    >
      {label}
    </button>
  );
}

function Section({ id, title, children }: { id: SectionId; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [lineIn, setLineIn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setLineIn(true); observer.disconnect(); } },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className="scroll-mt-28 py-20 sm:py-24">
      <div ref={ref} className="flex items-center gap-5 mb-12 sm:mb-14">
        <h2 className="font-[family-name:var(--font-display)] italic text-4xl sm:text-5xl text-[#1f1d18] shrink-0">
          {title}
        </h2>
        <div className={`flex-1 h-px bg-[#ddd5c0] origin-left transition-transform duration-700 ease-out delay-150 ${lineIn ? "scale-x-100" : "scale-x-0"}`} />
      </div>
      {children}
    </section>
  );
}
