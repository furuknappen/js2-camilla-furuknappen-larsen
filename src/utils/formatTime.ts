export function formatTime(time: string): string {
  // const formatedTimeCreated =

  const now = new Date();
  const timeCreated = new Date(time);

  const timestampNow = now.getTime();
  const timestampcreated = timeCreated.getTime();

  const differenceInMilliseconds = timestampNow - timestampcreated;
  const millisecondsInAnHour = 1000 * 60 * 60;

  const timePassed = Math.floor(
    differenceInMilliseconds / millisecondsInAnHour,
  );

  if (timePassed < 24) {
    return `${timePassed} hours ago`;
  }

  const timeOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  } as const;

  const formattedDate = new Intl.DateTimeFormat("en-UK", timeOptions);

  const manipulatedTime = formattedDate.format(timeCreated);

  return manipulatedTime;
}
