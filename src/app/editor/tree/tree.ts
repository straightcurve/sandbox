import TreeNode from "./node/tree-node";

export default class Tree<T> {
    private _root: TreeNode<T>;

    constructor(root?: TreeNode<T>) {
        this._root = root ?? new TreeNode<T>();
    }

    public get root(): TreeNode<T> {
        return this._root;
    }

    public get flat(): Array<TreeNode<T>> {
        return this.recFlatten(this._root);
    }

    private recFlatten(parent: TreeNode<T>) {
        let result = [];
        if (parent.collapsed) return result;

        for (let c = 0; c < parent.children.length; c++) {
            result.push(parent.children[c]);
            result = result.concat(this.recFlatten(parent.children[c]));
        }

        return result;
    }
}
