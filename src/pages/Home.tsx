import React, { useEffect, useState } from 'react';

import SearchBar from '../components/SearchBar';
import { getBlock, getNetworkStatus } from '../utils/web3';

const Home = () => {
  const [blockNum, setBlockNum] = useState<string>('');
  const [networkStatus, setNetworkStatus] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBlock = async () => {
    try {
      const latestBlock = await getBlock();
      setBlockNum(latestBlock.number.toString());
      setError(null);
    } catch (error) {
      console.error('Error fetching latest block:', error);
      setError('최신 블록 정보를 가져오는데 실패했습니다. 네트워크 연결을 확인해주세요.');
    }
  };

  const fetchNetworkStatus = async () => {
    try {
      const networkStatus = await getNetworkStatus();
      setNetworkStatus(networkStatus);
      setError(null);
    } catch (error) {
      console.error('Error fetching network status:', error);
      setError('네트워크 상태를 확인하는데 실패했습니다. 연결을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlock();
    fetchNetworkStatus();

    // 10초마다 상태 업데이트
    const interval = setInterval(() => {
      fetchBlock();
      fetchNetworkStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>블록체인 네트워크에 연결 중입니다...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2 style={{ color: 'red' }}>{error}</h2>
        <button 
          onClick={() => {
            setLoading(true);
            fetchBlock();
            fetchNetworkStatus();
          }}
          style={{ padding: '10px 20px', marginTop: '20px' }}
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <SearchBar />
      <div style={{ marginTop: '30px' }}>
        <h2>최신 블록: {blockNum ? blockNum : '로딩 중...'}</h2>
        <h2>
          네트워크 상태:{' '}
          {networkStatus
            ? '✅ 네트워크가 정상 작동 중입니다'
            : '❌ 네트워크 연결 상태가 좋지 않습니다'}
        </h2>
      </div>
    </div>
  );
};

export default Home;
