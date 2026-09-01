import StaticPage from '../shared/components/StaticPage'

function PrivacyPolicyPage() {
  return (
    <StaticPage title="Privacy Policy">
      <p>Last updated: September 2026</p>
      <p>
        This page explains, plainly, what does and does not happen with your information when you
        use Star Wars Portal. The short version: this is a demo application with no backend and no
        real user accounts, so there is very little to explain.
      </p>

      <h2>Login and session data</h2>
      <p>
        The login form only checks that your username and password meet basic length and character
        rules. It does not check them against any real account, because none exist. Your password is
        never stored anywhere, not in your browser and not on a server, since there is no server to
        send it to.
      </p>
      <p>
        Once you submit the form, your username (only the username, never the password) is saved in
        your browser's <code>sessionStorage</code> so the app can greet you and show you the
        character table. This value never leaves your device, and it is cleared automatically as
        soon as you close the browser tab.
      </p>

      <h2>Character data and caching</h2>
      <p>
        The Star Wars character data shown in the table comes from the public SWAPI. Each page of
        results is cached in your browser's <code>localStorage</code> for a few minutes, so
        revisiting a page you've already seen doesn't need a new network request. This cache lives
        only on your device and is not sent anywhere.
      </p>

      <h2>Theme preference</h2>
      <p>
        Your choice of light, dark, or system theme is saved in <code>localStorage</code> so it is
        remembered the next time you visit. Like everything else described here, it stays on your
        device.
      </p>

      <h2>Cookies and tracking</h2>
      <p>
        This application does not use cookies, analytics, or advertising trackers of any kind. No
        information about your visit is collected or transmitted to us or to any third party.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes, the update will be reflected on this page along with a new "last
        updated" date above.
      </p>
    </StaticPage>
  )
}

export default PrivacyPolicyPage
