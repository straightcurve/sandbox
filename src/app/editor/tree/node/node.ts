export default interface Node {
    childNodes: Node[];

    getChild: (index: number) => Node;
}
