import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (input.startsWith('0x')) {
      navigate(`/transaction/${input}`);
    } else {
      navigate(`/block/${input}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Block Number or Tx Hash"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: '60%' }}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
