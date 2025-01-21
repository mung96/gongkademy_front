import CourseDetail from '@/course/CourseDetail';
const course = {
  id: '1',
  title: '강좌명',
  thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
};
export default function Page() {
  return (
    <main className="">
      <div className="tablet:flex tablet:flex-col tablet:items-center">
        <CourseDetail course={course} />
      </div>
    </main>
  );
}
