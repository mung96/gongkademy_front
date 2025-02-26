'use client';

import LoadingIcon from '/public/assets/svg/LoadingIcon.svg';

export default function LoadingComponent() {
  return (
    <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <div className="animate-loading-spin">
        <LoadingIcon />
      </div>
    </div>
  );
}
