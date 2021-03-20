import Node from "./node/node";
import findNodeAtDepth from "./utils/find-node-at-depth";

export default class Tree implements Node {
    public previous() {
        if (
            this.selected === null ||
            (this.selected.childNodes.length > 0 &&
                this.selected.canNavigateToChildNodes())
        ) {
            this.stack.push(this.childNodes.length - 1);
            return (this.selected = findNodeAtDepth(this, this.stack));
        }

        let parent = findNodeAtDepth(this, this.stack, this.stack.length - 2);
        if (
            this.stack.length > 1 &&
            this.stack[this.stack.length - 1] === parent.childNodes.length - 1
        ) {
            this.stack.pop();
        }

        --this.stack[this.stack.length - 1];

        return (this.selected = findNodeAtDepth(this, this.stack));
    }

    public next() {
        if (
            this.selected === null ||
            (this.selected.childNodes.length > 0 &&
                this.selected.canNavigateToChildNodes())
        ) {
            this.stack.push(0);
            return (this.selected = findNodeAtDepth(this, this.stack));
        }

        let parent = findNodeAtDepth(this, this.stack, this.stack.length - 2);
        if (
            this.stack.length > 1 &&
            this.stack[this.stack.length - 1] === parent.childNodes.length - 1
        ) {
            this.stack.pop();
        }

        ++this.stack[this.stack.length - 1];

        return (this.selected = findNodeAtDepth(this, this.stack));
    }

    public getChild(index: number): Node {
        return this.childNodes[index];
    }

    public selected: Node | null = null;
    public collapsed: boolean = false;

    private stack: number[] = [];

    constructor(public childNodes: Node[] = []) {}

    public canNavigateToChildNodes(): boolean {
        return true;
    }
}
