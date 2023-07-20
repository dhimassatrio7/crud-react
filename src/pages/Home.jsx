import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://64b3676d38e74e386d560a15.mockapi.io/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    const filteredData = data.filter(
      (d) =>
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setData(filteredData);
  };

  const handleReset = () => {
    setSearchQuery("");
    axios
      .get("https://64b3676d38e74e386d560a15.mockapi.io/users")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`https://64b3676d38e74e386d560a15.mockapi.io/users/${id}`)
      .then(() => {
        alert("Data successfully deleted");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container px-6 py-4">
        <Link to="/create">
          <Button>Tambah Data</Button>
        </Link>
      </div>

      <div className="container px-6 py-2">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <TextInput
              id="search"
              sizing="sm"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="" onClick={handleSearch}>
              Search
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        </div>
        <Table>
          <Table.Head>
            <Table.HeadCell>id</Table.HeadCell>
            <Table.HeadCell>Nama</Table.HeadCell>
            <Table.HeadCell>Alamat</Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data.map((d, i) => (
              <Table.Row
                key={i}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {d.id}
                </Table.Cell>
                <Table.Cell>{d.name}</Table.Cell>
                <Table.Cell>{d.address}</Table.Cell>
                <Table.Cell>
                  <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href=""
                  >
                    <Link to={`/update/${d.id}`}>
                      <p>Edit</p>
                    </Link>
                  </a>
                  <a
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    href=""
                    onClick={() => handleDelete(d.id)}
                  >
                    <p>Delete</p>
                  </a>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </>
  );
}
