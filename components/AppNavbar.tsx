import Link from "next/link";

export default function AppNavbar() {
  return (
    <div className="border-b bg-white">
      <div className="mx-auto p-4">
        <Link href="/">
          <span className="inline-block font-sans text-lg font-bold cursor-pointer">
            Phone Catalog
          </span>
        </Link>
      </div>
    </div>
  );
}
