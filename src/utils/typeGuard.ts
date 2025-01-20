export const exhaustiveCheck = (status: never): never => {
  throw new Error(`분기 처리가 되지 않은 타입이 있습니다.: ${status}`);
};
