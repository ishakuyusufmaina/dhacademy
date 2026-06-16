function createToolbar(id, extention=""){
	let toolbar = document.createElement("div");
	toolbar.id = id;
	toolbar.innerHTML = `
      <span class="ql-formats">
        <select class="ql-header">
          <option selected></option>
          <option value="1">H1</option>
          <option value="2">H2</option>
          <option value="3">H3</option>
        </select>
        <select class="ql-font"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-bold"></button>
        <button class="ql-italic"></button>
        <button class="ql-underline"></button>
        <button class="ql-strike"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-color"></select>
        <select class="ql-background"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button>
        <button class="ql-indent" value="-1"></button>
        <button class="ql-indent" value="+1"></button>
      </span>
      <span class="ql-formats">
        <select class="ql-align"></select>
      </span>
      <span class="ql-formats">
        <button class="ql-blockquote"></button>
        <button class="ql-code-block"></button>
        <button class="ql-code"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-formula"></button>
        <button class="ql-link"></button>
        <button class="ql-image"></button>
        <button class="ql-video"></button>
      </span>
      <span class="ql-formats">
        <button class="ql-inlinefield">Inline Field</button>
      </span>
      <span class="ql-formats">
        <button class="ql-multiline">Multiline Field</button>
      </span>
      <span class="ql-formats">
        <button class="ql-checkbox" value="checkbox">Check Box</button>
      </span>
	  
	  ${extention}

      <span class="ql-formats">
        <button class="ql-clean"></button>
      </span>
    `;
	return toolbar;
}


