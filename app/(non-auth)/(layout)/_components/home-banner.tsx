"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import BannerWrapper from "@/components/banner/banner-wrapper";
import { useBannerList } from "@/components/banner/hooks/use-banner-list";
import { Button } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

function formatTitle(raw: string) {
  if (!raw) return "";

  return (
    raw
      // \n(백슬래시+n 문자열) → 실제 줄바꿈
      .replace(/\\n/g, "\n")
      // "기프트 세트" → "기프트세트"
      .replace(/기프트\s*세트/g, "기프트세트")
  );
}

export default function HomeBanner() {
  const { data = [] } = useBannerList();

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <BannerWrapper className={`relative w-full overflow-hidden group`}>
      {/* 내비게이션 버튼 */}
      <button
        ref={prevRef}
        aria-label="이전 슬라이드"
        className="absolute left-[12%] top-1/2 z-10 -translate-y-1/2 hidden xl:block xl:opacity-0 xl:group-hover:opacity-100 cursor-pointer w-[32px] h-[32px] bg-transparent border-t-2 border-l-2 border-black/45 rotate-315 transform origin-center hover:border-black/65 transition-all duration-500 ease-out"
      />

      <button
        ref={nextRef}
        aria-label="다음 슬라이드"
        className="absolute right-[12%] top-1/2 z-10 -translate-y-1/2 hidden xl:block xl:opacity-0 xl:group-hover:opacity-100 cursor-pointer w-[32px] h-[32px] bg-transparent border-t-2 border-l-2 border-black/45 rotate-135 transform origin-center hover:border-black/65 transition-all duration-500 ease-out"
      />

      <Swiper
        modules={[EffectFade, Autoplay, Navigation, Pagination, A11y]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={data.length > 1} // 슬라이드가 2개 이상일 때만 루프
        loopAdditionalSlides={data.length} // 동적 데이터에서 빈칸/점프 방지
        allowTouchMove
        onBeforeInit={(swiper) => {
          (swiper.params.navigation as any).prevEl = prevRef.current;
          (swiper.params.navigation as any).nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        pagination={{
          type: "fraction",
          formatFractionCurrent: (n) => `${n}`,
          formatFractionTotal: (n) => `${n}`,
          renderFraction: (cur, tot) =>
            `<span class="${cur}"></span> / <span class="${tot}"></span>`,
        }}
        className="h-full"
      >
        {data.map((s, idx) => (
          <SwiperSlide key={s.id}>
            <div className="relative h-full w-full">
              {/* 배경 이미지 (배너 이미지) */}
              <>
                <Image
                  src={s.bannerImage}
                  alt={s.title}
                  fill
                  priority={idx === 0}
                  className="object-cover hidden lg:block"
                />

                <Image
                  src={s.bannerMobileImage}
                  alt={s.title}
                  fill
                  priority={idx === 0}
                  className="object-cover lg:hidden"
                />
              </>

              {/* 좌측 카피 */}
              <div className="absolute left-[7%] md:left-[17%] top-1/4 md:top-1/2 md:-translate-y-1/2 flex flex-col gap-3 md:gap-4">
                <p className="text-sm md:text-xl font-medium">{s.subTitle}</p>
                <p className="text-xl md:text-4xl font-bold whitespace-pre-line leading-6 md:leading-10">
                  {formatTitle(s.title)}
                </p>
                <a
                  href={s.link}
                  target={s.targetBlank ? "_blank" : "_self"}
                  rel={s.targetBlank ? "noopener noreferrer" : undefined}
                >
                  <Button className="w-fit rounded-2xl h-[25px] lg:h-[35px] px-4 mt-2">
                    More
                  </Button>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 프랙션 위치/스타일 */}
      <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 20px;
          width: fit-content !important;
          min-width: 50px;
          color: rgb(255 255 255 / 45%);
          font-weight: 700;
          font-size: 12px;
          background: rgb(0 0 0 / 15%);
          padding: 3px 0px;
          border-radius: 999px;
        }

        @media (min-width: 768px) {
          .swiper-pagination {
            min-width: 70px;
            font-size: 14px;
            padding: 5px 0px;
          }
        }

        .swiper-pagination .swiper-pagination-current {
          color: #fff;
        }

        .swiper-pagination .swiper-pagination-total {
          color: rgb(255 255 255 / 45%);
        }
      `}</style>
    </BannerWrapper>
  );
}
