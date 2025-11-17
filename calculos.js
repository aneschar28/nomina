const usarcalendario = document.querySelector(".usarcalendario");
const contenedordehoras = document.querySelector(".contenedordehoras");
const usarcalendariotru = document.querySelector(".usarcalendariotru");
const Horas = document.querySelector(".Horas");
const diurnaOrdinaria = document.querySelector(".diurnaOrdinaria");
const nocturnaOrdinaria = document.querySelector(".nocturnaOrdinaria");
const diurnaFestiva = document.querySelector(".diurnaFestiva");
const nocturnaFestiva = document.querySelector(".nocturnaFestiva");
const totalHours = document.querySelector(".totalHours");
const salarioHora = document.querySelector(".salarioHora");
const salariobase = document.querySelector(".salariobase");
const bonusExtraLegal = document.querySelector(".bonusExtraLegal");
const dolar = document.querySelector(".dolar");
const bonus = document.querySelector(".bonus");
const comisiones = document.querySelector(".comisiones");
const adere = document.querySelector(".adere");
const adereatru = document.querySelector(".adereatru");
const auxtra = document.querySelector(".auxtra");
const auxtratru = document.querySelector(".auxtratru");
const salypen = document.querySelector(".salypen");
const total = document.querySelector(".total");
let dolarhoy;




async function obtenerPrecioDolarCOP() {
  try {
    const respuesta = await fetch("https://open.er-api.com/v6/latest/USD");
    const datos = await respuesta.json();

    if (!datos?.rates?.COP) {
      throw new Error("No se encontró la tasa COP en la respuesta.");
    }

    dolar.textContent =`1 USD = ${formatearNumero(datos.rates.COP)} COP`;
    dolarhoy = Number(formatearNumero(datos.rates.COP));
  } catch (error) {
    console.error("❌ Error al obtener el precio del dólar:", error.message);
  }
}

obtenerPrecioDolarCOP();

function calendario () {

    return usarcalendariotru.checked;
}


function calculadoraSalario(aplicaTransporte = false, aplicaAderencia = false) {
    let subtotal1 = calendario () ? Number(Horas.value) :desglose.diurnaOrdinaria * 1
                  + desglose.nocturnaOrdinaria * 1.35
                  + desglose.diurnaFestiva * 1.80
                  + desglose.nocturnaFestiva * 2.15;

    let subtotal2 = subtotal1 * Number(salarioHora.value); // salario neto de horas trabajadas
    let suptotal3 = calendario () ? Number(Horas.value)*1500 :desglose.totalHours * 1500; // bono extralegal por hora trabajada
    let suptotal4 = aplicaAderencia ? 120000 : 0; // bono adrerencia (solo si aplica)
    let suptotal5 = aplicaTransporte ? 200000 : 0; // subsidio de transporte (solo si aplica)
    let suptotal6 = dolarhoy; // dólar actualizado
    let suptotal7 = Number(bonus.value); // bono en dólares
    let suptotal8 = Number(comisiones.value); // comisiones en dólares
    let suptotal9 = suptotal6 * suptotal7; // bono en pesos
    let suptotal10 = suptotal6 * suptotal8; // comisiones en pesos
    let suptotal11 = (subtotal2 + suptotal3 + suptotal4 +suptotal5 + suptotal9 + suptotal10) * 0.06; // aporte salud/pensión

    salariobase.textContent = `Salario base: ${formatearNumero(subtotal2)}`;
    bonusExtraLegal.textContent = `Bono extralegal: ${formatearNumero(suptotal3)}`;
    salypen.textContent = `Aporte a salud y pensión: ${formatearNumero(suptotal11)}`;
    adere.textContent = `bono de aderencia: ${formatearNumero(suptotal4)}`;
    auxtra.textContent = `Auxilio de transporte: ${formatearNumero(suptotal5)}`;
    total.textContent = `Total: ${formatearNumero((subtotal2 + suptotal3 + suptotal4 +suptotal5 + suptotal9 + suptotal10 - suptotal11))}`;




}


