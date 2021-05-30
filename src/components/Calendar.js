import React from 'react';
import FullCalendar from '@fullcalendar/react';
import listPlugin from '@fullcalendar/list';

const ToDo = () => {
  return (
    <div>
      <h1>Cal</h1>
      <FullCalendar
        plugins={[listPlugin]}
        initialView="listWeek"
        events={[
          {
            title: 'Meeting',
            start: '2021-05-27T14:30:00',
            extendedProps: {
              status: 'done',
            },
          },
          {
            title: 'Birthday Party',
            start: '2021-05-28T07:00:00',
            backgroundColor: 'green',
            borderColor: 'green',
          },
        ]}
      />
    </div>
  );
};
export default ToDo;
