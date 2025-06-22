import { Route, Routes } from "react-router-dom"
import Layout from "@/layout"
import Home from '@/pages/home';
import CardList from "@/pages/card-list";
import MakeCard from '@/pages/make-card';

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="card-list" element={<CardList/>} />
        <Route path="make-card" element={<MakeCard/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
