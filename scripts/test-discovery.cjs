const { readFileSync } = require("node:fs");
const { runInNewContext } = require("node:vm");
const assert = require("node:assert/strict");
const ts = require("typescript");
const exportsObject = {};
runInNewContext(ts.transpileModule(readFileSync("lib/discovery.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText, { exports: exportsObject, URL });
const { identifyCrawler, detectAiReferral } = exportsObject;
for (const name of ["OAI-SearchBot", "Claude-SearchBot", "PerplexityBot", "Googlebot", "bingbot"]) {
  assert.equal(identifyCrawler(`Mozilla/5.0 (compatible; ${name}/1.0)`).purpose, "search");
}
for (const name of ["ChatGPT-User", "Claude-User", "Perplexity-User"]) assert.equal(identifyCrawler(name).purpose, "user-fetch");
assert.equal(identifyCrawler("ClaudeBot/1.0").purpose, "training");
assert.equal(identifyCrawler("GPTBot").purpose, "training");
assert.equal(identifyCrawler("NotClaude-SearchBotFake"), null);
assert.equal(identifyCrawler("Mozilla/5.0"), null);
assert.equal(detectAiReferral("https://chatgpt.com/c/private?token=secret", "").referrer, "https://chatgpt.com");
assert.equal(detectAiReferral("https://perplexity.com/search/example", "").name, "Perplexity");
assert.equal(detectAiReferral("https://claude.ai/chat/example", "").attribution, "referrer");
assert.equal(detectAiReferral("https://gemini.google.com/app", "").name, "Gemini");
assert.equal(detectAiReferral("", " CHATGPT.COM ").attribution, "utm");
for (const url of ["https://chatgpt.com.attacker.example", "https://evil.example/chatgpt.com", "https://notchatgpt.com", "javascript:chatgpt.com", "https://openai.com/blog", "invalid"]) {
  assert.equal(detectAiReferral(url, ""), null, url);
}
for (const source of ["chatgpt.com.fake", "https://chatgpt.com", "__proto__", "constructor", ""]) assert.equal(detectAiReferral("", source), null);
console.log("Discovery tests passed: search/user/training classification, provider referrals, UTM hints, host boundaries and private-path removal.");
