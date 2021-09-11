import Image from "next/image";
import { useState } from "react";
import { Phone } from "../utils/PhoneService";

export const ProductImage: React.FC<{
  src: string;
  width?: number;
  height?: number;
}> = ({ src, width, height }) => (
  <figure className="px-2 py-12 rounded-lg bg-white">
    <Image src={src} width={width} height={height} />
  </figure>
);

export const ProductFeatures: React.FC = ({ children }) => (
  <article>
    <dl>{children}</dl>
  </article>
);

export const ProductFeatuteTitle: React.FC = ({ children }) => (
  <dt className="text-xs text-gray-400 uppercase tracking-wide leading-6">
    {children}
  </dt>
);

export const ProductFeatuteDescription: React.FC = ({ children }) => (
  <dd className="text-gray-700 leading-7 text-xl mb-5">{children}</dd>
);

export const ProductPrice: React.FC = ({ children }) => (
  <span className="inline-block mt-4 px-8 py-2 rounded-md text-white font-semibold bg-red-500">
    {children}
  </span>
);

export const ProductTabs: React.FC<{ phone: Phone }> = ({ phone }) => {
  const [tab, setTab] = useState<"details" | "response">("details");
  return (
    <div>
      <ul className="inline-flex px-1 pt-2">
        <li
          className={`border-b-2 opacity-50 transition-all duration-150 ${
            tab == "details" &&
            "border-b-2 border-red-400 rounded-t opacity-100"
          }`}
        >
          <a
            className="cursor-pointer block px-8 py-2 font-semibold text-gray-800 transition-all duration-150"
            onClick={() => setTab("details")}
          >
            Details
          </a>
        </li>
        <li
          className={`border-b-2 opacity-50 transition-all duration-150 ${
            tab == "response" &&
            "border-b-2 border-red-400 rounded-t opacity-100"
          }`}
        >
          <a
            className="cursor-pointer block px-8 py-2 font-semibold text-gray-800 transition-all duration-150"
            onClick={() => setTab("response")}
          >
            Response
          </a>
        </li>
      </ul>

      <div className="mt-6 p-6 bg-white rounded-xl mb-6">
        <div hidden={tab == "response"}>
          <ul>
            <li>
              <p className="leading-8">
                <b className="font-semibold">Screen</b>: {phone.screen}
              </p>
            </li>
            <li>
              <p className="leading-8">
                <b className="font-semibold">Processor</b>: {phone.processor}
              </p>
            </li>
            <li>
              <p className="leading-8">
                <b className="font-semibold">Memory</b>: {phone.memory} GB
              </p>
            </li>
            <li>
              <p className="leading-8">
                <b className="font-semibold">RAM:</b> {phone.ram} GB
              </p>
            </li>
            <li>
              <p className="leading-8">
                <b className="font-semibold">Description</b>
                <br />
                {phone.description}
              </p>
            </li>
          </ul>
        </div>

        <div hidden={tab == "details"}>
          <pre className="text-sm">{JSON.stringify(phone, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};
