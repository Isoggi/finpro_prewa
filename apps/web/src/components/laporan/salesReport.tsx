'use client';
import { api } from '@/config/axios.config';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import SalesReportTable from './salesReportTable';
import React from 'react';
import { orderBy } from 'cypress/types/lodash';

type Props = {};

export default function SalesReport({}: Props) {
  const [reportData, setReportData] = React.useState<SalesReport[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [sortBy, setSortBy] = React.useState<'date' | 'total_sales'>('date');
  const [dateRange, setDateRange] = React.useState({
    startDate: '',
    endDate: '',
  });
  const [debounceTimeout, setDebounceTimeout] =
    React.useState<NodeJS.Timeout | null>(null);

  const { data: session } = useSession();
  const user: User | null = React.useMemo(() => {
    if (session?.user) {
      return session.user;
    }
    return null;
  }, [session]);

  const fetchReport = async () => {
    console.log(user);

    const response = await api.get('/report/sales', {
      params: {
        sortBy,
        start_date: dateRange.startDate,
        end_date: dateRange.endDate,
        orderBy: 'desc',
      },
      headers: { Authorization: `Bearer ${user?.access_token}` },
    });

    const data = await response.data.data;
    console.log(data);
    setReportData(data as SalesReport[]);
    setLoading(false);
  };

  React.useEffect(() => {
    if (debounceTimeout) clearTimeout(debounceTimeout);

    const timeout = setTimeout(() => {
      setLoading(true);
      fetchReport();
    }, 2000); // 2000ms debounce delay

    setDebounceTimeout(timeout);

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [sortBy, dateRange]);
  return (
    <div>
      <div className="flex space-x-4 mb-4">
        <input
          title="tanggal awal"
          type="date"
          value={dateRange.startDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, startDate: e.target.value })
          }
          className="input input-bordered"
        />
        <input
          title="tanggal akhir"
          type="date"
          value={dateRange.endDate}
          onChange={(e) =>
            setDateRange({ ...dateRange, endDate: e.target.value })
          }
          className="input input-bordered"
        />
        <select
          title="susun berdasar"
          className="select select-bordered"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'date' | 'total_sales')}
        >
          <option value="date">Sort by Date</option>
          <option value="total_sales">Sort by Total Sales</option>
        </select>
        <button title="cari" onClick={fetchReport} className="btn btn-primary">
          Cari
        </button>
      </div>
      {!loading && reportData && <SalesReportTable data={reportData} />}
    </div>
  );
}
