'use client';

import { apiRequester } from '@/api/requester';
import { validateSession } from '@/auth/api';
import { BoardCategory } from '@/board/type';
import Button from '@/components/Button';
import Combobox from '@/components/Combobox';
import Input from '@/components/Input';
import ListItem from '@/components/ListItem';
import TextArea from '@/components/TextArea';
import { END_POINT, SERVER_BASE_URL } from '@/constants/api';
import { PATH } from '@/constants/path';
import { getLectureListResponse } from '@/course/api';
import { CourseItem, GetCourseListResponse, RegisterStatus } from '@/course/type';
import { login } from '@/store/auth';
import { exhaustiveCheck, getCourseLabelValue, getLectureLabelValue } from '@/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

const getBodyPlaceholder = (category: BoardCategory) => {
  if (category == BoardCategory.WORRY) {
    return '고민을 적어주세요';
  }
  if (category == BoardCategory.QUESTION) {
    return '질문을 적어주세요';
  } else {
    exhaustiveCheck(category);
    return '';
  }
};
const TITLE_MAX_LENGTH = 100;
const BODY_MAX_LENGTH = 10_000;
type FormValues = {
  title: string;
  body: string;
};

async function getRegisteredCourseListResponse(
  onSuccess?: (courseItemDtoList: CourseItem[]) => void,
  registerStatus?: RegisterStatus,
) {
  const response = await apiRequester.get<GetCourseListResponse>(
    `/members/courses${registerStatus ? `?registerStatus=${registerStatus}` : ''}`,
  );
  if (onSuccess) {
    onSuccess(response.data.courseList);
  }
  return response.data;
}

export default function Page({ searchParams }: { searchParams: { category: BoardCategory } }) {
  const { category } = searchParams;
  const {
    register,
    handleSubmit,
    formState: { isValid: isFormValid, isSubmitting },
  } = useForm<FormValues>({});

  const [courseList, setCourseList] = useState<{ label: string; value: number | string }[]>([]);
  const [lectureList, setLectureList] = useState<{ label: string; value: number | string }[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<{ label: string; value: number | string } | null>(null);
  const [selectedLecture, setSelectedLecture] = useState<{ label: string; value: number | string } | null>(null);
  const [reset, setReset] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();

  //세션 유효한지 테스트 테스트
  useEffect(() => {
    validateSession(
      () => {
        dispatch(login());
      },
      () => {
        router.replace(SERVER_BASE_URL + END_POINT.NAVER_LOGIN(PATH.COMMUNITY_WRITE(category)));
      },
    );
  }, []);

  useEffect(() => {
    getRegisteredCourseListResponse((data) => setCourseList(getCourseLabelValue(data)));
  }, []);

  useEffect(() => {
    if (reset) {
      setReset(false);
    }
  }, [reset]);

  useEffect(() => {
    if (selectedCourse !== undefined) {
      getLectureListResponse(Number(selectedCourse?.value), (data) => setLectureList(getLectureLabelValue(data)));
      setReset(true);
    }
  }, [selectedCourse]);

  async function writeBoard(formValues: FormValues) {
    const response = await apiRequester.post(`/boards?category=${category}`, {
      ...formValues,
      courseId: selectedCourse?.value,
      lectureId: selectedLecture?.value === 0 ? null : selectedLecture?.value,
    });

    //성공시 리다이렉트를 한다
    const boardId = response.headers.location.split('/').pop();
    router.push(PATH.COMMUNITY_DETAIL(category, boardId));
    return response.data;
  }
  return (
    <main className="flex flex-col items-center gap-4 px-4 pb-[72px] pt-9 tablet:flex-row tablet:items-start tablet:justify-center tablet:px-6 tablet:pt-12 desktop:pt-16">
      <form
        method="post"
        onSubmit={handleSubmit((data) => {
          writeBoard(data);
        })}
        className="flex w-full flex-col items-center gap-4 tablet:max-w-[720px] desktop:max-w-[816px]"
      >
        <nav className="flex w-full tablet:w-[192px]">
          <Link href={PATH.COMMUNITY_WRITE(BoardCategory.WORRY)} className="flex-1">
            <ListItem label={'고민'} isSelect={category === BoardCategory.WORRY} />
          </Link>
          <Link href={PATH.COMMUNITY_WRITE(BoardCategory.QUESTION)} className="flex-1">
            <ListItem label={'질문'} isSelect={category === BoardCategory.QUESTION} />
          </Link>
        </nav>
        <Input
          placeholder="제목을 적어주세요"
          register={register('title', { required: true, maxLength: TITLE_MAX_LENGTH })}
          label="title"
        />
        {category === BoardCategory.QUESTION && (
          <div className="flex w-full gap-[14px] ">
            <Combobox
              placeholder={'수강중인 강좌 선택'}
              items={courseList}
              selectedItem={selectedCourse}
              onSelect={setSelectedCourse}
            />
            <Combobox
              placeholder={'강의 선택'}
              items={lectureList}
              selectedItem={selectedLecture}
              onSelect={setSelectedLecture}
              reset={reset}
            />
          </div>
        )}

        <TextArea
          placeholder={getBodyPlaceholder(category)}
          maxLength={BODY_MAX_LENGTH}
          label="body"
          register={register('body', { required: true, maxLength: BODY_MAX_LENGTH })}
        />

        <Button
          className="w-full"
          disabled={
            !(
              isFormValid &&
              (category === BoardCategory.QUESTION ? selectedCourse !== null && selectedLecture !== null : true)
            ) || isSubmitting
          }
        >
          올리기
        </Button>
      </form>
    </main>
  );
}
