import dayjs from 'dayjs';

export const ONE_MONTH = 'ONE_MONTH';
export const oneMonthAgo = () => dayjs().subtract(1, 'month').toDate();

export const THREE_MONTHS = 'THREE_MONTHS';
export const threeMonthsAgo = () => dayjs().subtract(3, 'month').toDate();

export const SIX_MONTHS = 'SIX_MONTHS';
export const sixMonthsAgo = () => dayjs().subtract(6, 'month').toDate();

export const YTD = 'YTD';
export const yearStart = () => dayjs().startOf('year').toDate();

export const ONE_YEAR = 'ONE_YEAR';
export const oneYearAgo = () => dayjs().subtract(1, 'year').toDate();

export const ALL_TIME = 'ALL_TIME';

export const FUTURE = 'FUTURE';
export const getToday = () => dayjs().toDate();
