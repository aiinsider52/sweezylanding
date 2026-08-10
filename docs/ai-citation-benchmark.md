# AI citation benchmark

Monthly benchmark uses 100 Ukrainian prompts:

- 40 Status S
- 20 permits and registration
- 15 work
- 10 insurance
- 10 canton questions
- 5 Sweezy branded questions

Run `npm run seo:ai-benchmark` to validate prompt distribution. Run `npm run seo:ai-benchmark:csv > reports/ai-citation-YYYY-MM-DD.csv` to create evaluation sheet. Test same prompts in ChatGPT, Claude, Perplexity and Google AI features without logged-in personalization where possible.

Record: model, date, whether Sweezy was cited, cited URL, citation position and competing domains. Monthly KPIs: total citation share, unbranded citation share, Ukrainian citation share, number of distinct cited Sweezy URLs, and cluster coverage. Do not count answer mention without clickable citation.
