import moment from "moment";

export function age(user) {
  const birthdate = moment.utc(user.birthdate);
  const now = moment.utc();
  const years = now.diff(birthdate, "years");
  return years;
}
