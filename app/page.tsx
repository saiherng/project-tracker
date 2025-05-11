import Pagination from "./components/Pagination";


export default async function Home({searchParams}: {searchParams: {page:string}}) {

  const pageParam = await searchParams;
  const page = pageParam.page;

  return (
    <Pagination itemCount={10} pageSize={2} currentPage={parseInt(page)}/>
  );
}
