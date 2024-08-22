'use client';

import Link from 'next/link';
import { API_URL } from '../../lib/constants';
import { menuItems } from '../../components/sideabar';
import { redirect, useRouter } from 'next/navigation';
import { Card } from 'antd';
import Title from 'antd/es/typography/Title';
// import BlogList from '../cate/page'

// export const metadata = {
//   title: 'Home',
// };

// async function getMovies() {
//   const response = await fetch(API_URL)
//   const json = await response.json()
//   return json
// }

export default function Home() {
  // const movies = await getMovies()
  const router = useRouter();

  const onClickMenu = (props: any) => {
    let url;
    if (props.children && props.children.length > 0) {
      return;
    }
    if (isNaN(props.key)) {
      url = props.key;
    } else {
      url = `/cate/${props.key}`;
    }
    router.push(url);
  };

  return (
    <>
      <div className="p-20">
        <Title level={1}>대시보드</Title>
        <div className="w-[100%] grid-cols-4">
          <div>
            {menuItems.map((menu, idx) => (
              <Card
                key={idx}
                title={menu.label}
                bordered={true}
                style={{ width: 300 }}
                onClick={() => onClickMenu(menu)}>
                {menu.children && menu.children.length > 0
                  ? menu.children.map((child, cIdx) => (
                      <p key={cIdx} className="cursor-pointer" onClick={() => onClickMenu(child)}>
                        {child.label}
                      </p>
                    ))
                  : ''}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
  // return (  <BlogList />)
}

/* 
const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    
    const getMovies = async () => {
    
        const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
        const json = await response.json();
        setMovies(json);
        setIsLoading(false);
    }

    useEffect(() => {
        getMovies();
    }, []);
*/
