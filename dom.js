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
                textAreaObject.value += indent + nodeObject.nodeName + ': \\n \n';
            } else {
                textAreaObject.value += indent + nodeObject.nodeName + ': ' + nodeObject.nodeValue.trim().slice(0, 5) + '...\n';
            }
        }

        if (nodeObject.firstChild != null) {
            recursiveAdvancedWalk(textAreaObject, treeWalkerObject, "|   " + indent);
            treeWalkerObject.parentNode();
        }
        nodeObject = treeWalkerObject.nextSibling();
    }
}

function advancedWalk() {
    let rootNode = document.documentElement;
    let textAreaObject = document.getElementById('advanced-walk-output');
    let treeWalkerObject = document.createTreeWalker(rootNode, NodeFilter.SHOW_ALL);
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
    el.dataset.cool = 'true';       // data-cool="true"
    el.dataset.coolFactor = '9000'; //data-cool-factor="9000"

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

function remove() {
    document.body.removeChild(document.body.lastChild);
}

window.addEventListener('DOMContentLoaded', init);