// =============================
// FESTIVOS (Colombia 2025,2026,20207) - formato "YYYY-MM-DD"
const festivos = new Set([
  // 2025
  "2025-01-01", // Año Nuevo
  "2025-01-06", // Reyes Magos
  "2025-03-24", // Día de San José (trasladado) :contentReference[oaicite:1]{index=1}
  "2025-04-17", // Jueves Santo :contentReference[oaicite:2]{index=2}
  "2025-04-18", // Viernes Santo :contentReference[oaicite:3]{index=3}
  "2025-05-01", // Día del Trabajo
  "2025-06-02", // Ascensión del Señor :contentReference[oaicite:4]{index=4}
  "2025-06-23", // Corpus Christi :contentReference[oaicite:5]{index=5}
  "2025-06-30", // San Pedro y San Pablo / Sagrado Corazón :contentReference[oaicite:6]{index=6}
  "2025-07-20", // Día de la Independencia
  "2025-08-07", // Batalla de Boyacá
  "2025-08-18", // Asunción de la Virgen :contentReference[oaicite:7]{index=7}
  "2025-10-13", // Día de la Raza
  "2025-11-03", // Todos los Santos (trasladado) :contentReference[oaicite:8]{index=8}
  "2025-11-17", // Independencia de Cartagena
  "2025-12-08", // Inmaculada Concepción
  "2025-12-25", // Navidad

  // 2026
  "2026-01-01", // Año Nuevo :contentReference[oaicite:9]{index=9}
  "2026-01-12", // Reyes Magos :contentReference[oaicite:10]{index=10}
  "2026-03-23", // Día de San José :contentReference[oaicite:11]{index=11}
  "2026-04-02", // Jueves Santo :contentReference[oaicite:12]{index=12}
  "2026-04-03", // Viernes Santo :contentReference[oaicite:13]{index=13}
  "2026-05-01", // Día del Trabajo :contentReference[oaicite:14]{index=14}
  "2026-05-18", // Ascensión del Señor :contentReference[oaicite:15]{index=15}
  "2026-06-08", // Corpus Christi :contentReference[oaicite:16]{index=16}
  "2026-06-15", // Sagrado Corazón de Jesús :contentReference[oaicite:17]{index=17}
  "2026-06-29", // San Pedro y San Pablo :contentReference[oaicite:18]{index=18}
  "2026-07-20", // Día de la Independencia :contentReference[oaicite:19]{index=19}
  "2026-08-07", // Batalla de Boyacá :contentReference[oaicite:20]{index=20}
  "2026-08-17", // Asunción de la Virgen :contentReference[oaicite:21]{index=21}
  "2026-10-12", // Día de la Raza :contentReference[oaicite:22]{index=22}
  "2026-11-02", // Todos los Santos :contentReference[oaicite:23]{index=23}
  "2026-11-16", // Independencia de Cartagena :contentReference[oaicite:24]{index=24}
  "2026-12-08", // Inmaculada Concepción :contentReference[oaicite:25]{index=25}
  "2026-12-25", // Navidad :contentReference[oaicite:26]{index=26}

  // 2027
  "2027-01-01", // Año Nuevo :contentReference[oaicite:27]{index=27}
  "2027-01-11", // Reyes Magos :contentReference[oaicite:28]{index=28}
  "2027-03-22", // Día de San José :contentReference[oaicite:29]{index=29}
  "2027-03-25", // Jueves Santo :contentReference[oaicite:30]{index=30}
  "2027-03-26", // Viernes Santo :contentReference[oaicite:31]{index=31}
  "2027-05-01", // Día del Trabajo :contentReference[oaicite:32]{index=32}
  "2027-05-10", // Ascensión de Jesús :contentReference[oaicite:33]{index=33}
  "2027-05-31", // Corpus Christi :contentReference[oaicite:34]{index=34}
  "2027-06-07", // Sagrado Corazón de Jesús :contentReference[oaicite:35]{index=35}
  "2027-07-05", // San Pedro y San Pablo :contentReference[oaicite:36]{index=36}
  "2027-07-20", // Día de la Independencia :contentReference[oaicite:37]{index=37}
  "2027-08-07", // Batalla de Boyacá :contentReference[oaicite:38]{index=38}
  "2027-08-16", // Asunción de la Virgen :contentReference[oaicite:39]{index=39}
  "2027-10-18", // Día de la Raza :contentReference[oaicite:40]{index=40}
  "2027-11-01", // Todos los Santos :contentReference[oaicite:41]{index=41}
  "2027-11-15", // Independencia de Cartagena :contentReference[oaicite:42]{index=42}
  "2027-12-08", // Inmaculada Concepción :contentReference[oaicite:43]{index=43}
  "2027-12-25"  // Navidad :contentReference[oaicite:44]{index=44}
]);


