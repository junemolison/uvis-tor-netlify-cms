const PROHIBITED_WORDS = [
  'секс',
  'nude'
]

const PROHIBITED_DOMAINS = [
  'videonews3\\.pw',
  'alivideo11\\.pw'
]

export const SPAM_DETECTOR = new RegExp([
  ...PROHIBITED_WORDS,
  ...PROHIBITED_DOMAINS
].join('|'), 'gi')
