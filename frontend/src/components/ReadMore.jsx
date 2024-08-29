import { useState } from 'react'


export const ReadMore = ({ id, text, limit = 36, buttonClass }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const splittedText = text.split(' ')
  const itCanOverflow = splittedText.length > limit
  const beginText = itCanOverflow
    ? splittedText.slice(0, limit - 1).join(' ')
    : text
  const endText = splittedText.slice(limit - 1).join(' ')
  
  const handleKeyboard = (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
      setIsExpanded(!isExpanded)
    }
  }

  return (
    <p id={id}>
      {beginText}
      {itCanOverflow && (
        <>
          {!isExpanded && <span>...</span>}
          <span 
            className={`${!isExpanded && 'hidden'}`} 
            aria-hidden={!isExpanded}
          >
            {endText}
          </span>
          <span
            className={`${buttonClass} mt-2`}
            role="button"
            tabIndex={0}
            aria-expanded={isExpanded}
            aria-controls={id}
            onKeyDown={handleKeyboard}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? '  read less' : 'read more'}
          </span>
        </>
      )}
    </p>
  )
}