export default interface Node {
    childNodes: Node[];
    
    canNavigateToChildNodes(): boolean;
    getChild: (index: number) => Node;
}
