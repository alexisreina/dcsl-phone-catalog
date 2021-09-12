import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import axios from "axios";
import { FormField } from "../../components/Form";
import PageWrapper from "../../components/PageWrapper";
import DefaultLayout from "../../layouts/DefaultLayout";
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

  const handleDelete = (id?: string) => {
    if (id && window.confirm("Are you sure")) {
      axios
        .delete(`/api/phone/${id}`)
        .then(console.log.bind(console))
        .then(() => router.push("/admin"))
        .catch(console.error.bind(console));
    }
  };

  return (
    <PageWrapper>
      <DefaultLayout>
        <Auth>
          <main className="container p-4 mx-auto max-w-screen-md">
            Edit {phone.id}
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-5">
              <form onSubmit={handleSubmit}>
                <FormField
                  label="Name"
                  value={data.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("name", e.target.value)
                  }
                />

                <FormField
                  label="Color"
                  value={data.color}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("color", e.target.value)
                  }
                />

                <FormField
                  label="Manufacturer"
                  value={data.manufacturer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("manufacturer", e.target.value)
                  }
                />

                <FormField
                  label="Screen"
                  value={data.screen}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("screen", e.target.value)
                  }
                />

                <FormField
                  label="Processor"
                  value={data.processor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("processor", e.target.value)
                  }
                />

                <FormField
                  label="Memory"
                  value={data.memory}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("memory", e.target.value)
                  }
                />

                <FormField
                  label="RAM"
                  value={data.ram}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("ram", e.target.value)
                  }
                />

                <FormField
                  label="Price"
                  value={data.price}
                  type="number"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange("price", e.target.value)
                  }
                />

                <FormField
                  label="Description"
                  value={data.description}
                  component="textarea"
                  rows={4}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleChange("description", e.target.value)
                  }
                />

                <button type="submit">Save</button>
                <button onClick={(e) => handleDelete(phone.id)}>Delete</button>
              </form>
            </div>
          </main>
        </Auth>
      </DefaultLayout>
    </PageWrapper>
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
