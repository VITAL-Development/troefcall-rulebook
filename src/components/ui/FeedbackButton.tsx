import { useState } from 'react'
import styles from './FeedbackButton.module.css'
import FeedbackModal from './FeedbackModal'

export default function FeedbackButton() {
  const [isOpen, setIsOpen] = useState(false)

  if (!import.meta.env.VITE_FEEDBACK_EMAIL) return null

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-label="Feedback geven"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 4h16v11H7l-3 3V4z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <FeedbackModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
