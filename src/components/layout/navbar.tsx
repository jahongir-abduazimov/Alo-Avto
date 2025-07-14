"use client";
import { AlignLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { useFilterStore } from "@/lib/filterStore";
import { getBrands, getModels } from "@/lib/api";
import { usePathname, useRouter } from "next/navigation";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Local state for form
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [gostNumber, setGostNumber] = useState("");

  // Brand/model options
  const [brandOptions, setBrandOptions] = useState<string[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);

  useEffect(() => {
    getBrands().then(setBrandOptions).catch(console.error);
  }, []);

  useEffect(() => {
    if (brand) {
      getModels(brand).then(setModelOptions).catch(console.error);
    } else {
      setModelOptions([]);
    }
  }, [brand]);

  const setFilters = useFilterStore((state) => state.setFilters);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({
      search,
      brand,
      model,
      gost_number: gostNumber,
    });
    setOpen(false);
    window.open("/admin/all-cars", "_self"); // Redirect to customer page
  };

  // Check if any filter is selected
  const hasActiveFilters = search || brand || model || gostNumber;

  // Handle cancel button click
  const handleCancel = () => {
    if (hasActiveFilters) {
      // Clear all filters
      setSearch("");
      setBrand("");
      setModel("");
      setGostNumber("");
      setFilters({
        search: "",
        brand: "",
        model: "",
        gost_number: "",
      });
    } else {
      setOpen(false);
    }
  };

  const handleAlignLeftClick = () => {
    if (pathname === "/admin/all-cars") {
      setOpen(true);
    } else {
      setSidebarOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <div className="bg-primary-500 max-w-md mx-auto z-[1000] sticky top-0 w-full left-0 px-4 pt-12">
      <div className="flex justify-between items-center h-24 py-12">
        <Link href={"/customer"} className=" relative h-[21.29px] w-[157.17px]">
          <Image
            src="/images/logo-white.png"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="logo"
            fill
          />
        </Link>
        <button
          className="flex items-center gap-2 font-bold cursor-pointer"
          onClick={handleAlignLeftClick}
        >
          <div className="text-white">
            <AlignLeft className="size-4" />
          </div>
        </button>
        {/* Filter Dialog faqat all-cars sahifasida */}
        {pathname === "/admin/all-cars" && (
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="rounded-2xl pt-20 p-6 w-full h-full z-50  max-w-md">
              <form className="space-y-4 mt-35" onSubmit={handleSubmit}>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                      <circle
                        cx="11"
                        cy="11"
                        r="7"
                        stroke="#A1A1A1"
                        strokeWidth="2"
                      />
                      <path
                        d="M20 20L17 17"
                        stroke="#A1A1A1"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Brand
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-200 py-2 px-4 bg-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  >
                    <option value="">Select Brand</option>
                    {brandOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Model
                  </label>
                  <select
                    className="w-full rounded-xl border border-gray-200 py-2 px-4 bg-white"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={!brand}
                  >
                    <option value="">Select Model</option>
                    {modelOptions.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">
                    Номер ГОСТ
                  </label>
                  <input
                    type="text"
                    placeholder="01 A 123 AB"
                    value={gostNumber}
                    onChange={(e) => setGostNumber(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 py-2 px-4 bg-white"
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    className="flex-1 py-3 rounded-full border border-gray-200 bg-white text-black text-lg font-medium"
                    onClick={handleCancel}
                  >
                    {hasActiveFilters ? "Очистить" : "Закрыть"}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 rounded-full bg-[#3D63EA] text-white text-lg font-medium"
                  >
                    Apply Filter
                  </button>
                </div>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        )}
        {/* Sidebar boshqa sahifalarda */}
        {pathname !== "/admin/all-cars" && sidebarOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-end">
            <div className="bg-white w-64 h-full shadow-lg p-6 flex flex-col">
              <button
                className="self-end mb-4 text-gray-500"
                onClick={() => setSidebarOpen(false)}
              >
                &#10005;
              </button>
              <button
                className="mt-auto py-2 px-4 rounded bg-red-500 text-white font-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
