/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { usePathname } from "next/navigation";
import Container from "./Container";
import { ChevronRight, House } from "lucide-react";
import Link from "next/link";
import "./TopbarBanner.css";

interface TopbarBannerProps {
  pageName?: string;
}

const TopbarBanner = ({ pageName }: TopbarBannerProps) => {
  const pathName = usePathname();

  return (
    <div className={`bg-topbar-image flex h-[120px] w-full items-center`}>
      <div>
        <Container>
          <div className="flex h-full items-center gap-3">
            <Link href={"/"}>
              <House size={20} className="text-primary-white" />
            </Link>
            <ChevronRight size={20} className="text-primary-white" />
            <p className="font-bold capitalize text-white">
              {pageName || pathName
                ? pathName
                    .split("/")[1]
                    ?.replaceAll("/", " ")
                    .replaceAll("-", " ")
                : " "}
            </p>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default TopbarBanner;
