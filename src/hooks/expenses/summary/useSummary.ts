import { useState } from 'react';

import { useExpenseHistoryApi, useSummaryApi } from '@/hooks/expenses/api/useSummaryApi';
import type { ExpenseSummary } from '@/types/expenses/api';
import { formatDate } from '@/utils/date/format';

type DateRange = {
  startDate: string;
  endDate: string;
};

type SummaryGroupBy = 'category' | 'payment_method';

const getMonthStart = (date: Date): Date => new Date(date.getFullYear(), date.getMonth(), 1);

const getMonthEnd = (date: Date): Date => new Date(date.getFullYear(), date.getMonth() + 1, 0);

const parseDateInput = (value: string): Date => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

const getDefaultRange = (): DateRange => {
  const today = new Date();

  return {
    startDate: formatDate(getMonthStart(today)),
    endDate: formatDate(getMonthEnd(today)),
  };
};

const resolveSearchRange = (startDate: string, endDate: string): DateRange => {
  if (startDate && endDate) {
    return { startDate, endDate };
  }

  if (startDate) {
    return {
      startDate,
      endDate: formatDate(getMonthEnd(parseDateInput(startDate))),
    };
  }

  if (endDate) {
    return {
      startDate: formatDate(getMonthStart(parseDateInput(endDate))),
      endDate,
    };
  }

  return getDefaultRange();
};

export const useSummary = () => {
  const defaultRange = getDefaultRange();
  const [startDate, setStartDate] = useState(defaultRange.startDate);
  const [endDate, setEndDate] = useState(defaultRange.endDate);
  const [searchRange, setSearchRange] = useState<DateRange>(defaultRange);
  const [dateError, setDateError] = useState('');
  const [groupBy, setGroupByState] = useState<SummaryGroupBy>('category');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseSummary | null>(null);

  const { data, isLoading } = useSummaryApi(searchRange.startDate, searchRange.endDate, groupBy);
  const { data: historyData, isLoading: isHistoryLoading } = useExpenseHistoryApi(
    searchRange.startDate,
    searchRange.endDate,
    selectedCategory?.category_id
  );

  const search = () => {
    const range = resolveSearchRange(startDate, endDate);

    if (range.startDate > range.endDate) {
      setDateError('開始日は終了日以前の日付を入力してください。');
      return;
    }

    setDateError('');
    setStartDate(range.startDate);
    setEndDate(range.endDate);
    setSearchRange(range);
    setSelectedCategory(null);
  };

  const setGroupBy = (value: SummaryGroupBy) => {
    setGroupByState(value);
    setSelectedCategory(null);
  };

  const selectCategory = (row: ExpenseSummary) => {
    if (!row.category_id) return;

    setSelectedCategory(row);
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchRange,
    dateError,
    search,
    groupBy,
    setGroupBy,
    selectedCategory,
    selectCategory,
    history: historyData,
    summary: data.data ?? [],
    meta: data.meta ?? [],
    isLoading,
    isHistoryLoading,
  };
};
