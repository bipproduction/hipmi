import { describe, expect, test } from 'bun:test'
import { funReplaceHtml } from '@/app_modules/_global/fun/fun_replace_html'

describe('funReplaceHtml (strip tag HTML)', () => {
  test('menghapus tag sederhana, menyisakan teks', () => {
    expect(funReplaceHtml({ html: '<p>Halo</p>' })).toBe('Halo')
  })

  test('menghapus banyak tag & nested', () => {
    expect(funReplaceHtml({ html: '<div><b>Tebal</b> biasa</div>' })).toBe('Tebal biasa')
  })

  test('menghapus tag dengan atribut', () => {
    expect(funReplaceHtml({ html: '<a href="https://x.id">link</a>' })).toBe('link')
  })

  test('string tanpa tag dikembalikan apa adanya', () => {
    expect(funReplaceHtml({ html: 'teks biasa' })).toBe('teks biasa')
  })

  test('string kosong menghasilkan string kosong', () => {
    expect(funReplaceHtml({ html: '' })).toBe('')
  })

  test('tag self-closing dan br ikut dihapus', () => {
    expect(funReplaceHtml({ html: 'baris1<br/>baris2<img src="a.png"/>' })).toBe('baris1baris2')
  })
})
