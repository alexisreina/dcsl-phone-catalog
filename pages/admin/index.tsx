import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Auth from "../../components/Auth";
import DefaultLayout from "../../components/DefaultLayout";

import { Phone } from "../../utils/PhoneService";
import { ButtonPrimary } from "../../components/Button";
import { Loading } from "../../components/Loading";

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
    <DefaultLayout>
      <Auth>
        <main className="container p-4 mx-auto">
          <header className="pb-4 my-4 border-b-2 items-center justify-between flex">
            <h1 className="leading-6 font-semibold text-gray-700 text-2xl">
              Admin
            </h1>
            <Link href="/admin/new" passHref>
              <ButtonPrimary component="a">New</ButtonPrimary>
            </Link>
          </header>

          {data && (
            <section className="font-mono">
              <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                  <table className="table-auto w-full">
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
                              <div className="w-12 mx-auto">
                                {image?.src ? (
                                  <Image
                                    src={`/${image?.src}`}
                                    width={300}
                                    height={300}
                                    alt=""
                                  />
                                ) : (
                                  "No image"
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 border">{name}</td>
                            <td className="px-4 py-3 border">{manufacturer}</td>
                            <td className="px-4 py-3 border">{color}</td>
                            <td className="px-4 py-3 border font-semibold">
                              {price?.toLocaleString("es-ES", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </td>
                            <td className="px-4 py-3 border">
                              <Link href={`/admin/${id}`}>
                                <a className="block xl:inline-block mb-4 xl:mb-0 text-blue-400 hover:text-blue-600 underline">
                                  Edit
                                </a>
                              </Link>
                              <a
                                onClick={(e) => handleDelete(id)}
                                className="block: xl:inline-block xl:pl-6 text-red-400 hover:text-red-600 underline cursor-pointer"
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
              </div>
            </section>
          )}
        </main>

        <Loading show={!data} />
      </Auth>
    </DefaultLayout>
  );
}
