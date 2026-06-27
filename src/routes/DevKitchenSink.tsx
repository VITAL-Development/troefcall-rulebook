import { useState } from 'react'
import PlayingCard from '@/components/cards/PlayingCard'
import CardBack from '@/components/cards/CardBack'
import Hand from '@/components/cards/Hand'
import TrickPile from '@/components/cards/TrickPile'
import WoodPanel from '@/components/ui/WoodPanel'
import ScoreBadge from '@/components/ui/ScoreBadge'
import Tag from '@/components/ui/Tag'
import type { Card, TrickPlay } from '@/content/types'
import { cardId } from '@/content/types'

const sampleHand: Card[] = [
  { rank: 'A', suit: 'spades' },
  { rank: 'K', suit: 'hearts' },
  { rank: 'Q', suit: 'diamonds' },
  { rank: 'J', suit: 'clubs' },
  { rank: '10', suit: 'spades' },
]

const samplePlays: TrickPlay[] = [
  { seat: 'N', card: { rank: 'K', suit: 'hearts' } },
  { seat: 'E', card: { rank: '9', suit: 'hearts' } },
  { seat: 'S', card: { rank: 'A', suit: 'spades' } },
  { seat: 'W', card: { rank: '3', suit: 'hearts' } },
]

function DealDemo() {
  const [dealt, setDealt] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <button type="button" onClick={() => setDealt((d) => !d)}>
        {dealt ? 'Pak kaarten terug op' : 'Deel kaarten uit'}
      </button>
      <div style={{ minHeight: 140 }}>
        {!dealt && (
          <div style={{ display: 'flex', gap: 4 }}>
            {sampleHand.map((c) => (
              <PlayingCard key={cardId(c)} faceUp={false} layoutId={`deal-${cardId(c)}`} />
            ))}
          </div>
        )}
        {dealt && <Hand cards={sampleHand} trumpSuit="spades" layoutIdPrefix="deal" />}
      </div>
    </div>
  )
}

function CollectDemo() {
  const [showPile, setShowPile] = useState(true)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <button type="button" onClick={() => setShowPile((s) => !s)}>
        {showPile ? 'Verzamel slag' : 'Reset slag'}
      </button>
      <TrickPile plays={showPile ? samplePlays : []} winningSeat="S" />
    </div>
  )
}

export default function DevKitchenSink() {
  const [faceUp, setFaceUp] = useState(true)

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <h1>Kitchen sink</h1>

      <section>
        <h2>PlayingCard (face up / face down / trump)</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <PlayingCard card={{ rank: 'A', suit: 'spades' }} />
          <PlayingCard card={{ rank: 'K', suit: 'hearts' }} isTrump />
          <PlayingCard faceUp={false} />
          <PlayingCard card={{ rank: '7', suit: 'diamonds' }} size="sm" />
          <PlayingCard card={{ rank: '7', suit: 'clubs' }} size="lg" />
          <button type="button" onClick={() => setFaceUp((f) => !f)}>
            toggle flip
          </button>
          <PlayingCard card={{ rank: 'Q', suit: 'clubs' }} faceUp={faceUp} />
        </div>
      </section>

      <section>
        <h2>CardBack (deck stack)</h2>
        <CardBack stacked={6} />
      </section>

      <section>
        <h2>Hand</h2>
        <Hand cards={sampleHand} trumpSuit="spades" onPlayCard={(c) => console.log('played', c)} />
      </section>

      <section>
        <h2>TrickPile</h2>
        <TrickPile plays={samplePlays} winningSeat="S" />
      </section>

      <section>
        <h2>Deal-animatie (shared layoutId, M3)</h2>
        <DealDemo />
      </section>

      <section>
        <h2>Slag verzamelen (collect-animatie, M3)</h2>
        <CollectDemo />
      </section>

      <section>
        <h2>WoodPanel + ScoreBadge + Tag</h2>
        <WoodPanel>
          <h3>Een kap!</h3>
          <p>Zeven slagen zonder tegenslag van de tegenstander.</p>
          <ScoreBadge points={5} />
          <div style={{ marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <Tag active>Gameplay</Tag>
            <Tag onClick={() => console.log('clicked')}>Scoring</Tag>
            <Tag>Tournament</Tag>
          </div>
        </WoodPanel>
      </section>
    </div>
  )
}
