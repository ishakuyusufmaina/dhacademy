/* UTILITY */
// 1. Select the element you want to watch
//const myElement = document.querySelector('.my-element');

// 2. Create the observer instance and define the callback
/*const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    // Get the new width and height from contentRect
    const { width, height } = entry.contentRect;
    
    console.log(`Element size changed to: ${width}px x ${height}px`);
  }
});*/

// 3. Start observing the element
//resizeObserver.observe(myElement);

const Embed = Quill.import('blots/embed');



const Inline = Quill.import('blots/inline');

var studentWork;
const studentWorks = {};
var currentStudent; //student id
function setStudentWork(work){
	studentWork = work;
	stdInputModel = work.inputs;
	
}
function getStudentWork(){
	return studentWork;
}
var inputModel = [];
var stdInputModel;
function setInputModel(model){
	getStudentWork().inputs = model
	
}

function getInputModel(){
	return getStudentWork().inputs;
}
function setStdInputModel(model){
	getStudentWork().inputs = model;	
}

function getStdInputModel(){
	return getStudentWork().inputs;
}

class InlinefieldBlot extends Embed {
    static blotName = 'inlinefield';
    static tagName = 'span';
    static className = 'inlinefield';

    static create(value) {
        const node = super.create();

        node.setAttribute('contenteditable', false);

        const input = document.createElement('input');
        input.type = 'text';
		let model = getInputModel();
		let stdWork = studentWorks[currentStudent];
		//lii => last processed input index
		stdWork.lpii ??=-1;
		stdWork.lpii++;
		let index = stdWork.lpii
		let stdInputs = stdWork.inputs;
        //input.value = value?.value || '';
        input.placeholder = value?.placeholder || '';
		input.value = stdInputs[index];
		input.disabled = true;
		input.style.width = input.value.length + "ch";
		
        node.appendChild(input);
		input.addEventListener('keydown', e => {
			e.stopPropagation();
		});
		
		
		let select = document.createElement("select");
				
		select.innerHTML =`
			<option value="">-mark-</option>
			<option value="correct">Correct</option>
			<option value="incorrect">Wrong</option>
		`;
		
		
		
		select.classList.add("marking");
		node.append(select);
		select.onchange = e=>{
			let v = select.value;
			
			node.classList.remove("correct");
			node.classList.remove("incorrect");
			if(v) node.classList.add(v);
			stdWork.marks[index] = v;
		}
		select.value = stdWork.marks[index];
		const event = new Event('change', { bubbles: true }); 
		select.dispatchEvent(event);
		node.classList.add("std-"+key(stdWork.studentId), "index-"+index);
		node.style.position = "relative";
        return node;
    }

    static value(node) {
        const input = node.querySelector('input');

        return {
            value: input ? input.value : '',
            placeholder: input ? input.placeholder : ''
        };
    }
}

Quill.register(InlinefieldBlot);



class CheckboxBlot extends Embed {
   static create(value) {
    let node = super.create(value);
	let inp = document.createElement("input");
    inp.setAttribute('type', 'checkbox');
	let stdWork = studentWorks[currentStudent];
	//lii => last processed input index
	stdWork.lpii ??=-1;
	stdWork.lpii++;
	let index = stdWork.lpii
	let stdInputs = stdWork.inputs;
	inp.checked = stdInputs[index];
	inp.disabled = true;
	//alert(model);	
	
	

		let select = document.createElement("select");
		select.innerHTML =`
			<option value="">-mark-</option>
			<option value="correct">Correct</option>
			<option value="incorrect">Wrong</option>
		`;
		select.classList.add("marking");
		node.append(select);
		select.onchange = e=>{
			let v = select.value;
			node.classList.remove("correct");
			node.classList.remove("incorrect");
			if(v) node.classList.add(v);
			stdWork.marks[index] = v;
		}
		select.value = stdWork.marks[index];
		const event = new Event('change', { bubbles: true }); 
		select.dispatchEvent(event);
		node.style.position = "relative";
		
		node.append(inp);
	
	node.setAttribute("contenteditable", false);
	node.classList.add("std-"+key(stdWork.studentId), "index-"+index);
    return node;
  }

  static value(node) {
    return node.dataset.index;
  }


