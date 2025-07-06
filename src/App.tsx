import { Routes, Route } from 'react-router-dom';
import CardList from './pages/card-list';
import MakeCard from './pages/make-card';
import Home from './pages/home';
import Study from './pages/study';
import VocabDetail from './pages/vocab-detail';
import Layout from '@/layout';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route index element={<Home />} />
                <Route path="/make-card" element={<MakeCard />} />
                <Route path="/card-list" element={<CardList />} />
                <Route path="/vocab-detail/:vocabListId" element={<VocabDetail />} />
                <Route path="/study/:vocabListId" element={<Study />} />
            </Route>
        </Routes>
    );
};

export default App;