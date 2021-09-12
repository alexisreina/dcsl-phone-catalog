import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import DefaultLayout from "../../layouts/DefaultLayout";
import { Phone } from "../../utils/PhoneService";

export default function AdminIndex() {
  const [data, setData] = useState<Phone[] | null>(null);
  const getData = useCallback(() => {
    axios
      .get("/api/phone")
      .then((res) => setData(res?.data))
      .catch(console.error.bind(console));
  }, []);

  useEffect(() => {
    if (!data) {
      getData();
    }
  }, [data, getData]);

  const handleDelete = (id?: string) => {
    if (id && window.confirm("Are you sure")) {
      axios
        .delete(`/api/phone/${id}`)
        .then(console.log.bind(console))
        .then(getData)
        .catch(console.error.bind(console));
    }
  };

  return (
    <PageWrapper>
      <DefaultLayout>
        <main className="container p-4 mx-auto">
          <header className="pb-4 my-4 border-b-2 items-center justify-between flex">
            <h1 className="leading-6 font-semibold text-2xl">Admin</h1>
            <Link href="/admin/new">New</Link>
          </header>

          {data ? (
            <section className="font-mono">
              <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto"></div>
                <table className="w-full">
                  <thead>
                    <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                      <th></th>
                      <th className="px-4 upcase py-3">name</th>
                      <th className="px-4 upcase py-3">manufacturer</th>
                      <th className="px-4 upcase py-3">color</th>
                      <th className="px-4 upcase py-3">price</th>
                      <th className="px-4 upcase py-3">actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white">
                    {data.map(
                      ({ id, image, name, manufacturer, color, price }) => (
                        <tr key={id} className="text-gray-700">
                          <td className="px-4 py-3 border">
                            {image?.src ? (
                              <Image
                                src={`/${image?.src}`}
                                width={48}
                                height={48}
                              />
                            ) : (
                              "No image"
                            )}
                          </td>
                          <td className="px-4 py-3 border">{name}</td>
                          <td className="px-4 py-3 border">{id}</td>
                          <td className="px-4 py-3 border">{manufacturer}</td>
                          <td className="px-4 py-3 border">{color}</td>
                          <td className="px-4 py-3 border">{price}</td>
                          <td className="px-4 py-3 border">
                            <Link href={`/admin/${id}`}>
                              <a className="inline-block text-blue-400 hover:text-blue-600 underline">
                                Edit
                              </a>
                            </Link>
                            <a
                              onClick={(e) => handleDelete(id)}
                              className="inline-block pl-6 text-blue-400 hover:text-blue-600 underline"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <p>loading...</p>
          )}
        </main>
      </DefaultLayout>
    </PageWrapper>
  );
}
