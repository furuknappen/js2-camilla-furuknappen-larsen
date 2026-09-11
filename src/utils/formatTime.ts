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

  //TODO: go back here when theres posts fresher than 24h

  if (timePassed < 24) {
  return `${timePassed} hours ago`;
  }

  const timeOptions = {
    // weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  } as const;

  const formattedDate = new Intl.DateTimeFormat("en-UK", timeOptions);
  // console.log()
  const manipulatedTime = formattedDate.format(timeCreated);


  //
  // timeEdited.classList.add("time");
  // finnes en bedre løsning enn denne
  // timeEdited.style.display = "block";

  // if (post.updated !== post.created) {
  //   const formatedTimeEdited = formatTime(post.updated);
  //   timeEdited.textContent = `Updated: ${formatedTimeEdited}`;
  // }

  return manipulatedTime;
}
