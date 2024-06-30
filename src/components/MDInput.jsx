import React, { useEffect, useRef } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";
import "@uiw/react-markdown-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MDInput = ({ value, onChange, viewOnly }) => {
  const ref = useRef();

  const revertElementStyle = (elem) => {
    if (["ul", "li", "ol", "a"].includes(elem.tagName.toLowerCase())) {
      elem.style.all = "revert";
    }
    let findChild = elem.children;
    for (let index = 0; index < findChild.length; index++) {
      const element = findChild[index];
      revertElementStyle(element);
    }
  };
  useEffect(() => {
    if (ref.current) {
      revertElementStyle(ref.current);
    }
  }, [value]);
  return (
    <div data-color-mode="light" className="normal-case" ref={ref}>
      {viewOnly ? (
        value ? (
          <MarkdownEditor.Markdown source={value} />
        ) : (
          "--"
        )
      ) : (
        <MarkdownEditor
          height="150px"
          value={value}
          onChange={onChange}
          className="mt-2"
        />
      )}
    </div>
  );
};

export default MDInput;
