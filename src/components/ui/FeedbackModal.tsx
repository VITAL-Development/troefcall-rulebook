import { useEffect, useRef, useState } from 'react'
import WoodPanel from './WoodPanel'
import styles from './FeedbackModal.module.css'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!isOpen) return

    setSent(false)
    textareaRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = () => {
    const body = encodeURIComponent(`${message}\n\nURL of page: ${window.location.href}`)
    const subject = encodeURIComponent('Troefcall feedback')
    window.location.href = `mailto:${import.meta.env.VITE_FEEDBACK_EMAIL}?subject=${subject}&body=${body}`
    setSent(true)
    setMessage('')
  }

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="presentation"
    >
      <div
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="feedback-modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <WoodPanel>
          <h2 id="feedback-modal-title" className={styles.title}>
            Feedback geven
          </h2>
          <textarea
            ref={textareaRef}
            className={styles.textarea}
            placeholder="Wat kan er beter aan Troefcall?"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          {sent && <p className={styles.status}>Bedankt! Je e-mailclient is geopend om het bericht te versturen.</p>}
          <div className={styles.actions}>
            <button type="button" className={`${styles.button} ${styles.cancel}`} onClick={onClose}>
              Sluiten
            </button>
            <button
              type="button"
              className={`${styles.button} ${styles.submit}`}
              onClick={handleSubmit}
              disabled={message.trim().length === 0}
            >
              Versturen
            </button>
          </div>
        </WoodPanel>
      </div>
    </div>
  )
}
