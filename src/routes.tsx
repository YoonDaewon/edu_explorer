import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BlockDetail from './pages/BlockDetail';
import TransactionDetail from './pages/TransactionDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/block/:blockNumber" element={<BlockDetail />} />
      <Route path="/transaction/:txHash" element={<TransactionDetail />} />
    </Routes>
  );
};

export default AppRoutes;
