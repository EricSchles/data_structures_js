/**
 * Append element to head or body.
 *
 * @param {Node} elem - Appended element.
 * @param {Boolean} [bottom=false] Append to body.
 */
module.append = function(elem, bottom) {
    var tag = bottom ? 'body' : 'head';

    (document[tag] || document.getElementsByTagName(tag)[0]).appendChild(elem);
};
