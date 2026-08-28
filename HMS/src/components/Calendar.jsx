import axios from 'axios';
import { useState, useEffect} from 'react';
import { useNavigate, useLocation} from 'react-router';
import {  fetchRecordByObj } from "../functions/fetchRecordByObj.js";
import {  getJsDate } from "../functions/getJsDate.js";
import '../styles/calendar.css';
import dayjs from "dayjs";
import { getHeader } from "../functions/getHeader";
import {AiOutlineEdit, AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export function Calendar(props) {
    //const location = useLocation();
    const navigate = useNavigate();
    const headers = getHeader();
    const daysOfWeek = ['Sun', 'Mon','Tue','Wed','Thu','Fri','Sat'];
    const monthsOfYear = ['January', 'Febreuary','March','April','May','June','July','August','September','October','November','December'];
    const currentDate = getJsDate(props.selectedDate);
    const patientId = props.patientId;
    const patientName = props.person;
    const clinic = props.clinic;
    const doctorId = props.doctorId;

    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());   //month is a zero based
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
    const [selectedDate, setSelectedDate] = useState(props.selectedDate);
    const [showEventPopup, setShowEventPopup] = useState(false);
    const [events, setEvents] = useState([]);
    const [eventId, setEventId] = useState(null);

    const [appointmentId, setAppointmentId] = useState(null);
    const [startHour, setStartHour] = useState(0);
    const [startMinute, setStartMinute] = useState(0);
    const [endHour, setEndHour] = useState(0);
    const [endMinute, setEndMinute] = useState(0);
    const [eventPatientName, setEventPatientName] = useState(props.person);
    const [eventComment, setEventComment] = useState('');
    const [editEvents, setEidtEvents] = useState(null);
    const [eventDate, setEventDate] = useState(props.selectedDate);
    const link = "http://localhost:9002/hms/appointmentAddUpdate" ;
    const deleteLink = "http://localhost:9002/hms/appointment" ;

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const prevMonth = () => {
        setEvents([]);
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
        setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear))
    }

    const nextMonth = () => {
        setEvents([]);
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
        setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear))
    }

    async function getEvents(eventDate) { 
        setEvents([]);
        const stringDate = dayjs(eventDate).format("YYYY-MM-DD");
        const getObj = {clinic, doctorId, eventDate: stringDate};   
            const response = await fetchRecordByObj(props.lnk, getObj);
            let updatedEvents = [...events];
            let newEvent;
            response.map((event)=>{
                newEvent = {
                    appointmentId: event.appointmentId,
                    blockId: event.blockId,
                    appointmentDate: new Date(eventDate),
                    startHour: fmt(event.startHour),
                    startMinute: fmt(event.startMinute),
                    endHour: fmt(event.endHour),
                    endMinute: fmt(event.endMinute),
                    patientId: event.patientId,
                    patientName: event.patientName,
                    comments: event.comments
                };
                updatedEvents.push(newEvent);
            });
            setEvents(updatedEvents);
    }

    function fmt(num) {
        return num != null ? String(num).padStart(2, "0") : "--";
    }

    useEffect(() => {
        if (!selectedDate) return;
        setEvents([]);
        const jsDate = getJsDate(selectedDate); 
        getEvents(jsDate);
        
    }, [selectedDate]);      


    const handleDayClicked = (day) => {
        const clickedDate = new Date(currentYear, currentMonth, day);
        const today = new Date();
        setEvents([]);
        if(clickedDate !== selectedDate){
            if(clickedDate >= today || isSameDay(clickedDate,today) ){   //must be current or future date
                setEvents([]);
                setSelectedDate(clickedDate);
                getEvents(clickedDate)
            }
        }
        
    }

    const isSameDay = (date1, date2) => {
        return(  date1.getFullYear() === date2.getFullYear()
              && date1.getMonth() === date2.getMonth()
              && date1.getDate() === date2.getDate());
    }

    const handleEventSubmit = () => {
        
        const newEvent = {
            appointmentId: appointmentId,
            blockId: editEvents ? editEvents.blockId : Date.now(),
            appointmentDate: selectedDate,
            startHour: startHour,
            startMinute: startMinute,
            endHour: endHour,
            endMinute: endMinute,
            patientId: patientId,
            patientName: patientName,
            comments: eventComment
        };

        let updatedEvents = [...events];
        if(editEvents){
            updatedEvents = updatedEvents.map((event)=> 
                event.blockId === editEvents.blockId ? newEvent : event
            )
        }

        updatedEvents.sort((a, b) => new Date(a.date) - new Date(b.date));

        setEvents(updatedEvents);
        setEventComment('');
        setShowEventPopup(false);
        setEidtEvents(null);
        saveInDB(newEvent);
    }

    const saveInDB = async (event) => {
        try {
            const response = await axios.post(link, event, { headers });
        } catch (err) {
            navigate("/exception", {
                state: {
                message: err.response?.data?.message,
                stackTrace: err.response?.data?.stackTrace,
                exceptionDate: err.response?.data?.exceptionDate
                }
            });
        }
    }

    //when edit icon is clicked, populate variables 
    const handleEditEvent = (event) => {
        setEventDate(event.appointmentDate)
        setStartHour(event.startHour)
        setStartMinute(event.startMinute)
        setEndHour(event.endHour)
        setEndMinute(event.endMinute)
        setEventId(event.blockId);
        setEventComment(event.comments);
        setAppointmentId(event.appointmentId)
        setEidtEvents(event);   //set editEvent to this event
        setShowEventPopup(true);//open popup
    }

    const handleDeleteEvent = (event) => {
        //event.preventDefault();
        console.log(event.appointmentId)
  		var answer = window.confirm("Are you sure you want to Delete event?");
    	if (answer) {
		  // Save it!
		  axios.delete(deleteLink+'/'+event.appointmentId,{headers: headers}
  				).catch((error) => {console.warn("response", error.response?.data)});
		} else {
		  // Do nothing!
		  console.log('Thing was not saved to the database.');
		}
        setEvents([]);
        getEvents(selectedDate);
    }

    const handleTimeChange =(e) => {
        //const {name, value} = e.target;
        //setEventTime((prevTime) => ({...prevTime, [name]: value.padStart(2, '0')}));
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
                        <span key={day+1} className={day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear()
                                                    ? 'current-day'
                                                    : selectedDate && (day + 1 === new Date(selectedDate).getDate() && currentMonth === new Date(selectedDate).getMonth() && currentYear === new Date(selectedDate).getFullYear())
                                                        ? 'selected-day'
                                                        : ''
                                                    }
                            onClick={() => handleDayClicked(day + 1)}>{day+1}</span>
                    ))}
                    
                </div>    
            </div>
            <div className="events">
                {showEventPopup && (<div className="event-popup">
                                        <div className="time-input">
                                            <div className="event-popup-time">Time</div>
                                            <input type="number" name='hours' min={0} max={24} className="hours" value={startHour} onChange={handleTimeChange}/>
                                            <input type="number" name='minutes' min={0} max={60} className="minutes" value={startMinute} onChange={handleTimeChange}/>
                                        </div>
                                        <input type="text" name='patient' className="text-input" value={eventPatientName} onChange={handleTimeChange}/>
                                        <textarea placeholder='enter appointment comment (Maximum 100 Character)' value={eventComment} 
                                                    onChange={(e)=>{
                                                        if(e.target.value.length <= 100){
                                                            setEventComment(e.target.value);
                                                        }
                                                    }
                                                }>
                                        </textarea>
                                        <button className="event-popup-btn" onClick={handleEventSubmit}>{editEvents ? "Update Appointment" : "Add Appointment"}</button>
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
                                {`${monthsOfYear[new Date(event.appointmentDate).getMonth()]
                                   } ${new Date(event.appointmentDate).getDate()}, ${new Date(event.appointmentDate).getFullYear()}`}
                            </div>
                            <div className="event-time">{`${event.startHour}:${event.startMinute} - ${event.endHour}:${event.endMinute}`}</div>
                        </div>
                        <div className={event.patientName?"event-text-filled":"event-text"}>{event.patientId}  {event.patientName}<br/>{event.comments}</div>
                        <div className="event-buttons">
                            <i onClick={() => handleEditEvent(event)}><AiOutlineEdit/></i>
                            <i onClick={() => handleDeleteEvent(event)}><AiOutlineClose/></i>
                        </div>
                    </div>
                ))}                
            </div>
        </div>
    </div>
  )
}