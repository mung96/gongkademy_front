type Props = {
  title: string;
  thumbnail: string;
};

export default function CourseCard({ title, thumbnail }: Props) {
  return (
    <li className="flex flex-col gap-2">
      <div className="rounded-lg w-[325px] h-[200px]">
        <img className="w-full h-full" src={thumbnail} alt={'강좌 썸네일'} />
      </div>
      <p className="subtitle2 text-neutral-gray-950">{title}</p>
    </li>
  );
}
