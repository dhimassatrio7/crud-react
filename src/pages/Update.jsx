import axios from "axios";
import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Update() {
  const { id } = useParams();

  const [inputData, setInputData] = useState({
    id: id,
    name: "",
    address: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://64b3676d38e74e386d560a15.mockapi.io/users/" + id)
      .then((res) => setInputData(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put("https://64b3676d38e74e386d560a15.mockapi.io/users/" + id, inputData)
      .then(() => {
        alert("Data successfully updated");
        navigate("/");
      });
  };
  return (
    <div className="container flex justify-center text-center items-center px-6 py-6">
      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label value="ID" />
          </div>
          <TextInput id="small" sizing="sm" type="text" value={inputData.id} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Name" />
          </div>
          <TextInput
            id="small"
            sizing="sm"
            type="text"
            value={inputData.name}
            onChange={(e) =>
              setInputData({ ...inputData, name: e.target.value })
            }
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Address" />
          </div>
          <TextInput
            id="small"
            sizing="sm"
            type="text"
            value={inputData.address}
            onChange={(e) =>
              setInputData({ ...inputData, address: e.target.value })
            }
          />
        </div>
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}

export default Update;
