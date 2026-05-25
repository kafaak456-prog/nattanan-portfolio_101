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

  const familiar = ["Aerospace Systems", "Nuclear Engineering"];

  return (
    <main className="min-h-screen bg-[#f4ecd8] text-[#1f1d18]">

      {/* NAV */}
      <nav className="sticky top-0 z-20 bg-[#f4ecd8]/85 backdrop-blur-md border-b border-[#c9bd9f]/70">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 py-5 flex justify-between items-center">
          <button
            onClick={() => scrollTo("home")}
            className="font-semibold text-lg sm:text-xl text-[#1f1d18] hover:text-[#8b6f3b] transition-colors duration-300"
          >
            Nattanan Weerapong
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
        <div className="md:hidden flex gap-5 px-6 pb-3 overflow-x-auto text-[10px] tracking-[0.18em] uppercase border-t border-[#c9bd9f]/50 pt-3">
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
                className={`font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-[#1f1d18] transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                style={{ transitionDelay: "120ms" }}
              >
                Nattanan
                <br />
                <span className="font-light">Weerapong</span>
              </h1>
              <p
                className={`mt-8 text-[15px] sm:text-base leading-relaxed text-[#3e3a32] max-w-xl transition-all duration-700 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
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
                <DetailLine label="GPA" value="3.99" />
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
                  className="px-7 py-3 bg-[#1f1d18] text-[#f4ecd8] text-[11px] tracking-[0.22em] uppercase hover:bg-[#8b6f3b] active:scale-[0.97] transition-all duration-300"
                >
                  Download Resume
                </a>
                <button
                  onClick={() => scrollTo("contact")}
                  className="px-7 py-3 border border-[#1f1d18] text-[#1f1d18] text-[11px] tracking-[0.22em] uppercase hover:bg-[#1f1d18] hover:text-[#f4ecd8] active:scale-[0.97] transition-all duration-300"
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
              <div className="relative w-56 sm:w-64 md:w-full max-w-xs aspect-[3/4] bg-[#ede4cd] p-3 shadow-[0_8px_30px_-12px_rgba(31,29,24,0.25)] overflow-hidden group cursor-pointer">
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
              <div className="space-y-5 text-[15px] leading-relaxed text-[#3e3a32]">
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
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-[#3e3a32]">
              {["MATLAB", "Python", "SolidWorks", "Git", "Next.js", "Microsoft Office"].map(
                (t, i, arr) => (
                  <span key={t} className="flex items-center gap-6">
                    {t}
                    {i < arr.length - 1 && (
                      <span className="text-[#c9bd9f]">·</span>
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
            <p className="text-[15px] leading-relaxed text-[#3e3a32] max-w-xl mb-10">
              Open to research opportunities, internships, and collaborations in
              engineering and applied mathematics. Feel free to reach out.
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <div className="divide-y divide-[#c9bd9f]/70 border-y border-[#c9bd9f]/70">
              <ContactRow
                label="Email"
                value="weerapongn27@vmi.edu"
                href="mailto:weerapongn27@vmi.edu"
              />
              <ContactRow
                label="LinkedIn"
                value="linkedin.com/in/nattanan-weerapong-b900a0275"
                href="https://linkedin.com/in/nattanan-weerapong-b900a0275"
                external
              />
              <ContactRow
                label="GitHub"
                value="github.com/kafaak456-prog"
                href="https://github.com/kafaak456-prog"
                external
              />
              <ContactRow
                label="Resume"
                value="Download (PDF)"
                href="/Nattanan_Weerapong_Resume.pdf"
                download
              />
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
      className={`relative pb-0.5 transition-colors duration-300 group ${
        active ? "text-[#8b6f3b]" : "text-[#6b6557] hover:text-[#1f1d18]"
      }`}
    >
      {label}
      {/* Animated underline */}
      <span
        className={`absolute bottom-0 left-0 h-px bg-[#8b6f3b] transition-all duration-300 ease-out ${
          active ? "w-full" : "w-0 group-hover:w-full"
        }`}
      />
    </button>
  );
}

function Divider() {
  return <div className="h-px bg-[#c9bd9f]/70" />;
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
        <h2 className="font-semibold text-3xl sm:text-4xl text-[#1f1d18] shrink-0">
          {title}
        </h2>
        <div
          className={`flex-1 h-px bg-[#c9bd9f]/60 origin-left transition-transform duration-700 ease-out delay-200 ${
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
    <dl className="divide-y divide-[#c9bd9f]/60 border-y border-[#c9bd9f]/60">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between items-baseline gap-4 py-3.5 group">
          <dt className="text-[11px] tracking-[0.2em] uppercase text-[#6b6557] transition-colors duration-200 group-hover:text-[#8b6f3b]">
            {k}
          </dt>
          <dd className="text-[14px] text-[#1f1d18] text-right transition-colors duration-200 group-hover:text-[#3e3a32]">
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
        <h3 className="font-semibold text-xl sm:text-2xl text-[#1f1d18]">
          {role}
        </h3>
        <div className="mt-1 text-[13px] italic text-[#6b6557]">{org}</div>
        <p className="mt-3 text-[14px] leading-relaxed text-[#3e3a32] max-w-2xl">
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
