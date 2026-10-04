import { text, list, cents, date, ref, check, pair } from "./index.mjs";

export function prepare(x) {
  const expenses = list(x.expenses, "expenses"),
    posts = list(x.posts, "posts");
  const checks = [],
    pairs = [],
    matrix = [];
  const start = date(x.from),
    end = date(x.to);
  if (start > end) throw new TypeError("Période inversée");
  for (const e of expenses) {
    text(e.id);
    cents(e.amountCents);
    date(e.date);
    const post = posts.find((p) => p.code === e.postCode);
    const refs = ref(
      e.invoiceDocId,
      e.contractDocId,
      e.deliverableDocId,
      post?.docId,
    );
    checks.push(
      check(
        e.id + "-poste",
        "Poste présent dans la grille : " + e.id,
        post ? true : null,
        refs,
      ),
    );
    checks.push(
      check(
        e.id + "-periode",
        "Date de dépense : " + e.id,
        start <= e.date && e.date <= end,
        refs,
      ),
    );
    checks.push(
      check(
        e.id + "-pieces",
        "Contrat et livrable : " + e.id,
        e.contractDocId && e.deliverableDocId ? true : null,
        refs,
      ),
    );
    pairs.push(
      pair(
        e.id + "-objet",
        "Dépense / poste : " + e.id,
        e.description,
        post?.scope,
        refs,
        "La prestation facturée à gauche relève-t-elle explicitement du poste fourni à droite ?",
      ),
      pair(
        e.id + "-livrable",
        "Facture / livrable : " + e.id,
        e.description,
        e.deliverableDescription,
        refs,
      ),
    );
    matrix.push({
      expense: e.id,
      amountCents: e.amountCents,
      post: post?.code ?? null,
      pieces: refs,
    });
  }
  return {
    checks,
    pairs,
    outputs: {
      matrix,
      limite:
        "La grille est fournie par le dossier. Cette matrice ne décide pas de l’éligibilité au crédit d’impôt.",
    },
  };
}

function requiredDoc(o) {
  if (!o || typeof o !== "object") throw new TypeError("Objet métier requis");
  text(o.docId, "docId requis");
}
export function validateInput(x) {
  for (const e of list(x.expenses, "expenses")) text(e.invoiceDocId);
  for (const p of list(x.posts, "posts")) requiredDoc(p);
}
