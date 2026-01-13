export const formatDate = (date: string | Date): string => {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''

  const month = d.toLocaleString('es-ES', { month: 'long', timeZone: 'UTC' })
  const day = String(d.getUTCDate()).padStart(2, '0')
  const year = d.getUTCFullYear()

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)

  return `${capitalizedMonth}, ${day} de ${year}`
}

export const formatPrice = (_value: string | number | undefined | null) => {
  try {
    if (_value === undefined || _value === null) return '0'
    const valueNumber = parseFloat(_value.toString())
    const priceFormat = valueNumber.toLocaleString('es-US')

    return '$ ' + priceFormat
  } catch (error) {
    console.error('Error', error)
    return '0'
  }
}
export const truncateWords = (str: string, maxWords: number, ending = '...') => {
  const words = str.trim().split(' ')

  if (words.length <= maxWords) {
    return str
  }

  const truncated = words.slice(0, maxWords).join(' ') + ending
  return truncated
}
