#!/usr/bin/env node
// Carga las tareas de las olas (Plan.md) en un GitHub Project que YA existe.
// Uso:  node cargar-olas.mjs https://github.com/orgs/StkProof/projects/1 --prueba   (lee y muestra qué haría)
//       node cargar-olas.mjs https://github.com/orgs/StkProof/projects/1            (carga de verdad)
// Requiere GitHub CLI con permiso de tableros: gh auth refresh -s project

import { execFileSync } from "node:child_process";

const PRUEBA = process.argv.includes("--prueba");
const LINK = process.argv.slice(2).find(a => a.startsWith("http"));
const m = LINK && LINK.match(/github\.com\/(?:orgs|users)\/([^/]+)\/projects\/(\d+)/);
if (!m) {
  console.error("Pasame el link del tablero. Ej: node cargar-olas.mjs https://github.com/orgs/StkProof/projects/1");
  process.exit(1);
}
const OWNER = m[1];
const NUM = m[2];
const REPO = "StkProof/stock-proof";

const CAMPOS = {
  "Área": ["Front y producto", "Lógica", "Entregables"],
  "Ola": ["0 · Base", "1 · Preguntas 1 y 2", "2 · Punta a punta", "3 · Preguntas 3 y 4 + salida", "4 · Agente", "Buffer"],
  "Responsable": ["Luciano", "Agustín", "Lautaro", "Equipo"],
};
const VAULT = "Ver Plan.md en el vault (StkProof/vault-stockproof).";

