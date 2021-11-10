/* eslint no-await-in-loop: "off", no-underscore-dangle: 'off' */

const { Client } = require('@elastic/elasticsearch');
const { index } = require('./configs');

const {
    ELASTIC_SEARCH_ENDPOINT = 'http://host.docker.internal:9200',
} = process.env;

const client = new Client({
    node: ELASTIC_SEARCH_ENDPOINT,
});

async function lookForDedupDocs(contentId) {
    const dupDocs = await client.search({
        index,
        body: {
            track_total_hits: true,
            query: {
                match: { 'id.keyword': contentId },
            },
            sort: [
                {
                    'metaForKb.position': {
                        order: 'asc',
                    },
                    'metaForKb.displayTime': {
                        order: 'asc',
                    },
                },
            ],
        },
    }).then(({ body }) => {
        if (body && body.hits.hits.length > 1) {
            return body.hits.hits.slice(1);
        }
        return [];
    });

    console.log('dupDocs', dupDocs);

    const promises = dupDocs.map((doc) => client.delete({
        index,
        id: doc._id,
    }));

    return Promise.all(promises).then((res) => {
        console.log('remove contentId', contentId, 'result:', res);
    }).catch((err) => {
        console.error('error with contentId', contentId, 'error:', err);
    });
}

async function dedup() {
    const totalDocs = await client.search({
        index,
        body: {},
    }).then((res) => res.body.hits.total.value);

    const batchSize = 100;
    const loopEnd = Math.ceil(totalDocs / batchSize);
    for (let i = 0; i < loopEnd; i += 1) {
        const docs = await client.search({
            index,
            body: {
                track_total_hits: true,
                from: i * batchSize,
                size: batchSize,
            },
        }).then(({ body }) => {
            console.log('-------- i =', i, JSON.stringify(body, null, 4));
            if (body && Array.isArray(body.hits.hits)) {
                return body.hits.hits;
            }
            return [];
        });

        await Promise.all(docs.map((doc) => lookForDedupDocs(doc._source.id)));
    }
}

dedup();
