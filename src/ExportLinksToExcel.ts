/// <reference path="../lib/print.d.ts" />

interface ICustomLinkPrimitiveParams {
    toAnchor?: boolean; // default:false. If true, create a link to an anchor inside the document
    asAnchor?: boolean; // default:false. If true, creates an anchor (e.g. id="REQ-12" )
    titleInLink?: boolean; // default:false. If true include the title of the link
    titleAfterLink?: boolean; // default:false. If true add after the link
    keepLinkInXlsx?: boolean; // default:false If true then the links will be clickable in Excel. This only works
    // with single links since Excel can only have one link per cell
    class?: string; //  default:"link". class for span around link
}

class CustomLinkPrimitive implements IPrintFunction {
    static uid = "link";

    getGroup() {
        return "Item";
    }
    getHelp() {
        return `<h1>Creates a hyperlink to an item</h1>
<p>The link can point to an anchor in the document or back to the server. Optionally it can include the item title</p>
<p>Options</p>
<pre>
{
    toAnchor?:boolean // default:false. If true, create a link to an anchor inside the document
    asAnchor?:boolean // default:false. If true, creates an anchor (e.g. id="REQ-12" )
    titleInLink?:boolean // default:false. If true include the title of the link
    titleAfterLink?:boolean // default:false. If true add after the link
    keepLinkInXlsx?:boolean // default:false If true then the links will be clickable in Excel. This only works 
                            // with single links since Excel can only have one link per cell 

    class?:string //  default:"link". class for span around link
}
</pre>`;
    }
    getName() {
        return "Hyperlink to item";
    }
    private defaults: ICustomLinkPrimitiveParams = {
        titleAfterLink: false,
        titleInLink: false,
        toAnchor: false,
        asAnchor: false,
        keepLinkInXlsx: false,
        class: "link",
    };
    render(
        overwrites: IGlobalPrintFunctionParams,
        callerParams: ILinkPrimitiveParams,
        itemOrFolder: JQuery,
        _mf: JQuery,
        _itemMap: IStringJQueryMap,
        _possibleTargets: string[],
        _onError: (message: string) => void
    ) {
        const params = ml.JSON.clone({
            ...this.defaults,
            ...overwrites.customer[LinkPrimitive.uid],
            ...callerParams,
            ...overwrites.project[LinkPrimitive.uid],
            ...overwrites.section[LinkPrimitive.uid],
        });

        let linkName = itemOrFolder.attr("ref");
        let linkTarget = matrixBaseUrl + "/" + matrixSession.getProject() + "/" + linkName;

        let id: string = "";
        if (params.asAnchor) {
            id = `id="${linkName}"`;
        }

        if (params.toAnchor) {
            linkTarget = "#" + linkName;
        }

        let linkTitle = " " + itemOrFolder.attr("title");

        if (params.titleInLink) {
            linkName += linkTitle;
        }
        if (overwrites.outputFormat === "xlsx" && !params.keepLinkInXlsx) {
            return `<span class="${params.class}">${linkName}${
                params.titleAfterLink ? linkTitle : ""
            }</span>`;
        } else {
            return `<span class="${params.class}"><a ${id} href="${linkTarget}">${linkName}</a>${
                params.titleAfterLink ? linkTitle : ""
            }</span>`;
        }
    }

    editParams(params: IIndentParams, onUpdate: (newParams: IIndentParams) => void) {
        let ui = $("<div>");

        let org = <IIndentParams>ml.JSON.clone({ ...this.defaults, ...params });

        ml.UI.addCheckbox(ui, "Create a link to an anchor (see below)", org, "toAnchor", () => {
            onUpdate(org);
        });
        ml.UI.addCheckbox(ui, "Create an anchor (for in-document links)", org, "asAnchor", () => {
            onUpdate(org);
        });
        ml.UI.addCheckbox(ui, "Add title after links", org, "titleAfterLink", () => {
            onUpdate(org);
        });
        ml.UI.addCheckbox(ui, "Include title in link", org, "titleInLink", () => {
            onUpdate(org);
        });

        return ui;
    }
}

PrintProcessor.addFunction(LinkPrimitive.uid, new CustomLinkPrimitive());
