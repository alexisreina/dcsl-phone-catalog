import React, { useState } from "react";
import { useRouter } from "next/router";
import axios, { AxiosError } from "axios";
import DefaultLayout from "../../components/DefaultLayout";
import Auth from "../../components/Auth";

import { Form } from "../../components/Form";
import { Loading } from "../../components/Loading";
import { AlertError } from "../../components/Alert";

const initialData = {
  name: "",
  description: "",
  memory: 0,
  ram: 0,
  manufacturer: "",
  color: "",
  image: {
    src: "",
    width: 0,
    height: 0,
  },
  price: 0,
  processor: "",
  screen: "",
};

export default function AdminCreate() {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [image, setImage] = useState<File | null>(null);
  const router = useRouter();

  const handleChange = (key: string, value: string | number): void => {
    setData((prevData) => ({ ...prevData, [key]: value }));
    console.log(data);
  };

  // const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(e);
  //   if (e.target?.files?.length) {
  //     setImage(e.target?.files[0]);
  //     console.log(image);
  //   }
  // };

  const handleSubmit = (evt: React.SyntheticEvent): void => {
    evt.preventDefault();
    console.log(evt, data);
    setLoading(true);
    setError(null);
    axios
      .post("/api/phone", { data })
      .then(console.log.bind(console))
      .then(() => router.push("/admin"))
      .catch((e: AxiosError) => {
        console.error(e);
        setLoading(false);
        setError("Something failed :(");
      });
  };

  return (
    <DefaultLayout>
      <Auth>
        <main className="container p-4 mx-auto max-w-screen-sm">
          <h1 className="text-2xl text-gray-500 mt-4 mb-3">
            <span className="ml-5 inline-block">Add Phone</span>
          </h1>

          <div className="bg-white shadow-md rounded-3xl overflow-hidden p-6 md:px-12 md:py-8">
            <AlertError show={!!error}>{error}</AlertError>

            <Form
              mode="create"
              data={data}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
            />
          </div>
        </main>
        <Loading show={loading} />
      </Auth>
    </DefaultLayout>
  );
}
