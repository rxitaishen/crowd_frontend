import React, { useRef, useEffect, useState, useImperativeHandle, forwardRef } from 'react';

const EditorDemo = forwardRef((props, ref) => {
  const editorContainer = useRef(null);
  const [content, setContent] = useState(null);
  const [editor, setEditor] = useState(null);
  useEffect(() => {
  }, []);
  useEffect(() => {
    editor && editor.setContents(props.content);
    setContent(props.content);
  }, [props.content]);
  const isEmpty = (value) => {
    //  '<p><br></p>'  为空状态
    return value === '<p><br></p>';
  };
  return <div ref={editorContainer} />;
});
export default EditorDemo;
