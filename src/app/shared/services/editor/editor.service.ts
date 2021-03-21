import { Injectable } from "@angular/core";
import $ from "cash-dom";
import FroalaEditor from "froala-editor";
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/code_beautifier.min.js';
import 'froala-editor/js/plugins/code_view.min.js';
import 'froala-editor/js/plugins/image.min.js';
import 'froala-editor/js/plugins/table.min.js';
import 'froala-editor/js/plugins/video.min.js';


@Injectable({
    providedIn: "root",
})
export class EditorService {
    constructor() {}

    public create(
        selector: string,
        options = null,
        onInitialized = null
    ) {
        return new FroalaEditor(selector, options, (editor) => {
            const toolbar = document.getElementById("content").children.item(0);
            toolbar.classList.add("bg-selection");
            toolbar.children.item(4).classList.add("invisible");
            //@ts-ignore
            toolbar.children.item(4).style.setProperty("height", "0");

            const tools = $(toolbar).find("path");
            for (let t in tools) {
                let num = Number.parseInt(t);
                if (isNaN(num)) continue;

                tools[num].style.setProperty("fill", "var(--color-low)");
            }

            const content = document.getElementById("content").children.item(2);

            content.children.item(0).classList.add("bg-container");
            content.children.item(0).classList.add("bg-opacity-80");
            content.children.item(0).classList.add("text-selection");
            content.children.item(0).classList.add("placeholder-high");
            content.children.item(0).classList.add("text-xl");
            //@ts-ignore
            content.children.item(0).style.setProperty("font-size", "1.25rem");
            //@ts-ignore
            content.children.item(0).style.setProperty("font-family", "NieR");

            const footer = document.getElementById("content").children.item(3);
            footer.classList.add("bg-selection");

            const powered_by = document
                .getElementById("fr-logo")
                .children.item(0);
            //@ts-ignore
            powered_by.style.setProperty("color", "var(--color-low)");
            //@ts-ignore
            powered_by.style.setProperty("font-family", "NieR");

            const powered_by_froala_svg = footer.children
                .item(0)
                .children.item(1);
            //@ts-ignore
            powered_by_froala_svg.style.setProperty("fill", "var(--color-low)");
            //@ts-ignore
            powered_by_froala_svg.style.setProperty("font-family", "NieR");

            for (let c = 2; c < powered_by_froala_svg.children.length; c++) {
                const path = powered_by_froala_svg.children[c];
                path.classList.remove("fr-logo");
            }

            const link = $("a#fr-logo");
            link.attr("rel", "noreferrer");

            if (typeof onInitialized === "function") onInitialized(editor);
        });
    }

    public create_(
        selector: string,
        options = null,
        onInitialized = null
    ) {
        if (options === null)
            options = {};

        options.apiKey = "Ja2A4wC2C3D1A1H4H4nDc2YRTYKg1Dc2a1JVVG1VJKKYLMPvA1E1I1B2B8C7D6E1E5A4==";
        options.attribution = false;

        options.videoResponsive = true;
        if (!options.readOnly)
            options.toolbarButtons = {
                moreText: {
                    buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
                    buttonsVisible: 2,
                },
                moreParagraph: {
                    buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
                    buttonsVisible: 2,
                },
                moreRich: {
                    buttons: [ 
                        'insertVideo', 
                        'insertTable', 
                        'insertLink', 
                        'insertImage', 
                        'insertHR',
                        'fileBrowserButton', 
                        'emoticons', 
                        'fontAwesome', 
                        'specialCharacters', 
                        'embedly',
                        'wirisEditor',
                        'wirisChemistry'
                    ],
                    buttonsVisible: 4,
                },
            };
        else
            options.toolbarButtons = {};

        return new FroalaEditor(selector, options, (editor) => {
            if (typeof onInitialized === "function") onInitialized(editor);
        });
    }
}
