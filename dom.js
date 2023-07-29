/* dom.js */
function init() {
    let element = document.getElementById('walkBtn');
    element.addEventListener('click', function () {
        walk();
    });

    element = document.getElementById('modifyBtn');
    element.addEventListener('click', function () {
        modify();
    });

    element = document.getElementById('addBtn');
    element.addEventListener('click', function () {
        add();
    });

    element = document.getElementById('removeBtn');
    element.addEventListener('click', function () {
        remove();
    });

    element = document.getElementById('advanced-walk');
    element.addEventListener('click', function () {
        advancedWalk();
    });

    element = document.getElementById('advanced-modify');
    element.addEventListener('click', function () {
        advancedModify();
    });

    element = document.getElementById('add-element-button');
    element.addEventListener('click', function () {
        addElement();
    });
}

function walk() {
    let el;
    let textAreaObject = document.getElementById('walk-output');

    el = document.getElementById('p1');
    textAreaObject.value += showNode(el) + '\n\n';

    el = el.firstChild;
    textAreaObject.value += showNode(el) + '\n\n';

    el = el.nextSibling;
    textAreaObject.value += showNode(el) + '\n\n';

    el = el.lastChild;
    textAreaObject.value += showNode(el) + '\n\n';

    el = el.parentNode.parentNode.parentNode;
    textAreaObject.value += showNode(el) + '\n\n';

    el = el.querySelector('section > *');
    textAreaObject.value += showNode(el);
}

function showNode(el) {
    let nodeType = el.nodeType;
    let nodeName = el.nodeName;
    let nodeValue = el.nodeValue;

    return `Node type: ${nodeType}\nNode name: ${nodeName}\nNode value: ${nodeValue}`;
}

function recursiveAdvancedWalk(textAreaObject, treeWalkerObject, indent) {
    let nodeObject = treeWalkerObject.firstChild();

    while (nodeObject != null) {

        if (nodeObject.nodeType === Node.ELEMENT_NODE) {
            textAreaObject.value += indent + nodeObject.nodeName + '\n';
        } else {
            let textContent = nodeObject.nodeValue.trim();
            if (textContent === "" && nodeObject.nodeValue.includes("\n")) {
                textAreaObject.value += indent + nodeObject.nodeName +
                    ': \\n \n';
            } else {
                textAreaObject.value += indent + nodeObject.nodeName + ': ' +
                    nodeObject.nodeValue.trim().slice(0, 5) + '...\n';
            }
        }

        if (nodeObject.firstChild != null) {
            recursiveAdvancedWalk(textAreaObject, treeWalkerObject, "|   " +
                indent);
            treeWalkerObject.parentNode();
        }
        nodeObject = treeWalkerObject.nextSibling();
    }
}

function advancedWalk() {
    let rootNode = document.documentElement;
    let textAreaObject = document.getElementById('advanced-walk-output');
    let treeWalkerObject = document.createTreeWalker(rootNode, NodeFilter
        .SHOW_ALL);
    textAreaObject.value = '';
    textAreaObject.value += rootNode.nodeName + '\n';
    recursiveAdvancedWalk(textAreaObject, treeWalkerObject, '|-- ');
}

function modify() {
    let el = document.getElementById('p1');

    // You can do all the properties one by one if you know them in HTML
    el.title = 'I was changed by JS';

    // you can update the style as a string
    // el.style = 'color: blue; font-size: 1em;';

    // you also may prefer to update on the CSS object.  This is the same as above
    // el.style.color = 'blue';
    // el.style.fontSize = '1em';
    // be careful doing many styles bit by bit it isn't efficent, might be easier just to set a class

    // you can also update the class list
    el.classList.add('fancy');

    // you can also update the dataset which change data-* attributes
    el.dataset.cool = 'true'; // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

}

