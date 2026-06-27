import PlayingCard, { type CardSize } from '@/components/cards/PlayingCard'

interface CardBackProps {
  size?: CardSize
  stacked?: number
  className?: string
}

/** A face-down deck stack, used as the "source" for deal animations. */
export default function CardBack({ size = 'md', stacked = 1, className }: CardBackProps) {
  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      {Array.from({ length: stacked }).map((_, i) => (
        <div
          key={i}
          style={{
            position: i === 0 ? 'static' : 'absolute',
            top: -i * 1.5,
            left: -i * 1.5,
          }}
        >
          <PlayingCard faceUp={false} size={size} aria-label="kaartenstapel" />
        </div>
      ))}
    </div>
  )
}
