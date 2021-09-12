import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import { Form } from "../../components/Form";
import DefaultLayout from "../../components/DefaultLayout";
import phoneService, { Phone } from "../../utils/PhoneService";
import Auth from "../../components/Auth";

type PageProps = {
  phone: Phone;
};

const initialData = {
  id: "",
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

export default function AdminUpdate({ phone }: PageProps) {
  const [data, setData] = useState<Phone>({ ...initialData, ...phone });
  const router = useRouter();

  const handleChange = (key: string, value: string | number): void => {
    setData((prevData) => ({ ...prevData, [key]: value }));
    console.log(data);
  };

  const handleSubmit = (evt: React.SyntheticEvent): void => {
    evt.preventDefault();
    console.log(evt, data);
    axios
      .put(`/api/phone/${data.id}`, { data })
      .then((res) => console.log(res))
      .catch(console.error.bind(console));
  };

  const handleDelete = () => {
    const { id } = phone;
    if (id && window.confirm("Are you sure")) {
      axios
        .delete(`/api/phone/${id}`)
        .then(console.log.bind(console))
        .then(() => router.push("/admin"))
        .catch(console.error.bind(console));
    }
  };

  return (
    <DefaultLayout>
      <Auth>
        <main className="container p-4 mx-auto max-w-screen-sm">
          <h1 className="text-2xl text-gray-500 mt-4 mb-3">
            <span className="ml-5 inline-block">Editing</span>
            <span className="inline-block font-mono text-lg ml-4 opacity-70">
              {phone.id}
            </span>
          </h1>

          <div className="bg-white shadow-md rounded-3xl overflow-hidden p-6 md:px-12 md:py-8">
            <Form
              mode="update"
              data={data}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              handleDelete={handleDelete}
            />
          </div>
        </main>
      </Auth>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params } = context;

  if (params?.id && typeof params.id === "string") {
    const phone = await phoneService.getOne(params.id);

    if (phone) {
      return {
        props: { phone },
      };
    }
  }

  return {
    notFound: true,
  };
};