function advancedModify() {
    const maxInt = 7;
    const minInt = 1;
    let mainHeadingElement = document.querySelector('h1');
    let randomNumber = Math.floor(Math.random() * (maxInt - minInt) + minInt);
    mainHeadingElement.innerText = `DOM Manipulation is Fun!`;
    let style = getComputedStyle(document.documentElement);
    let color = style.getPropertyValue(`--darkcolor${randomNumber}`);
    mainHeadingElement.style.color = color;
    let paragraphOneElement = document.getElementById('p1');
    paragraphOneElement.classList.toggle('shmancy');

}

function add() {

    let p, em, txt1, txt2, txt3;

    // first we do things the long old-fashioned standard DOM way
    p = document.createElement('p'); // <p></p>
    em = document.createElement('em'); // <em></em>
    txt1 = document.createTextNode('This is a '); // "This is a"
    txt2 = document.createTextNode('test'); // "test"
    txt3 = document.createTextNode(' of the DOM'); // " of the DOM"

    p.appendChild(txt1); // <p>This is a</p>
    em.appendChild(txt2); // <em>test</em>
    p.appendChild(em); // <p>This is a<em>test</em></p>
    p.appendChild(txt3); // <p>This is a<em>test</em> of the DOM</p>

    // go an insert this new copy below the old one
    let oldP = document.getElementById('p1');
    oldP.parentNode.insertBefore(p, oldP.nextSibling);

    // Alternative method using innerHTML and insertAdjacentHTML
    // let oldP = document.getElementById('p1');
    // oldP.insertAdjacentHTML('afterend', '<p>This is a<em>test</em> of the DOM</p>');
    // clearly short hands are pretty easy!
}

function isValidCustomTag(tagName) {
    // A custom element tag must contain a hyphen and must not start with a number
    return tagName.includes('-') && !/^[0-9]/.test(tagName);
}

function addElement() {
    let elementType = document.getElementById('element-select');
    let elementText = document.getElementById('element-text');
    let outputSection = document.getElementById('select-output');
    let newElement;
    let textNode;

    if (elementType.value === '1' && (elementText.value === '' || elementText.value == 'New Comment' || elementText.value == 'New Element')) {
        elementText.value = 'New Text Node';
    } else if (elementType.value === '2' && (elementText.value === '' || elementText.value == 'New Text Node' || elementText.value == 'New Element')) {
        elementText.value = 'New Comment';
    } else if (elementType.value === '3' && (elementText.value === '' || elementText.value == 'New Text Node' || elementText.value == 'New Comment')) {
        elementText.value = 'New Element';
    }

    switch (elementType.value) {
        case '1':
            newElement = document.createTextNode(elementText.value + ": " + new Date().toLocaleString() + ' -- ');
            break;
        case '2':
            newElement = document.createComment(elementText.value + ": " + new Date().toLocaleString());
            break;
        case '3':
            let validTags = [
                "a", "abbr", "address", "area", "article", "aside", "audio", "b", "base",
                "bdi", "bdo", "blockquote", "body", "br", "button", "canvas", "caption",
                "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details",
                "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption",
                "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "head",
                "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd",
                "label", "legend", "li", "link", "main", "map", "mark", "menu", "meta", "meter",
                "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p",
                "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp",
                "script", "search", "section", "select", "small", "source", "span", "strong", "style",
                "sub", "summary", "sup", "svg", "table", "tbody", "td", "template", "textarea",
                "tfoot", "th", "thead", "time", "title", "tr", "track", "u", "ul", "var",
                "video", "wbr"
            ];
            if (validTags.includes(elementText.value.toLowerCase()) || isValidCustomTag(elementText.value)) {
                newElement = document.createElement(elementText.value); // create a new element with the specified tag name
                textNode = document.createTextNode("New Element: " + new Date().toLocaleString());
                newElement.appendChild(textNode); // add the text to the new element
            } else {
                alert("Invalid HTML tag. Please enter a valid tag name.");
                return;
            }
            break;
        default:
            return;
    }
    outputSection.appendChild(newElement);
    elementText.value = '';
}

function remove() {
    document.body.removeChild(document.body.lastChild);
}

window.addEventListener('DOMContentLoaded', init);