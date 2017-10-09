
/**
 * Find scroll parents
 * @param {HTMLElement} node
 * @return {Array.<HTMLElement>} 
 */
export function scrollParent(node) {
    const overflowRegex = /(scroll|auto)/;
    let scrolls = [];
    let parent = node;

    while (parent && parent.tagName !== 'BODY') {
        const style = window.getComputedStyle(parent);
        const overflow = style.overflow;
        const overflowX = style['overflow-x'];
        const overflowY = style['overflow-y'];

        if (overflowRegex.test(overflow + overflowX + overflowY)) {
            scrolls.push(parent);
        }

        parent = parent.parentNode;
    }

    return scrolls;
};

/**
 * HTMLElement.contains
 * @param {HTMLElement} parent
 * @param {HTMLElement} node
 * @return {Boolean} 
 */
export function contains(parent, node) {
    while (node && parent) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
};

