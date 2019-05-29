declare namespace index {
    class validate {
        constructor(...args: any[]);
        body(schema: any): any;

        headers(schema: any): any;

        params(schema: any, name: any): any;

        query(schema: any): any;

        validate(schema: any): any;
    }
}
