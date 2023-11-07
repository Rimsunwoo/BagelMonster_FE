interface DetailProps {
  params: {
    id: string;
  };
}

export default function Detail({ params: { id } }: DetailProps) {
  return (
    <div>
      <p>{id}</p>
    </div>
  );
}
