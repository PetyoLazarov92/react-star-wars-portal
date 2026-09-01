import type { ReactNode } from 'react'

interface StaticPageProps {
  title: string
  children: ReactNode
}

const PROSE_CLASS_NAME =
  'space-y-4 text-slate-700 dark:text-slate-300 [&_h2]:mt-6 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-900 [&_h2]:dark:text-slate-100 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_li]:leading-relaxed [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:dark:bg-slate-800 [&_a]:text-sky-700 [&_a]:underline [&_a]:underline-offset-2 [&_a]:hover:text-sky-900 [&_a]:dark:text-sky-400 [&_a]:dark:hover:text-sky-300'

// Shared layout for long-form content pages (About, Privacy Policy, Terms and Conditions): the
// page itself writes plain semantic HTML (h2, p, ul/li, a, code), and this wrapper applies
// consistent typography and spacing via Tailwind descendant selectors, so all three read as one
// visual system instead of each hand-rolling its own prose styles. Reused by three pages (the
// project's own rule-of-three threshold for extracting something shared).
function StaticPage({ title, children }: StaticPageProps) {
  return (
    <main className="flex flex-1 justify-center p-6">
      <article className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{title}</h1>
        <div className={PROSE_CLASS_NAME}>{children}</div>
      </article>
    </main>
  )
}

export default StaticPage
