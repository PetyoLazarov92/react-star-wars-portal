function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 px-4 py-6 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400 sm:px-6">
      <p>&copy; {year} Star Wars Portal. All rights reserved.</p>
    </footer>
  )
}

export default Footer
