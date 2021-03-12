import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from "@angular/core";
import $ from "cash-dom";
import { diffLines } from "diff";
import { diff_match_patch } from "../../vendor/google/diff.js";
import { EditorService } from "../shared/services/editor/editor.service";
import { tree } from "./diff";

@Component({
    selector: "app-diff-merge",
    templateUrl: "./diff-merge.component.html",
    styleUrls: ["./diff-merge.component.scss"],
})
export class DiffMergeComponent implements OnInit, AfterViewInit {
    public v1: string;
    public v2: string;
    public v3: string;
    public content: string = "";

    @ViewChild("lol") elem: HTMLDivElement;
    v1editor: any;
    v2editor: any;
    v3editor: any;
    diff_v2: string;
    diff_v3: string;

    constructor(private editorService: EditorService, private zone: NgZone) {}

    ngOnInit(): void {
        this.v1 = `
this is the original version.
<img src="../../assets/icons/favicon.512x512.png" />
<video src="blob:http://localhost:4200/fcb69eda-b2b4-47df-b312-d0235e45c023" style="width: 600px;" controls="" class="fr-draggable">Your browser does not support HTML5 video.</video>
some course data goes here.

how are you today?
`;
        this.v2 = `
this is the copied course.

<br />
<table style="border:1px solid black;">
<tr>
<th>Table Header</th><th>Table Header</th>
</tr>
<tr>
<td>Table cell 1</td><td>Table cell 2</td>
</tr>
<tr>
<td>Table cell 5</td><td>Table cell 6</td>
</tr>
<tr>
<td>Table cell 3</td><td>Table cell 4</td>
</tr>
</table>

some course data goes here.
data is random.

hey, i wasn't the one who did this, okay?

`;
        this.v3 = `
this is the updated original version.

<br />
<table style="border:1px solid black;">
<tr>
<th>Table Header</th><th>Table Header</th>
</tr>
<tr>
<td>Table cell 1</td><td>Table cell 2</td>
</tr>
<tr>
<td>Table cell 3</td><td>Table cell 4</td>
</tr>
</table>


some COURSE data goes here.

and some other data goes here.

how are we today?
`;

        console.log("clown", "clowner", diff_word("clown", "clowner"));
        console.log("clowner", "clown", diff_word("clowner", "clown"));
        console.log("circus", "clown", diff_word("circus", "clown"));
        console.log("circ", "clown", diff_word("circ", "clown"));

        let dmp = new diff_match_patch();
        let result = dmp.diff_main(this.v1, this.v2);
        dmp.diff_cleanupSemantic(result);
        // this.content = noob_diff(this.v1, this.v2);

        let self = this;

        this.v1editor = this.editorService.create_("#v1", {
            heightMin: "25vh",
            events: {
                contentChanged: function() {
                    // self.v3 = dmp.patch_toText(dmp.patch_make(self.v1, self.v3));
                    // self.v1 = this.html.get();
                }
            },
            readOnly: true,
        }, () => {
            this.v1editor.html.set(this.v1);
        });
        this.v2editor = this.editorService.create_("#v2", {
            heightMin: "25vh",
            events: {
                contentChanged: function() {
                    self.v2 = this.html.get();
                    self.diff_v2 = diff(self.v3, self.v2);
                    // self.v2 = this.html.get();
                    // self.diff_v2 = diff(self.v3, self.v2);
                    // self.v2editor.html.set(self.diff_v2);
                }
            },
        }, () => {
            this.diff_v2 = diff(this.v3, this.v2);
            // this.v2editor.html.set(this.diff_v2);
        });
        this.v3editor = this.editorService.create_("#v3", {
            heightMin: "25vh",
            readOnly: true,
        }, () => {
            this.diff_v3 = diff(this.v1, this.v3);
            this.v3editor.html.set(this.diff_v2);
        });

        // self.v2 = createTwoFilesPatch("v1", "v2", this.v1, this.v2);
        // self.v3 = createTwoFilesPatch("v1", "v3", this.v1, this.v3);



        // let newest = createPatch("v2", this.v3, this.v2);
        // this.content = applyPatch(newest, v2);
        // self.v2 = dmp.patch_toText(dmp.patch_make(self.v1, self.v2));
        // self.v3 = dmp.patch_toText(dmp.patch_make(self.v1, self.v3));

        // this.content = dmp.patch_apply(dmp.patch_fromText(this.v2), v2);

        // console.log(tree("<p>hi <p> there </p></p>"));
        console.log(diffLines("<p>hi clown</p>", "<p>hi clown</p>"));
    }