	 // Lifecycle hook: Fires right before Quill detaches the element from the DOM
  remove() {
    console.log("This exact HTML DOM element is being deleted:", this.domNode);
    let index = this.domNode.dataset.index;
	inputModel[index] = undefined; 
    // Access custom attributes directly from the live DOM node
    const customId = this.domNode.getAttribute('data-id');
    console.log("Extracted ID from deleted node:", customId);

    // Optional: Dispatch a native JavaScript event to notify your main application
    this.domNode.parentNode?.dispatchEvent(new CustomEvent('blot-deleted', {
      bubbles: true,
      detail: { id: customId, node: this.domNode }
    }));

    // CRITICAL: Always call super.remove() so Quill finishes cleaning up the node
    super.remove();
  }
}

CheckboxBlot.blotName = 'checkbox';
CheckboxBlot.tagName = 'span';
CheckboxBlot.className = 'checkbox';
// 3. Register it with Quill
Quill.register(CheckboxBlot);


class RadiogroupBlot extends Embed {
   static create(value) {
    let node = super.create();
	  
	node.setAttribute("contenteditable", false);
	let model = getInputModel();
	
	let header = value.options[0];
	let headerElm = document.createElement("div");
	headerElm.innerHTML = header;
	headerElm.classList.add("radiogroup-title");
	node.append(headerElm);
	
	let stdWork = studentWorks[currentStudent];
	//lii => last processed input index
	
	stdWork.lpii ??=-1;
	stdWork.lpii++;
	let index = stdWork.lpii;
	value.options.forEach((optCont, i)=>{
		if (!i) return;
		let rad = document.createElement("input");
		
		let stdInputs = stdWork.inputs;
		rad.checked = stdInputs[index];
		rad.disabled = true;
		let model = stdInputs;
		
		rad.type = "radio";
		rad.id = "opt"+index+i;
		rad.name = "opt"+index;
		let label = document.createElement("label");
		label.for = rad.id;
		label.innerHTML = optCont;
		label.dataset.content = optCont;
		label.prepend(rad);
		rad.checked = i === stdWork.inputs[index];
		node.append(label);
		
	});
	

		let select = document.createElement("select");
		select.innerHTML =`
			<option value="">-mark-</option>
			<option value="correct">Correct</option>
			<option value="incorrect">Wrong</option>
		`;
		select.classList.add("marking");
		node.append(select);
		select.onchange = e=>{
			let v = select.value;
			node.classList.remove("correct");
			node.classList.remove("incorrect");
			stdWork.marks[index] = v;
			if(v) node.classList.add(v);
			
		}
		select.value = stdWork.marks[index];
		const event = new Event('change', { bubbles: true }); 
		select.dispatchEvent(event);
		node.style.position = "relative";
		node.classList.add("std-"+key(stdWork.studentId), "index-"+index);
    return node;
  }

  static value(node) {
	  let options = [];
	  options[0] = node.querySelector(".radiogroup-title").innerHTML;
	  let labels = node.querySelectorAll("label");
	  Array.from(labels).forEach(label => {
		  options.push(label.dataset.content);
	  });
    return {index: node.dataset.index, options}
  }


	 // Lifecycle hook: Fires right before Quill detaches the element from the DOM
  remove() {
    console.log("This exact HTML DOM element is being deleted:", this.domNode);
    inputModel[this.domNode.dataset.index ] = undefined;
    // Access custom attributes directly from the live DOM node
    const customId = this.domNode.getAttribute('data-id');
    console.log("Extracted ID from deleted node:", customId);

    // Optional: Dispatch a native JavaScript event to notify your main application
    this.domNode.parentNode?.dispatchEvent(new CustomEvent('blot-deleted', {
      bubbles: true,
      detail: { id: customId, node: this.domNode }
    }));

    // CRITICAL: Always call super.remove() so Quill finishes cleaning up the node
    super.remove();
  }
}

RadiogroupBlot.blotName = 'radiogroup';
RadiogroupBlot.tagName = 'div';
RadiogroupBlot.className = 'radiogroup';

// 3. Register it with Quill
Quill.register(RadiogroupBlot);


const Block = Quill.import('blots/block');





const BlockEmbed = Quill.import('blots/block/embed');

class MultilineEmbed extends BlockEmbed {
  static blotName = 'multiline';
  static tagName  = 'div';
  static className = 'ql-multiline-embed';
  
