import React, { useState, useEffect } from 'react';
import styles from './CodeTyper.module.css';

interface CodeTyperProps {
  code: string;
  language?: string;
  typingSpeed?: number; // milliseconds per character
  startDelay?: number; // milliseconds before typing starts
  showLineNumbers?: boolean;
  theme?: 'dark' | 'light';
  height?: string;
  width?: string;
  onTypingComplete?: () => void;
}

export const CodeTyper: React.FC<CodeTyperProps> = ({
  code,
  language = 'python',
  typingSpeed = 50,
  startDelay = 500,
  showLineNumbers = true,
  theme = 'dark',
  height = '400px',
  width = '100%',
  onTypingComplete,
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (displayedCode.length === code.length) {
      setIsTyping(false);
      onTypingComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsTyping(true);
      setDisplayedCode(code.slice(0, displayedCode.length + 1));
    }, startDelay);

    return () => clearTimeout(timer);
  }, [displayedCode, code, startDelay, onTypingComplete]);

  const lines = displayedCode.split('\n');
  const totalLines = code.split('\n').length;

  return (
    <div
      className={`${styles.editor} ${styles[theme]}`}
      style={{ height, width }}
    >
      {/* VS Code-like header */}
      <div className={styles.header}>
        <div className={styles.titleBar}>
          <span className={styles.fileName}>
            {language === 'python' ? 'script.py' : 'code'}
          </span>
        </div>
      </div>

      {/* Code editor area */}
      <div className={styles.editorContent}>
        <div className={styles.lineNumbers}>
          {Array.from({ length: totalLines }).map((_, i) => (
            <div key={i} className={styles.lineNumber}>
              {i + 1}
            </div>
          ))}
        </div>

        <div className={styles.codeArea}>
          <pre className={styles.code}>
            <code>
              {lines.map((line, lineIndex) => (
                <div key={lineIndex} className={styles.codeLine}>
                  {highlightSyntax(line, language)}
                  {lineIndex === lines.length - 1 && isTyping && (
                    <span
                      className={`${styles.cursor} ${
                        cursorVisible ? styles.visible : ''
                      }`}
                    >
                      |
                    </span>
                  )}
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>

      {/* Status bar */}
      <div className={styles.statusBar}>
        <span>{language}</span>
        <span>Ln {lines.length}, Col {lines[lines.length - 1]?.length + 1 || 1}</span>
      </div>
    </div>
  );
};

// Simple Python syntax highlighter
function highlightSyntax(line: string, language: string): React.ReactNode {
  if (language !== 'python') {
    return line;
  }

  const keywords = ['def', 'class', 'if', 'else', 'elif', 'for', 'while', 'return', 'import', 'from', 'as', 'try', 'except', 'finally', 'with', 'lambda', 'yield', 'break', 'continue', 'pass', 'raise', 'assert', 'and', 'or', 'not', 'in', 'is', 'True', 'False', 'None'];
  const builtins = ['print', 'len', 'range', 'str', 'int', 'float', 'list', 'dict', 'set', 'tuple', 'open', 'input', 'type', 'sum', 'min', 'max', 'sorted', 'enumerate', 'zip', 'map', 'filter'];

  let parts: React.ReactNode[] = [];
  let lastIndex = 0;

  const tokenRegex = /(\b\w+\b|"[^"]*"|'[^']*'|#.*$|[\(\)\[\]\{\}\:\,\.]|==|!=|<=|>=|<<|>>)/g;
  let match;

  while ((match = tokenRegex.exec(line)) !== null) {
    const token = match[0];
    const index = match.index;

    // Add text before token
    if (index > lastIndex) {
      parts.push(line.substring(lastIndex, index));
    }

    // Classify and style token
    if (keywords.includes(token)) {
      parts.push(
        <span key={`keyword-${index}`} className={styles.keyword}>
          {token}
        </span>
      );
    } else if (builtins.includes(token)) {
      parts.push(
        <span key={`builtin-${index}`} className={styles.builtin}>
          {token}
        </span>
      );
    } else if (token.startsWith('#')) {
      parts.push(
        <span key={`comment-${index}`} className={styles.comment}>
          {token}
        </span>
      );
    } else if (token.startsWith('"') || token.startsWith("'")) {
      parts.push(
        <span key={`string-${index}`} className={styles.string}>
          {token}
        </span>
      );
    } else if (/[0-9]/.test(token)) {
      parts.push(
        <span key={`number-${index}`} className={styles.number}>
          {token}
        </span>
      );
    } else {
      parts.push(token);
    }

    lastIndex = index + token.length;
  }

  // Add remaining text
  if (lastIndex < line.length) {
    parts.push(line.substring(lastIndex));
  }

  return parts;
}
