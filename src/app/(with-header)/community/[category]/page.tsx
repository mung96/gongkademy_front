type BoardCategory = 'question' | 'worry';

export default function Page({ params }: { params: { category: BoardCategory } }) {
  const { category } = params;
  if (category === 'question' || category === 'worry') {
    console.log(category);
    console.log(params);
  }

  return <div>커뮤니티 페이지</div>;
}
