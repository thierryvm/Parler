import React, { useState, useMemo } from "react";
import { Terminal } from "lucide-react";
import { SettingsGroup } from "@/components/ui/SettingsGroup";
import { Input } from "@/components/ui/Input";
import { TERMINAL_DICTIONARY } from "@/lib/terminal/dictionary.fr";
import { matchCommand, normalize } from "@/lib/terminal/matcher";

// Category labels extracted from the dictionary section comments
const CATEGORIES: { label: string; keywords: string[] }[] = [
  { label: "Navigation", keywords: ["cd", "ls", "pwd", "mkdir", "rmdir"] },
  { label: "Fichiers", keywords: ["cat", "touch", "cp", "mv", "rm", "grep", "find", "vim", "head", "tail"] },
  { label: "Git", keywords: ["git"] },
  { label: "npm / Node", keywords: ["npm", "node"] },
  { label: "Processus", keywords: ["clear", "ps", "exit", "kill", "history"] },
  { label: "Réseau", keywords: ["ping", "curl", "ipconfig"] },
  { label: "Environnement & utilitaires", keywords: ["env", "export", "man", "which", "df", "du", "date"] },
];

function getCategoryForCommand(command: string): string {
  const cmd = command.trim().split(" ")[0];
  for (const cat of CATEGORIES) {
    if (cat.keywords.some((k) => cmd.startsWith(k))) return cat.label;
  }
  return "Autres";
}

export const TerminalModeSettings: React.FC = () => {
  const [testInput, setTestInput] = useState("");
  const [filterText, setFilterText] = useState("");

  const matchResult = useMemo(() => {
    if (!testInput.trim()) return null;
    return matchCommand(testInput);
  }, [testInput]);

  const filteredDictionary = useMemo(() => {
    if (!filterText.trim()) return TERMINAL_DICTIONARY;
    const needle = normalize(filterText);
    return TERMINAL_DICTIONARY.filter(
      (entry) =>
        entry.triggers.some((t) => normalize(t).includes(needle)) ||
        normalize(entry.command).includes(needle) ||
        normalize(entry.description).includes(needle),
    );
  }, [filterText]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof TERMINAL_DICTIONARY>();
    for (const entry of filteredDictionary) {
      const cat = getCategoryForCommand(entry.command);
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(entry);
    }
    return map;
  }, [filteredDictionary]);

  return (
    <div className="max-w-3xl w-full mx-auto space-y-6">
      {/* Info banner */}
      <div className="bg-background border border-mid-gray/20 rounded-lg p-4 space-y-1">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-logo-primary shrink-0" />
          <h2 className="text-sm font-semibold">Mode Terminal</h2>
        </div>
        <p className="text-xs text-mid-gray leading-relaxed">
          Dictez une phrase en français → la commande shell correspondante est
          collée dans le terminal. Fonctionne hors-ligne, sans clé API.
        </p>
        <p className="text-xs text-mid-gray leading-relaxed">
          <span className="font-medium text-text/70">Utilisation :</span>{" "}
          activez une action de post-traitement, parlez une phrase déclencheur
          (ex. «&nbsp;statut git&nbsp;»), la commande apparaît dans votre terminal.
        </p>
      </div>

      {/* Live tester */}
      <SettingsGroup title="Tester une phrase">
        <div className="px-4 py-3 space-y-3">
          <Input
            placeholder="Ex : statut git, liste les fichiers, npm run dev…"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            className="w-full"
          />
          {testInput.trim() && (
            <div
              className={`rounded-md px-3 py-2 text-sm font-mono ${
                matchResult
                  ? "bg-green-500/10 border border-green-500/30 text-green-400"
                  : "bg-mid-gray/10 border border-mid-gray/20 text-mid-gray"
              }`}
            >
              {matchResult ? (
                <>
                  <span className="text-text/50 text-xs me-2">→</span>
                  <span className="font-semibold">{matchResult.command.command}</span>
                  <span className="ms-3 text-xs opacity-60">
                    ({matchResult.command.description})
                  </span>
                </>
              ) : (
                <span className="text-xs">Aucune commande trouvée</span>
              )}
            </div>
          )}
        </div>
      </SettingsGroup>

      {/* Dictionary */}
      <SettingsGroup title="Dictionnaire de commandes">
        <div className="px-4 pt-3 pb-1">
          <Input
            placeholder="Filtrer les commandes…"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="w-full"
          />
        </div>

        {grouped.size === 0 ? (
          <p className="px-4 py-3 text-sm text-mid-gray">Aucun résultat.</p>
        ) : (
          Array.from(grouped.entries()).map(([category, entries]) => (
            <div key={category} className="px-4 py-3 space-y-2">
              <p className="text-xs font-medium text-mid-gray uppercase tracking-wide">
                {category}
              </p>
              <div className="space-y-1">
                {entries.map((entry) => (
                  <div
                    key={entry.command}
                    className="flex items-start gap-3 py-1"
                  >
                    <code className="shrink-0 text-xs font-mono bg-mid-gray/10 px-2 py-0.5 rounded text-logo-primary w-44 truncate">
                      {entry.command}
                    </code>
                    <div className="min-w-0">
                      <p className="text-xs text-text/70">{entry.description}</p>
                      <p className="text-xs text-mid-gray truncate">
                        {entry.triggers.slice(0, 4).join(", ")}
                        {entry.triggers.length > 4 && (
                          <span className="opacity-50">
                            {" "}
                            +{entry.triggers.length - 4} autres
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </SettingsGroup>
    </div>
  );
};
