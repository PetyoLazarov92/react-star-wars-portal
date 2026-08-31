import { useState } from 'react'
import Modal from '../shared/components/Modal'
import { useOnlineStatus } from '../shared/hooks/useOnlineStatus'

function OfflineIllustration() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="mx-auto h-16 w-16 text-slate-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3l18 18M8.5 8.5a10.5 10.5 0 0 1 11 2M5 12a10.4 10.4 0 0 1 2.6-2.9M12 19h.01M9 15.5a5 5 0 0 1 5.7-1.4"
      />
    </svg>
  )
}

function OfflineModal() {
  const isOnline = useOnlineStatus()
  const [dismissed, setDismissed] = useState(false)
  const [lastOnline, setLastOnline] = useState(isOnline)

  // Re-arm the modal for the next time the connection drops, following the same render-time
  // "adjust state when a prop changes" pattern usePeople uses to reset on page changes, so a
  // synchronous setState is never called from inside an effect body.
  if (isOnline !== lastOnline) {
    setLastOnline(isOnline)
    if (isOnline) {
      setDismissed(false)
    }
  }

  return (
    <Modal open={!isOnline && !dismissed} title="You're offline" onClose={() => setDismissed(true)}>
      <div className="mt-4 flex flex-col items-center gap-3 text-center">
        <OfflineIllustration />
        <p className="text-slate-600">
          It looks like you have lost your internet connection. Some content may not load until you
          are back online.
        </p>
      </div>
    </Modal>
  )
}

export default OfflineModal
