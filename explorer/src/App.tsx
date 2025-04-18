import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes';

const App = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          Blockchain Explorer
        </h1>
      </div>
      <AppRoutes />
    </div>
  );
};

export default App;
