import { useState, useEffect} from 'react';
import '../styles/calendar.css';
import {AiOutlineEdit, AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export function Calendar() {
    const daysOfWeek = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];
    const monthsOfYear = ['January', 'Febreuary','March','April','May','June','July','August','September','October','November','December'];
    const currentDate = new Date();

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());   //month is a zero based
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventTime, setEventTime] = useState({hours: '00', minutes: '00'});
    const [eventText, setEventText] = useState('');
    const [editEvents, setEidtEvents] = useState(null);

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
    }

    const handleDayClicked = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();

        if(clickedDate >= today || isSameDay(clickedDate,today) ){   //must be current or future date
            setSelectedDate(clickedDate);
            setShowEventPopup(true);
            setEventTime({hours: '00', minutes: '00'});
            setEventText('');
            setEidtEvents(null);
        }
    }

    const isSameDay = (date1, date2) => {
        return(  date1.getFullYear() === date2.getFullYear()
              && date1.getMonth() === date2.getMonth()
              && date1.getDate() === date2.getDate());
    }

    const handleEventSubmit = () => {
        const newEvent = {
            id: editEvents ? editEvents.id : Date.now(),
            date: selectedDate,
            time: `${eventTime.hours.padStart(2,'0')}:${eventTime.minutes.padStart(2,'0')}`,
            text: eventText
        };

        let updatedEvents = [...events];
        if(editEvents){
            updatedEvents = updatedEvents.map((event)=> 
                event.id === editEvents.id ? newEvent : event
            )
        }else{
            updatedEvents.push(newEvent);
        }

        updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvents(updatedEvents);
        setEventTime({hours: '00', minutes: '00'});
        setEventText('');
        setShowEventPopup(false);
        setEidtEvents(null);
    }

    const handleEditEvent = (event) => {
        console.log(event.date)
        setSelectedDate(new Date(event.date));
        setEventTime({
            hours: event.time.split(':')[0],
            minutes: event.time.split(':')[1]
        });
        setEventText(event.text);
        setEidtEvents(event);
        setShowEventPopup(true);
    }

    const handleDeleteEvent = (eventId) => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
    }

    const handleTimeChange =(e) => {
        const {name, value} = e.target;
        setEventTime((prevTime) => ({...prevTime, [name]: value.padStart(2, '0')}));
    }

  return (
    <div className="calendar-container">
        <div className="calendar-app">
            <div className="calendar">
                <h1 className="heading">calendar</h1>
                <div className="navigate-date">
                    <h2 className="month">{monthsOfYear[currentMonth]},</h2>
                    <h2 className="year">{currentYear}</h2>
                    <div className="buttons">
                        <i onClick={prevMonth}><AiOutlineLeft/></i>
                        <i onClick={nextMonth}><AiOutlineRight/></i>
                    </div>
                </div>
                <div className="weekdays">
                    {daysOfWeek.map((day) =>(
                        <span key={day}>{day}</span> 
                    ))}
                </div>
                <div className="days">
                    {[...Array(firstDayOfMonth).keys()].map((_, index) =>(
                        <span key={`empty-${index}`}/>
                    ))}
                    {[...Array(daysInMonth).keys()].map((day) =>(
                        <span key={day+1} className={day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth()
                                                    && currentYear === currentDate.getFullYear() ? 'current-day' : ''}
                            onClick={() => handleDayClicked(day + 1)}>{day+1}</span>
                    ))}
                    
                </div>    
            </div>
            <div className="events">
                {showEventPopup && (<div className="event-popup">
                                        <div className="time-input">
                                            <div className="event-popup-time">Time</div>
                                            <input type="number" name='hours' min={0} max={24} className="hours" value={eventTime.hours} onChange={handleTimeChange}/>
                                            <input type="number" name='minutes' min={0} max={60} className="minutes" value={eventTime.minutes} onChange={handleTimeChange}/>
                                        </div>
                                        <textarea placeholder='enter event text (Maximum 60 Character)' value={eventText} 
                                                    onChange={(e)=>{
                                                        if(e.target.value.length <= 60){
                                                            setEventText(e.target.value);
                                                        }
                                                    }
                                                }>
                                        </textarea>
                                        <button className="event-popup-btn" onClick={handleEventSubmit}>{editEvents ? "Update Event" : "Add Event"}</button>
                                        <button className="close-popup-btn">
                                            <i onClick={()=> setShowEventPopup(false)}><AiOutlineClose /></i>
                                        </button>
                                    </div>
                                )
                }
                {events.map((event, index)=> (
                    <div className="event" key={index}>
                        <div className="event-date-wrapper">
                            <div className="event-date">
                                {`${monthsOfYear[event.date.getMonth()]
                                   } ${event.date.getDate()}, ${event.date.getFullYear()}`}
                            </div>
                            <div className="event-time">{event.time}</div>
                        </div>
                        <div className="event-text">{event.text}</div>
                        <div className="event-buttons">
                            <i onClick={() => handleEditEvent(event)}><AiOutlineEdit/></i>
                            <i onClick={() => handleDeleteEvent(event.id)}><AiOutlineClose/></i>
                        </div>
                    </div>
                ))}                
            </div>
        </div>
    </div>
  )
}