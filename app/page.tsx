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

// ── Fade-in on scroll ──
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
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const translate =
    from === "left" ? (visible ? "translate-x-0" : "-translate-x-4") : (visible ? "translate-y-0" : "translate-y-5");

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
    const onScroll = () => {
      const y = window.scrollY + 160; // offset: sticky nav height + buffer
      let active: SectionId = "home";
      for (const id of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) active = id;
      }
      setActiveSection(active);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // set correct state on mount
    return () => window.removeEventListener("scroll", onScroll);
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

  const familiar = ["Aerospace Systems", "Nuclear Engineering"];

  return (
    <main className="min-h-screen bg-[#f7f3ec] text-[#1f1d18]">

      {/* NAV */}
      <nav className="sticky top-0 z-20 bg-[#f7f3ec]/85 backdrop-blur-md border-b border-[#ddd5c0]/70">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-5 flex justify-between items-center">
          <button
            onClick={() => scrollTo("home")}
            className="font-[family-name:var(--font-display)] italic text-xl sm:text-2xl text-[#1f1d18] hover:text-[#8b6f3b] transition-colors duration-300"
          >
            NW · Portfolio
          </button>
          <div className="hidden md:flex gap-7 text-[11px] tracking-[0.18em] uppercase">
            {SECTIONS.map((s) => (
              <NavLink
                key={s}
                label={SECTION_LABELS[s]}
                active={activeSection === s}
                onClick={() => scrollTo(s)}
              />
            ))}
          </div>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex gap-5 px-6 pb-3 overflow-x-auto text-[10px] tracking-[0.18em] uppercase border-t border-[#ddd5c0]/50 pt-3">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`whitespace-nowrap transition-colors duration-300 ${
                activeSection === s ? "text-[#8b6f3b]" : "text-[#6b6557]"
              }`}
            >
              {SECTION_LABELS[s]}
            </button>
          ))}
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 sm:px-10">

        {/* ── HOME ── */}
        <section id="home" className="scroll-mt-32 pt-16 sm:pt-24 pb-24 sm:pb-32">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-start">
            <div className="md:col-span-7 order-2 md:order-1">
              {/* Staggered hero entrance */}
              <div
                className={`text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-6 transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "0ms" }}
              >
                Virginia Military Institute · Cadet
              </div>
              <h1
                className={`font-[family-name:var(--font-display)] font-medium text-6xl sm:text-7xl md:text-8xl leading-[1.0] tracking-tight text-[#1f1d18] transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "120ms" }}
              >
                Nattanan
                <br />
                <span className="italic">Weerapong</span>
              </h1>
              <p
                className={`mt-8 text-[15px] sm:text-base leading-relaxed text-[#5a5346] max-w-xl transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "240ms" }}
              >
                International student from Thailand pursuing a B.S. in Mechanical
                Engineering at Virginia Military Institute, with concentrations in
                nuclear and aerospace engineering. Focused on using math and AI
                to solve real engineering problems.
              </p>
              <div
                className={`mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[#6b6557] transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "340ms" }}
              >
                <DetailLine label="Cumulative GPA" value="3.99" />
                <DetailLine label="Major GPA" value="4.00" />
                <DetailLine label="Honors" value="Institute Honors Scholar" />
                <DetailLine label="Languages" value="Thai · English" />
              </div>
              <div
                className={`mt-10 flex flex-wrap gap-4 transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "440ms" }}
              >
                <a
                  href="/Nattanan_Weerapong_Resume.pdf"
                  download="Nattanan_Weerapong_Resume.pdf"
                  className="px-7 py-3 bg-[#1f1d18] text-[#f7f3ec] text-[11px] tracking-[0.22em] uppercase hover:bg-[#8b6f3b] active:scale-[0.97] transition-all duration-300"
                >
                  Download Resume
                </a>
                <button
                  onClick={() => scrollTo("contact")}
                  className="px-7 py-3 border border-[#1f1d18] text-[#1f1d18] text-[11px] tracking-[0.22em] uppercase hover:bg-[#1f1d18] hover:text-[#f7f3ec] active:scale-[0.97] transition-all duration-300"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Photo */}
            <div
              className={`md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end transition-all duration-1000 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="relative w-56 sm:w-64 md:w-full max-w-xs aspect-[3/4] bg-[#f0ebe0] p-3 shadow-[0_8px_30px_-12px_rgba(31,29,24,0.25)] overflow-hidden group cursor-pointer">
                <div className="w-full h-full relative overflow-hidden">
                  <Image
                    src="/Profile.PNG"
                    alt="Nattanan Weerapong, VMI Cadet"
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    priority
                  />
                </div>
                {/* Subtle bronze vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#8b6f3b]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── ABOUT ── */}
        <Section id="about" title="About">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <FadeIn delay={100}>
              <div className="space-y-5 text-[15px] leading-relaxed text-[#5a5346]">
                <p>
                  Raised in Thailand and now studying at the Virginia Military Institute,
                  I am pursuing a Bachelor of Science in Mechanical Engineering on the
                  Institute Honors track. My academic focus lies at the intersection of
                  nuclear and aerospace systems, with a continuing interest in the
                  mathematics that underpins both.
                </p>
                <p>
                  Outside of coursework, I serve as a tutor in mathematics, physics, and
                  chemistry, and assist in the Institute library. I am drawn to research
                  opportunities and collaborations that ask careful questions of
                  real-world engineering problems.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={220}>
              <DetailList
                rows={[
                  ["Origin", "Thailand"],
                  ["Institution", "Virginia Military Institute"],
                  ["Degree", "B.S. Mechanical Engineering"],
                  ["Concentrations", "Nuclear · Aerospace"],
                  ["Minors", "Mathematics · Physics"],
                  ["Honor Societies", "Tau Beta Pi · Pi Tau Sigma"],
                  ["Activities", "Aviation Club · Cyber Club"],
                ]}
              />
            </FadeIn>
          </div>
        </Section>

        <Divider />

        {/* ── STUDIES ── */}
        <Section id="studies" title="Skills">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <div>
              <FadeIn>
                <div className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-5">
                  Proficient
                </div>
              </FadeIn>
              <ul className="space-y-2.5">
                {proficient.map((item, i) => (
                  <FadeIn key={item} delay={i * 70}>
                    <li className="text-lg sm:text-xl text-[#1f1d18]">
                      {item}
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>
            <div>
              <FadeIn delay={100}>
                <div className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-5">
                  Familiar
                </div>
              </FadeIn>
              <ul className="space-y-2.5">
                {familiar.map((item, i) => (
                  <FadeIn key={item} delay={100 + i * 70}>
                    <li className="text-lg sm:text-xl text-[#1f1d18]">
                      {item}
                    </li>
                  </FadeIn>
                ))}
              </ul>
            </div>
          </div>
          <FadeIn delay={300} className="mt-12">
            <div className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-5">
              Tools & Software
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#5a5346]">
              {["MATLAB", "Python", "SolidWorks", "Git", "Next.js", "Microsoft Office"].map(
                (t, i, arr) => (
                  <span key={t} className="flex items-center gap-6">
                    {t}
                    {i < arr.length - 1 && (
                      <span className="text-[#ddd5c0]">·</span>
                    )}
                  </span>
                )
              )}
            </div>
          </FadeIn>
        </Section>

        <Divider />

        {/* ── EXPERIENCE ── */}
        <Section id="experience" title="Experience">
          <div className="space-y-10">
            {[
              {
                role: "Mathematics, Physics & Chemistry Tutor",
                org: "Virginia Military Institute",
                time: "Present",
                desc: "Supporting cadets across core STEM coursework throughout the engineering curriculum.",
              },
              {
                role: "Library Assistant",
                org: "Virginia Military Institute",
                time: "Present",
                desc: "Assisting with library operations and the management of academic resources.",
              },
              {
                role: "Student Assistant",
                org: "University of Colorado Boulder",
                time: "2022",
                desc: "Provided academic and operational support within a university setting.",
              },
            ].map((item, i) => (
              <FadeIn key={item.role} delay={i * 120} from="left">
                <Role {...item} />
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={200} className="mt-16">
            <div className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-6">
              Honors & Certifications
            </div>
            <DetailList
              rows={[
                ["Institute Honors Scholar", "Virginia Military Institute"],
                ["Tau Beta Pi", "Engineering Honor Society"],
                ["Pi Tau Sigma", "Mechanical Engineering Honor Society"],
                ["Data Science Professional", "Coursera, May 2023"],
              ]}
            />
          </FadeIn>
        </Section>

        <Divider />

        {/* ── CONTACT ── */}
        <Section id="contact" title="Contact">
          <FadeIn>
            <p className="text-[15px] leading-relaxed text-[#5a5346] max-w-xl mb-12">
              Open to research opportunities, internships, and collaborations in
              engineering and applied mathematics. Feel free to reach out.
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  label: "Email",
                  href: "mailto:weerapongn27@vmi.edu",
                  svg: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: "https://linkedin.com/in/nattanan-weerapong-b900a0275",
                  external: true,
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  label: "GitHub",
                  href: "https://github.com/kafaak456-prog",
                  external: true,
                  svg: (
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  ),
                },
                {
                  label: "Resume",
                  href: "/Nattanan_Weerapong_Resume.pdf",
                  download: true,
                  svg: (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                      <path d="M12 15V3m0 12-4-4m4 4 4-4" />
                      <path d="M2 17v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2" />
                    </svg>
                  ),
                },
              ].map(({ label, href, svg, external, download }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  download={download}
                  className="group flex flex-col items-center gap-3 py-8 border border-[#e5ddd0] hover:border-[#8b6f3b] hover:bg-[#f0ebe0] transition-all duration-300"
                >
                  <span className="text-[#9d8e7a] group-hover:text-[#8b6f3b] transition-colors duration-300">
                    {svg}
                  </span>
                  <span className="text-[10px] tracking-[0.22em] uppercase text-[#9d8e7a] group-hover:text-[#8b6f3b] transition-colors duration-300">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </FadeIn>
        </Section>

        <footer className="py-16 mt-8 text-center">
          <div className="italic text-[#8b6f3b] text-sm">
            Nattanan Weerapong · 2026
          </div>
        </footer>
      </div>
    </main>
  );
}

// ── Sub-components ──

function NavLink({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-[11px] tracking-[0.18em] uppercase transition-all duration-300 ease-out hover:-translate-y-px ${
        active
          ? "bg-[#1f1d18] text-[#f7f3ec]"
          : "text-[#6b6557] hover:bg-[#8b6f3b]/12 hover:text-[#1f1d18]"
      }`}
    >
      {label}
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-[#ddd5c0]/70" />;
}

