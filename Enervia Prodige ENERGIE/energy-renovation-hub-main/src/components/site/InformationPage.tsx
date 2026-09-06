import type { ReactNode } from "react";
import { PageShell } from "@/components/site/Layout";

type InformationPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  statusLabel?: string;
  children: ReactNode;
};

export function InformationPage({
  eyebrow,
  title,
  intro,
  statusLabel,
  children,
}: InformationPageProps) {
  return (
    <PageShell>
      <header className="relative overflow-hidden bg-[#111814] text-white">
        <div className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-white/5 bg-[#16231c] lg:block" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d9a66e]">
                {eyebrow}
              </p>
              {statusLabel && (
                <span className="border border-[#d9a66e]/40 bg-[#d9a66e]/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#e8bd8c]">
                  {statusLabel}
                </span>
              )}
            </div>
            <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl">
              {title}
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{intro}</p>
          </div>
        </div>
      </header>

      <section className="bg-[#f2efe7] px-5 py-16 text-[#17221c] sm:px-8 sm:py-20 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-5xl">{children}</div>
      </section>
    </PageShell>
  );
}

export function InformationSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="grid gap-5 border-t border-[#cfc8bb] py-10 first:border-t-0 first:pt-0 md:grid-cols-[7rem_1fr] md:gap-10">
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#9a6034]">{number}</p>
      <div>
        <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          {title}
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-7 text-[#465149] sm:text-base">
          {children}
        </div>
      </div>
    </section>
  );
}

export function MissingValue({ value }: { value: string }) {
  return (
    <span className="inline-flex border border-[#b9783e]/30 bg-[#b9783e]/8 px-2.5 py-1 text-sm font-semibold text-[#83502d]">
      {value}
    </span>
  );
}
