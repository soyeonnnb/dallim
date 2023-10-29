import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import * as S from './Calendar.styles';

function ChartCalendar() {
  return (
    <S.Container>
      <Calendar
        // Customize the appearance of the calendar
        style={{
          backgroundColor: 'yellow',
          width: '100%',
        }}
        // Specify the current date
        current={'2012-03-01'}
        // Callback that gets called when the user selects a day
        onDayPress={day => {
          console.log('selected day', day);
        }}
        // Mark specific dates as marked
        markedDates={{
          '2012-03-01': {selected: true, marked: true, selectedColor: 'blue'},
          '2012-03-02': {marked: true},
          '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'},
        }}
      />
    </S.Container>
  );
}

export default ChartCalendar;
