/**
 * Dictionnaire français → commandes shell universelles
 * Compatible : PowerShell 7+, bash, zsh, fish, Warp, etc.
 *
 * Structure : [phrases_déclencheurs[], commande_résultante]
 * Les phrases sont normalisées (minuscules, sans accents) lors du matching.
 */

export interface TerminalCommand {
  triggers: string[];
  command: string;
  description: string;
}

export const TERMINAL_DICTIONARY: TerminalCommand[] = [
  // ─── Navigation ───────────────────────────────────────────────────────────
  {
    triggers: ["remonte", "dossier parent", "niveau au dessus", "reviens en arriere", "cd point point"],
    command: "cd ..",
    description: "Remonter d'un dossier",
  },
  {
    triggers: ["retour racine", "va a la racine", "dossier racine", "aller a la racine"],
    command: "cd ~",
    description: "Aller au dossier home",
  },
  {
    triggers: ["ou suis-je", "ou suis je", "quel dossier", "chemin courant", "dossier actuel", "mon emplacement"],
    command: "pwd",
    description: "Afficher le chemin courant",
  },
  {
    triggers: ["liste les fichiers", "montre les fichiers", "affiche les fichiers", "quels fichiers", "contenu du dossier", "ls", "dir"],
    command: "ls",
    description: "Lister les fichiers",
  },
  {
    triggers: ["liste tout", "tous les fichiers", "fichiers cachés", "affiche tout", "ls -la", "ls -al"],
    command: "ls -la",
    description: "Lister tous les fichiers dont cachés",
  },
  {
    triggers: ["cree un dossier", "creer un dossier", "nouveau dossier", "mkdir"],
    command: "mkdir ",
    description: "Créer un dossier (complète avec le nom)",
  },
  {
    triggers: ["supprime le dossier", "supprimer le dossier", "efface le dossier", "rmdir"],
    command: "rmdir ",
    description: "Supprimer un dossier vide",
  },
  {
    triggers: ["va dans", "aller dans", "ouvre le dossier", "navigue vers", "cd"],
    command: "cd ",
    description: "Aller dans un dossier (complète avec le nom)",
  },

  // ─── Fichiers ──────────────────────────────────────────────────────────────
  {
    triggers: ["montre le contenu", "affiche le fichier", "lis le fichier", "cat", "lire"],
    command: "cat ",
    description: "Afficher le contenu d'un fichier",
  },
  {
    triggers: ["cree un fichier", "creer un fichier", "nouveau fichier", "touch"],
    command: "touch ",
    description: "Créer un fichier vide",
  },
  {
    triggers: ["copie le fichier", "copier le fichier", "cp", "duplique le fichier"],
    command: "cp ",
    description: "Copier un fichier",
  },
  {
    triggers: ["deplace le fichier", "deplacer le fichier", "mv", "renomme", "renommer"],
    command: "mv ",
    description: "Déplacer ou renommer un fichier",
  },
  {
    triggers: ["supprime le fichier", "supprimer le fichier", "efface le fichier", "rm", "supprime"],
    command: "rm ",
    description: "Supprimer un fichier",
  },
  {
    triggers: ["supprime tout", "supprimer recursivement", "rm -rf"],
    command: "rm -rf ",
    description: "Supprimer récursivement",
  },
  {
    triggers: ["cherche dans les fichiers", "recherche dans", "grep", "cherche le mot"],
    command: "grep -r ",
    description: "Rechercher dans les fichiers",
  },
  {
    triggers: ["cherche le fichier", "trouve le fichier", "find", "où est"],
    command: "find . -name ",
    description: "Trouver un fichier par nom",
  },
  {
    triggers: ["edite", "ouvre avec vim", "vim"],
    command: "vim ",
    description: "Éditer avec vim",
  },
  {
    triggers: ["debut du fichier", "premieres lignes", "head"],
    command: "head ",
    description: "Afficher le début d'un fichier",
  },
  {
    triggers: ["fin du fichier", "dernieres lignes", "tail"],
    command: "tail ",
    description: "Afficher la fin d'un fichier",
  },

  // ─── Git ───────────────────────────────────────────────────────────────────
  {
    triggers: ["statut git", "git status", "état git", "etat git", "quels changements"],
    command: "git status",
    description: "Statut Git",
  },
  {
    triggers: ["ajoute tout", "git add tout", "stage tout", "ajouter tout"],
    command: "git add .",
    description: "Ajouter tous les fichiers modifiés",
  },
  {
    triggers: ["ajoute le fichier", "git add", "stage le fichier"],
    command: "git add ",
    description: "Ajouter un fichier spécifique",
  },
  {
    triggers: ["commit", "valide les changements", "enregistre les changements", "git commit"],
    command: 'git commit -m ""',
    description: "Créer un commit",
  },
  {
    triggers: ["pousse", "push", "git push", "envoie sur github", "publie"],
    command: "git push",
    description: "Pousser les commits",
  },
  {
    triggers: ["tire", "pull", "git pull", "recupere les changements", "met a jour depuis github"],
    command: "git pull",
    description: "Tirer les derniers changements",
  },
  {
    triggers: ["historique git", "git log", "commits recents", "voir les commits"],
    command: "git log --oneline -10",
    description: "Voir l'historique Git",
  },
  {
    triggers: ["differences", "git diff", "quelles modifications", "voir les modifications"],
    command: "git diff",
    description: "Voir les différences",
  },
  {
    triggers: ["liste les branches", "git branch", "quelles branches"],
    command: "git branch",
    description: "Lister les branches",
  },
  {
    triggers: ["nouvelle branche", "creer une branche", "git checkout -b"],
    command: "git checkout -b ",
    description: "Créer une nouvelle branche",
  },
  {
    triggers: ["change de branche", "aller sur la branche", "git checkout", "switche sur"],
    command: "git checkout ",
    description: "Changer de branche",
  },
  {
    triggers: ["clone le depot", "git clone", "cloner", "telecharge le repo"],
    command: "git clone ",
    description: "Cloner un dépôt",
  },
  {
    triggers: ["initialise git", "git init", "nouveau repo"],
    command: "git init",
    description: "Initialiser un dépôt Git",
  },
  {
    triggers: ["fusionne", "merge", "git merge"],
    command: "git merge ",
    description: "Fusionner une branche",
  },
  {
    triggers: ["annule les modifications", "git restore", "git checkout --", "reinitialise le fichier"],
    command: "git restore .",
    description: "Annuler les modifications locales",
  },

  // ─── npm / Node ────────────────────────────────────────────────────────────
  {
    triggers: ["installe les dependances", "npm install", "installe les paquets", "npm i"],
    command: "npm install",
    description: "Installer les dépendances npm",
  },
  {
    triggers: ["installe le paquet", "npm install paquet", "ajoute le paquet", "npm add"],
    command: "npm install ",
    description: "Installer un paquet npm",
  },
  {
    triggers: ["lance le dev", "mode developpement", "npm run dev", "demarrer le dev", "serveur de dev"],
    command: "npm run dev",
    description: "Lancer le serveur de développement",
  },
  {
    triggers: ["compile", "build", "npm run build", "construire", "bundler"],
    command: "npm run build",
    description: "Compiler le projet",
  },
  {
    triggers: ["lance les tests", "npm test", "npm run test", "tests unitaires"],
    command: "npm test",
    description: "Lancer les tests",
  },
  {
    triggers: ["demarre l application", "npm start", "lancer l app"],
    command: "npm start",
    description: "Démarrer l'application",
  },
  {
    triggers: ["version de node", "node -v", "quelle version de node"],
    command: "node -v",
    description: "Version de Node.js",
  },
  {
    triggers: ["version npm", "npm -v", "quelle version de npm"],
    command: "npm -v",
    description: "Version de npm",
  },

  // ─── Processus ─────────────────────────────────────────────────────────────
  {
    triggers: ["efface l ecran", "efface le terminal", "clear", "nettoie le terminal", "cls"],
    command: "clear",
    description: "Effacer l'écran",
  },
  {
    triggers: ["liste les processus", "ps", "quels processus", "processus actifs"],
    command: "ps aux",
    description: "Lister les processus",
  },
  {
    triggers: ["quitte", "ferme le terminal", "exit", "au revoir"],
    command: "exit",
    description: "Quitter le terminal",
  },
  {
    triggers: ["arrete le processus", "kill", "tue le processus", "stoppe le processus"],
    command: "kill -9 ",
    description: "Arrêter un processus",
  },
  {
    triggers: ["historique des commandes", "history", "commandes precedentes"],
    command: "history",
    description: "Historique des commandes",
  },

  // ─── Réseau ────────────────────────────────────────────────────────────────
  {
    triggers: ["ping", "teste la connexion", "est ce que ca repond"],
    command: "ping ",
    description: "Tester la connexion réseau",
  },
  {
    triggers: ["telecharge", "curl", "wget", "recupere l url"],
    command: "curl -O ",
    description: "Télécharger un fichier",
  },
  {
    triggers: ["adresse ip", "mon ip", "ipconfig", "ifconfig"],
    command: "ipconfig",
    description: "Voir l'adresse IP",
  },

  // ─── Variables d'environnement ─────────────────────────────────────────────
  {
    triggers: ["variables d environnement", "env", "variables env", "liste les variables"],
    command: "env",
    description: "Lister les variables d'environnement",
  },
  {
    triggers: ["exporte la variable", "export", "definir la variable"],
    command: "export ",
    description: "Définir une variable d'environnement",
  },

  // ─── Utilitaires ───────────────────────────────────────────────────────────
  {
    triggers: ["aide", "help", "man", "documentation de", "comment utiliser"],
    command: "man ",
    description: "Afficher la documentation",
  },
  {
    triggers: ["ou est la commande", "which", "chemin de la commande"],
    command: "which ",
    description: "Trouver le chemin d'une commande",
  },
  {
    triggers: ["espace disque", "df -h", "espace disponible", "combien d espace"],
    command: "df -h",
    description: "Espace disque disponible",
  },
  {
    triggers: ["taille du dossier", "du -sh", "combien pese"],
    command: "du -sh ",
    description: "Taille d'un dossier",
  },
  {
    triggers: ["date et heure", "date", "quelle heure"],
    command: "date",
    description: "Afficher la date et l'heure",
  },
];
