for (i = 0; i < user.buzzes.length - 1; i++) {
  var date2 = user.buzzes[user.buzzes.length - 1].dateCreated.getTime();
  var date1 = user.buzzes[i].dateCreated.getTime();
  var dayHourMin = getDayHourMin(date1, date2);
  var days = dayHourMin[0];
  var hours = dayHourMin[1];
  var minutes = dayHourMin[2];
  var seconds = dayHourMin[3];
  if (days >= 1) {
    hours = hours + days * 24;
  }
  if (hours == 0) {
    buzzDuration = minutes / 60 + seconds / 3600;
  } else {
    buzzDuration = hours + minutes / 60 + seconds / 3600;
  }
  durations.push(buzzDuration);
}
