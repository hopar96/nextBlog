import { API_URL } from "../lib/constants";

/* async function getVideos(id: number) {
  const response = await fetch(`${API_URL}/${id}/videos`);
  return response.json();
} */

export default async function MovieVideos({ id }: { id: number }) {
  // const videos = await getVideos(id);

  return (
    <div>
      <div></div>
    </div>
  );
}
