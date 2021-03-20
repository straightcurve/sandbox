import { assert } from "chai";
import Node from "./node/node";
import Tree from "./tree";

describe("tree", () => {
    class TestNode implements Node {
        constructor(public childNodes: Node[] = []) {}

        public collapsed: boolean = true;

        canNavigateToChildNodes(): boolean {
            return !this.collapsed;
        }

        getChild(index: number): Node {
            return this.childNodes[index];
        }
    }

    it("selected node should be null by default", () => {
        let tree = new Tree([new TestNode()]);

        assert.isNull(tree.selected);
    });

    it("next should select the first node if there's no selected node", () => {
        let tree = new Tree([new TestNode()]);

        tree.next();

        assert.equal(tree.selected, tree.getChild(0));
    });

    it("next should select the next node in the list at the same depth if node is collapsed", () => {
        let tree = new Tree([new TestNode(), new TestNode([new TestNode()])]);

        tree.next();

        assert.equal(tree.selected, tree.getChild(0));

        tree.next();

        assert.equal(tree.selected, tree.getChild(1));
    });

    it("next should select the next node in the list at the same depth if node has no children", () => {
        let node = new TestNode();
        node.collapsed = false;

        let tree = new Tree([node, new TestNode([new TestNode()])]);

        tree.next();

        assert.equal(tree.selected, tree.getChild(0));

        tree.next();

        assert.equal(tree.selected, tree.getChild(1));
    });

    it("next should navigate to the first child node if navigation to child nodes is possible", () => {
        let node = new TestNode([new TestNode()]);
        node.collapsed = false;

        let tree = new Tree([node, new TestNode()]);

        tree.next();

        assert.equal(tree.selected, tree.getChild(0));

        tree.next();

        assert.equal(tree.selected, tree.getChild(0).getChild(0));
    });

    it("next should navigate to the next child node at the previous depth", () => {
        let node = new TestNode([new TestNode(), new TestNode()]);
        node.collapsed = false;

        let tree = new Tree([node, new TestNode()]);

        tree.next();
        assert.equal(tree.selected, tree.getChild(0));
        tree.next();
        assert.equal(tree.selected, tree.getChild(0).getChild(0));
        tree.next();
        assert.equal(tree.selected, tree.getChild(0).getChild(1));
        tree.next();
        assert.equal(tree.selected, tree.getChild(1));
    });

    it("previous should select the last node if there's no selected node", () => {
        let tree = new Tree([new TestNode(), new TestNode()]);

        tree.previous();

        assert.equal(tree.selected, tree.getChild(1));
    });

    it("previous should select the previous node in the list at the same depth if node is collapsed", () => {
        let tree = new Tree([new TestNode(), new TestNode([new TestNode()])]);

        tree.previous();

        assert.equal(tree.selected, tree.getChild(1));

        tree.previous();

        assert.equal(tree.selected, tree.getChild(0));
    });

    it("previous should select the previous node in the list at the same depth if node has no children", () => {
        let node = new TestNode();
        node.collapsed = false;

        let tree = new Tree([new TestNode([new TestNode()]), node]);

        tree.previous();

        assert.equal(tree.selected, tree.getChild(1));

        tree.previous();

        assert.equal(tree.selected, tree.getChild(0));
    });

    it("previous should navigate to the last child node if navigation to child nodes is possible", () => {
        let node = new TestNode([new TestNode(), new TestNode()]);
        node.collapsed = false;

        let tree = new Tree([new TestNode(), node]);

        tree.previous();

        assert.equal(tree.selected, tree.getChild(1).getChild(1));
    });

    it("previous should navigate to the previous child node at the previous depth", () => {
        let node = new TestNode([new TestNode(), new TestNode()]);
        node.collapsed = false;

        let tree = new Tree([new TestNode(), node]);

        tree.previous();
        assert.equal(tree.selected, tree.getChild(1).getChild(1));
        tree.previous();
        assert.equal(tree.selected, tree.getChild(1).getChild(0));
        tree.previous();
        assert.equal(tree.selected, tree.getChild(0));
    });
});
