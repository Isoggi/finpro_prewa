import { PrismaClient } from '@prisma/client';
// import AddProduct from "./addProduct";
import AddAvailability from './addAvailability';
// import DeleteProduct from "./deleteProduct";
import UpdateAvailability from './updateAvailability';
// import UpdateProduct from "./updateProduct";
import DeleteAvailability from './deleteAvailability';
const prisma = new PrismaClient();
interface Availability {
  id: number;
  room_id: number;
  stock: number;
  date: string;
}
const getAvailability = async () => {
  const res = await prisma.availability.findMany({
    select: {
      id: true,
      stock: true,
      date: true,
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

const FormAvailability = async () => {
  const [availability, rooms] = await Promise.all([
    getAvailability(),
    getRooms(),
  ]);

  return (
    <div>
      <div className="mb-2">
        <AddAvailability rooms={rooms} />
      </div>

      <table className="table w-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Room Id</th>
            <th>Stock</th>
            <th>Date </th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {availability.map((availability, index) => (
            <tr key={availability.id}>
              <td>{index + 1}</td>
              <td>{availability.room_id}</td>
              <td>{availability.stock}</td>
              <td>{availability.date.toLocaleDateString()}</td>
              <td className="flex justify-center space-x-1">
                <UpdateAvailability
                  availability={{
                    ...availability,
                    date: availability.date.toLocaleDateString(),
                  }}
                />
                <DeleteAvailability
                  id={availability.id}
                  stock={availability.stock}
                  date={availability.date}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormAvailability;
