# Importer des données

`importExpenseBundle` accepte une grille de postes versionnée et des dépenses avec texte de facture, contrat et livrable. Il construit une matrice de preuves par dépense. Les pièces manquantes restent en revue. La grille est fournie par l’utilisateur ; les postes synthétiques ne sont pas un barème officiel CNC. Une dépense rapprochée d’un poste ne devient pas automatiquement éligible à une aide ou au crédit d’impôt.

```sh
npm run demo:import
```

[Code complet de l’import](../examples/import.mjs). Ce parcours passe réellement du format source au rapport JSON/HTML. Les fichiers générés ne contiennent que des données synthétiques. Pour des documents réels confidentiels, écrire les rapports dans `reports/private/` (ignoré par Git), contrôler les droits de fichier et informer les personnes concernées avant un envoi externe.
