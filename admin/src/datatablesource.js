export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "id", headerName: "ID", width: 170 },
  {
    field: "title",
    headerName: "Title",
    width: 130,
  },
  {
    field: "hotelId",
    headerName: "hotel",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },

  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const bookingsColumns = [
  {
    field: "hotel",
    headerName: "Hotel",
    width: 200,
  },
  {
    field: "user",
    headerName: "User Name",
    width: 100,
  },
  {
    field: "checkIn",
    headerName: "Check In",
    width: 150,
  },
  {
    field: "checkOut",
    headerName: "Check Out",
    width: 150,
  },
  {
    field: "total",
    headerName: "Total",
    width: 100,
  },
  {
    field: "RoomNumber",
    headerName: "RoomNo",
    width: 100,
  },

];
