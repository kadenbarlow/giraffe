import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createHash } from "node:crypto"
import { dirname, resolve } from "node:path"

const [tapRepoPath, owner, repo, tag, assetPath, arch] = process.argv.slice(2)

if (!tapRepoPath || !owner || !repo || !tag || !assetPath || !arch) {
  console.error(
    "Usage: node ./scripts/update-homebrew-tap.mjs <tap-repo-path> <owner> <repo> <tag> <tarball> <arch>",
  )
  process.exit(1)
}

if (!["arm64", "x64"].includes(arch)) {
  console.error(`Unsupported arch: ${arch}`)
  process.exit(1)
}

const sha256 = createHash("sha256").update(readFileSync(assetPath)).digest("hex")
const version = tag.startsWith("v") ? tag.slice(1) : tag
const baseUrl = `https://github.com/${owner}/${repo}/releases/download/${tag}`
const formulaPath = resolve(tapRepoPath, "Formula", "giraffe.rb")
const brewArchBlock = arch === "arm64" ? "on_arm" : "on_intel"
const assetName = `giraffe-darwin-${arch}`

const formula = `class Giraffe < Formula
  desc "Terminal-based GraphQL client"
  homepage "https://github.com/${owner}/${repo}"
  version "${version}"

  on_macos do
    ${brewArchBlock} do
      url "${baseUrl}/${assetName}.tar.gz"
      sha256 "${sha256}"
    end
  end

  def install
    bin.install "${assetName}" => "giraffe"
  end

  test do
    assert_match "Giraffe is a terminal-first GraphQL client.", shell_output("#{bin}/giraffe --help")
  end
end
`

mkdirSync(dirname(formulaPath), { recursive: true })
writeFileSync(formulaPath, formula)
console.log(`Updated ${formulaPath}`)
