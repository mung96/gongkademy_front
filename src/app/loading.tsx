import LoadingIcon from '/public/assets/svg/LoadingIcon.svg';

export default function Loading() {
  <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
    <p className="text-system-red-400">로딩중입니다.</p>
    <LoadingIcon />
  </div>;
}
