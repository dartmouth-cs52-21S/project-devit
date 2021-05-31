/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const ToDo = () => {
  const [events, setEvents] = useState([
    {
      title: 'Team Meeting',
      start: '2021-05-30',
    },
    {
      title: 'Dev Site Launch',
      start: '2021-06-02',
    },
  ]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());

  const handleEventClick = (eventClickInfo) => {
    setEvents(events.filter((e) => {
      return e.title !== eventClickInfo.event._def.title;
    }));
  };

  const addEvent = () => {
    setEvents([...events, {
      title,
      start: date,
    }]);
    setTitle('');
    setDate(new Date());
  };

  return (
    <div className="calendar">
      <h1>Calendar</h1>
      <div className="events">
        <label htmlFor="title">
          Title:
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label htmlFor="date">Date:
          <input type="date"
            id="date"
            name="trip-start"
            value={date}
            min="2021-01-01"
            max="2022-01-01"
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button type="button" onClick={addEvent}>Add Event</button>
      </div>
      <FullCalendar
        plugins={[listPlugin, interactionPlugin]}
        initialView="listWeek"
        editable
        eventClick={handleEventClick}
        defaultAllDay
        events={events}
      />
    </div>
  );
};
export default ToDo;
