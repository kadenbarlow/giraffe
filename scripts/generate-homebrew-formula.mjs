const [owner, repo, tag, shaDarwinArm64, shaDarwinX64] = process.argv.slice(2)

if (!owner || !repo || !tag || !shaDarwinArm64 || !shaDarwinX64) {
  console.error(
    "Usage: node ./scripts/generate-homebrew-formula.mjs <owner> <repo> <tag> <sha-darwin-arm64> <sha-darwin-x64>",
  )
  process.exit(1)
}

const version = tag.startsWith("v") ? tag.slice(1) : tag
const baseUrl = `https://github.com/${owner}/${repo}/releases/download/${tag}`

const formula = `class Giraffe < Formula
  desc "Terminal-based GraphQL client"
  homepage "https://github.com/${owner}/${repo}"
  version "${version}"

  on_macos do
    on_arm do
      url "${baseUrl}/giraffe-darwin-arm64.tar.gz"
      sha256 "${shaDarwinArm64}"
    end

    on_intel do
      url "${baseUrl}/giraffe-darwin-x64.tar.gz"
      sha256 "${shaDarwinX64}"
    end
  end

  def install
    if Hardware::CPU.arm?
      bin.install "giraffe-darwin-arm64" => "giraffe"
    else
      bin.install "giraffe-darwin-x64" => "giraffe"
    end
  end

  test do
    assert_match "Giraffe is a terminal-first GraphQL client.", shell_output("#{bin}/giraffe --help")
  end
end
`

process.stdout.write(formula)
