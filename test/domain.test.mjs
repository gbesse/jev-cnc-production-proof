import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { analyze } from "../src/index.mjs";
const base = JSON.parse(
  await readFile(new URL("../examples/dossier.json", import.meta.url), "utf8"),
);
const clone = structuredClone;

test("Contrat absent ne constitue pas une preuve", async () => {
  const x = clone(base);
  delete x.expenses[0].contractDocId;
  const r = await analyze(x);
  assert.equal(r.findings.find((f) => f.id === "E1-pieces").status, "a_revoir");
});
test("Poste absent reste inconnu", async () => {
  const x = clone(base);
  x.expenses[0].postCode = "INCONNU";
  const r = await analyze(x);
  assert.equal(r.findings.find((f) => f.id === "E1-poste").status, "a_revoir");
});
test("La matrice conserve chaque dépense et ses pièces", async () => {
  const r = await analyze(base);
  assert.equal(r.outputs.matrix[0].amountCents, 300000);
  assert.deepEqual(r.outputs.matrix[0].pieces, ["a", "b", "c", "d"]);
});
