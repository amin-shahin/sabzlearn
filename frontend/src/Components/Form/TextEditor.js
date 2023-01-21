import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const TextEditor = ({value,setValue}) => {
    return ( 
        <CKEditor
        editor={ClassicEditor}
        data={value}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(data)
          console.log(data);
        }}
      />
     );
}
 
export default TextEditor;