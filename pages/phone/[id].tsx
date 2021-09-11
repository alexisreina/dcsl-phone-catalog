import { GetServerSideProps } from "next";
import { useState } from "react";
import PageWrapper from "../../components/PageWrapper";
import DefaultLayout from "../../layouts/DefaultLayout";
import {
  ProductImage,
  ProductFeatures,
  ProductPrice,
  ProductFeatuteDescription,
  ProductFeatuteTitle,
  ProductTabs,
} from "../../components/Product";
import phoneService, { Phone } from "../../utils/PhoneService";

type PageProps = {
  phone: Phone;
};

export default function PhoneDetail(props: PageProps) {
  const [tab, setTab] = useState<"details" | "response">("details");

  const { phone } = props;

  return (
    <PageWrapper>
      <DefaultLayout>
        <main className="container mx-auto max-w-screen-md p-4 mt-6 xl:mt-12">
          <section className="flex justify-center items-center gap-12">
            <ProductImage
              src={`/${phone.image?.src}`}
              width={phone.image?.width}
              height={phone.image?.height}
            />

            <ProductFeatures>
              <ProductFeatuteTitle>Name</ProductFeatuteTitle>
              <ProductFeatuteDescription>
                {phone.name}
              </ProductFeatuteDescription>

              <ProductFeatuteTitle>Color</ProductFeatuteTitle>
              <ProductFeatuteDescription>
                {phone.color}
              </ProductFeatuteDescription>

              <ProductFeatuteTitle>Manufacturer</ProductFeatuteTitle>
              <ProductFeatuteDescription>
                {phone.manufacturer}
              </ProductFeatuteDescription>

              <ProductPrice>
                {phone.price?.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "EUR",
                })}
              </ProductPrice>
            </ProductFeatures>
          </section>

          <section className="mt-12">
            <ProductTabs phone={phone}></ProductTabs>
          </section>
        </main>
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
