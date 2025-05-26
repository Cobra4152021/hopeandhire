export interface CalendarEvent {
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
}

export function createGoogleCalendarEvent(event: CalendarEvent): string {
  const startDate = new Date(event.start.dateTime);
  const endDate = new Date(event.end.dateTime);

  // Format dates for Google Calendar URL
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const start = formatDate(startDate);
  const end = formatDate(endDate);

  // Create Google Calendar URL with event details
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.summary
  )}&details=${encodeURIComponent(event.description)}&dates=${start}/${end}`;
}

export function createGoogleMeetLink(): string {
  return 'https://meet.google.com/new';
}

export function formatDateTime(date: string, time: string): string {
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

export function getLocalTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
