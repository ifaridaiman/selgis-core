"use client";
import { AuthService } from "@/services/auth.service";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type loginType = {
  username: string;
  password: string;
};

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authService = new AuthService();
  const router = useRouter(); // Initialize the useRouter hook

  const onSubmit: SubmitHandler<loginType> = async (data) => {
    setIsLoading(true);
    const result = await authService.login(data.username, data.password);
    setIsLoading(false);
    if (result.token) {
      toast.success("Login successful");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/halaman-utama");
    } else {
      toast.error(result.error || "Login failed. Please try again.");
      // alert(result.error || "Login failed. Please try again.");
    }
  };
  return (
    <main className="flex w-screen h-screen">
      <div className="bg-[url('/ulasan-teknikal/assets/background/bg_login.jpg')] bg-cover h-full flex items-center w-1/3 p-8">
        <p className="text-white text-7xl font-bold">
          Pusat Data GIS JPS, Negeri Selangor
        </p>
      </div>
      <div className="w-2/3 flex justify-center flex-col items-center">
        <div className="flex items-center">
          <Image
            src="/ulasan-teknikal/assets/logo/jata-logo-lambang-selangor.svg"
            width={200}
            height={80}
            alt="logo_selangor"
          />
          <Image
            src="/ulasan-teknikal/assets/logo/logo_jpsselgis.png"
            width={250}
            height={100}
            alt="logojpsselgis"
          />
        </div>
        <div>
          <div className="mb-8">
            <p className="font-bold text-5xl">Daftar Masuk</p>
            <p className="font-medium text-xl">Pengguna Berdaftar</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block mb-2">Nama Pengguna</label>
              <input
                type="text"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                placeholder="username@email.com"
                {...register("username")}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Kata Laluan</label>
              <input
                type="password"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                placeholder="Masukkan Kata Laluan"
                {...register("password")}
              />
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="border border-gray-300 rounded-md px-4 py-2 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-base"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Log Masuk"}
              </button>
              <div className="flex justify-center mt-2">
                <a className="text-center text-sm hover:underline transition-all duration-150" href="https://jpsselgis.selangor.gov.my/jpsselgis">Kembali ke halaman utama</a>
              </div>
              
            </div>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </main>
  );
}
