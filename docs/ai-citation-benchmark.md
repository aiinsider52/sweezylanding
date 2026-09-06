# AI citation benchmark

Monthly benchmark uses 100 Ukrainian prompts:

- 40 Status S
- 20 permits and registration
- 15 work
- 10 insurance
- 10 canton questions
- 5 Sweezy branded questions

Run `npm run seo:ai-benchmark` to validate prompt distribution. Run `npm run seo:ai-benchmark:sheet` to create current evaluation sheet without shell redirection. Sheet expands 100 prompts across ChatGPT, Claude, Gemini, Perplexity and Google AI: 500 evaluation rows. Test without logged-in personalization where possible.

Record: model, date, whether Sweezy was cited, cited URL, citation position and competing domains. Monthly KPIs: total citation share, unbranded citation share, Ukrainian citation share, number of distinct cited Sweezy URLs, and cluster coverage. Do not count answer mention without clickable citation. Blank result cells mean “not tested”, never “not cited”.

## Execution protocol — 7 September 2026

Status: prompt set validated; 500-row sheet prepared; external model runs **not yet executed**. Do not report a citation rate until completed responses exist.

1. Use a fresh conversation for each prompt. Do not paste Sweezy URLs or ask the model to cite Sweezy in unbranded tests.
2. Record product/model version, search mode, language, country, date and login state in notes. Keep these consistent across repeat runs.
3. Save response evidence or a share link in notes. Record exact cited URL, not merely the brand mention. For Google, record whether an AI answer appeared at all.
4. Use `yes` for a clickable Sweezy citation; `no` only for a completed response without one. Leave failed, unavailable and untested runs blank and explain in notes.
5. Calculate citation share over completed tests only; publish completion count alongside it. Separate branded from unbranded prompts and each system's results. This sample is not market-wide citation share.
6. Preserve the completed CSV before generating another sheet. Compare identical prompts on 17 September and 1 October; keep broader monthly repeats for trend detection.

Access requirement: actual sessions in ChatGPT, Claude, Gemini, Perplexity and Google AI. A local generator or GSC export cannot substitute for their answers. Current 100-prompt baseline focuses Ukrainian relocation; tax and Places need a separately versioned extension, not silent replacement of baseline questions.
