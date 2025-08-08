"use client";

import { useBannerList } from "@/components/banner/hooks/use-banner-list";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BannerResponse } from "@/services/banner/types";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUpdateBannerOrder } from "../_hooks/use-update-banner-order";
import BannerItem from "./banner-item";

export default function BannerList() {
  const { data } = useBannerList();
  const [banners, setBanners] = useState<BannerResponse[]>([]);
  const [originalBanners, setOriginalBanners] = useState<BannerResponse[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const { mutate: updateBannerOrder, isPending } = useUpdateBannerOrder();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // 원래 데이터와 현재 데이터의 순서 비교
  const checkForChanges = (
    currentBanners: BannerResponse[],
    originalBanners: BannerResponse[]
  ) => {
    if (currentBanners.length !== originalBanners.length) return true;

    return currentBanners.some((banner, index) => {
      return banner.id !== originalBanners[index]?.id;
    });
  };

  useEffect(() => {
    if (data) {
      // displayOrder로 정렬
      const sortedBanners = [...data].sort(
        (a, b) => a.displayOrder - b.displayOrder
      );
      setBanners(sortedBanners);
      setOriginalBanners(sortedBanners);
      setHasChanges(false);
    }
  }, [data]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setBanners((currentBanners) => {
        const oldIndex = currentBanners.findIndex(
          (banner) => banner.id === active.id
        );
        const newIndex = currentBanners.findIndex(
          (banner) => banner.id === over?.id
        );

        const reorderedBanners = arrayMove(currentBanners, oldIndex, newIndex);

        // 원래 데이터와 비교해서 변경사항 확인
        const hasOrderChanged = checkForChanges(
          reorderedBanners,
          originalBanners
        );
        setHasChanges(hasOrderChanged);

        return reorderedBanners;
      });
    }
  };

  const handleSaveOrder = () => {
    const updateRequest = banners.map((banner, index) => ({
      id: banner.id,
      displayOrder: index + 1,
    }));

    updateBannerOrder(updateRequest, {
      onSuccess: () => {
        setHasChanges(false);
        // 저장 성공 후 원본 데이터 업데이트
        setOriginalBanners([...banners]);
      },
    });
  };

  const handleResetOrder = () => {
    setBanners([...originalBanners]);
    setHasChanges(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end w-full gap-2">
        {hasChanges && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-2xl"
            onClick={handleResetOrder}
          >
            순서 초기화
          </Button>
        )}

        <Button
          type="button"
          size="sm"
          className="rounded-2xl"
          onClick={handleSaveOrder}
          disabled={!hasChanges || isPending}
          variant={hasChanges ? "default" : "secondary"}
          loading={isPending}
        >
          배너 순서 변경
        </Button>

        <Link href="/admin/banner/new">
          <Button
            variant="default"
            type="button"
            size="sm"
            className="bg-brand hover:bg-brand/90 rounded-2xl"
          >
            배너 등록
          </Button>
        </Link>
      </div>

      <div className="rounded-2xl w-full p-5 bg-white shadow-md">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <Table className="border-none">
            <TableCaption>
              총 {banners.length}개의 배너가 있습니다.
              {hasChanges && (
                <span className="text-orange-600 ml-2">
                  {`(순서가 변경되었습니다. 저장하려면 '배너 순서 변경' 버튼을
                  클릭하세요)`}
                </span>
              )}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead className="w-[120px]">이미지</TableHead>
                <TableHead className="text-center">타이틀</TableHead>
                <TableHead className="text-center">서브 타이틀</TableHead>
                <TableHead className="text-right w-40">액션</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              <SortableContext
                items={banners.map((banner) => banner.id)}
                strategy={verticalListSortingStrategy}
              >
                {banners.map((banner) => (
                  <BannerItem banner={banner} key={banner.id} />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </div>
  );
}
