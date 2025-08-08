import { BannerResponse } from "@/services/banner/types";
import { useForm } from "react-hook-form";

import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  subTitle: z.string().min(1),
  bannerImage: z.string().min(1),
  bannerMobileImage: z.string().min(1),
  link: z.string().min(1),
  targetBlank: z.boolean(),
});

export function useBannerForm(banner?: BannerResponse) {
  const methods = useForm<BannerFormValues>({
    // resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: banner?.title,
      subTitle: banner?.subTitle,
      bannerImage: banner?.bannerImage,
      bannerMobileImage: banner?.bannerMobileImage,
      link: banner?.link,
      targetBlank: !!banner?.targetBlank,
    },
  });

  return methods;
}

export type BannerFormValues = z.infer<typeof schema>;
