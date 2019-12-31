export default function parseTimeOptions(timestamps) {
  return timestamps.map(ts => {
    return {
      value: ts.id,
      label: ts.timeOfDay
    };
  });
}
