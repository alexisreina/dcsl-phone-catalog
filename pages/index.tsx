import { GetServerSideProps } from "next";
// import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";
import phoneService, { Phone } from "../utils/PhoneService";
import DefaultLayout from "../components/DefaultLayout";
import { ProductCard } from "../components/Product";

type Props = {
  phones: Phone[];
};

export default function Home({ phones }: Props) {
  return (
    <DefaultLayout>
      <Fragment>
        {!phones ? (
          <p>loading...</p>
        ) : (
          <main className="container mx-auto p-4 sm:py-8 xl:py-12">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 xl:gap-12">
              {phones.map((phone) => (
                <Link key={phone.id} href={`/phone/${phone.id}`} passHref>
                  <ProductCard phone={phone} />
                </Link>
              ))}
            </section>
          </main>
        )}
      </Fragment>
    </DefaultLayout>
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