// =============================
// FUNCIÓN: desglosarHoras
// Recibe objetos Date (inicio, fin) y devuelve un objeto con las horas separadas por categoria
// =============================

function desglosarHoras(inicio, fin) {
  let minutosDiurnaOrdinaria = 0;
  let minutosNocturnaOrdinaria = 0;
  let minutosDiurnaFestiva = 0;
  let minutosNocturnaFestiva = 0;

  const MS_POR_MINUTO = 1000 * 60;
  let actual = new Date(inicio.getTime());

  while (actual < fin) {
    const siguiente = new Date(actual.getTime() + MS_POR_MINUTO);
    if (siguiente > fin) siguiente.setTime(fin.getTime());

    const hora = actual.getHours();
    const fechaKey = actual.toLocaleDateString("sv-SE");
    const esFestivo = festivos.has(fechaKey) || actual.getDay() === 0;
    const esNocturno = hora >= 21 || hora < 6; // legislacion de colombia hasta el 26 de dic 25, jornada nocturna desde las 9p.m. hasta las 6 a.m.

    if (esFestivo && esNocturno) minutosNocturnaFestiva++;
    else if (esFestivo && !esNocturno) minutosDiurnaFestiva++;
    else if (!esFestivo && esNocturno) minutosNocturnaOrdinaria++;
    else minutosDiurnaOrdinaria++;

    actual = siguiente;
  }


  const toHours = m => Number((m / 60).toFixed(2));

  return {
  diurnaOrdinaria: toHours(minutosDiurnaOrdinaria),
  nocturnaOrdinaria: toHours(minutosNocturnaOrdinaria),
  diurnaFestiva: toHours(minutosDiurnaFestiva),
  nocturnaFestiva: toHours(minutosNocturnaFestiva),
  totalHours: toHours(
    minutosDiurnaOrdinaria +
    minutosNocturnaOrdinaria +
    minutosDiurnaFestiva +
    minutosNocturnaFestiva
  )
};
}



// =============================
// FUNCIÓN: calcularHorasQuincena
// Recibe un arreglo de jornadas: [{ inicio: "ISO", fin: "ISO" }, ...]
// y suma los resultados de desglosarHoras.
// =============================
function calcularHorasQuincena(jornadas) {
  let tot = {
    diurnaOrdinaria: 0,
    nocturnaOrdinaria: 0,
    diurnaFestiva: 0,
    nocturnaFestiva: 0,
    totalHours: 0
  };

  for (const j of jornadas) {
    const inicio = new Date(j.inicio);
    const fin = new Date(j.fin);
    const r = desglosarHoras(inicio, fin);
    tot.diurnaOrdinaria += r.diurnaOrdinaria;
    tot.nocturnaOrdinaria += r.nocturnaOrdinaria;
    tot.diurnaFestiva += r.diurnaFestiva;
    tot.nocturnaFestiva += r.nocturnaFestiva;
    tot.totalHours += r.totalHours;
  }

  // redondear totales a 1 decimal
  for (const k of ["diurnaOrdinaria","nocturnaOrdinaria","diurnaFestiva","nocturnaFestiva","totalHours"]) {
    tot[k] = Number(tot[k].toFixed(1));
  }

  return tot;
}
