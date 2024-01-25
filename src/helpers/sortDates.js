import dayjs from 'dayjs';

export const sortDates = (array, chrono) => {
  array.sort((a, b) => {
    const isSameOfBefore = dayjs(a.date).isSameOrBefore(dayjs(b.date));
    if (isSameOfBefore) {
      return chrono ? -1 : 1;
    } else {
      return chrono ? 1 : -1;
    }
  });
  return array;
};
