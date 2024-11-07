import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-black text-sm py-12 px-4 md:px-10 ">
      <div className="container mx-auto max-w-screen-xl justify-between items-center">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
          <div>
            <img src="/prewa.jpg" alt="Tiket.com" className="h-10" />
            <ul className="text-sm md:text-sm lg:text-sm space-y-2">
              <li>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/si/2021/11/29/b577c0a3-1668-40ad-8466-9e85506eb2cb-1638205055824-7846fb685ef8888259ed465c880123d4.png"
                    alt="WhatsApp Icon"
                    className="h-6 w-6"
                  />
                  <div className="flex flex-col">
                    <span>WhatsApp</span>
                    <span className="text-xs">+62 812 3456 7890</span>
                  </div>
                </div>
              </li>
              <li>
                <div className="flex items-center space-x-2">
                  <img
                    src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/si/2021/11/29/a52e793b-c1bb-4ae0-98e3-4cc06b6ff2a8-1638205057397-71ccb1ffdcba11aeed446bf5b0a07fdc.png"
                    alt="WhatsApp Icon"
                    className="h-6 w-6"
                  />
                  <div className="flex flex-col">
                    <span>Email</span>
                    <span className="text-xs">prewa@mail.com</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-semibold">
              Produk
            </h3>
            <div className="text-sm">
              <ul className="text-md md:text-sm lg:text-sm space-y-2">
                <li>
                  <Link href="">Hotel</Link>
                </li>
                <li>
                  <Link href="">Apartemen</Link>
                </li>
                <li>
                  <Link href="">Vila</Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-semibold">
              Dukungan
            </h3>
            <ul className="text-xs md:text-sm lg:text-sm space-y-2">
              <li>
                <Link href="">Pusat Bantuan</Link>
              </li>
              <li>
                <Link href="">Kebijakan Privasi</Link>
              </li>
              <li>
                <Link href="">Syarat & ketentuan</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm md:text-base lg:text-lg font-semibold">
              Lebih murah di aplikasi
            </h3>
            <ul className="text-xs md:text-sm lg:text-sm space-y-2">
              <li>
                <Link href="">
                  <img
                    src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/core-fe/2023/10/02/1fb1b9f7-d1c1-4f4a-b3d0-fbc4bf650d46-1696218535267-2e77104dddb49130433a2fa22f28a1ff.png"
                    alt="App Store"
                    className="h-9"
                  />
                </Link>
              </li>
              <li>
                <Link href="">
                  <img
                    src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/core-fe/2023/10/02/02f04be0-f138-40ba-8029-a903ca5e8f7c-1696218550137-4101e40f1d4d7099144a3f1ccd37d22c.png"
                    alt="Play Store"
                    className="h-10"
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 text-xs space-y-6">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-8">
            <div>
              <h3 className="md:text-base lg:text-lg font-semibold mb-4">
                Partner
              </h3>
              <ul className="text-sm md:text-sm lg:text-sm space-y-2">
                <li>
                  <Link href="">
                    <img
                      src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/core-fe/2023/10/02/9bd6e26d-c968-4312-9877-b106bcf2d098-1696218640180-2c67098b30425b39967bbda9fec47b50.png"
                      alt="App Store"
                      className="h-14"
                    />
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="md:text-base lg:text-lg font-semibold mb-4">
                Penghargaan
              </h3>
              <ul className="flex space-x-4 text-sm md:text-sm lg:text-sm">
                <li>
                  <img
                    src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/core-fe/2023/10/02/f6f97c8e-962a-47c2-bc4d-69b8154b08be-1696218564767-69f12cfa85a38f68527585eb84c6e173.png"
                    alt="App Store"
                    className="h-10"
                  />
                </li>
                <li>
                  <img
                    src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/original/core-fe/2023/10/02/4986f455-2154-437f-ba0b-f08932d8dbde-1696218616716-db421c12e2b0eedbea62324c28ef52d3.png"
                    alt="App Store"
                    className="h-10"
                  />
                </li>
              </ul>
            </div>
            <div>
              <h3 className="md:text-base lg:text-lg font-semibold mb-4">
                Ikuti Kami
              </h3>
              <ul className="flex space-x-4 text-sm md:text-sm lg:text-sm">
                <li>
                  <img
                    src="https://img.icons8.com/?size=100&id=85154&format=png&color=000000"
                    alt="Facebook"
                    className="h-8"
                  />
                </li>
                <li>
                  <img
                    src="https://img.icons8.com/?size=100&id=118487&format=png&color=000000"
                    alt="Facebook"
                    className="h-8"
                  />
                </li>
                <li>
                  <img
                    src="https://img.icons8.com/?size=100&id=soupkpLfTkZi&format=png&color=000000"
                    alt="Tiktok"
                    className="h-8"
                  />
                </li>
              </ul>
            </div>
          </div>
          <p className="text-center">
            © 2024 PT Global Tiket Network. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
