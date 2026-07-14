import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

// Platform/account picked per #49 discussion, confirmed on PR #53.
const LIBERAPAY_USER = 'ota-iod-98'
const DONATE_URL = `https://liberapay.com/${LIBERAPAY_USER}/donate`

export default function Footer() {
  const donateRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = donateRef.current
    if (!container) return

    // Liberapay's embeddable button replaces itself with its own markup once
    // the script loads, so it must be inserted as a real script element
    // rather than via JSX (JSX/dangerouslySetInnerHTML script tags don't
    // execute).
    const script = document.createElement('script')
    script.src = `https://liberapay.com/${LIBERAPAY_USER}/widgets/button.js`
    script.async = true
    container.appendChild(script)
  }, [])

  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/over-ons" className={styles.link}>
          Over ons
        </Link>
        <a href={`mailto:${import.meta.env.VITE_FEEDBACK_EMAIL}`} className={styles.link}>
          Feedback
        </a>
        <span ref={donateRef} className={styles.donateWidget} data-testid="donate-widget">
          <noscript>
            <a href={DONATE_URL}>
              <img alt="Donate using Liberapay" src="https://liberapay.com/assets/widgets/donate.svg" />
            </a>
          </noscript>
        </span>
      </div>
    </footer>
  )
}
