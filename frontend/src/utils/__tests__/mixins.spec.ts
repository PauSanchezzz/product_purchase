import { formatDate, formatPrice, truncateWords } from '../mixins'

describe('mixins.ts', () => {
  describe('formatDate', () => {
    it('should format a date string correctly', () => {
      const date = '2025-01-08'
      expect(formatDate(date)).toBe('Enero, 08 de 2025')
    })

    it('should format a Date object correctly', () => {
      const date = new Date(2025, 0, 8)
      expect(formatDate(date)).toBe('Enero, 08 de 2025')
    })

    it('should return an empty string if date is invalid', () => {
      expect(formatDate('')).toBe('')
      expect(formatDate('invalid-date')).toBe('')
    })
  })

  describe('formatPrice', () => {
    it('should format a number as price correctly', () => {
      expect(formatPrice(1000)).toBe('$ 1,000')
      expect(formatPrice(1234.56)).toBe('$ 1,234.56')
    })

    it('should format a string number as price correctly', () => {
      expect(formatPrice('2500')).toBe('$ 2,500')
    })

    it('should return "0" on error', () => {
      // @ts-ignore
      expect(formatPrice(undefined)).toBe('0')
    })
  })

  describe('truncateWords', () => {
    it('should truncate string after max words', () => {
      const text = 'This is a long sentence that should be truncated'
      expect(truncateWords(text, 3)).toBe('This is a...')
    })

    it('should not truncate if text has fewer words than max', () => {
      const text = 'Short text'
      expect(truncateWords(text, 5)).toBe('Short text')
    })

    it('should use custom ending if provided', () => {
      const text = 'This text will be truncated'
      expect(truncateWords(text, 2, '!!!')).toBe('This text!!!')
    })
  })
})
