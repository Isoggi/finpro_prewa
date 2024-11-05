import { PrismaClient } from '@prisma/client';
import AddPeakSeason from '@/components/peakSeason/addPeakSeason';
import DeletePeakSeason from './deletePeakSeason';
import UpdatePeakSeason from './UpdatePeakSeason';

const prisma = new PrismaClient();

const getPeakSeason = async () => {
  const res = await prisma.peakSeasonRate.findMany({
    select: {
      id: true,
      start_date: true,
      end_date: true,
      rates: true,
      rateCategory: true,
      room_id: true,
    },
  });
  return res;
};

const getRooms = async () => {
  const res = await prisma.rooms.findMany();
  return res;
};

const FormPeakSeason = async () => {
  const [peakSeason, rooms] = await Promise.all([getPeakSeason(), getRooms()]);

  return (
    <div>
      <div className="mb-2">
        <AddPeakSeason rooms={rooms} />
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full min-w-[600px]">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Id</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Rates</th>
              <th>Rate Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {peakSeason.map((peakseason, index) => (
              <tr key={peakseason.id}>
                <td>{index + 1}</td>
                <td>{peakseason.room_id}</td>
                <td>{new Date(peakseason.start_date).toLocaleDateString()}</td>
                <td>{new Date(peakseason.end_date).toLocaleDateString()}</td>
                <td>{peakseason.rates}</td>
                <td>{peakseason.rateCategory}</td>
                <td className="flex justify-center space-x-1">
                  <UpdatePeakSeason
                    peakSeason={{
                      ...peakseason,
                      start_date: new Date(
                        peakseason.start_date,
                      ).toLocaleDateString(),
                      end_date: new Date(
                        peakseason.end_date,
                      ).toLocaleDateString(),
                      rateCategory: peakseason.rateCategory || '',
                    }}
                  />
                  <DeletePeakSeason
                    id={peakseason.id}
                    start_date={peakseason.start_date}
                    end_date={peakseason.end_date}
                    rates={peakseason.rates}
                    rateCategory={peakseason.rateCategory ?? ''}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormPeakSeason;
