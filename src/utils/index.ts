export function getFormatDate(dateString: string): string {
  return dateString?.split('T')[0];
}

export function getCourseThumbnailPath(courseThumbnail: string) {
  return `/assets/jpg/${courseThumbnail}.jpeg`;
}

export const exhaustiveCheck = (status: never): never => {
  throw new Error(`분기 처리가 되지 않은 타입이 있습니다.: ${status}`);
};
