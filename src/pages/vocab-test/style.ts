import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

export const TestCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
  font-weight: 600;
`;

export const InputSection = styled.div`
  margin-bottom: 30px;
`;

export const InputGroup = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #555;
  font-weight: 500;
  font-size: 1rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e5e9;
  border-radius: 10px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &:disabled {
    background: #f8f9fa;
    color: #6c757d;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

export const CompareButton = styled.button`
  flex: 1;
  padding: 12px 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    background: #adb5bd;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ResetButton = styled.button`
  padding: 12px 24px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: #5a6268;
    transform: translateY(-2px);
  }

  &:disabled {
    background: #adb5bd;
    cursor: not-allowed;
    transform: none;
  }
`;

export const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #f5c6cb;
  font-size: 0.9rem;
`;

export const ResultSection = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e9ecef;
`;

export const ResultTitle = styled.h3`
  color: #333;
  margin-bottom: 15px;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

export const ResultLabel = styled.span`
  color: #555;
  font-weight: 500;
`;

export const ResultValue = styled.span<{ similarity?: number; isCorrect?: boolean }>`
  font-weight: 600;
  color: ${({ similarity, isCorrect }) => {
    if (isCorrect !== undefined) {
      return isCorrect ? '#28a745' : '#dc3545';
    }
    if (similarity !== undefined) {
      if (similarity >= 0.8) return '#28a745';
      if (similarity >= 0.6) return '#ffc107';
      return '#dc3545';
    }
    return '#333';
  }};
`;

export const ResultMessage = styled.span`
  color: #666;
  font-style: italic;
  max-width: 60%;
  text-align: right;
`; 