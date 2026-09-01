import StaticPage from '../shared/components/StaticPage'

function TermsPage() {
  return (
    <StaticPage title="Terms and Conditions">
      <p>Last updated: September 2026</p>
      <p>
        By using Star Wars Portal, you agree to the terms on this page. Please read them, even
        though, as demo applications go, there isn't much at stake.
      </p>

      <h2>What this application is</h2>
      <p>
        This is a demonstration and portfolio project, not a commercial product or a production
        service. It is provided for illustrative purposes only, "as is," with no guarantee of
        availability, accuracy, or fitness for any particular purpose.
      </p>

      <h2>The login form</h2>
      <p>
        The login form performs client-side format validation only. It does not check your username
        or password against any real account, does not create an account, and does not store your
        password anywhere. Please do not enter a real password you use elsewhere.
      </p>

      <h2>Character data and trademarks</h2>
      <p>
        Character information is retrieved from the public SWAPI and displayed for demonstration
        purposes. This project is not affiliated with, endorsed by, or sponsored by Lucasfilm Ltd.
        or The Walt Disney Company. Star Wars and all associated names, characters, and marks are
        the property of their respective owners.
      </p>

      <h2>No warranty</h2>
      <p>
        This application is provided without warranties of any kind, express or implied, including
        but not limited to warranties of merchantability, fitness for a particular purpose, or
        non-infringement.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, the creators of this project are not liable for any
        damages arising from your use of, or inability to use, this application.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        These terms may be updated from time to time. Continued use of the application after a
        change constitutes acceptance of the updated terms.
      </p>
    </StaticPage>
  )
}

export default TermsPage
