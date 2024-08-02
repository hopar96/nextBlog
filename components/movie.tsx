import Link from "next/link";

interface IMovieProps {
  title: string;
  id: number;
  poster_path: string;
}
export default function Movie({ title, id, poster_path }: IMovieProps) {
  return (
    <div>
      <img src={poster_path} alt={title} />
      <Link href={`/blog/${id}`}>{title}</Link>
    </div>
  );
}
