/// <reference types="vitest/globals" />

import { findGitignore, readGitignore } from '../src/index.js'

describe('findGitignore', () => {
  it('should find the nearest .gitignore file in the current directory', () => {
    const gitignorePath = findGitignore()
    expect(gitignorePath).not.toBeNull()
    expect(gitignorePath).toMatch(/\.gitignore$/)
  })

  it('should find the .gitignore file in a parent directory', () => {
    const gitignorePath = findGitignore(3)
    expect(gitignorePath).not.toBeNull()
    expect(gitignorePath).toMatch(/\.gitignore$/)
  })

  it('should return null if .gitignore is not found within maxMoves limit', () => {
    const gitignorePath = findGitignore(0)
    expect(gitignorePath).toBeNull()
  })
})

describe('readGitignore', () => {
  it('should read and parse the content of the nearest .gitignore file', () => {
    const lines = readGitignore()
    expect(lines.length).toBeGreaterThan(0)
    expect(lines.every(line => typeof line === 'string')).toBe(true)
  })

  it('should exclude empty lines and comments from the .gitignore file', () => {
    const lines = readGitignore()
    expect(
      lines.some(line => line.trim() === '' || line.trim().startsWith('#'))
    ).toBe(false)
  })

  it('should return an empty array if no .gitignore file is found', () => {
    const logError = console.error
    console.error = () => null

    const lines = readGitignore(0)
    expect(lines).toEqual([])

    console.error = logError
  })
})