// [título, área, ola, responsable, fecha límite, detalle]
const TAREAS = [
  ["Congelar el formato de la evaluación (con bloque de salida y «sin dato»)", "Front y producto", "0 · Base", "Equipo", "2026-09-29",
   "Los tres juntos. Incluye Exit Now, Exit Availability, Exit Risk y el valor «sin dato». Quien cambie el formato después actualiza lib/evaluation-examples.ts en el mismo pull request. Bloquea a todas las demás tareas."],
  ["Cliente de las APIs de Binance con la key del .env", "Lógica", "0 · Base", "Agustín", "2026-09-29",
   "Después de esta ola solo se le agregan cosas; no se cambia lo existente sin avisar."],
  ["Estructura: una pregunta por archivo, evaluate.ts solo orquesta, umbrales en un solo archivo", "Lógica", "0 · Base", "Agustín", "2026-09-29",
   "evaluate.ts lo toca solo Agustín. Ningún número suelto en el código."],
  ["Log automático de cada llamada (quién, monto, precio, costo, error)", "Lógica", "0 · Base", "Lautaro", "2026-09-29",
   "Base del Developer Experience Report (25% del puntaje). Cada entrada dice quién llamó, para no mezclar pruebas con datos del informe."],
  ["Configurar repo: main protegido, ramas cortas, pull requests chicos", "Entregables", "0 · Base", "Lautaro", "2026-09-29",
   "Una rama por tarea del tablero, unida en uno o dos días."],
  ["Pregunta 1: ¿este contrato es el real?", "Lógica", "1 · Preguntas 1 y 2", "Lautaro", "2026-10-01",
   "Búsqueda por ticker, lista oficial, attestation, BEP-8056 contra BEP-20. Devuelve un código de motivo, no texto."],
  ["Pregunta 2: ¿esta orden entra? (compra y venta)", "Lógica", "1 · Preguntas 1 y 2", "Agustín", "2026-10-01",
   "Cotización y simulación del monto en bStocks, Ondo y xStocks. Recibe la dirección (compra o venta) desde el principio: Exit Now reusa esto. Corte por umbral de impacto."],
  ["Pantalla única con los cinco estados de ejemplo", "Front y producto", "1 · Preguntas 1 y 2", "Luciano", "2026-09-30",
   "Usa lib/evaluation-examples.ts. No espera a la lógica."],
  ["Conectar preguntas 1 y 2 a evaluate.ts", "Lógica", "2 · Punta a punta", "Agustín", "2026-10-03",
   "Primera ventana demoable: impostores y órdenes que no entran. Esta ola no se recorta."],
  ["Transacción de prueba muy chica en BSC mainnet (propuesta)", "Lógica", "2 · Punta a punta", "Agustín", "2026-10-03",
   "Solo Agustín firma en mainnet. Anotar en el log lo que falle (aprobaciones, gas, wallet)."],
  ["Conectar la pantalla a la evaluación real", "Front y producto", "2 · Punta a punta", "Luciano", "2026-10-03",
   "Depende de: formato congelado y preguntas 1 y 2 conectadas."],
  ["Casos de prueba de las escenas 1 a 3 del video", "Lógica", "2 · Punta a punta", "Lautaro", "2026-10-03",
   "Monto chico en nombre líquido, monto que el pool no absorbe, contrato impostor."],
  ["Función única de precios (pool y referencia)", "Lógica", "3 · Preguntas 3 y 4 + salida", "Agustín", "2026-10-04",
   "La usan la pregunta 3 (Lautaro) y la 4 / Exit Risk (Agustín). Nadie la reescribe."],
  ["Función única de estado de mercado (abierto, cerrado, próxima apertura)", "Lógica", "3 · Preguntas 3 y 4 + salida", "Lautaro", "2026-10-04",
   "La usan la pregunta 4 (Agustín) y Exit Availability (Lautaro). Nadie la reescribe."],
  ["Pregunta 3: ¿este número es la acción?", "Lógica", "3 · Preguntas 3 y 4 + salida", "Lautaro", "2026-10-06",
   "Referencia contra pool y nota de multiplicador cuando la API lo expone."],
  ["Pregunta 4: ¿en qué régimen está este ticker?", "Lógica", "3 · Preguntas 3 y 4 + salida", "Agustín", "2026-10-06",
   "Mercado abierto o cerrado, libro clavado o pools que no coinciden."],
  ["Exit Now: simulación real de vender el mismo monto ahora", "Lógica", "3 · Preguntas 3 y 4 + salida", "Agustín", "2026-10-06",
   "Reusa la simulación de la pregunta 2. No proyecta precios. Ver Diferenciador.md."],
  ["Exit Availability: horarios, mint, redeem y canje publicados", "Lógica", "3 · Preguntas 3 y 4 + salida", "Lautaro", "2026-10-06",
   "Solo reglas publicadas. Si no hay dato, «sin dato». Ver Diferenciador.md."],
  ["Exit Risk: señales observables con fuente y fecha", "Lógica", "3 · Preguntas 3 y 4 + salida", "Agustín", "2026-10-06",
   "Solo lo que se mida. No estima números futuros. Ver Diferenciador.md."],
  ["Preguntas 3 y 4 y bloque de salida en pantalla", "Front y producto", "3 · Preguntas 3 y 4 + salida", "Luciano", "2026-10-06",
   "Exit Now, Exit Availability y Exit Risk separados, cada uno con su fuente."],
  ["Textos en castellano para cada código de motivo", "Front y producto", "3 · Preguntas 3 y 4 + salida", "Luciano", "2026-10-06",
   "La lógica devuelve códigos; Luciano escribe las frases que ve la persona."],
  ["Agente por Agentic Wallet: se niega o firma un monto chico", "Lógica", "4 · Agente", "Agustín", "2026-10-09",
   "Frase en castellano → mismo camino de las cuatro preguntas → simulación → firma o rechazo con razón."],
  ["Frase en castellano en la pantalla", "Front y producto", "4 · Agente", "Luciano", "2026-10-09",
   "«comprame $200 de NVIDIA si el contrato es el real y el costo es menor al 1%»."],
  ["Correr las cinco escenas del video todos los días", "Entregables", "4 · Agente", "Lautaro", "2026-10-09",
   "Guion en MVP.md. Si algo no se entiende sin saber cripto, abrir una tarea."],
  ["Borrador del Developer Experience Report desde el log", "Entregables", "4 · Agente", "Lautaro", "2026-10-09",
   "Slippage de compra y venta por emisor, gap contra referencia abierto y cerrado, qué se rompió en la API, sección de stack de IA."],
  ["Grabar el video (hasta 4 minutos)", "Entregables", "4 · Agente", "Lautaro", "2026-10-09", "Guion en MVP.md."],
  ["README e instrucciones para el jurado", "Entregables", "Buffer", "Lautaro", "2026-10-10",
   "Que un juez pueda correrlo sin ayuda. README en inglés."],
  ["Enviar el Developer Experience Report", "Entregables", "Buffer", "Lautaro", "2026-10-10", "Con la sección de stack de IA."],
  ["Envío final (antes del 11 oct 12:00 UTC = 09:00 Argentina)", "Entregables", "Buffer", "Lautaro", "2026-10-10",
   "Repo público, video, link o instrucciones. Dejar todo vivo hasta el 23 oct."],
];

