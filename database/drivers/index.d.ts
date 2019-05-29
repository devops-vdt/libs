/** Declaration file generated by dts-gen */

declare namespace index {
    class Elasticsearch {
        constructor(...args: any[]);

        count(...args: any[]): void;

        deleteById(...args: any[]): void;

        find(...args: any[]): void;

        initialize(...args: any[]): void;

        insert(...args: any[]): void;

        updateById(...args: any[]): void;

    }

    class Http {
        constructor(...args: any[]);

        initialize(...args: any[]): void;

    }

    class Mysql {
        constructor(...args: any[]);

        deleteById(...args: any[]): void;

        find(...args: any[]): void;

        findById(...args: any[]): void;

        initialize(...args: any[]): void;

        insert(...args: any[]): void;

        insertMany(...args: any[]): void;

        startTransaction(...args: any[]): void;

        update(...args: any[]): void;

        updateById(...args: any[]): void;

    }

    class Redis {
        constructor(...args: any[]);

        initialize(...args: any[]): void;

    }

    namespace Elasticsearch {
        namespace prototype {
            function count(...args: any[]): void;

            function deleteById(...args: any[]): void;

            function find(...args: any[]): void;

            function initialize(...args: any[]): void;

            function insert(...args: any[]): void;

            function updateById(...args: any[]): void;

        }

    }

    namespace Http {
        namespace prototype {
            function initialize(...args: any[]): void;

        }

    }

    namespace Mysql {
        namespace prototype {
            function deleteById(...args: any[]): void;

            function find(...args: any[]): void;

            function findById(...args: any[]): void;

            function initialize(...args: any[]): void;

            function insert(...args: any[]): void;

            function insertMany(...args: any[]): void;

            function startTransaction(...args: any[]): void;

            function update(...args: any[]): void;

            function updateById(...args: any[]): void;

        }

    }

    namespace Redis {
        namespace prototype {
            function initialize(...args: any[]): void;

        }

    }

}