function Section({
  id,
  title,
  children,
}: {
  id: SectionId;
  title: string;
  children: React.ReactNode;
}) {
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineVisible, setLineVisible] = useState(false);

  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLineVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id={id} className="scroll-mt-32 py-20 sm:py-28">
      <div ref={lineRef} className="mb-12 sm:mb-16 flex items-baseline gap-6">
        <h2 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl italic text-[#1f1d18] shrink-0">
          {title}
        </h2>
        <div
          className={`flex-1 h-px bg-[#ddd5c0]/60 origin-left transition-transform duration-700 ease-out delay-200 ${
            lineVisible ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </div>
      {children}
    </section>
  );
}

function DetailLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-[10px] tracking-[0.22em] uppercase text-[#8b6f3b]">
        {label}
      </span>
      <span className="text-[#1f1d18]">{value}</span>
    </div>
  );
}

function DetailList({ rows }: { rows: Array<[string, string]> }) {
  return (
    <dl className="divide-y divide-[#e5ddd0]/60 border-y border-[#ddd5c0]/60">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between items-baseline gap-4 py-3.5 group">
          <dt className="text-[11px] tracking-[0.2em] uppercase text-[#6b6557] transition-colors duration-200 group-hover:text-[#8b6f3b]">
            {k}
          </dt>
          <dd className="text-[14px] text-[#1f1d18] text-right transition-colors duration-200 group-hover:text-[#5a5346]">
            {v}
          </dd>
        </div>
      ))}
    </dl>
  );
}

function Role({
  role,
  org,
  time,
  desc,
}: {
  role: string;
  org: string;
  time: string;
  desc: string;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8">
      <div className="md:col-span-3 text-[11px] tracking-[0.2em] uppercase text-[#8b6f3b] pt-1">
        {time}
      </div>
      <div className="md:col-span-9">
        <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl text-[#1f1d18]">
          {role}
        </h3>
        <div className="mt-1 text-[13px] italic text-[#6b6557]">{org}</div>
        <p className="mt-3 text-[14px] leading-relaxed text-[#5a5346] max-w-2xl">
          {desc}
        </p>
      </div>
    </div>
  );
}

function ContactRow({
  label,
  value,
  href,
  external,
  download,
}: {
  label: string;
  value: string;
  href: string;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download}
      className="flex justify-between items-center gap-6 py-5 group"
    >
      <span className="text-[11px] tracking-[0.22em] uppercase text-[#6b6557] group-hover:text-[#8b6f3b] transition-colors duration-300">
        {label}
      </span>
      <span className="flex items-center gap-2 text-[14px] sm:text-[15px] text-[#1f1d18] group-hover:text-[#8b6f3b] transition-all duration-300 break-all text-right">
        {value}
        <span className="inline-block translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300 opacity-0 group-hover:opacity-100 text-[#8b6f3b]">
          →
        </span>
      </span>
    </a>
  );
}
