import Node from "../node/node";

export default function findNodeAtDepth(
    root: Node,
    stack: number[],
    depth: number = -1
) {
    if (stack.length === 0) return null;
    if (depth > stack.length) return null;
    if (stack.length > root.childNodes.length) return null;

    if (stack.length === 1) return root.getChild(stack[0]);
    if (depth === -1) depth = stack.length;

    let node = root;
    let rev = stack.reverse();
    while (depth--) node = node.getChild(rev[depth]);

    return node;
}
