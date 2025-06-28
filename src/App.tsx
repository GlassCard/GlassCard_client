import { Route, Routes } from "react-router-dom"
import Layout from "@/layout"
import Home from '@/pages/home';
import CardList from "@/pages/card-list";
import MakeCard from '@/pages/make-card';
import VocabTest from "@/pages/vocab-test";

function App() {
  console.log('App component is rendering');

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>} />
        <Route path="card-list" element={<CardList/>} />
        <Route path="make-card" element={<MakeCard/>} />
        <Route path="vocab-test" element={<VocabTest/>} />
      </Route>
    </Routes>
    </>
  )
}

export default App