    applyChanges() {
        let html = $(this.diff_v2);
        let out = "";
        html = html.map((c, elem) => {
            let cash = $(elem);
            if (cash.hasClass("bg-red-400"))
                return null;
            return elem;
        }).filter((e, elem) => {
            return elem !== null && elem.textContent !== "\n";
        }).each((e, elem) => {
            out += elem.outerHTML;
        });
        console.log(out);
        this.v1editor.html.set(out);
        $("#v1").removeClass("hidden");
    }

    ngAfterViewInit() {
        // this.elem.innerHTML = this.content;
    }
}

function diff (old: string, _new: string) {
    let diff = diffLines(old, _new);

    holy_shit();

    let out = "";
    for (let i = 0; i < diff.length; i++) {
        if (diff[i].value.indexOf("<table") !== -1) {
            i = diff_table(i);
        } else {
            if (diff[i].added)
                out += `<div class="bg-green-400">${diff[i].value}</div>`;
            else if (diff[i].removed)
                out += `<div class="bg-red-400">${diff[i].value}</div>`;
            else
                out += `${diff[i].value}`;
        }
    }

    function holy_shit() {
        let x = tree(old);
        let y = tree(_new);
        let z = [];
        let a = new DOMParser().parseFromString(old, "text/html");
        console.log(a.body.outerHTML);
        debugger;
        
        for (let i = 0; i < diff.length; i++) {
            if (diff[i].added) {
                out += `<div class="bg-green-400">${diff[i].value}</div>`;
            }
            else if (diff[i].removed)
                out += `<div class="bg-red-400">${diff[i].value}</div>`;
            else
                out += `${diff[i].value}`;
        }
    }

    function diff_table(start: number) {
        let ar_table = diff[start].added || diff[start].removed;
        if (diff[start].added)
            out += `<div class="bg-green-400">${diff[start].value}`;
        else if (diff[start].removed)
            out += `<div class="bg-red-400">${diff[start].value}`;
        else
            out += `${diff[start].value}`;
        start++;

        while (start < diff.length && diff[start].value.indexOf("</table>") === -1) {
            if (diff[start].added)
                out += `<div class="bg-green-400">${diff[start].value}</div>`;
            else if (diff[start].removed)
                out += `<div class="bg-red-400">${diff[start].value}</div>`;
            else
                out += `${diff[start].value}`;
            start++;
        }

        debugger;
        if (ar_table)
            out += `</div>`;

        return ++start;
    }

    return out;
}

function diff_word(v1: string, v2: string): any {
    if (v1.length > v2.length) return [null, -1];

    let x = 0;
    while (x < v1.length && v1.charAt(x) === v2.charAt(x)) x++;

    return [v2.slice(0, x), x];
}

function noob_diff(v1: string, v2: string): any {
    const begin_p = `bzzz`;
    const end_p = `ezzz`;
    v1 = v1.replace(/<p>/g, begin_p).replace(/<\/p>/g, end_p);
    v2 = v2.replace(/<p>/g, begin_p).replace(/<\/p>/g, end_p);

    let dmp = new diff_match_patch();
    let result = dmp.diff_main(v1.trim(), v2.trim());
    dmp.diff_cleanupSemantic(result);

    let actual_result = "";

    while (result.length > 0) {
        let x = noob_compute(result);
        result = result.slice(x[1]);
        actual_result += x[0];
    }

    return actual_result.replace(/bzzz/g, "<p>").replace(/ezzz/g, "</p>");

    function noob_compute(diffs) {
        let v1 = "";
        let v2 = "";
        let len = 0;
        let index = -1;

        do {
            let __uhh = diffs[len][1].trimLeft();
            index = __uhh.indexOf("\n");
            debugger
            len++;
        } while (len < diffs.length && index === -1);

        // while (diffs[len][1].indexOf("\n") === -1) {
        //     len++;
        //     continue;
        // }

        let until = diffs.slice(0, len);
        until.forEach((r) => {
            if (r[0] === 0) {
                v1 += r[1];
                v2 += r[1];
            } else if (r[0] === -1) {
                v1 += r[1];
            } else {
                v2 += r[1];
            }
        });

        return [
            [begin_change(), v1, delimiter(), v2, end_change()].join("\n"),
            len + 1,
        ];
    }
}

function begin_change() {
    let result = "";

    let count = 7;
    while (count--) result += "<";

    return `${result}${delimiter()}${delimiter()}`;
}

function end_change() {
    let result = "";

    let count = 7;
    while (count--) result += ">";

    return `${delimiter()}${result}${delimiter()}`;
}

function delimiter() {
    return `<br class="change-delimiter" />`;
}
