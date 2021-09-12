import Link from "next/link";

export default function AppNavbar() {
  return (
    <div className="border-b bg-white drop-shadow-sm">
      <div className="flex flex-grow items-center justify-between mx-auto p-4">
        <Link href="/">
          <span className="inline-block font-sans text-lg font-semibold text-red-600 cursor-pointer">
            Phone Catalog
          </span>
        </Link>

        <div className="ml-auto cursor-pointer">
          <Link href="/admin">
            <span className="inline-block cursor-pointer text-sm text-red-500">
              Admin
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
