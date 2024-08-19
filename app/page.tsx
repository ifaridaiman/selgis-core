'use client'
import { AuthService } from "@/services/auth.service";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from "next/navigation"; 

type loginType = {
  username: string,
  password: string
}


export default function Home() {

  const {register, handleSubmit, formState: {errors}} = useForm<loginType>()
  const authService = new AuthService();
  const router = useRouter();  // Initialize the useRouter hook

  const onSubmit: SubmitHandler<loginType> = async (data) => {
    const result = await authService.login(data.username, data.password);
    if (result.token){
      router.push('/dashboard')
    }else{
      alert(result.error || "Login failed. Please try again.")
    }
  }
  return (
    <main className="flex w-screen h-screen">
      <div className="bg-[url('/assets/background/bg_login.jpg')] bg-cover h-full flex items-center w-1/3 p-8">
        <p className="text-white text-7xl font-bold">
          Pusat Data GIS JPS, Negeri Selangor
        </p>
      </div>
      <div className="w-2/3 flex justify-center flex-col items-center">
        <div className="flex items-center">
          <Image
            src="/assets/logo/jata-logo-lambang-selangor.svg"
            width={200}
            height={80}
            alt="logo_selangor"
          />
          <Image
            src="/assets/logo/logo_jpsselgis.png"
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
              <input type="submit" className="border border-gray-300 rounded-md px-4 py-2 w-full bg-blue-600 text-white font-bold text-base" value={'Log Masuk'} />
                
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
