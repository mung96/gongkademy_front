'use client';

import { apiRequester } from '@/api/requester';
import { BoardCategory } from '@/board/type';
import Combobox from '@/components/Combobox';
import { PATH } from '@/constants/path';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  boardId: number;
  boardCategory: BoardCategory;
};

//TODO: 수정은 이후에 구현
export default function BoardMoreButton({ boardId, boardCategory }: Props) {
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string }>();
  const router = useRouter();

  async function deleteBoard() {
    try {
      await apiRequester.delete(`/boards/${boardId}`);
    } catch (error) {
      console.log(error);
    }
  }
  async function removeBoard() {
    await deleteBoard();
    router.push(PATH.COMMUNITY(boardCategory));
  }

  useEffect(() => {
    if (selectedItem?.value === '수정') {
      console.log('수정');
    } else if (selectedItem?.value === '삭제') {
      if (confirm('정말 삭제하시겠습니까? 삭제 후에는 다시 복구할 수 없습니다.')) {
        removeBoard();
      } else {
      }
    }
  }, [selectedItem]);
  return (
    <div className="w-[98px]">
      <Combobox
        placeholder={'더보기'}
        items={[
          //   { label: '수정', value: '수정' },
          { label: '삭제', value: '삭제' },
        ]}
        onSelect={setSelectedItem}
        reset={true}
      />
    </div>
  );
}