  static create(value) {
    let node = super.create();
	
    let textarea = document.createElement('textarea');
    textarea.value = "";
	textarea.setAttribute("spellcheck", false);
    textarea.className = 'ql-multiline-inner';
	textarea.rows = 10;
    // Prevent Quill from editing inside
    textarea.setAttribute('contenteditable', false);
	node.setAttribute('contenteditable', false);
	textarea.placeholder = 'Type here...';
	let stdWork = studentWorks[currentStudent];
	stdWork.lpii ??=-1;
	stdWork.lpii++;
	let stdInputs = stdWork.inputs;
	let index = stdWork.lpii;
	
	textarea.value = stdInputs[index];
	
	 textarea.addEventListener("change", e=>{
		 stdInputs[index] = textarea.value;
		 
	})
    // Keep Quill selection stable
    textarea.addEventListener('keydown', (e) => {
		e.stopPropagation();
     
	  if (e.key === 'Tab') {
		 
		e.preventDefault();        // stop focus change / Quill indent

		const start = textarea.selectionStart;
		const end = textarea.selectionEnd;

		// Insert tab character
		textarea.value =
		  textarea.value.substring(0, start) +
		  "\t" +
		  textarea.value.substring(end);

		// Move cursor after tab
		
		
		textarea.selectionStart = textarea.selectionEnd = start + 1;
	
		
	  }
	  

	  
    });
    node.innerHeight = "";
    node.appendChild(textarea);
	 
	

		let select = document.createElement("select");
		select.innerHTML =`
			<option value="">-mark-</option>
			<option value="correct">Correct</option>
			<option value="incorrect">Wrong</option>
		`;
		select.classList.add("marking");
		node.append(select);
		select.onchange = e=>{
			let v = select.value;
			
			node.classList.remove("correct");
			node.classList.remove("incorrect");
			
			stdWork.marks[index] = v;
			if (v) node.classList.add(v);
		}
		
		select.value = stdWork.marks[index];
		const event = new Event('change', { bubbles: true }); 
		select.dispatchEvent(event);
		node.classList.add("std-"+key(stdWork.studentId), "index-"+index);
		node.style.position = "relative";


    return node;
  }

  static value(node) {
	// alert(node.querySelector('textarea').value);
    return  " "; //node.querySelector('textarea').value;
  }

  /*static create(value) {
    const node = super.create();

    const area = document.createElement('textarea');

    area.className = 'ql-multiline-inner';
    area.value = typeof value === 'string' ? value : '';
    area.placeholder = 'Type here...';
    area.rows = 3;

    [
        'keydown',
        'keyup',
        'keypress',
        'mousedown',
        'mouseup',
        'click'
    ].forEach(evt => {
        area.addEventListener(evt, e => {
			
            e.stopPropagation();
			area.click();
        });
    });

    area.addEventListener('input', () => {
        area.style.height = 'auto';
        area.style.height = area.scrollHeight + 'px';
    });

    node.setAttribute('contenteditable', false);

    node.appendChild(area);

    return node;
}*/

  
 

  
}

Quill.register(MultilineEmbed);



class VideoBlot extends BlockEmbed {
  static blotName = 'video';
  static tagName = 'iframe';

  static create(url) {
    let node = super.create();
    node.setAttribute('src', url);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    return node;
  }
  
  static formats(node) {
    let format = {};
    if (node.hasAttribute('height')) {
      format.height = node.getAttribute('height');
    }
    if (node.hasAttribute('width')) {
      format.width = node.getAttribute('width');
    }
    return format;
  }
  
  static value(node) {
    return node.getAttribute('src');
  }
  
  format(name, value) {
    if (name === 'height' || name === 'width') {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name, value);
      }
    } else {
      super.format(name, value);
    }
  }
}

Quill.register(VideoBlot);



class Image extends Embed {
  static blotName = 'image';
  static tagName = 'div';
   static create(value) {
	   let node = super.create();
		let image = document.createElement("img");
		node.append(image);
		
		image.src = value.src?? value;
		value = value.src? value : {src: value, height: image.height, width: image.width};
		node.dataset.src = value.src;
	
		node.dataset.height = value.height;
		node.dataset.width = value.width;
		node.style.height = value.height + "px";
		node.style.width = value.width + "px";
		node.className = "image-container";
		let resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
			// Get the new width and height from contentRect
			const { width, height } = entry.contentRect;
			node.dataset.height = height;
			node.dataset.width = width;
			console.log(`Element size changed to: ${width}px x ${height}px`);
		  }
		});
		resizeObserver.observe(node);
		return node;
  }

  static value(node) {
    return node.dataset;
  }

}

Quill.register(Image);




const QuillClipboard = Quill.import('modules/clipboard');

class CustomClipboard extends QuillClipboard {
  onPaste(event) {
    // If the user is pasting text specifically inside our custom textarea, ignore Quill
    if (event.target.tagName === 'TEXTAREA' || event.target.tagName === 'INPUT') {
      return; 
    }
    super.onPaste(event);
  }
}


function key(token){
      return token.replaceAll(" ","").replaceAll("/", "").replaceAll(",", "").trim();
    }
