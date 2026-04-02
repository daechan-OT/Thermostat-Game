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

function buildDeck() {
  const allChoices = shuffle(CARD_DECK.filter(c => c.type === 'choice'))
  const allEnvs = shuffle(CARD_DECK.filter(c => c.type === 'environment'))

  // Pool a random mix for a 10-card deck (e.g. 6 Choices and 4 Environments)
  // This ensures we have enough Choices to separate any consecutive Environments.
  const deck = shuffle([
    ...allChoices.slice(0, 6),
    ...allEnvs.slice(0, 4)
  ])

  // Pass 1: Ensure the first card is always a Choice
  if (deck[0]?.type === 'environment') {
    const swapIdx = deck.findIndex(c => c.type === 'choice')
    if (swapIdx !== -1) {
      ;[deck[0], deck[swapIdx]] = [deck[swapIdx], deck[0]]
    }
  }

  // Pass 2: No consecutive Environment cards
  for (let i = 0; i < deck.length - 1; i++) {
    if (deck[i].type === 'environment' && deck[i + 1]?.type === 'environment') {
      // Find the next available choice card to swap into position i+1
      const swapIdx = deck.findIndex((c, idx) => idx > i + 1 && c.type === 'choice')
      if (swapIdx !== -1) {
        ;[deck[i + 1], deck[swapIdx]] = [deck[swapIdx], deck[i + 1]]
      } else {
        // If no choice card remains (shouldn't happen with 6:4 mix), try swapping with an earlier choice
        const earlierSwapIdx = deck.findIndex((c, idx) => idx < i && c.type === 'choice' && deck[idx - 1]?.type !== 'environment')
        if (earlierSwapIdx !== -1) {
           ;[deck[i+1], deck[earlierSwapIdx]] = [deck[earlierSwapIdx], deck[i+1]]
        }
      }
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
  // Called after user taps "Understood".
  // IMPORTANT: history is NOT updated synchronously here.
  // It is pushed atomically inside the timeout — at the exact same moment
  // currentCard changes — so the card never appears in both places at once.
  const applyEnergy = useCallback((impact) => {
    setState(prev => {
      let delta = impact
      if (impact === 'balance') {
        delta = prev.energy > 0 ? -1 : prev.energy < 0 ? 1 : 0
      }

      const rawNext = prev.energy + delta
      const newEnergy = Math.max(-5, Math.min(5, rawNext))
      const newRound = prev.round + 1

      setDisplayEnergy(newEnergy)

      let nextScreen = 'game'
      if (Math.abs(newEnergy) >= 5) nextScreen = 'lose'
      else if (newRound >= 10) nextScreen = 'win'

      const historyEntry = {
        ...prev.currentCard,
        roundNumber: prev.round + 1,
        appliedEnergy: newEnergy,
        energyDelta: delta,
        chosenOptionId: prev.selectedOption,
      }

      const nextCard = prev.deck[newRound] || null

      if (animationTimer.current) clearTimeout(animationTimer.current)
      animationTimer.current = setTimeout(() => {
        // Single atomic update: advance card AND push history at the same time.
        // This triggers the AnimatePresence key change (card exit) and history
        // stack gain in the same render — the card visually "becomes" the top
        // of the history stack rather than disappearing separately.
        setState(s => ({
          ...s,
          screen: nextScreen,
          currentCard: nextScreen === 'game' ? nextCard : s.currentCard,
          phase: 'reading',
          selectedOption: null,
          energy: newEnergy,
          round: newRound,
          history: [...s.history, historyEntry],
        }))
      }, 650)

      // Synchronous: only lock the card in animating phase.
      // round and history stay unchanged until the timeout fires.
      return {
        ...prev,
        phase: 'animating',
        energy: newEnergy,
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
