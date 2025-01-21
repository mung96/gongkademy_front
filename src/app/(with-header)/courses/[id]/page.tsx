'use client';

import Button from '@/components/Button';
const course = {
  id: '1',
  title: '강좌명',
  thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
};
export default function Page() {
  return (
    <main className="px-4 pb-[72px] pt-9 tablet:px-6 tablet:pt-12 desktop:pt-16">
      <div className="flex flex-col gap-6">
        <div className=" aspect-video w-full min-w-[163px] rounded-lg ">
          <img className="size-full rounded-lg" src={course.thumbnail} alt={'강좌 썸네일'} />
        </div>

        <section className="flex flex-col gap-4">
          <h1 className="title1 text-neutral-gray-950">제목</h1>
          <div className="flex flex-col gap-2">
            <div className="flex gap-5">
              <p className="body1 text-neutral-gray-800">수업시간</p>
              <p className="body1 text-neutral-gray-800">
                {0}시간 {0}분
              </p>
            </div>
            <div className="flex gap-5">
              <p className="body1 text-neutral-gray-800">수강 기한</p>
              <p className="body1 text-neutral-gray-800">무제한</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button variant="filled" onClick={() => console.log('수강 신청')}>
              수강 신청
            </Button>
            <Button variant="outlined" onClick={() => console.log('수강 신청')}>
              강의 자료 다운로드
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
