/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { updateProject, updateUser } from '../store/actions';
import { selectUser } from '../store/selectors';

const ToDo = (props) => {
  const { events, id } = props.project;
  const dispatch = useDispatch();

  const [calEvents, setEvents] = useState(events || []);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const user = useSelector(selectUser);

  const handleEventClick = (eventClickInfo) => {
    setEvents(calEvents.filter((e) => {
      return e.title !== eventClickInfo.event.title;
    }));
  };

  const renderEvent = (event) => (
    <div className="cal-event">
      <h4>{event.event.title}</h4>
      <FontAwesomeIcon icon={faTimes} size="lg" onClick={() => handleEventClick(event)} />
    </div>
  );

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

    if (!user.eventsCreated) {
      user.eventsCreated = 1;
    } else {
      user.eventsCreated += 1;
    }
    dispatch(updateUser(user.id, user));
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
        <button type="button" onClick={addEvent} disabled={title.length < 1}>Add Event</button>
      </div>
      <FullCalendar
        plugins={[listPlugin, interactionPlugin]}
        initialView="listWeek"
        editable
        defaultAllDay
        events={calEvents}
        eventContent={renderEvent}
      />
    </div>
  );
};
export default ToDo;
