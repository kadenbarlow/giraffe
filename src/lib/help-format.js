const ANSI = {
  bold: ["\u001b[1m", "\u001b[22m"],
  cyan: ["\u001b[36m", "\u001b[39m"],
  dim: ["\u001b[2m", "\u001b[22m"],
}

const color = (value, [open, close]) => `${open}${value}${close}`
const pad = (value, width = 14) => value.padEnd(width, " ")

export const bold = (value) => color(value, ANSI.bold)
export const command = (value) => color(value, ANSI.cyan)
export const dim = (value) => color(value, ANSI.dim)
export const example = (label, value) => `  ${dim(label)}\n    ${command(value)}`
export const option = (flag, description, width = 22) => `  ${bold(pad(flag, width))}${description}`
export const section = (title, body) => `${bold(title)}\n${body}`
export const usage = (value, description, width = 24) => `${command(pad(value, width))}${description}`
