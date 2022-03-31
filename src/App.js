import { BiCalendar } from 'react-icons/bi';
import Search from './components/Search';
import AddApps from './components/AddApps';
import AppointmemtInfo from './components/AppointmentInfo';
import { useState, useEffect, useCallback } from 'react';

function App() {
	let [ appointmentList, setAppointmentList ] = useState([]);
	let [ query, setQuery ] = useState('');
	let [ orderBy, setOrderBy ] = useState('petName');
	let [ sortBy, setSortBy ] = useState('asc');

	const filterApp = appointmentList.filter((item) => {
		return (
			item.petName.toLowerCase().includes(query.toLowerCase()) ||
			item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
			item.aptNotes.toLowerCase().includes(query.toLowerCase())
		);
	});

	const fetchData = useCallback(() => {
		fetch('./data.json').then((response) => response.json()).then((data) => {
			setAppointmentList(data);
		});
	}, []);

	useEffect(
		() => {
			fetchData();
		},
		[ fetchData ]
	);

	return (
		<div className="App container mx-auto mt-3 font-thin">
			<h1 className="text-5xl mb-3">
				<BiCalendar className="inline-block text-red-400 align-top" />Book Your Appointment
			</h1>
			<AddApps
				onSendAppointment={(myAppointment) => setAppointmentList([ ...appointmentList, myAppointment ])}
				lastId={appointmentList.reduce((max, item) => (Number(item.id) > max ? Number(item.id) : max), 0)}
			/>
			<Search
				query={query}
				onQueryChange={(myQuery) => setQuery(myQuery)}
				orderBy={orderBy}
				onOrderByChange={(mySort) => setOrderBy(mySort)}
				sortBy={sortBy}
				onSortByChange={(mySort) => setSortBy(mySort)}
			/>
			<ul className="divide-y divide-gray-200">
				{filterApp.map((appointment) => (
					<AppointmemtInfo
						key={appointment.id}
						appointment={appointment}
						onDelete={(appointmentId) => {
							setAppointmentList(
								appointmentList.filter((appointment) => appointment.id != appointmentId)
							);
						}}
					/>
				))}
			</ul>
		</div>
	);
}

export default App;
