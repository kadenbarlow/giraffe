import { generateCurl, generateJavascriptFetch, generateMarkdown, generateRuby } from "./actions/index.js"

export default function useController() {
  return {
    options: [
      {
        function: generateCurl,
        key: "cURL",
        label: "cURL",
      },
      {
        function: generateJavascriptFetch,
        key: "Javascript - Fetch",
        label: "Javascript -  Fetch",
      },
      {
        function: generateMarkdown,
        key: "Markdown - Request Only",
        label: "Markdown - Request Only",
      },
      {
        function: (ctx) => generateMarkdown({ ...ctx, includeResponse: true }),
        key: "Markdown - Request and Response",
        label: "Markdown - Request and Response",
      },
      {
        function: generateRuby,
        key: "Ruby",
        label: "Ruby",
      },
    ],
  }
}
