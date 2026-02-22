import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://unxiutvipbqsjhphvdfj.supabase.co',
  'sb_publishable_YuiNoHq0BBYEG14Rlks3rQ_wOcK0OIW'
)

const DOMAIN_ITEMS = {
  vasomotor: [1, 2, 3],
  psychosocial: [4, 5, 6, 7, 8, 9, 10],
  physical: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
  sexual: [27, 28, 29],
}

function generateResponse() {
  const age = Math.floor(Math.random() * 26) + 45 // 45-70
  const weight = Math.floor(Math.random() * 41) + 50 // 50-90

  // Older women tend to have slightly lower vasomotor symptoms
  const ageFactor = age < 55 ? 1.1 : age < 60 ? 1.0 : age < 65 ? 0.9 : 0.8

  const answers = {}
  const domainScores = {}

  for (const [domain, items] of Object.entries(DOMAIN_ITEMS)) {
    let scoreSum = 0
    // Vary prevalence by domain
    const prevalence = domain === 'vasomotor' ? 0.7 * ageFactor
      : domain === 'sexual' ? 0.55
      : domain === 'psychosocial' ? 0.6
      : 0.65

    for (const id of items) {
      const present = Math.random() < prevalence
      if (present) {
        // Weighted random: more mid-range scores, fewer extremes
        const r = Math.random()
        const rating = r < 0.15 ? 2
          : r < 0.35 ? 3
          : r < 0.55 ? 4
          : r < 0.72 ? 5
          : r < 0.85 ? 6
          : r < 0.94 ? 7
          : 8
        answers[id] = { present: true, rating }
        scoreSum += rating
      } else {
        answers[id] = { present: false, rating: null }
        scoreSum += 1
      }
    }
    domainScores[domain] = parseFloat((scoreSum / items.length).toFixed(2))
  }

  const allScores = Object.values(DOMAIN_ITEMS).flat().map(id => {
    const a = answers[id]
    return a.present ? a.rating : 1
  })
  const globalScore = parseFloat((allScores.reduce((s, v) => s + v, 0) / 29).toFixed(2))

  // Spread created_at over last 60 days
  const daysAgo = Math.floor(Math.random() * 60)
  const hoursAgo = Math.floor(Math.random() * 24)
  const created = new Date(Date.now() - (daysAgo * 86400000) - (hoursAgo * 3600000))

  return {
    age,
    weight,
    answers,
    score_vasomotor: domainScores.vasomotor,
    score_psychosocial: domainScores.psychosocial,
    score_physical: domainScores.physical,
    score_sexual: domainScores.sexual,
    score_global: globalScore,
    created_at: created.toISOString(),
  }
}

async function seed() {
  const TOTAL = 500
  const BATCH = 50
  let inserted = 0

  for (let i = 0; i < TOTAL; i += BATCH) {
    const batch = Array.from({ length: Math.min(BATCH, TOTAL - i) }, generateResponse)
    const { error } = await supabase.from('responses').insert(batch)
    if (error) {
      console.error(`Error at batch ${i}:`, error.message)
      process.exit(1)
    }
    inserted += batch.length
    console.log(`${inserted}/${TOTAL} inserted`)
  }
  console.log('Done! 500 responses seeded.')
}

seed()
