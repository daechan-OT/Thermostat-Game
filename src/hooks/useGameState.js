import { useState, useCallback, useRef } from 'react'
import { CARD_DECK } from '../data/cards'

function shuffle(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

/**
 * Build a 10-card deck with two ordering guarantees:
 *  1. Round 1 is always a choice card.
 *  2. No two environment cards appear consecutively
 *     (choice cards may repeat freely).
 *
 * Strategy: shuffle the full pool, slice to 10, then do two cheap fix passes:
 *  Pass 1 — if the first card is an env, swap it with the first choice in the deck.
 *  Pass 2 — scan for any env immediately followed by another env; swap the second
 *            env forward with the nearest choice card that follows it.
 */
function buildDeck() {
  if (CARD_DECK.length < 10) {
    console.warn(`[Thermostat] CARD_DECK has only ${CARD_DECK.length} cards — using all available.`)
  }
  const deck = shuffle(CARD_DECK).slice(0, 10)

  // Pass 1: ensure first card is a choice
  if (deck[0]?.type === 'environment') {
    const firstChoiceIdx = deck.findIndex(c => c.type === 'choice')
    if (firstChoiceIdx !== -1) {
      ;[deck[0], deck[firstChoiceIdx]] = [deck[firstChoiceIdx], deck[0]]
    }
  }

  // Pass 2: fix any consecutive env–env pairs
  for (let i = 0; i < deck.length - 1; i++) {
    if (deck[i].type === 'environment' && deck[i + 1]?.type === 'environment') {
      // Find the nearest choice card after position i+1 to swap in
      const swapIdx = deck.findIndex((c, j) => j > i + 1 && c.type === 'choice')
      if (swapIdx !== -1) {
        ;[deck[i + 1], deck[swapIdx]] = [deck[swapIdx], deck[i + 1]]
      }
      // If no choice card exists after i+1, we leave it — choices are exhausted
    }
  }

  return deck
}

const INITIAL_STATE = {
  screen: 'welcome',
  energy: 0,
  round: 0,
  deck: [],
  history: [],
  currentCard: null,
  phase: 'reading',
  selectedOption: null,
  autoplay: false,
  gaugeView: 'arc',
  historyOpen: false,
}

export function useGameState() {
  const [state, setState] = useState(INITIAL_STATE)
  // Track energy animation target separately so gauge can animate
  const [displayEnergy, setDisplayEnergy] = useState(0)
  const animationTimer = useRef(null)

  const update = useCallback((patch) => {
    setState(prev => ({ ...prev, ...patch }))
  }, [])

  // ── startGame ──────────────────────────────────────────────────────────────
  const startGame = useCallback(() => {
    const deck = buildDeck()
    setState({
      ...INITIAL_STATE,
      screen: 'game',
      energy: 0,
      round: 0,
      deck,
      history: [],
      currentCard: deck[0],
      phase: 'reading',
      selectedOption: null,
      autoplay: false,
      gaugeView: 'arc',
      historyOpen: false,
    })
    setDisplayEnergy(0)
  }, [])

  // ── selectOption ───────────────────────────────────────────────────────────
  const selectOption = useCallback((id) => {
    setState(prev => {
      if (prev.phase !== 'reading') return prev
      return { ...prev, selectedOption: id }
    })
  }, [])

  // ── confirmChoice ──────────────────────────────────────────────────────────
  const confirmChoice = useCallback(() => {
    setState(prev => {
      if (!prev.selectedOption) return prev
      return { ...prev, phase: 'revealed' }
    })
  }, [])

  // ── acknowledgeEnv ─────────────────────────────────────────────────────────
  const acknowledgeEnv = useCallback(() => {
    setState(prev => {
      if (prev.phase !== 'reading') return prev
      return { ...prev, phase: 'animating' }
    })
  }, [])

  // ── applyEnergy ────────────────────────────────────────────────────────────
  // Called after user taps "Understood" on either card type (post-reveal for choice, post-reading for env)
  const applyEnergy = useCallback((delta) => {
    setState(prev => {
      const rawNext = prev.energy + delta
      const newEnergy = Math.max(-5, Math.min(5, rawNext))
      const newRound = prev.round + 1

      // Animate the display gauge
      setDisplayEnergy(newEnergy)

      // Determine next screen after animation
      let nextScreen = 'game'
      if (Math.abs(newEnergy) >= 5) {
        nextScreen = 'lose'
      } else if (newRound >= 10) {
        nextScreen = 'win'
      }

      // Push current card to history
      const historyEntry = {
        ...prev.currentCard,
        roundNumber: prev.round + 1,
        appliedEnergy: newEnergy,
        energyDelta: delta,
        chosenOptionId: prev.selectedOption,
      }

      if (nextScreen !== 'game') {
        // Game over — update state after animation delay
        if (animationTimer.current) clearTimeout(animationTimer.current)
        animationTimer.current = setTimeout(() => {
          setState(s => ({
            ...s,
            screen: nextScreen,
            energy: newEnergy,
            round: newRound,
            history: [...s.history, historyEntry],
            phase: 'reading',
          }))
        }, 700)

        return {
          ...prev,
          phase: 'animating',
          energy: newEnergy,
          round: newRound,
          history: [...prev.history, historyEntry],
        }
      }

      // Continue — next card after animation
      const nextCard = prev.deck[newRound] || null
      if (animationTimer.current) clearTimeout(animationTimer.current)
      animationTimer.current = setTimeout(() => {
        setState(s => ({
          ...s,
          currentCard: nextCard,
          phase: 'reading',
          selectedOption: null,
        }))
      }, 700)

      return {
        ...prev,
        phase: 'animating',
        energy: newEnergy,
        round: newRound,
        history: [...prev.history, historyEntry],
      }
    })
  }, [])

  // ── nextCard ───────────────────────────────────────────────────────────────
  // Not needed separately — applyEnergy handles transition — kept for API completeness
  const nextCard = useCallback(() => {}, [])

  // ── restartGame ────────────────────────────────────────────────────────────
  const restartGame = useCallback(() => {
    if (animationTimer.current) clearTimeout(animationTimer.current)
    setDisplayEnergy(0)
    setState({
      ...INITIAL_STATE,
    })
  }, [])

  // ── toggleAutoplay ─────────────────────────────────────────────────────────
  const toggleAutoplay = useCallback(() => {
    setState(prev => ({ ...prev, autoplay: !prev.autoplay }))
  }, [])

  // ── toggleGaugeView ────────────────────────────────────────────────────────
  const toggleGaugeView = useCallback(() => {
    setState(prev => ({ ...prev, gaugeView: prev.gaugeView === 'arc' ? 'bar' : 'arc' }))
  }, [])

  // ── openHistory / closeHistory ─────────────────────────────────────────────
  const openHistory = useCallback(() => update({ historyOpen: true }), [update])
  const closeHistory = useCallback(() => update({ historyOpen: false }), [update])

  return {
    state,
    displayEnergy,
    startGame,
    selectOption,
    confirmChoice,
    acknowledgeEnv,
    applyEnergy,
    nextCard,
    restartGame,
    toggleAutoplay,
    toggleGaugeView,
    openHistory,
    closeHistory,
  }
}
