"use client";

import "./result.css";
import Input from "@/components/Input";
import { useState } from "react";

interface Field {
  [key: string]: string | number;
}

export default function Home() {
  const headers = [
    "Name",
    "Aspect 1",
    "Aspect 2",
    "Aspect 3",
    "Aspect 4",
    "Action",
  ];

  const [resultJson, setResultJson] = useState("");
  const [inputFields, setInputFields] = useState([
    { aspect1: "", aspect2: "", aspect3: "", aspect4: "" },
  ]);

  const handleFormChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const data = [...inputFields];

    // @ts-ignore
    data[index][event.target.name] = event.target.value;
    setInputFields(data);
  };

  const addFields = (event: React.FormEvent) => {
    event.preventDefault();

    let newfield = {
      aspect1: "",
      aspect2: "",
      aspect3: "",
      aspect4: "",
    };

    setInputFields([...inputFields, newfield]);
  };

  const removeFields = (index: number) => {
    if (index === 0) {
      return;
    }

    let data = [...inputFields];
    data.splice(index, 1);
    setInputFields(data);
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    const transformedData: { [key: string]: Field } = {};

    inputFields.forEach((item, index) => {
      Object.keys(item).forEach((key) => {
        if (key !== "name") {
          if (!transformedData[key]) {
            transformedData[key] = {};
          }
          const convertedName = `mahasiswa_${index + 1}`;
          transformedData[key][convertedName] =
            // @ts-ignore
            typeof item[key] === "string" ? 0 : parseInt(item[key] as string);
        }
      });
    });

    setResultJson(JSON.stringify(transformedData, undefined, 2));
    console.log("transformedData", transformedData);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form>
        <table className="table-fixed border-separate border-spacing-1.5">
          <thead className="">
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {(inputFields || []).map((input, index) => (
              <tr key={index}>
                <td width={"200px"}>
                  <h2 className="text-md whitespace-nowrap font-semibold">
                    Mahasiswa {index + 1}
                  </h2>
                </td>
                <td>
                  <Input
                    name="aspect1"
                    placeholder="0"
                    type="number"
                    value={input.aspect1}
                    onChange={(event: any) => handleFormChange(index, event)}
                  />
                </td>
                <td>
                  <Input
                    name="aspect2"
                    placeholder="0"
                    type="number"
                    value={input.aspect2}
                    onChange={(event: any) => handleFormChange(index, event)}
                  />
                </td>
                <td>
                  <Input
                    name="aspect3"
                    placeholder="0"
                    type="number"
                    value={input.aspect3}
                    onChange={(event: any) => handleFormChange(index, event)}
                  />
                </td>
                <td>
                  <Input
                    name="aspect4"
                    placeholder="0"
                    type="number"
                    value={input.aspect4}
                    onChange={(event: any) => handleFormChange(index, event)}
                  />
                </td>
                <td width={"160px"} className="text-center">
                  <button
                    disabled={index === 0}
                    onClick={() => removeFields(index)}
                    className={`font-semibold text-red-400 hover:cursor-pointer ${
                      inputFields.length === 1 ? "text-neutral-400" : ""
                    }`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex gap-4 text-center">
          <button
            onClick={addFields}
            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            Add More
          </button>
          <button
            onClick={submit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 border border-blue-700 rounded"
          >
            Conver To JSON
          </button>
        </div>

        <div className="results">
          <h2 className="results__heading">Form Data</h2>
          <pre className="results__display-wrapper">
            <code className="results__display">{resultJson}</code>
          </pre>
        </div>
      </form>
    </main>
  );
}
