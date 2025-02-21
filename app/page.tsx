'use client'
import Banner from "@/components/widgets/Boots/Banner";
import { useSession } from "next-auth/react";

const bannerImages:string[] = [
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/20116df5-f597-4e26-bc02-f9272d667213.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/a2da20c6-1cea-405e-98ac-349ab931b860.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9b78c9e4-fd18-44fc-ac5b-dc3fa9e4e253.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9b78c9e4-fd18-44fc-ac5b-dc3fa9e4e253.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/5bf5a6c2-944a-4acf-9cb9-0abc44164ae2.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/afb8debb-8a1e-4fcd-9b7a-e073a6a47bd2.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/22ad615d-0580-4e07-8111-2d5f8e33a82d.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/653fb860-730a-4e32-a062-1199cefad86f.__CR0,0,1464,600_PT0_SX1464_V1___.jpg",
  "https://m.media-amazon.com/images/S/aplus-media-library-service-media/3bc8cc85-cfa2-41bb-a0a8-87a88df5b266.__CR0,0,1464,600_PT0_SX1464_V1___.jpg"

];
export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gray-50 no_show_bar">
      <div className=" w-full h-[600px] bg-black/10 _banner_ ">
        <Banner images={bannerImages} autoPlayInterval={5000} />
      </div>
    </div>
  );
}