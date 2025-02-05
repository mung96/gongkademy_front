'use client';

import { apiRequester } from '@/api/requester';
import { BoardCategory } from '@/board/type';
import Combobox from '@/components/Combobox';
import { HTTP_STATUS } from '@/constants/api';
import { PATH } from '@/constants/path';
import { isAxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Props = {
  boardId: number;
  boardCategory: BoardCategory;
};

//TODO: 수정은 이후에 구현
export default function BoardMoreButton({ boardId, boardCategory }: Props) {
  const [selectedItem, setSelectedItem] = useState<{ label: string; value: string } | null>(null);

  const router = useRouter();
  const [reset, setReset] = useState(false);
  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  async function deleteBoard() {
    try {
      await apiRequester.delete(`/boards/${boardId}`);
      router.push(PATH.COMMUNITY(boardCategory));
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === HTTP_STATUS.FORBIDDEN) {
          alert('권한이 없습니다.');
        } else {
          console.log('에러: ' + error);
        }
      }
    }
  }

  useEffect(() => {
    if (selectedItem?.value === '수정') {
      console.log('수정');
    } else if (selectedItem?.value === '삭제') {
      if (confirm('정말 삭제하시겠습니까? 삭제 후에는 다시 복구할 수 없습니다.')) {
        deleteBoard();
      } else {
        setReset(true);
      }
    }
  }, [selectedItem]);
  return (
    <div className="w-[130px] min-w-[100px]">
      <Combobox
        placeholder={'더보기'}
        items={[
          //   { label: '수정', value: '수정' },
          { label: '삭제', value: '삭제' },
        ]}
        onSelect={setSelectedItem}
        reset={reset}
        selectedItem={selectedItem}
      />
    </div>
  );
}
