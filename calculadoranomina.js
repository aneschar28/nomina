// =============================
// FESTIVOS (Colombia 2025) - formato "YYYY-MM-DD"
const festivos = new Set([
  "2025-01-01", // Año Nuevo
  "2025-01-06", // Reyes Magos
  "2025-03-24", // Día de San José
  "2025-04-17", // Jueves Santo
  "2025-04-18", // Viernes Santo
  "2025-05-01", // Día del Trabajo
  "2025-06-02", // Ascensión del Señor
  "2025-06-23", // Corpus Christi
  "2025-06-30", // San Pedro y San Pablo / Sagrado Corazón
  "2025-07-20", // Día de la Independencia
  "2025-08-07", // Batalla de Boyacá
  "2025-08-18", // Asunción de la Virgen
  "2025-10-13", // Día de la Raza
  "2025-11-03", // Todos los Santos
  "2025-11-17", // Independencia de Cartagena
  "2025-12-08", // Inmaculada Concepción
  "2025-12-25"  // Navidad
]);

// =============================
// FUNCIÓN: desglosarHoras
// Recibe objetos Date (inicio, fin) y devuelve un objeto con las 4 categorías exclusivas.
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
    const esNocturno = hora >= 21 || hora < 6;

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











