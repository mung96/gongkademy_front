import { apiServerRequester } from '@/api/serverRequest';
import { validateServerSession } from '@/auth/serverApi';
import ListItem from '@/components/ListItem';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { PATH } from '@/constants/path';
import CourseCard from '@/course/CourseCard';
import { GetCourseListResponse, RegisterStatus } from '@/course/type';
import Link from 'next/link';
import { redirect } from 'next/navigation';

async function getCourseListResponse(status: RegisterStatus) {
  const response = await apiServerRequester.get<GetCourseListResponse>(`/members/courses?status=${status}`);
  return response.data;
}

export default async function Page({ params }: { params: { registerStatus: RegisterStatus } }) {
  const { registerStatus } = params;
  const { courseList } = await getCourseListResponse(registerStatus);

  //세션 유효한지 테스트 테스트
  validateServerSession(
    () => {},
    () => {
      redirect(SERVER_BASE_URL + END_POINT.KAKAO_LOGIN(PATH.MY_COURSES(registerStatus)));
    },
  );

  return (
    <div className={'flex w-full flex-col items-center gap-4  tablet:gap-6 '}>
      <h2 className={'title2 tablet:title1 text-neutral-gray-950'}>수강 강좌</h2>
      <nav className="flex justify-center tablet:gap-3  desktop:w-[192px]">
        <Link href={PATH.MY_COURSES(RegisterStatus.IN_PROGRESS)}>
          <ListItem
            label={'수강 중인 강좌'}
            isSelect={registerStatus === RegisterStatus.IN_PROGRESS}
            textAlign={'center'}
          />
        </Link>
        <Link href={PATH.MY_COURSES(RegisterStatus.COMPLETED)}>
          <ListItem
            label={'수강 완료 강좌'}
            isSelect={registerStatus === RegisterStatus.COMPLETED}
            textAlign={'center'}
          />
        </Link>
      </nav>
      <main className="px-4 pb-[72px] pt-9 tablet:px-6 tablet:pt-12 desktop:pt-16">
        <section className="flex w-full items-center justify-center ">
          {courseList?.length ? (
            <ul className="grid w-full grid-cols-2 gap-4 tablet:max-w-screen-tablet tablet:gap-12 desktop:max-w-screen-desktop desktop:grid-cols-3">
              {courseList.map((course) => (
                <Link className="w-fit" href={PATH.COURSE(course.courseId, 'curriculum')} key={course.courseId}>
                  <CourseCard key={course.courseId} course={course} />
                </Link>
              ))}
            </ul>
          ) : (
            <p className="body1 py-4">해당 하는 강좌가 없습니다.</p>
          )}
        </section>
      </main>
    </div>
  );
}
