'use client';
import { BoardCategory } from '@/board/BoardItem';

const commentList = [
  {
    id: '1',
    nickname: '질문이 있어요',
    content: '질문질문',
    date: '2024-04-21',
  },
  {
    id: '2',
    nickname: '질문이 있어요',
    content: '질문질문',
    date: '2024-04-21',
  },
  {
    id: '3',
    nickname: '질문이 있어요',
    content: '질문질문',
    date: '2024-04-21',
  },
  {
    id: '4',
    nickname: '질문이 있어요',
    content: '질문질문',
    date: '2024-04-21',
  },
  {
    id: '5',
    nickname: '질문이 있어요',
    content: '질문질문',
    date: '2024-04-21',
  },
];
export default function Page() {
  return (
    <main className={'flex flex-col items-center px-4 pb-[72px] pt-9 tablet:px-6  tablet:pt-12 desktop:pt-16'}>
      <div className={'flex  flex-col items-center  gap-7    p-6 tablet:max-w-[720px] desktop:max-w-[816px]'}>
        <div
          className={
            'flex flex-col gap-4 rounded-lg   bg-neutral-gray-50 p-6 tablet:max-w-[720px] desktop:max-w-[816px]'
          }
        >
          <h1 className={'subtitle1 text-neutral-gray-950'}>제목</h1>
          <div className={'flex justify-between'}>
            <p className={'body2 text-neutral-gray-500'}>닉네임</p>
            <p className={'body2 text-neutral-gray-500'}>yyyy.mm.dd</p>
          </div>

          <p className={'body1 text-neutral-gray-950'}>
            안녕하세요. 객체지향의 사실과 오해, 오브젝트부터 이어서 강의까지 영호님의 강의를 즐겁게 보고 있습니다.
            강의를 보면서 궁금한 것이 있습니다. Movie는 DiscountPolicy와 협력하고 있고, DisscountPolicy는
            DiscountCondition과 건이 추가된다면 DiscountCondition 에 협력자로 Customer가 파라미터로 전달이 되어야할 것
            같습니다. 이를 위해 BirthdayDiscountCondition이라는 할인 조건을 만 깨지는 상황도 발생하게 될 것 같습니다.
            이렇게 기존에 설계된 추상화가 다른 조건의 추가로 인해 깨지는 경우에는 어떻게 설계를 접근하는 것이 좋을까요??
          </p>
        </div>

        <div className={'flex w-full flex-col'}>
          {commentList.map((comment) => (
            <div className={'flex flex-col gap-3 rounded-lg bg-neutral-gray-50 px-6 pb-4 pt-[22px]'} key={comment.id}>
              <div className={'flex justify-between'}>
                <p className={'body2 text-neutral-gray-500'}>{comment.nickname}</p>
                <p className={'body2 text-neutral-gray-500'}>{comment.date}</p>
              </div>
              <p className={'body1 text-neutral-gray-950'}>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
