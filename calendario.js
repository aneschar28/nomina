const jornadas = [];
let desglose = {};

document.addEventListener('DOMContentLoaded', function() {
  const calendarEl = document.getElementById('calendar');
  
  function formatoLocal(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${d}T${h}:${min}:${s}`;
  }

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    locale: 'es',
    selectable: true,
    selectMirror: true,
    slotMinTime: "00:00:00",
    slotMaxTime: "24:00:00",
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },

    dateClick: function(info) {
      const currentView = calendar.view.type;

      if (currentView === 'dayGridMonth') {
        const fecha = info.dateStr;
        const modal = document.getElementById('modal');
        const inicioInput = document.getElementById('horaInicio');
        const finInput = document.getElementById('horaFin');
        const fechaTexto = document.getElementById('fechaSeleccionada');
        const lunchCheck = document.getElementById('incluirLunch');
        const lunchInicio = document.getElementById('horaLunchInicio');
        const lunchFin = document.getElementById('horaLunchFin');

        fechaTexto.textContent = fecha;
        modal.style.display = 'flex';
        inicioInput.value = '';
        finInput.value = '';
        lunchCheck.checked = false;
        lunchInicio.value = '';
        lunchFin.value = '';
        lunchInicio.disabled = true;
        lunchFin.disabled = true;

        lunchCheck.onchange = function() {
          const checked = lunchCheck.checked;
          lunchInicio.disabled = !checked;
          lunchFin.disabled = !checked;
        };

        const guardarBtn = document.getElementById('guardarTurno');
        guardarBtn.onclick = null;
        guardarBtn.onclick = function() {
          const horaInicio = inicioInput.value;
          const horaFin = finInput.value;

          if (!horaInicio || !horaFin) {
            alert('Por favor selecciona las horas de inicio y fin.');
            return;
          }

          const inicio = new Date(`${fecha}T${horaInicio}`);
          const fin = new Date(`${fecha}T${horaFin}`);

          if (lunchCheck.checked) {
            const li = lunchInicio.value;
            const lf = lunchFin.value;

            if (!li || !lf) {
              alert('Por favor selecciona las horas del lunch.');
              return;
            }

            const inicioLunch = new Date(`${fecha}T${li}`);
            const finLunch = new Date(`${fecha}T${lf}`);

            // Validar que el lunch esté dentro del turno
            if (inicioLunch <= inicio || finLunch >= fin || inicioLunch >= finLunch) {
              alert('El lunch debe estar dentro del horario de trabajo.');
              return;
            }

            // Primer bloque: antes del lunch
            jornadas.push({
              inicio: formatoLocal(inicio),
              fin: formatoLocal(inicioLunch)
            });
            calendar.addEvent({
              title: 'Trabajo',
              start: inicio,
              end: inicioLunch,
              color: '#28a745',
              textColor: 'white'
            });

            // Segundo bloque: después del lunch
            jornadas.push({
              inicio: formatoLocal(finLunch),
              fin: formatoLocal(fin)
            });
            calendar.addEvent({
              title: 'Trabajo',
              start: finLunch,
              end: fin,
              color: '#28a745',
              textColor: 'white'
            });
          } else {
            // Sin lunch → turno completo
            jornadas.push({
              inicio: formatoLocal(inicio),
              fin: formatoLocal(fin)
            });
            calendar.addEvent({
              title: 'Trabajo',
              start: inicio,
              end: fin,
              color: '#28a745',
              textColor: 'white'
            });
          }
          update ();
          modal.style.display = 'none';
        };
      }
    },

    select: function(selectionInfo) {
      const currentView = calendar.view.type;
      if (currentView !== 'dayGridMonth') {
        const inicio = formatoLocal(selectionInfo.start);
        const fin = formatoLocal(selectionInfo.end);

        jornadas.push({ inicio, fin });

        calendar.addEvent({
          title: 'Trabajo',
          start: selectionInfo.start,
          end: selectionInfo.end,
          color: '#28a745',
          textColor: 'white'
        });

        calendar.unselect();
        update ();
      }
    },

    eventClick: function(info) {
      const ev = info.event;
      const index = jornadas.findIndex(j =>
        j.inicio === formatoLocal(ev.start) &&
        j.fin === formatoLocal(ev.end)
      );
      if (index !== -1) jornadas.splice(index, 1);
      ev.remove();
      update ();
    }
  });

  calendar.render();

  document.getElementById('cerrarModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
  };
});
