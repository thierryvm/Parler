/// Terminal Mode — dictionnaire français → commandes shell
/// Matching hors-ligne, sans clé API.

/// Normalize text: lowercase, remove French accents, collapse whitespace.
fn normalize(text: &str) -> String {
    let mut s = String::with_capacity(text.len());
    for c in text.chars() {
        let c = match c {
            'é' | 'è' | 'ê' | 'ë' => 'e',
            'à' | 'â' | 'ä' => 'a',
            'ù' | 'û' | 'ü' => 'u',
            'ô' | 'ö' => 'o',
            'î' | 'ï' => 'i',
            'ç' => 'c',
            '\'' | '\u{2019}' | '`' => ' ',
            c if c.is_ascii_punctuation() => ' ',
            c => c.to_ascii_lowercase(),
        };
        s.push(c);
    }
    // Collapse multiple spaces
    s.split_whitespace().collect::<Vec<_>>().join(" ")
}

/// (triggers, command)
static DICTIONARY: &[(&[&str], &str)] = &[
    // ── Navigation ──────────────────────────────────────────────────
    (&["remonte", "dossier parent", "niveau au dessus", "retourne en arriere", "cd point point"], "cd .."),
    (&["repertoire courant", "ou suis je", "chemin actuel", "affiche le chemin", "pwd"], "pwd"),
    (&["liste les fichiers", "affiche les fichiers", "contenu du dossier", "liste le dossier", "ls"], "ls"),
    (&["liste tout", "fichiers caches", "ls la", "liste avec details"], "ls -la"),
    (&["cree un dossier", "nouveau dossier", "mkdir"], "mkdir"),
    (&["supprime le dossier", "efface le dossier", "rmdir"], "rmdir"),
    // ── Fichiers ─────────────────────────────────────────────────────
    (&["affiche le fichier", "lis le fichier", "contenu du fichier", "cat"], "cat"),
    (&["cree un fichier", "nouveau fichier", "touch"], "touch"),
    (&["copie le fichier", "copier le fichier", "cp"], "cp"),
    (&["deplace le fichier", "renomme le fichier", "mv"], "mv"),
    (&["supprime le fichier", "efface le fichier", "rm"], "rm"),
    (&["cherche dans les fichiers", "recherche du texte", "grep"], "grep"),
    (&["trouve le fichier", "cherche le fichier", "find"], "find"),
    (&["edite le fichier", "ouvre vim", "vim"], "vim"),
    (&["premieres lignes", "debut du fichier", "head"], "head"),
    (&["dernieres lignes", "fin du fichier", "tail"], "tail"),
    (&["suit le fichier", "tail suivi", "tail f"], "tail -f"),
    // ── Git ──────────────────────────────────────────────────────────
    (&["statut git", "etat git", "git statut", "git status", "quels fichiers"], "git status"),
    (&["ajoute tout", "git add tout", "git add point", "indexe tout"], "git add ."),
    (&["commit", "valide les changements", "git commit", "enregistre les changements"], "git commit -m \"\""),
    (&["pousse", "envoie sur github", "git push", "pousse sur origin"], "git push"),
    (&["tire", "recupere les changements", "git pull", "met a jour depuis origin"], "git pull"),
    (&["clone le depot", "git clone", "clone le repo"], "git clone"),
    (&["historique git", "log git", "git log", "voir les commits"], "git log --oneline"),
    (&["branche git", "git branch", "liste les branches", "quelle branche"], "git branch"),
    (&["change de branche", "git checkout", "bascule sur"], "git checkout"),
    (&["nouvelle branche", "cree une branche", "git checkout b"], "git checkout -b"),
    (&["fusionne", "git merge", "merge la branche"], "git merge"),
    (&["remise les changements", "git stash", "sauvegarde temporaire"], "git stash"),
    (&["recupere le stash", "git stash pop", "reprend le stash"], "git stash pop"),
    (&["difference git", "git diff", "voir les differences"], "git diff"),
    (&["initialise git", "git init", "cree un depot"], "git init"),
    // ── npm / Node ───────────────────────────────────────────────────
    (&["installe les dependances", "npm install", "npm i", "installe les paquets"], "npm install"),
    (&["lance le dev", "mode developpement", "npm run dev", "demarre le serveur"], "npm run dev"),
    (&["compile le projet", "npm run build", "construit le projet", "build"], "npm run build"),
    (&["lance les tests", "npm test", "npm run test", "execute les tests"], "npm test"),
    (&["demarre l application", "npm start", "lance l app"], "npm start"),
    (&["installe le paquet", "npm install paquet", "ajoute une dependance"], "npm install"),
    (&["liste les paquets", "npm list", "paquets installes"], "npm list"),
    // ── Processus ────────────────────────────────────────────────────
    (&["efface l ecran", "nettoie le terminal", "clear", "vide le terminal"], "clear"),
    (&["liste les processus", "ps", "processus actifs", "quels processus"], "ps aux"),
    (&["quitte", "exit", "ferme le terminal", "sors"], "exit"),
    (&["tue le processus", "kill", "arrete le processus"], "kill"),
    (&["historique des commandes", "history", "dernieres commandes"], "history"),
    // ── Réseau ───────────────────────────────────────────────────────
    (&["ping", "teste la connexion", "est ce que le site repond"], "ping"),
    (&["requete http", "curl", "telecharge l url"], "curl"),
    (&["configuration reseau", "ipconfig", "ifconfig", "ip config"], "ipconfig"),
    // ── Environnement & utilitaires ──────────────────────────────────
    (&["variables d environnement", "liste les variables", "env", "affiche les variables"], "env"),
    (&["exporte la variable", "definit la variable", "export"], "export"),
    (&["manuel", "aide pour la commande", "man"], "man"),
    (&["ou est la commande", "which", "chemin de la commande"], "which"),
    (&["espace disque", "df", "occupation du disque"], "df -h"),
    (&["taille du dossier", "du", "poids du repertoire"], "du -sh"),
    (&["date et heure", "quelle heure", "date"], "date"),
];

/// Try to match the transcription against the French terminal dictionary.
/// Returns the best matching shell command, or None if no match found.
pub fn match_terminal_command(text: &str) -> Option<String> {
    let input = normalize(text);
    let mut best: Option<(String, usize)> = None;

    for (triggers, command) in DICTIONARY {
        for trigger in *triggers {
            let t = normalize(trigger);
            if input.contains(t.as_str()) {
                let score = t.len();
                if best.as_ref().map_or(true, |(_, s)| score > *s) {
                    best = Some((command.to_string(), score));
                }
            }
        }
    }

    best.map(|(cmd, _)| cmd)
}
