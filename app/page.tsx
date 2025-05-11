import Pagination from "./components/Pagination";


export default function Home() {
  return (
    <Pagination itemCount={10} pageSize={2} currentPage={5}/>
  );
}