function run(args) {
  return execFileSync("gh", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}
function leer(args) { return JSON.parse(run(args) || "{}"); }
function escribir(args, { json = false } = {}) {
  if (PRUEBA) {
    console.log("    (prueba) gh " + args.map(a => (/\s/.test(a) ? JSON.stringify(a) : a)).join(" ").slice(0, 160));
    return json ? {} : "";
  }
  const out = run(args);
  return json ? JSON.parse(out || "{}") : out;
}
const paso = t => console.log("\n▶ " + t);

try {
  try { execFileSync("gh", ["--version"], { stdio: "ignore" }); }
  catch { console.error("Falta GitHub CLI. Instalalo con: brew install gh"); process.exit(1); }
  try { execFileSync("gh", ["auth", "status"], { stdio: "ignore" }); }
  catch { console.error("Iniciá sesión con: gh auth login   y después: gh auth refresh -s project"); process.exit(1); }

  paso(`Leyendo el tablero ${OWNER} #${NUM}`);
  const proyecto = leer(["project", "view", NUM, "--owner", OWNER, "--format", "json"]);
  const projectId = proyecto.id;
  console.log(`  «${proyecto.title}»`);

  let usarIssues = true;
  try { execFileSync("gh", ["repo", "view", REPO], { stdio: "ignore" }); }
  catch { usarIssues = false; console.log(`  No encuentro ${REPO}; las tareas van como borradores del tablero.`); }

  paso("Revisando campos");
  let campos = leer(["project", "field-list", NUM, "--owner", OWNER, "--format", "json", "--limit", "100"]).fields || [];
  const buscar = n => campos.find(f => f.name.toLowerCase() === n.toLowerCase());
  for (const [nombre, opciones] of Object.entries(CAMPOS)) {
    const f = buscar(nombre);
    if (!f) {
      console.log(`  + creo el campo «${nombre}»`);
      escribir(["project", "field-create", NUM, "--owner", OWNER, "--name", nombre,
        "--data-type", "SINGLE_SELECT", "--single-select-options", opciones.join(",")]);
    } else {
      const faltan = opciones.filter(o => !(f.options || []).some(x => x.name === o));
      console.log(faltan.length
        ? `  ! «${nombre}» ya existe pero le faltan opciones: ${faltan.join(", ")}. Agregalas en el tablero o esos valores quedan vacíos.`
        : `  ✓ «${nombre}» ya existe`);
    }
  }
  if (buscar("Target date")) console.log("  ✓ uso el campo «Target date» para las fechas");
  else if (!buscar("Fecha límite")) {
    console.log("  + creo el campo «Fecha límite»");
    escribir(["project", "field-create", NUM, "--owner", OWNER, "--name", "Fecha límite", "--data-type", "DATE"]);
  } else console.log("  ✓ «Fecha límite» ya existe");
  if (!PRUEBA) campos = leer(["project", "field-list", NUM, "--owner", OWNER, "--format", "json", "--limit", "100"]).fields || [];

  const status = buscar("Status");
  const inicial = status && (status.options || []).find(x => /todo|por hacer|pendiente|backlog/i.test(x.name));

  function fijar(itemId, nombre, valor) {
    const f = nombre === "Fecha límite" ? (buscar("Target date") || buscar("Fecha límite")) : buscar(nombre);
    if (!f) return;
    const base = ["project", "item-edit", "--id", itemId, "--project-id", projectId, "--field-id", f.id];
    if (nombre === "Fecha límite") return escribir([...base, "--date", valor]);
    const o = (f.options || []).find(x => x.name === valor);
    if (o) escribir([...base, "--single-select-option-id", o.id]);
  }

  paso("Revisando tareas que ya están");
  const items = leer(["project", "item-list", NUM, "--owner", OWNER, "--format", "json", "--limit", "500"]).items || [];
  const yaEstan = new Set(items.map(i => (i.title || i.content?.title || "").trim()));
  console.log(`  El tablero tiene ${items.length} tarjetas.`);

  paso("Cargando tareas");
  let nuevas = 0, salteadas = 0;
  for (const [titulo, area, ola, resp, fecha, detalle] of TAREAS) {
    if (yaEstan.has(titulo)) { salteadas++; console.log(`  = ya está: ${titulo}`); continue; }
    console.log(`  • ${ola} · ${resp} · ${titulo}`);
    const cuerpo = `${detalle}\n\nOla: ${ola} · Responsable: ${resp} · Fecha límite: ${fecha}\n\n${VAULT}`;
    let itemId;
    if (usarIssues) {
      const url = escribir(["issue", "create", "--repo", REPO, "--title", titulo, "--body", cuerpo]);
      itemId = escribir(["project", "item-add", NUM, "--owner", OWNER, "--url", url || "URL", "--format", "json"], { json: true }).id ?? "ITEM";
    } else {
      itemId = escribir(["project", "item-create", NUM, "--owner", OWNER, "--title", titulo, "--body", cuerpo, "--format", "json"], { json: true }).id ?? "ITEM";
    }
    fijar(itemId, "Área", area);
    fijar(itemId, "Ola", ola);
    fijar(itemId, "Responsable", resp);
    fijar(itemId, "Fecha límite", fecha);
    if (inicial) escribir(["project", "item-edit", "--id", itemId, "--project-id", projectId, "--field-id", status.id, "--single-select-option-id", inicial.id]);
    nuevas++;
  }

  console.log(`\n${PRUEBA ? "Prueba terminada" : "✔ Listo"}: ${nuevas} tareas ${PRUEBA ? "a cargar" : "cargadas"}, ${salteadas} ya estaban.`);
  if (PRUEBA) console.log("Si está bien, corré lo mismo sin --prueba.");
} catch (e) {
  console.error("\n✖ Se cortó:", (e.stderr || e.message || "").toString().trim());
  console.error("Si el error habla de permisos, corré: gh auth refresh -s project");
  process.exit(1);
}
