import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [inputData, setInputData] = useState({
    name: "",
    address: "",
  });
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://64b3676d38e74e386d560a15.mockapi.io/users", inputData)
      .then(() => {
        alert("data Sukses");
        navigate("/");
      });
  };

  return (
    <>
      <div className="container flex justify-center text-center items-center px-6 py-6">
        <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
          <div>
            <div className="mb-2 block">
              <Label value="Nama" />
            </div>
            <TextInput
              id="small"
              sizing="sm"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, name: e.target.value })
              }
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label value="Alamat" />
            </div>
            <TextInput
              id="small"
              sizing="sm"
              type="text"
              onChange={(e) =>
                setInputData({ ...inputData, address: e.target.value })
              }
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}

export default Create;
