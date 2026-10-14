# CorrectDB

**The corrections front end for [Tunispeak](https://zahra-elair-portfolio.vercel.app/projects/tunispeak), a Tunisian Arabic and English translation platform.**

Tunispeak's translation model is trained on pairs of English and Tunisian Arabic expressions. CorrectDB is the review tool used to clean that dataset: a reviewer goes through the entries one by one and confirms, modifies or deletes each pair, so the model learns from accurate, natural Tunisian Arabic.

## Features

- **Review flow.** Each entry shows the English text and its Tunisian translation. The reviewer confirms it as correct, edits either side, or deletes it, then moves on to the next entry.
- **Tunisian Arabic in two scripts.** Translations can be reviewed in Latin script (as Tunisians often type it) and in Arabic script, with an on-screen keyboard for entering Arabic text.
- **Reviewer selection.** Reviewers pick their name before starting, so each correction can be attributed.
- **Light and dark themes.**

## Tech stack

React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui (Radix UI) · React Hook Form · Zod · React Router · react-simple-keyboard

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

In this repository, entries are loaded from `data.json`, a small sample of the dataset, and submissions are shown as a confirmation message. The connection to the production dataset is not included.

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Related

- **Tunispeak:** the translation platform this tool feeds, built on a fine-tuned AraT5 model. [Case study](https://zahra-elair-portfolio.vercel.app/projects/tunispeak)
- **[CorrectDB-admin](https://github.com/Zahra-Elair/CorrectDB-admin):** the admin dashboard.

## Author

Built by [Zahra Elair](https://zahra-elair-portfolio.vercel.app), AI Software Engineer.
