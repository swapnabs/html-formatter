import React, { useState } from 'react';

const HtmlFormatterApp = () => {
  const [inputHtml, setInputHtml] = useState('');
  const [formattedHtml, setFormattedHtml] = useState('');

  const handleInputChange = (event) => {
    setInputHtml(event.target.value);
  };

  const formatHtml = (html) => {
    let formatted = '';
    let indentLevel = 0;
    const indentSize = 2; // Number of spaces per indentation

    // Clean up any unnecessary spaces between tags
    html = html.replace(/\s*</g, '<').replace(/\s*>\s*/g, '>');  // Remove unnecessary spaces around '<' and '>'

    // Split the input HTML into individual tags using regular expressions
    const regex = /(<[^>]+>)/g;
    const lines = html.split(regex).filter(Boolean);  // Split by tags and keep the tags in the result

    lines.forEach((line) => {
      line = line.trim();

      if (!line) return; // Skip empty lines

      // Detect if it's a closing tag (</tag>) or an opening tag (<tag>)
      const isClosingTag = line.startsWith('</');
      const isOpeningTag = line.startsWith('<') && !isClosingTag;

      // If it's a closing tag, reduce the indent level before adding it
      if (isClosingTag) {
        indentLevel = Math.max(indentLevel - 1, 0); // Ensure indentLevel doesn't go negative
      }

      // Add the appropriate number of spaces based on the indent level
      formatted += ' '.repeat(indentLevel * indentSize) + line + '\n';

      // If it's an opening tag, increase the indent level for the next tag
      if (isOpeningTag && !line.endsWith('/>')) {
        indentLevel++;
      }
    });

    // Trim final formatting to remove unwanted leading or trailing spaces
    return formatted.trim();
  };

  const handleFormatClick = () => {
    const formatted = formatHtml(inputHtml);
    setFormattedHtml(formatted);
  };

  return (
    <div className="html-formatter-container" style={{ padding: '20px' }}>
      <h1>HTML Formatter</h1>
      
      <textarea
        placeholder="Paste your HTML code here"
        value={inputHtml}
        onChange={handleInputChange}
        rows="10"
        style={{ width: '100%', padding: '10px', fontFamily: 'monospace', fontSize: '14px' }}
      />
      
      <button
        onClick={handleFormatClick}
        style={{
          padding: '10px 20px',
          margin: '10px 0',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Format HTML
      </button>

      <h3>Formatted HTML:</h3>
      <textarea
        value={formattedHtml}
        readOnly
        rows="10"
        style={{
          width: '100%',
          padding: '10px',
          fontFamily: 'monospace',
          fontSize: '14px',
          backgroundColor: '#f4f4f4'
        }}
      />
    </div>
  );
};

export default HtmlFormatterApp;
