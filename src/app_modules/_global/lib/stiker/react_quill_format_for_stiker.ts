import React from "react";

export {
    modulesReactQuill,
    formatsReactQuill,
    insertStickerReactQuill
};

const modulesReactQuill = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
    ["clean"],
  ],
};

const formatsReactQuill = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "image",
];

 const insertStickerReactQuill = ({
   stickerUrl,
   quillRef,
   close,
 }: {
   stickerUrl: string;
   quillRef: React.MutableRefObject<any>;
   close: () => void;
 }) => {
   if (!quillRef.current) return;

   const quill = quillRef.current.getEditor();
   const range = quill.getSelection(true);

   // Custom image insertion with size
   // Use custom blot or HTML string with size attributes
   const stickerHtml = `<img src="${stickerUrl}" alt="sticker" style="width: 40px; height: 40px;">`;

   // Insert HTML at cursor position
   quill.clipboard.dangerouslyPasteHTML(range.index, stickerHtml);

   // Move cursor after inserted sticker
   quill.setSelection(range.index + 1, 0);

   // Focus back on editor
   quill.focus();

   // Close sticker modal
   close();
 };