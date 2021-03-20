export default interface Node {
    childNodes: Node[];
    collapsed: boolean;
    
    canNavigateToChildNodes(): boolean;
    getChild: (index: number) => Node;
}
