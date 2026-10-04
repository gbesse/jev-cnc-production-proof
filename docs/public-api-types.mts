import { analyze, toHtml, type Dossier, type Report } from "../src/index.mjs";
import { createJevClient } from "../src/jev.mjs";
import * as adapters from "../src/adapters.mjs";
const dossier: Dossier = {
  from: "2026-01-01",
  to: "2026-12-31",
  expenses: [
    {
      id: "E1",
      invoiceDocId: "a",
      contractDocId: "b",
      deliverableDocId: "c",
      postCode: "POST-SON",
      amountCents: 300000,
      date: "2026-10-02",
      description: "Mixage sonore du film.",
      deliverableDescription: "Mixage sonore du film.",
    },
  ],
  posts: [
    {
      code: "POST-SON",
      docId: "d",
      scope: "Travaux de postproduction sonore, dont le mixage du film.",
    },
  ],
  id: "jev-cnc-production-proof-dev-paraphrase",
  documents: [
    {
      id: "a",
      text: 'dossier.expenses.0 : {"id": "E1", "postCode": "POST-SON", "amountCents": 300000, "date": "2026-10-02", "description": "Mixage sonore du film.", "deliverableDescription": "Mixage sonore du film."}',
      source: {
        uri: "fixture:a",
        date: "2026-10-04",
        licence: "CC0",
        kind: "synthetique",
      },
    },
    {
      id: "b",
      text: 'dossier.expenses.0 : {"id": "E1", "postCode": "POST-SON", "amountCents": 300000, "date": "2026-10-02", "description": "Mixage sonore du film.", "deliverableDescription": "Mixage sonore du film."}',
      source: {
        uri: "fixture:b",
        date: "2026-10-04",
        licence: "CC0",
        kind: "synthetique",
      },
    },
    {
      id: "c",
      text: 'dossier.expenses.0 : {"id": "E1", "postCode": "POST-SON", "amountCents": 300000, "date": "2026-10-02", "description": "Mixage sonore du film.", "deliverableDescription": "Mixage sonore du film."}',
      source: {
        uri: "fixture:c",
        date: "2026-10-04",
        licence: "CC0",
        kind: "synthetique",
      },
    },
    {
      id: "d",
      text: 'dossier.posts.0 : {"code": "POST-SON", "scope": "Travaux de postproduction sonore, dont le mixage du film."}',
      source: {
        uri: "fixture:d",
        date: "2026-10-04",
        licence: "CC0",
        kind: "synthetique",
      },
    },
  ],
};
const report: Report = await analyze(dossier, {
  mode: "jev",
  provider: createJevClient({ apiKey: "exemple-de-type" }),
});
const html: string = toHtml(report);
void html;
void adapters;
// @ts-expect-error Un dossier vide ne respecte pas le contrat métier.
await analyze({ id: "incomplet", documents: [] });
