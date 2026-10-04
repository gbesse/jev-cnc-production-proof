import { document } from "./io.mjs";
export function importExpenseBundle(
  { expenses, posts, from, to },
  { at = new Date().toISOString().slice(0, 10) } = {},
) {
  const documents = [],
    normalized = expenses.map((e, i) => {
      const prefix = "depense" + i;
      for (const [key, label] of [
        ["invoiceText", "facture"],
        ["contractText", "contrat"],
        ["deliverableText", "livrable"],
      ])
        if (e[key])
          documents.push(
            document(prefix + "-" + label, e[key], {
              uri: "fichier:" + prefix + "-" + label,
              date: at,
              kind: "importe",
              licence: "Privé",
            }),
          );
      const { invoiceText, contractText, deliverableText, ...fields } = e;
      return {
        ...fields,
        invoiceDocId: prefix + "-facture",
        ...(contractText ? { contractDocId: prefix + "-contrat" } : {}),
        ...(deliverableText ? { deliverableDocId: prefix + "-livrable" } : {}),
      };
    });
  const grid = posts.map((p, i) => ({ ...p, docId: "poste" + i }));
  documents.push(
    ...grid.map((p) =>
      document(p.docId, JSON.stringify(p), {
        uri: "fichier:grille-cnc.json",
        date: at,
        kind: "importe",
        licence: "À renseigner",
      }),
    ),
  );
  return {
    id: "matrice-cnc",
    expenses: normalized,
    posts: grid,
    from,
    to,
    documents,
  };
}
