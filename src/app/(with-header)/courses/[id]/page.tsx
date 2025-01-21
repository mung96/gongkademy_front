import CourseCard from '@/course/CourseCard';
const course = {
  id: '1',
  title: '강좌명',
  thumbnail: 'https://i.ytimg.com/vi/wYPIhJsOs3U/hq720.jpg?sqp=-…BACGAY4AUAB&rs=AOn4CLBSCfnc25vP04mjehMtyu9qVOEqcA',
};
export default function Page() {
  return (
    <main className="px-4 pt-9 tablet:px-6 tablet:pt-12 desktop:pt-16">
      <section>
        <CourseCard course={course} />
      </section>
    </main>
  );
}
