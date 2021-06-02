/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch } from 'react-redux';
import { updateProject } from '../store/actions';

const ToDo = (props) => {
  const { events, id } = props.project;
  const dispatch = useDispatch();

  const [calEvents, setEvents] = useState(events || []);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());

  const handleEventClick = (eventClickInfo) => {
    setEvents(calEvents.filter((e) => {
      return e.title !== eventClickInfo.event._def.title;
    }));
  };

  const addEvent = () => {
    dispatch(updateProject({
      events: [...calEvents, {
        title,
        start: date,
      }],
    }, id));
    setEvents([...calEvents, {
      title,
      start: date,
    }]);
    setTitle('');
    setDate(new Date());
  };

  return (
    <div className="calendar">
      <div className="events">
        <label htmlFor="title">
          <p>Title:</p>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label htmlFor="date">
          <p>
            Date:
          </p>
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
        events={calEvents}
      />
    </div>
  );
};
export default ToDo;
