import { diff_match_patch } from "../../vendor/google/diff.js";

export default function diff(v1: string, v2: string) {
    let v1tree = tree(v1);
    let v2tree = tree(v2);

    let min = Math.min(
        v1tree.root.children.length,
        v2tree.root.children.length
    );
    let e = -1;

    let changes: any[] = [];

    return diff_tree(v1tree.root, v2tree.root);

    while (e++ < min) {
        if (v1tree.root.children[e].type !== v2tree.root.children[e].type) {
            changes.push([-1, v1tree.root.children[e]]);
            continue;
        }

        let dmp = new diff_match_patch();
        let result = dmp.diff_main(
            v1tree.root.children[e].content.trim(),
            v2tree.root.children[e].content.trim()
        );
        dmp.diff_cleanupSemantic(result);

        if (result.length > 1) changes.push();
    }
}

export function diff_tree(v1: Element, v2: Element) {
    let v1count = get_child_count(v1);
    let v2count = get_child_count(v2);

    // let subtree = find_subtree(v1count, v2count);

}

export function get_child_count(elem: Element, list: any[] = []) {
    list.push(elem.children.length);

    let child_list = [];
    elem.children.forEach((c) => {
        get_child_count(c, child_list);
    });
    list.push(child_list);

    return list;
}

export function tree(str: string) {
    /**
     * <p>hello world</p>
     */

    str = `<div>${str}</div>`;
    let root: Element = {
        type: "div",
        content: "",
        children: [],
    };
    let stack: Element[] = [];
    let i = 0;
    while (i < str.length) {
        if (parse("<p>", str, i)) {
            i += 3;
            let elem = {
                type: "p",
                content: "",
                children: [],
            };
            if (stack.length === 0) root.children.push(elem);
            else stack[stack.length - 1].children.push(elem);
            stack.push(elem);
        } else if (parse("</p>", str, i)) {
            i += 4;
            stack.pop();
        } else if (parse("<table>", str, i)) {
            i += 7;
            let elem = {
                type: "table",
                content: "",
                children: [],
            };
            if (stack.length === 0) root.children.push(elem);
            else stack[stack.length - 1].children.push(elem);
            stack.push(elem);
        } else if (parse("</table>", str, i)) {
            i += 8;
            stack.pop();
        } else if (parse("<tr>", str, i)) {
            i += 4;
            let elem = {
                type: "tr",
                content: "",
                children: [],
            };
            if (stack.length === 0) root.children.push(elem);
            else stack[stack.length - 1].children.push(elem);
            stack.push(elem);
        } else if (parse("</tr>", str, i)) {
            i += 5;
            stack.pop();
        } else if (parse("<td>", str, i)) {
            i += 4;
            let elem = {
                type: "td",
                content: "",
                children: [],
            };
            if (stack.length === 0) root.children.push(elem);
            else stack[stack.length - 1].children.push(elem);
            stack.push(elem);
        } else if (parse("</td>", str, i)) {
            i += 5;
            stack.pop();
        } else {
            if (stack.length > 0) stack[stack.length - 1].content += str[i];

            i++;
        }
    }

    return {
        root,
        has_error: stack.length > 0,
    };

    function parse(pattern: string, str: string, start: number = 0) {
        let len = -1;

        while (++len < pattern.length)
            if (pattern[len] !== str[len + start]) return false;

        return true;
    }
}

interface Element {
    type: string;
    content: string;
    children: Element[];
}
