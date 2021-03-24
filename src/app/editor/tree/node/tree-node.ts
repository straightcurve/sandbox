
export default class TreeNode<T> {
    private _data: T | null;
    private _children: Array<TreeNode<T>>;
    private _parent: TreeNode<T> | null;
    public collapsed: boolean;
    public focused: boolean;

    constructor(options?: {
        children?: Array<TreeNode<T>>;
        data?: T;
        parent?: TreeNode<T>;
        collapsed?: boolean;
    }) {
        this._children = options?.children ?? [];
        this._data = options?.data ?? null;
        this._parent = options?.parent ?? null;
        this.collapsed = options?.collapsed ?? true; 

        this._children.forEach((c) => (c.parent = this));
    }

    public get data(): T {
        return this._data;
    }

    public get children(): Array<TreeNode<T>> {
        return this._children;
    }

    public get parent(): TreeNode<T> {
        return this._parent;
    }

    public set parent(value: TreeNode<T>) {
        this._parent = value;
    }

    public get depth(): number {
        let depth = 0;

        let parent = this._parent;
        while (parent !== null) {
            depth++;
            parent = parent.parent;
        }

        return depth;
    }

    public appendChild(node: TreeNode<T>) {
        this._children.push(node);
    }

    public canNavigateToChildNodes(): boolean {
        return !this.collapsed;
    }

    public getChild(index: number): TreeNode<T> {
        return this.children[index];
    }
}
