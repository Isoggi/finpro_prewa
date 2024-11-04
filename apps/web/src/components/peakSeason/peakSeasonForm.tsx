import { PrismaClient } from '@prisma/client';
// import AddProduct from "./addProduct";
// import AddAvailability from './addAvailability';
// // import DeleteProduct from "./deleteProduct";
// import UpdateAvailability from './updateAvailability';
// // import UpdateProduct from "./updateProduct";
// import DeleteAvailability from './deleteAvailability';
import AddPeakSeason from '../availability/addAvailability';
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
      rooms: true,
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

      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room Id</th>
            <th>Start Date</th>
            <th>End Date </th>
            <th>Rates </th>
            <th>Rate Category </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {peakSeason.map((peakseason, index) => (
            <tr key={peakseason.id}>
              <td>{index + 1}</td>
              <td>{peakseason.room_id}</td>
              <td>{peakseason.start_date.toLocaleDateString()}</td>
              <td>{peakseason.end_date.toLocaleDateString()}</td>
              <td>{peakseason.rates}</td>
              <td>{peakseason.rateCategory}</td>
              <td className="flex justify-center space-x-1">
                {/* <UpdateAvailability
                  availability={{
                    ...availability,
                    date: availability.date.toLocaleDateString(),
                  }}
                />
                <DeleteAvailability
                  id={availability.id}
                  stock={availability.stock}
                  date={availability.date} */}
                {/* */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormPeakSeason;
