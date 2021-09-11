import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import phoneService, { Phone } from "../utils/PhoneService";
import DefaultLayout from "../layouts/DefaultLayout";
import PageWrapper from "../components/PageWrapper";

type Props = {
  phones: Phone[];
};

export default function Home({ phones }: Props) {
  return (
    <PageWrapper>
      <DefaultLayout>
        <Fragment>
          {phones ? (
            <main className="mx-auto p-4">
              <section className="grid grid-cols-4 gap-4">
                {phones.map((phone) => (
                  <Link key={phone.id} href={`/phone/${phone.id}`}>
                    <div className="bg-white rounded-3xl p-6">
                      <div className="flex flex-col">
                        <div className="mb-3 text-center">
                          <Image
                            className="mx-auto"
                            src={`/${phone.image?.src}`}
                            width={phone.image?.width}
                            height={phone.image?.height}
                          />
                        </div>
                        <h3>
                          {phone.name} - {phone.color}
                        </h3>
                        <p>{phone.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </section>
            </main>
          ) : (
            <p>loading...</p>
          )}
          <section className="mt-3" hidden>
            <pre className="text-sm">{JSON.stringify(phones, null, 2)}</pre>
          </section>
        </Fragment>
      </DefaultLayout>
    </PageWrapper>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const phones = await phoneService.list();

  if (phones) {
    return {
      props: { phones },
    };
  }

  return {
    notFound: true,
  };
};