function update (){

    desglose = calcularHorasQuincena(jornadas)  

    diurnaOrdinaria.textContent = `Horas Diurnas:${desglose.diurnaOrdinaria}`;
    nocturnaOrdinaria.textContent = `Horas Nocturnas: ${desglose.nocturnaOrdinaria}`;
    diurnaFestiva.textContent = `Horas Diurna-Festiva:${desglose.diurnaFestiva}`;
    nocturnaFestiva.textContent = `Horas Nocturna-Festiva:${desglose.nocturnaFestiva}`;
    totalHours.textContent = `Horas Totales:${desglose.totalHours}`

    if (!auxtratru.checked) {
        if (!adereatru.checked) {
         calculadoraSalario(false,false);
        }else {
         calculadoraSalario (false,true)
        } 

    } else {
        if (!adereatru.checked) {
         calculadoraSalario(true,false);
        }else {
         calculadoraSalario (true,true)
        }
    }  

}

function formatearNumero(num, decimales = 2) {
  if (isNaN(num)) return "Número inválido";

  let [entera, decimal] = num.toFixed(decimales).split(".");
  let resultado = "";
  let contador = 0;

  for (let i = entera.length - 1; i >= 0; i--) {
    resultado = entera[i] + resultado;
    contador++;

    if (contador % 6 === 0 && i !== 0) {
      resultado = "'" + resultado;
    } else if (contador % 3 === 0 && i !== 0) {
      resultado = "." + resultado;
    }
  }

  return resultado + "," + decimal;
}


usarcalendariotru.addEventListener("input", () => {

    

    if (!auxtratru.checked) {
        if (!adereatru.checked) {
         calculadoraSalario(false,false);
        }else {
         calculadoraSalario (false,true)
        } 

    } else {
        if (!adereatru.checked) {
         calculadoraSalario(true,false);
        }else {
         calculadoraSalario (true,true)
        }
    }  
});

Horas.addEventListener("input", () => {
    if (!auxtratru.checked) {
        if (!adereatru.checked) {
         calculadoraSalario(false,false);
        }else {
         calculadoraSalario (false,true)
        } 

    } else {
        if (!adereatru.checked) {
         calculadoraSalario(true,false);
        }else {
         calculadoraSalario (true,true)
        }
    }  
});

salarioHora.addEventListener("input", () => {
    if (!auxtratru.checked) {
        if (!adereatru.checked) {
         calculadoraSalario(false,false);
        }else {
         calculadoraSalario (false,true)
        } 

    } else {
        if (!adereatru.checked) {
         calculadoraSalario(true,false);
        }else {
         calculadoraSalario (true,true)
        }
    }   
});

bonus.addEventListener("input", () => {
    if (!auxtratru.checked) {
        if (!adereatru.checked) {
         calculadoraSalario(false,false);
        }else {
         calculadoraSalario (false,true)
        } 

    } else {
        if (!adereatru.checked) {
         calculadoraSalario(true,false);
        }else {
         calculadoraSalario (true,true)
        }
    }  
});

comisiones.addEventListener("input", () => {
    if (!auxtratru.checked) {
        if (!adereatru.checked) {
         calculadoraSalario(false,false);
        }else {
         calculadoraSalario (false,true)
        } 

    } else {
        if (!adereatru.checked) {
         calculadoraSalario(true,false);
        }else {
         calculadoraSalario (true,true)
        }
    }  
});

auxtratru.addEventListener("change", () => {

    if (!auxtratru.checked) {
        if (!adereatru.checked) {
         calculadoraSalario(false,false);
        }else {
         calculadoraSalario (false,true)
        } 

    } else {
        if (!adereatru.checked) {
         calculadoraSalario(true,false);
        }else {
         calculadoraSalario (true,true)
        }
    }   
      
});

adereatru.addEventListener("change", () => {

    if (!auxtratru.checked) {
        if (!adereatru.checked) {
         calculadoraSalario(false,false);
        }else {
         calculadoraSalario (false,true)
        } 

    } else {
        if (!adereatru.checked) {
         calculadoraSalario(true,false);
        }else {
         calculadoraSalario (true,true)
        }
    }  
      
});










