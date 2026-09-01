interface GreetingProps {
  username: string
}

// A plain React child, not dangerouslySetInnerHTML: username is escaped automatically, so even a
// value that somehow bypassed loginSchema's character allowlist (see Greeting.test.tsx) can only
// ever render as inert text here, never as markup.
function Greeting({ username }: GreetingProps) {
  return (
    <span
      className="hidden max-w-40 truncate text-slate-700 sm:inline-block dark:text-slate-300"
      title={username}
    >
      Hi, {username}!
    </span>
  )
}

export default Greeting
