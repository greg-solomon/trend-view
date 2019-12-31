import moment from "moment";

export default function parseTimestamps(inputStamps) {
	const times = [];
	inputStamps.forEach(({ id, date }) => {
		const calendarDate = moment(Date.parse(date)).format("MMMM D, YYYY");
		const timeOfDay = moment(Date.parse(date)).format("h:mm A");

		if (times.find(time => time.calendarDate === calendarDate)) {
			const index = times.findIndex(obj => obj.calendarDate === calendarDate);
			times[index].timestamps.push({ id, timeOfDay });
		} else {
			times.push({ calendarDate, timestamps: [{ id, timeOfDay }] });
		}
	});

	const ordered = times.map(({ calendarDate, timestamps }) => {
		return { calendarDate, timestamps: timestamps.reverse() };
	});
	// reverse so we get stamps ordered from present to past
	const reversed = ordered.reverse();

	return reversed.map(ts => {
		return {
			label: ts.calendarDate,
			value: ts.timestamps,
		};
	});
}
