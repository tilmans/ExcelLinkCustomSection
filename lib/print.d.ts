interface IPrintParamMacro extends IPrintMacro {
    param: string;
}
interface IPrintRenderedCell {
    rowspan: number;
    content: string;
    classes: string[];
    style: string;
}
interface IPrintRowContent {
    isFolderRow: boolean;
    rowBefore: string;
    rowAfter: string;
    cells: string[];
}
/************************************** Processor class  ********************************************/
declare class PrintProcessor implements IPrintProcessor {
    private onError;
    private possibleTargets;
    private mf;
    private itemMap;
    private functionDefaults;
    static itemIterators: IPrintIteratorMap;
    static labelIterators: IPrintIteratorMap;
    static fieldIterators: IPrintIteratorMap;
    static itemSorter: IPrintSorterMap;
    static functions: IPrintFunctionMap;
    static conditions: IConditionFunctionMap;
    private formatter;
    constructor();
    private stylesheets;
    /*******************************************************************************
     *
     *  Iterator Blocks
     *
     ***************************************************************************** */
    prepareProcessing(mf: JQuery, onError: (message: string) => void, format: string): void;
    processSection(formatter: IPrintCustomFormatter, section: ICustomSection, projectOverwrites: IPrintFunctionParamsOverwrites, selection: string[], possibleTargets: string[]): IProcessResult;
    getTableData(tableId: string, selection: string[]): string;
    /********************************************************************************
     *  Main Processing functions to handle items from the print project
     ********************************************************************************/
    private processItem;
    private processBlockFormatter;
    private processFieldsFormatter;
    private processTraceFormatter;
    private processListFormatter;
    private processTableFormatter;
    /********************************************************************************
    *  processing of "json" macros like {execute:"function", parameters:{...}}
    ********************************************************************************/
    private processMacros;
    private processPrintFormatterMacro;
    private processFunctionMacro;
    /********************************************************************************
    *  Helper for building tables
    ********************************************************************************/
    private mergeCells;
    private extractClassesFromTable;
    private addRows;
    private getSubTableCells;
    /********************************************************************************
    *  Misc helper
    ********************************************************************************/
    getCustomStylesheet(): string;
    private applyDepth;
    private hasMergeMacro;
    private addScriptInfo;
    private evaluateCondition;
    private enumeratePossibleTargets;
    private sortItems;
    /*********************************** manage formatters ************************************/
    static getFunctions(group: string): IPrintFunctionMap;
    static functionHasOptions(functionUid: string): boolean;
    static editFunctionOptions(currentValue: string, onUpdate: (newOptions: string) => void): void;
    static showOptionsEditor(fctName: string, currentValue: string, onUpdate: (newValue: string) => void): void;
    static openEditor(fct: IPrintBaseFunction, params: IAttributePrimitiveParams, onUpdate: (newParams: IAttributePrimitiveParams) => void): boolean;
    static editStyle(wrap: JQuery): void;
    private getItemFormatter;
    static addItemSorter(uid: string, sorter: IPrintSorter): void;
    static getItemSorters(): IPrintSorterMap;
    static getItemSorter(uid: string): IPrintSorter | null;
    static getItemSorterDropdown(): IDropdownOption[];
    static addItemIterator(uid: string, iterator: IPrintIterator): void;
    static getItemIterator(uid: string, quiet?: boolean): IPrintItemIterator | null;
    static getItemIteratorsDropdown(items: boolean, folders: boolean, allowNoIterator: boolean): IDropdownOption[];
    static addLabelIterator(uid: string, iterator: IPrintIterator): void;
    static getLabelIterator(uid: string): IPrintLabelIterator | null;
    static addFieldIterator(uid: string, iterator: IPrintIterator): void;
    static getFieldIterator(uid: string): IPrintFieldIterator | null;
    static addFunction(uid: string, fctn: IPrintFunction): void;
    static getFunction(uid: string): IPrintFunction | null;
    static addConditionFunction(uid: string, fctn: IConditionFunction): void;
    static getConditionFunction(uid: string): IConditionFunction | null;
    static getItemConditionDropdown(): IDropdownOption[];
    static getAllFunctions(): IPrintBaseFunctionMap;
    static getAllIterators(): IPrintBaseFunctionMap;
    static getJsonConfig(config: string, mf: JQuery): any;
    static getCdataAsJSON(node: Element): any;
    static getCdataAsText(node: Element): string;
    static getUserName(user: string, mf: JQuery, first: boolean, last: boolean, login: boolean, email: boolean): string;
    static getFieldAndLabelsIteratorsDropdown(): IDropdownOption[];
}
declare class GlobalPrintConfig implements IPrintConfig {
    getPrintProcessor(): IPrintProcessor;
    getFieldAndLabelsIteratorsDropdown(): IDropdownOption[];
    getItemIteratorsDropdown(items: boolean, folders: boolean, allowNoIterator: boolean): IDropdownOption[];
    getItemConditionDropdown(): IDropdownOption[];
    showOptionsEditor(fctName: string, currentValue: string, onUpdate: (newValue: string) => void): void;
    editFunctionOptions(currentValue: string, onUpdate: (newOptions: string) => void): void;
    editStyle(wrap: JQuery): void;
    functionHasOptions(functionUid: string): boolean;
    getFunctions(group: string): IPrintFunctionMap;
    getItemSorters(): IPrintSorterMap;
    getAllFunctions(): IPrintBaseFunctionMap;
    getAllIterators(): IPrintBaseFunctionMap;
}
declare class PrintUtilities {
    static isFolder(path: string): boolean;
}
interface IPrintFieldParams extends IPrintMacro {
    fieldInfo?: IPrintFieldInfo;
}
interface IPrintLabelParams extends IPrintMacro {
    label: IPrintLabelInfo;
}
interface IFieldHasContentParams extends IPrintMacroParams {
    fieldType?: string;
    fieldName?: string;
    match: string;
    negate: boolean;
    lowerCase: boolean;
}
declare class FieldHasContent implements IConditionFunction {
    itemOrFolder: boolean;
    static uid: string;
    getHelp(): string;
    getName(): string;
    evaluate(overwrites: IGlobalPrintFunctionParams, params: IFieldHasContentParams, ifo: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): boolean;
}
interface IFieldOfTypeParams extends IPrintMacroParams {
    fieldType: string;
    fieldTypes: string[];
    negate: boolean;
}
declare class FieldIsOfType implements IConditionFunction {
    itemOrFolder: boolean;
    static uid: string;
    getHelp(): string;
    getName(): string;
    evaluate(overwrites: IGlobalPrintFunctionParams, params: IFieldOfTypeParams, object: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): boolean;
}
interface IFolderHasItemsConditionParams {
    iterator: string;
    negate: boolean;
}
declare class FolderHasItems implements IConditionFunction {
    itemOrFolder: boolean;
    static uid: string;
    getHelp(): string;
    getName(): string;
    evaluate(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFolderHasItemsConditionParams, object: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): boolean;
}
interface IIsCategoryParams extends IPrintMacroParams {
    categories: string[];
    negate: boolean;
}
declare class IsCategory implements IConditionFunction {
    itemOrFolder: boolean;
    static uid: string;
    getHelp(): string;
    getName(): string;
    evaluate(overwrites: IGlobalPrintFunctionParams, paramsCaller: IIsCategoryParams, object: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): boolean;
}
interface IItemHasLabelConditionParams extends ILabelIteratorParams {
    iterator?: string;
    negate: boolean;
    labels: string[];
    setOrUnset: boolean;
    includeNonPrintable?: boolean;
}
declare class ItemHasLabels implements IConditionFunction {
    itemOrFolder: boolean;
    static uid: string;
    getHelp(): string;
    getName(): string;
    evaluate(overwrites: IGlobalPrintFunctionParams, params: IItemHasLabelConditionParams, object: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): boolean;
}
interface IItemHasTraces {
    iterator: string;
    direction: "up" | "down";
    mustHave: boolean;
    canHave: boolean;
    negate: boolean;
}
declare class ItemHasTraces implements IConditionFunction {
    itemOrFolder: boolean;
    static uid: string;
    getHelp(): string;
    getName(): string;
    evaluate(overwrites: IGlobalPrintFunctionParams, paramsCaller: IItemHasTraces, item: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): boolean;
}
interface IFieldCheckboxParams extends IPrintFieldParams {
    class: string;
    onlyIfSet: boolean;
}
declare class FieldCheckbox implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldCheckboxParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldContentParams {
    fieldName?: string;
    raw?: boolean;
    fieldInfo?: IPrintFieldInfo;
    function?: string;
    functionPrefix?: string;
}
declare class FieldContent implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(hideDetails?: boolean, showFieldName?: boolean): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldContentParams, item: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    protected formatXml(node: Element, level: number): Element;
}
declare class FieldItemContent extends FieldContent {
    static uid: string;
    getGroup(): string;
    getName(): string;
    getHelp(hideDetails?: boolean): string;
}
interface IFieldCrossLinksParams extends IPrintFieldParams {
    formatCross: "list" | "comma";
    asLinkCross: boolean;
    showTitle: boolean;
    class: string;
}
declare class FieldCrossLinks implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldCrossLinksParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IDatePrimitiveParams {
    class: string;
    format: string;
}
declare class FieldDate implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IDatePrimitiveParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    editParams(params: IDatePrimitiveParams, onUpdate: (newParams: IDatePrimitiveParams) => void): JQuery;
}
interface IFieldDropdownParams extends IPrintFieldParams {
    formatDrop: "list" | "comma";
    class: string;
}
declare class FieldDropdown implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldDropdownParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldFileManagerParams extends IPrintFieldParams {
    formatFile: "list" | "comma";
    asLinkFile: boolean;
    class: string;
}
declare class FieldFileManager implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldFileManagerParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldGateControlParams extends IPrintFieldParams {
    showStatus: number;
    passedStatus: string;
    failedStatus: string;
    progressStatus: string;
    showLines: number;
    showDate: boolean;
    showUser: boolean;
    showComment: boolean;
    passedLine: string;
    failedLine: string;
    progressLine: string;
    login: boolean;
    first: boolean;
    last: boolean;
    email: boolean;
    class: string;
}
declare class FieldGateControl implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldGateControlParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
declare class FieldHelper {
    static fixTermsAndAbreviation(text: string, mf: JQuery): string;
}
interface IFieldLabelParams extends IPrintFieldParams {
    checkboxLabel: number;
    class: string;
}
declare class FieldLabel implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldLabelParams, item: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldReviewControlParams extends IPrintFieldParams {
    headerItem: string;
    headerRevision: string;
    headerComments: string;
    showUsers: boolean;
    login: boolean;
    first: boolean;
    last: boolean;
    email: boolean;
    classReviewTable: string;
    class: string;
}
declare class FieldReviewControl implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldReviewControlParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldRichtextParams extends IPrintFieldParams {
    class: string;
}
declare class FieldRichText implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldRichtextParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldRiskParams extends IPrintFieldParams {
    attribute: string;
    forcePostWeights: boolean;
    classRiskTable: string;
    class: string;
}
declare class FieldRisk implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldRiskParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldRiskGenericParams extends IPrintFieldParams {
    class: string;
}
declare class FieldRiskGeneric implements IPrintFunction {
    static uid: string;
    attribute: string;
    getName(): string;
    getGroup(): string;
    getSubGroup(): string;
    getHelp(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldRiskGenericParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
declare class FieldRiskGenericF0 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericF1 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericF2 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericF3 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericF4 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericB0 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericB1 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericB2 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericB3 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericB4 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericA0 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericA1 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericA2 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericA3 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericA4 extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericTB extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
declare class FieldRiskGenericTA extends FieldRiskGeneric {
    static uid: string;
    attribute: string;
    getName(): string;
}
interface IFieldTableOptions extends IPrintFieldParams {
    showSteps: boolean;
    columnWidths: string[];
    login: boolean;
    first: boolean;
    last: boolean;
    email: boolean;
    cell?: IFieldTableOptionsCell;
    hideColumns?: number[];
    showRowsMatching?: IStringMap;
    classTable: string;
    class: string;
}
interface IFieldTableOptionsCell {
    row: number;
    col: number;
}
declare class FieldTable implements IPrintFunction {
    static MAX_WIDTH: number;
    private baseUID;
    constructor(classes: string);
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldTableOptions, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    private getColumnWidth;
    private showTableRow;
}
interface IFieldTasksParams extends IPrintFieldParams {
    showOnlyPlugins?: string[];
    showDone: boolean;
    showOpen: boolean;
    class: string;
}
declare class FieldTasks implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IPrintFieldParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldtest_resultParams extends IPrintFieldParams {
    class: string;
}
declare class FieldTest_result implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldtest_resultParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldTextParams extends IPrintFieldParams {
    class: string;
}
declare class FieldText implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldTextParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldTextlineParams extends IPrintFieldParams {
    class: string;
}
declare class FieldTextline implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldTextlineParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IFieldUserParams extends IPrintFieldParams {
    login: boolean;
    first: boolean;
    last: boolean;
    email: boolean;
    formatUser: "list" | "comma";
    class: string;
}
declare class FieldUser implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldUserParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IAttributePrimitiveParams {
    attributeName?: string;
    path?: string;
    class?: string;
}
declare class AttributePrimitive implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IAttributePrimitiveParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    editParams(params: IAttributePrimitiveParams, onUpdate: (newParams: IAttributePrimitiveParams) => void): JQuery;
}
interface IAuthorPrimitiveParams {
    class: string;
}
declare class AuthorPrimitive implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IAuthorPrimitiveParams, object: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IBreadcrumbsPrimitiveParams {
    excludeItem?: boolean;
    showIDs?: boolean;
    showLinks?: boolean;
    showLinksInside?: boolean;
    separator?: string;
    class: string;
    classBreadcrumb: string;
    classBreadcrumbSeparator: string;
}
declare class BreadcrumbPrimitive implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IBreadcrumbsPrimitiveParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    private toString;
    editParams(params: IBreadcrumbsPrimitiveParams, onUpdate: (newParams: IBreadcrumbsPrimitiveParams) => void): JQuery;
}
interface IDepthParams {
    recursionDepth: number;
    offset: number;
    style: string;
}
declare class DepthPrimitive implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IDepthParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    editParams(params: IDepthParams, onUpdate: (newParams: IDepthParams) => void): JQuery;
}
interface IIndentParams {
    recursionDepth: number;
    offset: number;
    width: number;
}
declare class IndentPrimitive implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IIndentParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    editParams(params: IIndentParams, onUpdate: (newParams: IIndentParams) => void): JQuery;
}
interface ILinkPrimitiveParams {
    toAnchor?: boolean;
    asAnchor?: boolean;
    titleInLink?: boolean;
    titleAfterLink?: boolean;
    class?: string;
}
declare class LinkPrimitive implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, callerParams: ILinkPrimitiveParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    editParams(params: IIndentParams, onUpdate: (newParams: IIndentParams) => void): JQuery;
}
interface IRevisionPrimitiveParams {
    class: string;
}
declare class RevisionPrimitive implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IRevisionPrimitiveParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface IRiskColorParams {
    background?: boolean;
    before?: boolean;
}
declare class RiskColor implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    getTemplate(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IRiskColorParams, item: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    editParams(params: IRiskColorParams, onUpdate: (newParams: IRiskColorParams) => void): JQuery;
}
declare enum ITableSummaryType {
    Count = "Count",
    Sum = "Sum",
    Average = "Average",
    Median = "Median",
    Minimum = "Minimum",
    Maximum = "Maximum"
}
declare enum ITableSummaryRounding {
    NoRounding = "No Rounding",
    NoDecimals = "No Decimals",
    One = "One",
    Two = "Two",
    Three = "Three",
    Four = "Four",
    Five = "Five",
    Six = "Six"
}
interface ITableSummaryParams {
    /**
     * The category of table to render
     */
    tableCat?: string;
    /**
     * The serial of table to render
     */
    tableId?: string;
    /**
     * The type of summary to perform
     */
    summary?: ITableSummaryType;
    /**
     * The column to summarize
     */
    column?: number;
    /**
     * Round to how many digits
     */
    rounding?: ITableSummaryRounding;
}
declare enum ITableElementType {
    Span = 0,
    Number = 1,
    String = 2
}
declare type ITableElement = ITableElementSpan | ITableElementNumeric | ITableElementString;
declare type TableElementColumn = ITableElement[];
interface ITableElementNumeric {
    type: ITableElementType.Number;
    value: number;
}
interface ITableElementString {
    type: ITableElementType.String;
    value: string;
}
interface ITableElementSpan {
    type: ITableElementType.Span;
}
declare class TableSummary implements IPrintFunction {
    static uid: string;
    static defaults: ITableSummaryParams;
    static explanation: string;
    getGroup(): string;
    getHelp(_hideDetails?: boolean, _showFieldName?: boolean): string;
    getName(): string;
    editParams(params: IAttributePrimitiveParams, onUpdate: (newParams: IAttributePrimitiveParams) => void): JQuery;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: ITableSummaryParams, item: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void, printProcessor?: IPrintProcessor): string;
    summarize(data: ITableElement[], type: ITableSummaryType, rounding: ITableSummaryRounding, onError: (message: string) => void): string;
    round(value: number, rounding: ITableSummaryRounding): number;
    normalizeTable(tableString: string): ITableElement[][];
    median(numbers: any): any;
}
interface ITitlePrimitiveParams {
    class?: string;
}
declare class TitlePrimitive implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: ITitlePrimitiveParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
}
interface ITraceRulesEvaluationParams {
    direction: "up" | "down";
    mustHave: boolean;
    canHave: boolean;
    before: string;
    after: string;
    class: string;
}
declare class TraceRulesEvaluation implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    private paramsDefaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IRevisionPrimitiveParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    private hasLinkTo;
    editParams(params: ITraceRulesEvaluationParams, onUpdate: (newParams: ITraceRulesEvaluationParams) => void): JQuery;
}
interface IXTCColorParams {
    colors?: IXTCStatusParamsStates;
}
declare class XTCColor implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getTemplate(): string;
    getHelp(): string;
    getName(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IXTCColorParams, item: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): any;
    protected getHuman(result: string, mf: JQuery): string;
    protected getStatus(result: string, mf: JQuery): "error" | "" | "new" | "ok" | "warning";
    editParams(params: IXTCColorParams, onUpdate: (newParams: IXTCColorParams) => void): JQuery;
}
interface IXTCStatusParams {
    showIcons?: boolean;
    icons?: IXTCStatusParamsStates;
    colors?: IXTCStatusParamsStates;
    raw?: boolean;
    class: string;
}
interface IXTCStatusParamsStates {
    error: string;
    ok: string;
    warning: string;
    new: string;
    [key: string]: string;
}
declare class XTCStatus implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getSubGroup(): string;
    getHelp(): string;
    getName(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IXTCStatusParams, item: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    protected getHuman(result: string, mf: JQuery): string;
    protected getStatus(result: string, mf: JQuery): "error" | "" | "new" | "ok" | "warning";
    editParams(params: IXTCStatusParams, onUpdate: (newParams: IXTCStatusParams) => void): JQuery;
}
interface ILabelPrimitiveParams {
    showIcon: boolean;
    showText: boolean;
    class: string;
    classIcon: string;
    className: string;
}
declare class LabelIconAndName implements IPrintFunction {
    static uid: string;
    getGroup(): string;
    getHelp(): string;
    getName(): string;
    private defaults;
    render(overwrites: IGlobalPrintFunctionParams, paramsCaller: IPrintLabelParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string;
    editParams(params: ILabelPrimitiveParams, onUpdate: (newParams: ILabelPrimitiveParams) => void): JQuery;
}
interface IChildrenIteratorParams extends IPrintItemIteratorParams {
    leafs?: boolean;
    maxDepth?: number;
    includeItems?: boolean;
    includeFolders?: boolean;
}
declare class ChildrenIterator implements IPrintItemIterator {
    worksOnItem: boolean;
    worksOnFolder: boolean;
    folderIterator: boolean;
    traceIterator: boolean;
    tableRowIterator: boolean;
    static uid: string;
    private paramsDefault;
    getHelp(): string;
    getValidation(): null;
    getName(): string;
    iterate(overwrites: IGlobalPrintFunctionParams, paramsCaller: IChildrenIteratorParams, itemOrFolder: string, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string[];
    private getChildrenRec;
    editParams(params: IChildrenIteratorParams, onUpdate: (newParams: IChildrenIteratorParams) => void): JQuery;
}
interface IFieldIteratorParams {
    showTypes?: string[];
    showIds?: string[];
    showNames?: string[];
    hideTypes?: string[];
    hideIds?: string[];
    hideNames?: string[];
    matches?: string;
    onlyWithContent?: boolean;
}
declare class FieldIterator implements IPrintFieldIterator {
    worksOnItem: boolean;
    worksOnFolder: boolean;
    static uid: string;
    getHelp(): string;
    getName(): string;
    iterate(overwrites: IGlobalPrintFunctionParams, paramsCaller: IFieldIteratorParams, itemOrFolder: string, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): IPrintFieldInfo[];
    editParams(params: IFieldIteratorParams, onUpdate: (newParams: IFieldIteratorParams) => void): JQuery;
}
interface ILabelIteratorParams {
    includeNonPrintable?: boolean;
    excludeSet?: boolean;
    excludeUnSet?: boolean;
    includeAllUnSet?: boolean;
    positiveList?: string[];
}
declare class LabelIterator implements IPrintLabelIterator {
    worksOnItem: boolean;
    worksOnFolder: boolean;
    static uid: string;
    getHelp(): string;
    getName(): string;
    iterate(overwrites: IGlobalPrintFunctionParams, paramsCaller: ILabelIteratorParams, item: string, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): IPrintLabelInfo[];
    protected getReportName(label: ILabel, set: boolean): string;
    protected getIcon(label: ILabel, set: boolean): string;
    protected getStyle(label: ILabel, set: boolean): {
        foreground: string;
        background: string;
        icon?: string | undefined;
        displayName: string;
        tooltip?: string | undefined;
    } | null;
    editParams(params: ILabelIteratorParams, onUpdate: (newParams: ILabelIteratorParams) => void): JQuery;
}
interface ILinksIteratorParams extends IPrintItemIteratorParams {
    direction: "up" | "down";
    leafs?: string[];
    maxDepth?: number;
    xtc?: "highest" | "changed" | "";
    excludeRiskControlDown: boolean;
    onlyRiskControlDown: boolean;
    categories: null | [];
}
declare class LinksIterator implements IPrintItemIterator {
    worksOnItem: boolean;
    worksOnFolder: boolean;
    folderIterator: boolean;
    traceIterator: boolean;
    tableRowIterator: boolean;
    static uid: string;
    getHelp(): string;
    getName(): string;
    getValidation(): null;
    private paramsDefaults;
    iterate(overwrites: IGlobalPrintFunctionParams, paramsCaller: ILinksIteratorParams, itemOrFolder: string, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string[];
    static deduplicate(ids: string[]): string[];
    private getRiskControlCategories;
    private getHighestNumberedId;
    private getLastChangedId;
    private getParentTC;
    private getNextLinks;
    private getNextIncludedPaths;
    private getNextPaths;
    editParams(params: ILinksIteratorParams, onUpdate: (newParams: ILinksIteratorParams) => void): JQuery;
}
interface IRowIteratorParams extends IPrintItemIteratorParams {
    fieldName: string;
    showRowsMatching?: IStringMap;
}
declare class TableRowIterator implements IPrintItemIterator {
    worksOnItem: boolean;
    worksOnFolder: boolean;
    folderIterator: boolean;
    traceIterator: boolean;
    tableRowIterator: boolean;
    static uid: string;
    getHelp(): string;
    getValidation(): null;
    getName(): string;
    iterate(overwrites: IGlobalPrintFunctionParams, paramsCaller: IRowIteratorParams, itemOrFolder: string, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): string[];
}
declare class PrintSortByRevisionDate implements IPrintSorter {
    getHelp(): string;
    getName(): string;
    sort(a: string, b: string, inverse: boolean, params: any, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): number;
}
declare class PrintSortByItemId implements IPrintSorter {
    getHelp(): string;
    getName(): string;
    sort(ia: string, ib: string, inverse: boolean, params: any, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): 1 | 0 | -1;
}
declare class PrintSortByTitle implements IPrintSorter {
    getHelp(): string;
    getName(): string;
    sort(a: string, b: string, inverse: boolean, params: any, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void): 1 | 0 | -1;
}
//# sourceMappingURL=print.d.ts.map