import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

/**
 * Finds the nearest `.gitignore` file in the current or parent directories.
 *
 * @param maxMoves The maximum number of parent directories to
 *   search.
 * @returns The path to the found `.gitignore` file, or null if not found.
 */
export function findGitignore(maxMoves = 3) {
  let currentDir = process.cwd()
  let moves = 0

  while (moves < maxMoves) {
    const gitignorePath = join(currentDir, '.gitignore')
    if (existsSync(gitignorePath)) {
      return gitignorePath
    }

    // move to the parent directory
    const parentDir = dirname(currentDir)
    if (parentDir === currentDir) {
      break
    }
    currentDir = parentDir
    moves++
  }

  return null
}

/**
 * Reads and parses the content of the nearest `.gitignore` file.
 *
 * @param maxMoves The maximum number of parent directories to search for the `.gitignore`
 *   file.
 * @returns An array of lines from the `.gitignore` file, excluding empty lines and
 *   comments.
 */
export function readGitignore(maxMoves = 3) {
  const gitignorePath = findGitignore(maxMoves)
  if (!gitignorePath) {
    console.error('No .gitignore file found in current or parent directories.')
    return []
  }

  try {
    const fileContent = readFileSync(gitignorePath, 'utf-8')

    const lines = fileContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))

    return lines
  } catch (error) {
    console.error('Error reading .gitignore file:', error)
    return []
  }
}
