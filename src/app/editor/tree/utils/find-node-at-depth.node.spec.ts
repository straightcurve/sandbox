import { assert } from "chai";
import Node from "../node/node";
import findNodeAtDepth from "./find-node-at-depth";

describe("tree: find node at depth", () => {
    class TestNode implements Node {
        constructor(public childNodes: Node[] = []) {}
        
        canNavigateToChildNodes(): boolean {
            return true; 
        }

        getChild(index: number): Node {
            return this.childNodes[index];
        }
    }

    it("should return null if stack.length > nodes.length", () => {
        let root = new TestNode();

        let node = findNodeAtDepth(root, [0]);
        assert.isNull(node);
    });

    it("should return null if stack.length === 0", () => {
        let root = new TestNode();

        let node = findNodeAtDepth(root, []);
        assert.isNull(node);
    });

    it("should return null if depth > stack.length", () => {
        let root = new TestNode([new TestNode()]);

        let node = findNodeAtDepth(root, [0], 2);
        assert.isNull(node);
    });

    it("should return the node at depth 1 with specified index", () => {
        let root = new TestNode([
            new TestNode(),
            new TestNode(),
            new TestNode(),
            new TestNode(),
        ]);

        let node = findNodeAtDepth(root, [2]);
        assert.equal(node, root.getChild(2));
    });

    it("should return the node at depth 2 with specified index", () => {
        let root = new TestNode([
            new TestNode(),
            new TestNode([new TestNode(), new TestNode()]),
            new TestNode([new TestNode()]),
            new TestNode(),
        ]);

        let node = findNodeAtDepth(root, [1, 1]);
        assert.equal(node, root.getChild(1).getChild(1));
    });

    it("should return the node at the specified depth", () => {
        let root = new TestNode([
            new TestNode(),
            new TestNode([new TestNode(), new TestNode()]),
            new TestNode([new TestNode([new TestNode([new TestNode()])])]),
            new TestNode(),
        ]);

        let node = findNodeAtDepth(root, [2, 0, 0], 3);
        assert.equal(node, root.getChild(2).getChild(0).getChild(0));
    });
});
