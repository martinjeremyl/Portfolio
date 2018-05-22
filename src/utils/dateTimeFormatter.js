export const dateFormatter = new Intl.DateTimeFormat('fr', {
  hour12: false,
  year: 'numeric',
  month: 'numeric',
  day: 'numeric'
})

export const timeFormatter = new Intl.DateTimeFormat('fr', {
  hour12: false,
  hour: 'numeric',
  minute: 'numeric'
})
