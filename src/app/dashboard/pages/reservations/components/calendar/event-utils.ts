import { EventInput } from '@fullcalendar/core';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  },
  // Nuevos eventos añadidos con un forEach
  ...getAdditionalEvents()
];

// Función para obtener eventos adicionales
function getAdditionalEvents(): EventInput[] {
  const additionalEvents: EventInput[] = [];

  // Puedes usar un bucle forEach para añadir eventos adicionales aquí
  // Por ejemplo, añadamos tres eventos más con títulos y horarios diferentes
  const titles = ['Event 1', 'Event 2', 'Event 3'];
  titles.forEach((title, index) => {
    additionalEvents.push({
      id: createEventId(),
      title: title,
      start: TODAY_STR + `T0${index + 1}:00:00`,
      end: TODAY_STR + `T0${index + 2}:00:00`
    });
  });

  return additionalEvents;
}


export function createEventId() {
  return String(eventGuid++);
}
