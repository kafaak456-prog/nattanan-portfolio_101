"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const SECTIONS = ["home", "about", "studies", "experience", "contact"] as const;
type SectionId = typeof SECTIONS[number];

const SECTION_LABELS: Record<SectionId, string> = {
  home: "Home",
  about: "About",
  studies: "Studies",
  experience: "Experience",
  contact: "Contact",
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

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
            className="font-[family-name:var(--font-display)] italic text-lg sm:text-xl text-[#1f1d18] hover:text-[#8b6f3b] transition-colors"
          >
            Nattanan Weerapong
          </button>
          <div className="hidden md:flex gap-7 text-[11px] tracking-[0.18em] uppercase">
            {SECTIONS.map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`transition-colors ${
                  activeSection === s
                    ? "text-[#8b6f3b]"
                    : "text-[#6b6557] hover:text-[#1f1d18]"
                }`}
              >
                {SECTION_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
        {/* Mobile nav */}
        <div className="md:hidden flex gap-5 px-6 pb-3 overflow-x-auto text-[10px] tracking-[0.18em] uppercase border-t border-[#c9bd9f]/50 pt-3">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => scrollTo(s)}
              className={`whitespace-nowrap transition-colors ${
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
              <div className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-6">
                Virginia Military Institute · Cadet
              </div>
              <h1 className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-[#1f1d18]">
                Nattanan
                <br />
                <span className="italic font-normal">Weerapong</span>
              </h1>
              <p className="mt-8 text-[15px] sm:text-base leading-relaxed text-[#3e3a32] max-w-xl">
                International student from Thailand pursuing a Bachelor of Science in
                Mechanical Engineering, with concentrations in nuclear and aerospace
                systems. Interested in applying mathematics and artificial intelligence
                to engineering problems of consequence.
              </p>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[13px] text-[#6b6557]">
                <DetailLine label="GPA" value="3.989" />
                <DetailLine label="Honors" value="Institute Honors Scholar" />
                <DetailLine label="Languages" value="Thai · English" />
              </div>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/Nattanan_Weerapong_Resume.pdf"
                  download="Nattanan_Weerapong_Resume.pdf"
                  className="px-7 py-3 bg-[#1f1d18] text-[#f4ecd8] text-[11px] tracking-[0.22em] uppercase hover:bg-[#8b6f3b] transition-colors"
                >
                  Curriculum Vitae
                </a>
                <button
                  onClick={() => scrollTo("contact")}
                  className="px-7 py-3 border border-[#1f1d18] text-[#1f1d18] text-[11px] tracking-[0.22em] uppercase hover:bg-[#1f1d18] hover:text-[#f4ecd8] transition-colors"
                >
                  Correspondence
                </button>
              </div>
            </div>
            <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
              <div className="relative w-56 sm:w-64 md:w-full max-w-xs aspect-[3/4] bg-[#ede4cd] p-3 shadow-[0_8px_30px_-12px_rgba(31,29,24,0.25)]">
                <div className="w-full h-full relative overflow-hidden">
                  <Image
                    src="/Profile.PNG"
                    alt="Nattanan Weerapong, VMI Cadet"
                    fill
                    sizes="(max-width: 768px) 256px, 320px"
                    className="object-cover object-top"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── ABOUT ── */}
        <Section id="about" title="About">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
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
                consequential systems.
              </p>
            </div>
            <div>
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
            </div>
          </div>
        </Section>

        <Divider />

        {/* ── STUDIES ── */}
        <Section id="studies" title="Studies">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <SkillList label="Proficient" items={proficient} />
            <SkillList label="Familiar" items={familiar} />
          </div>
          <div className="mt-12">
            <div className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-5">
              Instruments
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
          </div>
        </Section>

        <Divider />

        {/* ── EXPERIENCE ── */}
        <Section id="experience" title="Experience">
          <div className="space-y-10">
            <Role
              role="Mathematics, Physics & Chemistry Tutor"
              org="Virginia Military Institute"
              time="Present"
              desc="Supporting cadets across core STEM coursework throughout the engineering curriculum."
            />
            <Role
              role="Library Assistant"
              org="Virginia Military Institute"
              time="Present"
              desc="Assisting with library operations and the management of academic resources."
            />
            <Role
              role="Student Assistant"
              org="University of Colorado Boulder"
              time="2022"
              desc="Provided academic and operational support within a university setting."
            />
          </div>

          <div className="mt-16">
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
          </div>
        </Section>

        <Divider />

        {/* ── CONTACT ── */}
        <Section id="contact" title="Contact">
          <p className="text-[15px] leading-relaxed text-[#3e3a32] max-w-xl mb-10">
            Open to research opportunities, internships, and collaborations in
            engineering and applied mathematics. Correspondence welcomed.
          </p>
          <div className="divide-y divide-[#c9bd9f]/70 border-y border-[#c9bd9f]/70">
            <ContactRow
              label="Electronic Mail"
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
              label="Curriculum Vitae"
              value="Download (PDF)"
              href="/Nattanan_Weerapong_Resume.pdf"
              download
            />
          </div>
        </Section>

        <footer className="py-16 mt-8 text-center">
          <div className="font-[family-name:var(--font-display)] italic text-[#8b6f3b] text-sm">
            Nattanan Weerapong · MMXXVI
          </div>
        </footer>
      </div>
    </main>
  );
}

// ── Sub-components ──

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
  return (
    <section id={id} className="scroll-mt-32 py-20 sm:py-28">
      <div className="mb-12 sm:mb-16 flex items-baseline gap-6">
        <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl italic text-[#1f1d18]">
          {title}
        </h2>
        <div className="flex-1 h-px bg-[#c9bd9f]/60" />
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
        <div key={k} className="flex justify-between items-baseline gap-4 py-3.5">
          <dt className="text-[11px] tracking-[0.2em] uppercase text-[#6b6557]">
            {k}
          </dt>
          <dd className="text-[14px] text-[#1f1d18] text-right">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function SkillList({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.28em] uppercase text-[#8b6f3b] mb-5">
        {label}
      </div>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="font-[family-name:var(--font-display)] text-lg sm:text-xl text-[#1f1d18]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
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
        <h3 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl text-[#1f1d18]">
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
      className="flex justify-between items-baseline gap-6 py-5 group"
    >
      <span className="text-[11px] tracking-[0.22em] uppercase text-[#6b6557]">
        {label}
      </span>
      <span className="text-[14px] sm:text-[15px] text-[#1f1d18] group-hover:text-[#8b6f3b] transition-colors break-all text-right">
        {value}
      </span>
    </a>
  );
}
