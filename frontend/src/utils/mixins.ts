export const formatDate = (date: string | Date): string => {
  if (!date) return ''
  const d = typeof date === 'string' ? new Date(date) : date
  if (isNaN(d.getTime())) return ''

  const month = d.toLocaleString('es-ES', { month: 'long' })
  const day = String(d.getDate()).padStart(2, '0')
  const year = d.getFullYear()

  const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1)

  return `${capitalizedMonth}, ${day} de ${year}`
}

export const formatPrice = (_value: string | number) => {
  try {
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
