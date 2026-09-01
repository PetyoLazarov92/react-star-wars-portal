import StaticPage from '../shared/components/StaticPage'

function AboutPage() {
  return (
    <StaticPage title="About">
      <p>
        Star Wars Portal is a small, portfolio-style demo application. It exists to show a complete,
        production-style pattern for a login flow and a paginated data table, not to provide a real
        service.
      </p>

      <h2>What it does</h2>
      <p>
        After a quick, client-side validated login (no real account is created), the app shows a
        paginated table of Star Wars characters pulled from the public SWAPI. You can page through
        the results, switch between a light, dark, or system-following theme, and everything is
        built to work comfortably on phones, tablets, and desktops.
      </p>

      <h2>Where the data comes from</h2>
      <p>
        Character data is fetched from{' '}
        <a href="https://swapi.py4e.com/api/people" target="_blank" rel="noreferrer">
          swapi.py4e.com
        </a>
        , a free, public mirror of the original Star Wars API. This project is a fan-made demo and
        is not affiliated with, endorsed by, or sponsored by Lucasfilm Ltd. or The Walt Disney
        Company. Star Wars and all related names and characters are trademarks of their respective
        owners.
      </p>

      <h2>Built with</h2>
      <ul>
        <li>React and TypeScript</li>
        <li>Vite</li>
        <li>React Router</li>
        <li>React Hook Form and Zod</li>
        <li>Tailwind CSS</li>
      </ul>

      <h2>Source code</h2>
      <p>
        This project is open source. You can browse the code, read the development history, or
        report an issue on{' '}
        <a
          href="https://github.com/PetyoLazarov92/react-star-wars-portal"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </StaticPage>
  )
}

export default AboutPage
