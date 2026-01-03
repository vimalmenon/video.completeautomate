import React from 'react';
import { CodeTyper } from './CodeTyper.component';

const pythonCode = `def fibonacci(n):
    """Calculate Fibonacci number at position n"""
    if n <= 1:
        return n
    
    previous, current = 0, 1
    for _ in range(2, n + 1):
        previous, current = current, previous + current
    
    return current

# Example usage
result = fibonacci(10)
print(f"Fibonacci(10) = {result}")`;

export const CodeTyperExample: React.FC = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Code Typer Component</h1>
      <CodeTyper
        code={pythonCode}
        language="python"
        typingSpeed={50}
        startDelay={500}
        showLineNumbers={true}
        theme="dark"
        height="500px"
        width="100%"
        onTypingComplete={() => console.log('Typing completed!')}
      />
    </div>
  );
};
