# `.gitignore` Reader

A utility to find, read and parse the content of the nearest `.gitignore` file in the current or parent directories.

## Install

To use `gitignore-reader`, install it via npm:

```bash
npm i -D gitignore-reader
# or
yarn add -D gitignore-reader
```

## Usage

```js
import { findGitignore, readGitignore } from 'gitignore-reader'

// Find the nearest .gitignore file
const gitignorePath = findGitignore()

if (gitignorePath) {
  console.log('Found .gitignore file:', gitignorePath)
} else {
  console.log('No .gitignore file found.')
}

// Read and parse the content of the nearest .gitignore file
const gitignoreContent = readGitignore()

if (gitignoreContent.length > 0) {
  console.log('Gitignore content:', gitignoreContent)
} else {
  console.log('No content found in .gitignore file.')
}
```

## API

### `findGitignore(maxMoves?: number): string | null`

Finds the nearest `.gitignore` file in the current or parent directories.

- `maxMoves`: The maximum number of parent directories to search (default is 3).
- Returns the path to the found `.gitignore` file, or `null` if not found.

### `readGitignore(maxMoves?: number): string[]`

Reads and parses the content of the nearest `.gitignore` file.

- `maxMoves`: The maximum number of parent directories to search for the `.gitignore` file (default is 3).
- Returns an array of lines from the `.gitignore` file, excluding empty lines and comments.

## Contributing

We 💛&nbsp; issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## License

![GitHub](https://img.shields.io/github/license/bent10/module-starter)

A project by [Stilearning](https://stilearning.com) &copy; 2024.
